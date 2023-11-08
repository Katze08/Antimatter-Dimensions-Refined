// NEEDS TO BE ADJUSTED TO GALAXY CHALLENGES!!! (look for comments that say Adjust method)

import { GameMechanicState } from "./game-mechanics";

export function tryCompleteGalaxyChallenges() {
  if (EternityMilestone.autoIC.isReached) {
    // Currently, all GCs are completed when the eternity milestone that completes ICs is reached
    const toComplete = GalaxyChallenges.all.filter(x => x.isUnlocked && !x.isCompleted);
    for (const challenge of toComplete) challenge.complete();
  }
}

class GalaxyChallengeRewardState extends GameMechanicState {
  constructor(config, challenge) {
    super(config);
    this._challenge = challenge;
  }

  get isEffectActive() {
    return this._challenge.isCompleted;
  }
}

class GalaxyChallengeState extends GameMechanicState {
  constructor(config) {
    super(config);
    this._reward = new GalaxyChallengeRewardState(config.reward, this);
  }

  get unlockAM() {
    return this.config.unlockAM;
  }

  get isUnlocked() {
    return player.records.thisEternity.maxAM.gte(this.unlockAM) || (Achievement(133).isUnlocked && !Pelle.isDoomed) ||
      (PelleUpgrade.keepInfinityChallenges.canBeApplied && Pelle.cel.records.totalAntimatter.gte(this.unlockAM));
  }

  get isRunning() {
    return player.challenge.galaxy.current === this.id;
  }

  requestStart() {
    if (!this.isUnlocked) return;
    if (GameEnd.creditsEverClosed) return;
    if (!player.options.confirmations.challenges) {
      this.start();
      return;
    }
    Modal.startGalaxyChallenge.show(this.id);
  }

  start() {
    if (!this.isUnlocked || this.isRunning) return;
    // Forces big crunch reset but ensures IP gain, if any.
    bigCrunchReset(true, true);
    player.challenge.normal.current = 0;
    player.challenge.galaxy.current = this.id;
    // TODO: Check
    if (!Enslaved.isRunning) Tab.dimensions.antimatter.show();
    player.break = true;
    if (EternityChallenge.isRunning) Achievement(115).unlock();
  }

  get isCompleted() {
    return (player.challenge.galaxy.completedBits & (1 << this.id)) !== 0;
  }

  complete() {
    player.challenge.galaxy.completedBits |= 1 << this.id;
    EventHub.dispatch(GAME_EVENT.GALAXY_CHALLENGE_COMPLETED);
  }

  get isEffectActive() {
    return this.isRunning;
  }

  /**
   * @return {GalaxyChallengeRewardState}
   */
  get reward() {
    return this._reward;
  }

  get isQuickResettable() {
    return this.config.isQuickResettable;
  }

  get goal() {
    return this.config.goal;
  }

  updateChallengeTime() {
    const bestTimes = player.challenge.galaxy.bestTimes;
    // Look for this later
    if (bestTimes[this.id - 1] <= player.records.thisInfinity.time) {
      return;
    }
    player.challenge.galaxy.bestTimes[this.id - 1] = player.records.thisInfinity.time;
    GameCache.galaxyChallengeTimeSum.invalidate();
  }

  exit() {
    player.challenge.galaxy.current = 0;
    bigCrunchReset(true, false);
    if (!Enslaved.isRunning) Tab.dimensions.antimatter.show();
  }
}

/**
 * @param {number} id
 * @return {GalaxyChallengeState}
 */
export const GalaxyChallenge = GalaxyChallengeState.createAccessor(GameDatabase.challenges.galaxy);

/**
 * @returns {GalaxyChallengeState}
 */
Object.defineProperty(GalaxyChallenge, "current", {
  get: () => (player.challenge.galaxy.current > 0
    ? GalaxyChallenge(player.challenge.galaxy.current)
    : undefined),
});

Object.defineProperty(GalaxyChallenge, "isRunning", {
  get: () => GalaxyChallenge.current !== undefined,
});

export const GalaxyChallenges = {
  /**
   * @type {GalaxyChallengeState[]}
   */
  all: GalaxyChallenge.index.compact(),
  completeAll() {
    for (const challenge of GalaxyChallenges.all) challenge.complete();
  },
  clearCompletions() {
    player.challenge.galaxy.completedBits = 0;
  },
  get nextGC() {
    return GalaxyChallenges.all.find(x => !x.isUnlocked);
  },
  get nextGCUnlockAM() {
    return this.nextGC?.unlockAM;
  },
  /**
   * Displays a notification if the antimatter gained will surpass the next unlockAM requirement.
   * @param value {Decimal} - total antimatter
   */
  notifyGCUnlock(value) {
    // Disable the popup if the user will automatically complete the IC.
    if (EternityMilestone.autoIC.isReached) return;
    if (GalaxyChallenges.nextGC === undefined) return;
    for (const gc of GalaxyChallenges.all) {
      if (gc.isUnlocked || gc.isCompleted) continue;
      if (value.lt(gc.unlockAM)) break;
      // This has a reasonably high likelihood of happening when the player isn't looking at the game, so
      // we also give it a tab notification
      TabNotification.GCUnlock.clearTrigger();
      // Adjust method
      GameUI.notify.galaxy(`You have unlocked Galaxy Challenge ${gc.id}`, 7000);
      TabNotification.GCUnlock.tryTrigger();
    }
  },
  /**
   * @returns {GalaxyChallengeState[]}
   */
  get completed() {
    return GalaxyChallenges.all.filter(gc => gc.isCompleted);
  }
};
