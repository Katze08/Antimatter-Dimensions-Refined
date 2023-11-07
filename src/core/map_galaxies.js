import { Modal } from "@/core/modal";
import { generateGalaxies } from "@/core/secret-formula/galaxy/map_galaxies";
import { SetPurchasableMechanicState } from "./game-mechanics";

class GalaxyState extends SetPurchasableMechanicState {
  constructor(config) {
    super(config);
    /**
     * @type {GalaxyState[]}
     */
    this.connectedPerks = [];
  }

  get label() {
    return this.config.label;
  }

  get shortDescription() {
    return this.config.shortDescription ? this.config.shortDescription() : "";
  }

  get currency() {
    return Currency.galaxies;
  }

  get set() {
    return player.mapGalaxies;
  }

  get cost() {
    return 0;
  }

  get isAvailableForPurchase() {
    return true;
  }

  get canBeApplied() {
    return this.isBought && !(Pelle.isDoomed && Pelle.uselessPerks.includes(this.id));
  }

  onPurchased() {
    if (this.config.bumpCurrency !== undefined) this.config.bumpCurrency();
    GameCache.achievementPeriod.invalidate();
    GameCache.buyablePerks.invalidate();
    EventHub.dispatch(GAME_EVENT.GALAXY_BOUGHT);
  }
}

export function Galaxy() {
  return mapGameDataToObject(
    player.availableMapGalaxiesCurrentInfinity,
    //GameDatabase.galaxy.galaxies,
    config => new GalaxyState(config)
  );
}

export const Galaxies = {
  all: Galaxy().all,
  /**
   * @param {number} id
   * @returns {GalaxyState}
   */
  find(id) {
    return Galaxies.all.find(p => p.id === id);
  }
};

export function checkPerkValidity() {
  if (player.reality.perks.every(id => Perks.find(id) !== undefined)) return;
  dev.respecPerks();
  if (Currency.perkPoints.gte(Perks.all.length)) {
    dev.buyAllPerks();
    Modal.message.show("Some of your Perks were invalid, but you auto-bought all valid perks.");
  } else {
    Modal.message.show("Some of your Perks were invalid, so your Perks have been reset and your Perk Points refunded.");
  }
}
