import { PaperclipDimBoost } from "@/core/dimboostPaperclips";
import { DC } from "../constants";

import { DimensionState } from "./dimension";

// Multiplier applied to all Antimatter Dimensions, regardless of tier. This is cached using a Lazy
// and invalidated every update.
export function paperclipDimensionCommonMultiplier() {
  let multiplier = DC.D1;
  return multiplier;
}

export function getDimensionFinalMultiplierUncached(tier) {
  if (tier < 1 || tier > 8) throw new Error(`Invalid Paperclip Dimension tier ${tier}`);
  let multiplier = DC.D1;
  multiplier = applyNDMultipliers(multiplier, tier);
  return multiplier;
}

function applyNDMultipliers(mult, tier) {
  let multiplier = mult.times(GameCache.paperclipDimensionCommonMultiplier.value);
  const buy10Value = Math.floor(PaperclipDimension(tier).bought / 10);
  multiplier = multiplier.times(Decimal.pow(PaperclipDimensions.buyTenMultiplier, buy10Value));
  multiplier = multiplier.times(PaperclipDimBoost.multiplierToNDTier(tier));
  if (tier === 8) {
    multiplier = multiplier.times(PaperclipSacrifice.totalBoost);
  }
  multiplier = multiplier.clampMin(0.1);
  return multiplier;
}

export function buyOneDimension(tier) {
  const dimension = PaperclipDimension(tier);
  const cost = dimension.cost;
  dimension.currencyAmount = dimension.currencyAmount.minus(cost);
  dimension.amount = dimension.amount.plus(1);
  dimension.bought++;
  return true;
}

export function buyManyDimension(tier) {
  const dimension = PaperclipDimension(tier);
  if (!dimension.isAvailableForPurchase || !dimension.isAffordableUntil10) return false;
  const cost = dimension.costUntil10;
  dimension.currencyAmount = dimension.currencyAmount.minus(cost);
  dimension.amount = dimension.amount.plus(dimension.remainingUntil10);
  dimension.bought += dimension.remainingUntil10;
  return true;
}

export function buyAsManyAsYouCanBuy(tier) {
  const dimension = PaperclipDimension(tier);
  if (!dimension.isAvailableForPurchase || !dimension.isAffordable) return false;
  const howMany = dimension.howManyCanBuy;
  const cost = dimension.cost.times(howMany);
  dimension.currencyAmount = dimension.currencyAmount.minus(cost);
  dimension.amount = dimension.amount.plus(howMany);
  dimension.bought += howMany;
  return true;
}

// This function doesn't do cost checking as challenges generally modify costs, it just buys and updates dimensions
function buyUntilTen(tier) {
  const dimension = PaperclipDimension(tier);
  dimension.amount = Decimal.round(dimension.amount.plus(dimension.remainingUntil10));
  dimension.bought += dimension.remainingUntil10;
}

export function maxAll() {
  for (let tier = 1; tier < 9; tier++) {
    buyMaxDimension(tier);
  }
  // Do this here because tickspeed might not have been unlocked before
  // (and maxAll might have unlocked it by buying dimensions).
  buyMaxTickSpeed();
}

export function buyMaxDimension(tier, bulk = Infinity) {
  const dimension = PaperclipDimension(tier);
  if (!dimension.isAvailableForPurchase || !dimension.isAffordableUntil10) return;
  const cost = dimension.costUntil10;
  let bulkLeft = bulk;
  // Buy any remaining until 10 before attempting to bulk-buy
  if (dimension.currencyAmount.gte(cost)) {
    dimension.currencyAmount = dimension.currencyAmount.minus(cost);
    buyUntilTen(tier);
    bulkLeft--;
  }
  if (bulkLeft <= 0) return;
  // This is the bulk-buy math, explicitly ignored if abnormal cost increases are active
  const maxBought = dimension.costScale.getMaxBought(
    Math.floor(dimension.bought / 10) + dimension.costBumps, dimension.currencyAmount, 10
  );
  if (maxBought === null) {
    return;
  }
  let buying = maxBought.quantity;
  if (buying > bulkLeft) buying = bulkLeft;
  dimension.amount = dimension.amount.plus(10 * buying).round();
  dimension.bought += 10 * buying;
  dimension.currencyAmount = dimension.currencyAmount.minus(Decimal.pow10(maxBought.logPrice));
}

class PaperclipDimensionState extends DimensionState {
  constructor(tier) {
    super(() => player.dimensions.paperclip, tier);
    const BASE_COSTS = [null, 1, 10, 1e3, 1e5, 1e8, 1e12, 1e17, 1e23];
    this._baseCost = BASE_COSTS[tier];
    const BASE_COST_MULTIPLIERS = [null, 1e3, 1e4, 1e5, 1e6, 1e8, 1e10, 1e12, 1e15];
    this._baseCostMultiplier = BASE_COST_MULTIPLIERS[tier];
  }

  /**
   * @returns {ExponentialCostScaling}
   */
  get costScale() {
    return new ExponentialCostScaling({
      baseCost: this._baseCost,
      baseIncrease: this._baseCostMultiplier,
      costScale: Player.dimensionMultDecrease,
      scalingCostThreshold: Number.MAX_VALUE
    });
  }

  /**
   * @returns {Decimal}
   */
  get cost() {
    return this.costScale.calculateCost(Math.floor(this.bought / 10) + this.costBumps);
  }

  /** @returns {number} */
  get costBumps() { return this.data.costBumps; }
  /** @param {number} value */
  set costBumps(value) { this.data.costBumps = value; }

  /**
   * @returns {number}
   */
  get boughtBefore10() {
    return this.bought % 10;
  }

  /**
   * @returns {number}
   */
  get remainingUntil10() {
    return 10 - this.boughtBefore10;
  }

  /**
   * @returns {Decimal}
   */
  get costUntil10() {
    return this.cost.times(this.remainingUntil10);
  }

  get howManyCanBuy() {
    const ratio = this.currencyAmount.dividedBy(this.cost);
    return Decimal.floor(Decimal.max(Decimal.min(ratio, 10 - this.boughtBefore10), 0)).toNumber();
  }

  /**
   * @returns {Decimal}
   */
  get rateOfChange() {
    const tier = this.tier;
    if (tier === 8) {
      return DC.D0;
    }
    let toGain;
    toGain = PaperclipDimension(tier + 1).productionPerSecond;
    return toGain.times(10).dividedBy(this.amount.max(1)).times(getGameSpeedupForDisplay());
  }

  /**
   * @returns {boolean}
   */
  get isProducing() {
    return this.totalAmount.gt(0);
  }

  /**
   * @returns {Decimal}
   */
  get currencyAmount() {
    return Currency.paperclips.value;
  }

  /**
   * @param {Decimal} value
   */
  set currencyAmount(value) {
    Currency.paperclips.value = value;
  }

  /**
    * @returns {boolean}
    */
  get isAffordable() {
    if (!player.break && this.cost.gt(Decimal.NUMBER_MAX_VALUE)) return false;
    return this.cost.lte(this.currencyAmount);
  }

  /**
   * @returns {boolean}
   */
  get isAffordableUntil10() {
    if (!player.break && this.cost.gt(Decimal.NUMBER_MAX_VALUE)) return false;
    return this.costUntil10.lte(this.currencyAmount);
  }

  get isAvailableForPurchase() {
    if (this.tier > DimBoost.totalBoosts + 4) return false;
    const hasPrevTier = this.tier === 1 || PaperclipDimension(this.tier - 1).totalAmount.gt(0);
    if (!hasPrevTier) return false;
    return this.tier < 7;
  }

  reset() {
    this.amount = DC.D0;
    this.bought = 0;
    this.costBumps = 0;
  }

  resetAmount() {
    this.amount = DC.D0;
  }

  get multiplier() {
    return GameCache.paperclipDimensionFinalMultipliers[this.tier].value;
  }

  get productionPerSecond() {
    const amount = this.totalAmount;
    let production = amount.times(this.multiplier).times(Tickspeed.perSecond);
    production = production.min(Decimal.MAX_VALUE);
    return production;
  }
}

/**
 * @function
 * @param {number} tier
 * @return {PaperclipDimensionState}
 */
export const PaperclipDimension = PaperclipDimensionState.createAccessor();

export const PaperclipDimensions = {
  /**
   * @type {PaperclipDimensionState[]}
   */
  all: PaperclipDimension.index.compact(),

  reset() {
    for (const dimension of PaperclipDimensions.all) {
      dimension.reset();
    }
    GameCache.dimensionMultDecrease.invalidate();
  },

  tick(diff) {
    // Stop producing antimatter at Big Crunch goal because all the game elements
    // are hidden when pre-break Big Crunch button is on screen.
    const hasBigCrunchGoal = !player.break;

    const maxTierProduced = 7;
    const nextTierOffset = 1;
    for (let tier = maxTierProduced; tier >= 1; --tier) {
      PaperclipDimension(tier + nextTierOffset).produceDimensions(PaperclipDimension(tier), diff / 10);
    }
    PaperclipDimension(1).produceCurrency(Currency.paperclips, diff);
  }
};
