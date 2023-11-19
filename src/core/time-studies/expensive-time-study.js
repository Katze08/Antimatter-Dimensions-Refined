import { TimeStudy } from "./normal-time-study";
import { TimeStudyState } from "./time-studies";

export class ExpensiveTimeStudyState extends TimeStudyState {
  constructor(config) {
    super(config, TIME_STUDY_TYPE.EXPENSIVE);
  }

  get isBought() {
    return player.timestudy.expensiveStudies.includes(this.id);
  }

  get canBeBought() {
    return this.isAffordable/* && this.config.requirement*/;
  }

  get isEffectActive() {
    return this.isBought;
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

  purchase() {
    if (this.isBought || !this.canBeBought) return false;

    player.timestudy.expensiveStudies.push(this.id);
    Currency.timeTheorems.subtract(this.cost);
    return true;
  }
}

ExpensiveTimeStudyState.studies = mapGameData(
  GameDatabase.eternity.timeStudies.expensive,
  config => new ExpensiveTimeStudyState(config)
);

/**
 * @param {number} value
 * @returns {ExpensiveTimeStudyState}
 */
TimeStudy.expensive = function(value) {
  return ExpensiveTimeStudyState.studies[value];
};

TimeStudy.boughtExpensiveTS = function() {
  return player.timestudy.expensiveStudies.map(id => ExpensiveTimeStudyState.studies[id]);
};
