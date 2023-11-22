import { PaperclipDimensions } from "@/core/dimensions/paperclip-dimension";
import { GalaxyUpgrade } from "@/core/galaxy-upgrades";
import { resetPaperclipTickspeed } from "@/core/paperclipTickspeed";
import { DC } from "./constants";

class PaperclipDimBoostRequirement {
  constructor(tier, amount) {
    this.tier = tier;
    this.amount = amount;
  }

  get isSatisfied() {
    const dimension = PaperclipDimension(this.tier);
    return dimension.totalAmount.gte(this.amount);
  }
}

export class PaperclipDimBoost {
  static get power() {
    const boost = Effects.max(2).toDecimal();
    return boost;
  }
  static get maxDimensionsUnlockable() {
    return 8;
  }
  static get maxBoosts() {
    return Infinity;
  }

  static get canBeBought() {
    if (PaperclipDimBoost.purchasedBoosts >= this.maxBoosts) return false;
    return true;
  }

  static get lockText() {
    return null;
  }

  static get requirement() {
    return this.bulkRequirement(1);
  }

  static bulkRequirement(bulk) {
    const targetResets = PaperclipDimBoost.purchasedBoosts + bulk;
    const tier = Math.min(targetResets + 3, this.maxDimensionsUnlockable);
    let amount = 20;
    amount = Math.round(amount);
    return new PaperclipDimBoostRequirement(tier, amount);
  }

  static get purchasedBoosts() {
    return Math.floor(player.paperclipDimensionBoosts);
  }

  static get totalBoosts() {
    return Math.floor(this.purchasedBoosts);
  }

  static multiplierToNDTier(tier) {
    const normalBoostMult = PaperclipDimBoost.power.pow(this.purchasedBoosts + 1 - tier).clampMin(1);
    return normalBoostMult;
  }
}

// eslint-disable-next-line max-params
export function softReset(tempBulk) {
  const bulk = Math.min(tempBulk, PaperclipDimBoost.maxBoosts - player.paperclipDimensionBoosts);
  EventHub.dispatch(GAME_EVENT.PAPERCLIP_DIMBOOST_BEFORE, bulk);
  player.paperclipDimensionBoosts = Math.max(0, player.paperclipDimensionBoosts + bulk);
  PaperclipDimensions.reset();
  player.sacrificed = DC.D0;
  resetPaperclipTickspeed();
  Currency.paperclips.reset();
  EventHub.dispatch(GAME_EVENT.PAPERCLIP_DIMBOOST_AFTER, bulk);
}

export function manualRequestPaperclipDimensionBoost() {
  if (Currency.paperclips.gt(Player.infinityLimit) || !PaperclipDimBoost.requirement.isSatisfied) return;
  if (!PaperclipDimBoost.canBeBought) return;
  if (GameEnd.creditsEverClosed) return;
  requestPaperclipDimensionBoost();
}

export function requestPaperclipDimensionBoost() {
  if (Currency.paperclips.gt(Player.infinityLimit) || !PaperclipDimBoost.requirement.isSatisfied || !PaperclipDimBoost.canBeBought) return;
  softReset(1);
}
