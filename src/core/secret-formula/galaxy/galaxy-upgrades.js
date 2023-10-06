import { DC } from "../../constants";

const decreaseDimBoostMaxUpgrades = 5;
const decreaseGalaxyMaxUpgrades = 20;
const decreaseDimBoostBase = 15;
const decreaseGalaxyBase = 60;
const increaseLyBase = 10;
const extendUniverseBase = 30;

function rebuyable(config) {
  const effectFunction = config.effect || (x => x);
  const { id, maxUpgrades, description, isDisabled, noLabel, onPurchased } = config;
  return {
    rebuyable: true,
    id,
    cost: () => config.initialCost.times(Decimal.pow(config.costIncrease, player.galaxyRebuyables[config.id])),
    maxUpgrades,
    description,
    effect: () => effectFunction(player.galaxyRebuyables[config.id]),
    isDisabled,
    // There isn't enough room in the button to fit the EC reduction and "Next:" at the same time while still
    // presenting all the information in an understandable way, so we only show it if the upgrade is maxed
    formatEffect: config.formatEffect ||
     (value => {
       const val = value;
       return value === config.maxUpgrades
         ? `Currently: ${formatX(10 - val)}`
         : `Currently: ${formatX(10 - val)} | Next: ${formatX(10 - val - 1)}`;
     }),
    formatCost: value => format(value, 2, 0),
    noLabel,
    onPurchased
  };
}

export const galaxyUpgrades = {
  dimBoostFixed: {
    id: "dimBoostFixed",
    cost: 1e80,
    description: () => `Start out each galaxy reset with ${format(4, 0, 0)} Dimension Boosts`
  },
  dimBoostGalaxy: {
    id: "dimBoostGalaxy",
    cost: 1e90,
    description: "Start out each galaxy reset with one more Dimension Boost per galaxy"
  },
  moreAM: {
    //test line
    id: "moreAM",
    cost: 1e70,
    description: () => `Start with ${format(9, 0, 0)} more antimatter`,
    effect: 10
  },
  removeMultiplier: {
    id: "removeMultiplier",
    cost: 1e100,
    description: () => `Remove the x${format(0.1, 1, 1)} multiplier for 1st Antimatter Dimensions`
  },
  decreaseDelay: {
    id: "decreaseDelay",
    cost: 1e200,
    description: () => `Decrease operation delay for far galaxies by ${formatPercents(0.2)}`
  },
  extensibility: {
    id: "extensibility",
    cost: 1e250,
    description: "Enable galaxy extensibility"
  },
  fusibility: {
    id: "fusibility",
    cost: 1e300,
    description: "Enable galaxy fusibility"
  },
  decreaseDistance: {
    id: "decreaseDistance",
    cost: DC.E500,
    description: "Decrease the minimum distance between two galaxies"
  },
  decreaseDimBoost: rebuyable({
    id: 0,
    initialCost: DC.E80,
    costIncrease: DC.E20,
    maxUpgrades: decreaseDimBoostMaxUpgrades,
    description: () => `Decrease the difference of 8th Antimatter Dimensions by ${format(1, 0, 0)} between Dimension Boosts`,
    noLabel: true,
    onPurchased: () => GameCache.tickSpeedMultDecrease.invalidate(),
    formatEffect: (value => {
      if (value === decreaseDimBoostMaxUpgrades) {
        return `Currently: ${format(decreaseDimBoostBase - value, 0, 0)}`;
      }
      return `Currently: ${format(decreaseDimBoostBase - value, 0, 0)} | Next: ${format(decreaseDimBoostBase - value - 1, 0, 0)}`;
    })
  }),
  decreaseGalaxy: rebuyable({
    id: 1,
    initialCost: DC.E120,
    costIncrease: DC.E30,
    maxUpgrades: decreaseGalaxyMaxUpgrades,
    description: () => `Decrease the difference of 8th Antimatter Dimensions by ${format(1, 0, 0)} between Galaxies`,
    noLabel: true,
    onPurchased: () => GameCache.tickSpeedMultDecrease.invalidate(),
    formatEffect: (value => {
      if (value === decreaseGalaxyMaxUpgrades) {
        return `Currently: ${format(decreaseGalaxyBase - value, 0, 0)}`;
      }
      return `Currently: ${format(decreaseGalaxyBase - value, 0, 0)} | Next: ${format(decreaseGalaxyBase - value - 1, 0, 0)}`;
    })
  }),
  increaseLy: rebuyable({
    id: 2,
    initialCost: DC.E150,
    costIncrease: DC.E50,
    description: () => `Increase the near galaxy lightyear limit by ${format(2e6, 0, 0)} Ly`,
    noLabel: true,
    onPurchased: () => GameCache.dimensionMultDecrease.invalidate(),
    formatEffect: (value => {
      return `Currently: ${format((increaseLyBase + (value * 2)) * 1e6, 3, 3)} Ly | Next: ${format((increaseLyBase + ((value + 1) * 2)) * 1e6, 3, 3)} Ly`;
    })
  }),
  extendUniverse: rebuyable({
    id: 3,
    initialCost: DC.E225,
    costIncrease: DC.E75,
    description: () => `Extend the observable universe by ${format(5e6, 0, 0)} Ly`,
    noLabel: true,
    onPurchased: () => GameCache.dimensionMultDecrease.invalidate(),
    formatEffect: (value => {
      return `Currently: ${format((extendUniverseBase + (value * 5)) * 1e6, 3, 3)} Ly | Next: ${format((extendUniverseBase + ((value + 1) * 5)) * 1e6, 3, 3)} Ly`;
    })
  })
};
