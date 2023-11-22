import { DC } from "./constants";

export function effectiveBasePaperclipGalaxies() {
  return Math.max(player.paperclipGalaxies, 0);
}

export function getPaperclipTickSpeedMultiplier() {
  let galaxies = effectiveBasePaperclipGalaxies();
  if (galaxies < 3) {
    let baseMultiplier = 1 / 1.1245;
    if (player.paperclipGalaxies === 1) baseMultiplier = 1 / 1.11888888;
    if (player.paperclipGalaxies === 2) baseMultiplier = 1 / 1.11267177;
    const perGalaxy = 0.02;
    return DC.D0_01.clampMin(baseMultiplier - (galaxies * perGalaxy));
  }
  const baseMultiplier = 0.8;
  galaxies -= 2;
  const perGalaxy = DC.D0_965;
  return perGalaxy.pow(galaxies - 2).times(baseMultiplier);
}

export function buyPaperclipTickSpeed() {
  if (!PaperclipTickspeed.isAvailableForPurchase || !PaperclipTickspeed.isAffordable) return false;
  Currency.paperclips.subtract(Tickspeed.cost);
  player.paperclipTotalTickBought++;
  GameUI.update();
  return true;
}

export function buyMaxPaperclipTickSpeed() {
  if (!PaperclipTickspeed.isAvailableForPurchase || !PaperclipTickspeed.isAffordable) return;
  const purchases = PaperclipTickspeed.costScale.getMaxBought(player.paperclipTotalTickBought, Currency.paperclips.value, 1);
  if (purchases === null) {
    return;
  }
  Currency.paperclips.subtract(Decimal.pow10(purchases.logPrice));
  player.paperclipTotalTickBought += purchases.quantity;
}

export function resetPaperclipTickspeed() {
  player.paperclipTotalTickBought = 0;
}

export const PaperclipTickspeed = {
  get isUnlocked() {
    return PaperclipDimension(2).bought > 0;
  },

  get isAvailableForPurchase() {
    return this.isUnlocked;
  },

  get isAffordable() {
    return Currency.paperclips.gte(this.cost);
  },

  get multiplier() {
    return getPaperclipTickSpeedMultiplier();
  },

  get current() {
    const tickspeed = this.baseValue;
    return tickspeed;
  },

  get cost() {
    return this.costScale.calculateCost(player.paperclipTotalTickBought);
  },

  get costScale() {
    return new ExponentialCostScaling({
      baseCost: 100,
      baseIncrease: 10,
      costScale: Player.paperclipTickSpeedMultDecrease,
      scalingCostThreshold: Number.MAX_VALUE
    });
  },

  get baseValue() {
    return DC.E3.times(getPaperclipTickSpeedMultiplier().pow(this.totalUpgrades));
  },

  get totalUpgrades() {
    return player.paperclipTotalTickBought + player.paperclipTotalTickGained;
  },

  get perSecond() {
    return Decimal.divide(1000, this.current);
  }
};
