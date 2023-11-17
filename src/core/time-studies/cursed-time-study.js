import { TimeStudy } from "./normal-time-study";
import { TimeStudyState } from "./time-studies";

export class CursedTimeStudyState extends TimeStudyState {
  constructor(config) {
    super(config, TIME_STUDY_TYPE.CURSED);
  }

  get isBought() {
    return player.timestudy.cursedStudies.includes(this.id);
  }

  get canBeBought() {
    return this.isAffordable && this.config.requirement();
  }

  get description() {
    return this.config.description;
  }

  get cost() {
    return typeof this.config.cost === "function" ? this.config.cost() : this.config.cost;
  }

  get totalTimeTheoremRequirement() {
    return 0;
  }

  purchase(quiet = false) {
    if (this.isBought || !this.canBeBought) return false;

    player.timestudy.cursedStudies.push(this.id);
    Currency.timeTheorems.subtract(this.cost);
    return true;
  }
}

CursedTimeStudyState.studies = mapGameData(
  GameDatabase.eternity.timeStudies.cursed,
  config => new CursedTimeStudyState(config)
);

/**
 * @param {number} value
 * @returns {CursedTimeStudyState}
 */
TimeStudy.cursed = function(value) {
  return CursedTimeStudyState.studies[value];
};

TimeStudy.boughtCursedTS = function() {
  return player.timestudy.cursedStudies.map(id => CursedTimeStudyState.studies[id]);
};
