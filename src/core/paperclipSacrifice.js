import { PaperclipDimensions } from "@/core/dimensions/paperclip-dimension";
import { DC } from "./constants";

export class PaperclipSacrifice {
  // This is tied to the "buying an 8th dimension" achievement in order to hide it from new players before they reach
  // sacrifice for the first time.
  static get isVisible() {
    return true;
  }

  static get canSacrifice() {
    return PaperclipDimBoost.purchasedBoosts > 4 && this.nextBoost.gt(1) &&
      PaperclipDimension(8).totalAmount.gt(0) && Currency.paperclips.lt(Player.infinityLimit);
  }

// The code path for calculating the sacrifice exponent is pretty convoluted, but needs to be structured this way
  // in order to mostly replicate old pre-Reality behavior. There are two key things to note in how sacrifice behaves
  // which are not immediately apparent here; IC2 changes the formula by getting rid of a log10 (and therefore makes
  // sacrifice significantly stronger despite the much smaller exponent) and pre-Reality behavior assumed that the
  // player would already have ach32/57 by the time they complete IC2. As Reality resets achievements, we had to
  // assume that all things boosting sacrifice can be gotten independently, which resulted in some odd effect stacking.
  static get sacrificeExponent() {
    return 2;
  }

  static get nextBoost() {
    const nd1Amount = PaperclipDimension(1).amount;
    if (nd1Amount.eq(0)) return DC.D1;
    const sacrificed = player.paperclipSacrificed.clampMin(1);
    const prePowerSacrificeMult = new Decimal((nd1Amount.log10() / 10) / Math.max(sacrificed.log10() / 10, 1));
    return prePowerSacrificeMult.clampMin(1).pow(this.sacrificeExponent);
  }

  static get totalBoost() {
    if (player.paperclipSacrificed.eq(0)) return DC.D1;
    const prePowerBoost = new Decimal(player.paperclipSacrificed.log10() / 10);
    return prePowerBoost.clampMin(1).pow(this.sacrificeExponent);
  }
}

export function paperclipSacrificeReset() {
  if (!PaperclipSacrifice.canSacrifice) return false;
  if (!player.break && Currency.antimatter.gt(Decimal.NUMBER_MAX_VALUE)) return false;
  EventHub.dispatch(GAME_EVENT.PAPERCLIP_SACRIFICE_RESET_BEFORE);
  player.paperclipSacrificed = player.paperclipSacrificed.plus(PaperclipDimension(1).amount);
  EventHub.dispatch(GAME_EVENT.PAPERCLIP_SACRIFICE_RESET_AFTER);
  return true;
}

export function paperclipSacrificeBtnClick() {
  if (!PaperclipSacrifice.isVisible || !PaperclipSacrifice.canSacrifice) return;
  paperclipSacrificeReset();
}
