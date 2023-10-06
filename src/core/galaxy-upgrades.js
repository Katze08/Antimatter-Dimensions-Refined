import { RebuyableMechanicState, SetPurchasableMechanicState } from "./game-mechanics";

export class GalaxyUpgradeState extends SetPurchasableMechanicState {
  get currency() {
    return Currency.antimatter;
  }

  get set() {
    return player.galaxyUpgrades;
  }

  // Method onPurchased()
}

class RebuyableGalaxyUpgradeState extends RebuyableMechanicState {
  get currency() {
    return Currency.antimatter;
  }

  get boughtAmount() {
    return player.galaxyRebuyables[this.id];
  }

  set boughtAmount(value) {
    player.galaxyRebuyables[this.id] = value;
  }

  get isCapped() {
    return this.boughtAmount === this.config.maxUpgrades;
  }

  onPurchased() {
    this.config.onPurchased?.();
  }
}

export const GalaxyUpgrade = mapGameDataToObject(
  GameDatabase.galaxy.galaxyUpgrades,
  config => (config.rebuyable
    ? new RebuyableGalaxyUpgradeState(config)
    : new GalaxyUpgradeState(config))
);
