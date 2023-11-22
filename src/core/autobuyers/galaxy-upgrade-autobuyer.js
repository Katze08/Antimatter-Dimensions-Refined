import { GalaxyUpgrade } from "@/core/galaxy-upgrades";
import { InfinityUpgrade } from "@/core/infinity-upgrades";
import { AutobuyerState } from "./autobuyer";

export class GalaxyUpgradeAutobuyerState extends AutobuyerState {
  get name() {
    return GalaxyUpgrade(this.id).config.name;
  }

  get data() {
    if (this.id === 9) {
      return player.auto.galaxyUpgrades.all[0];
    } else if (this.id === 12) {
      return player.auto.galaxyUpgrades.all[1];
    } else {
      console.log("AutobuyerError!!!");
      return player.auto.galaxyUpgrades.all[1];
    }
  }

  get isUnlocked() {
    return InfinityUpgrade.skipResetGalaxy.isBought;
  }

  get hasUnlimitedBulk() {
    return true;
  }

  tick() {
    const upg = GalaxyUpgrade(this.id);
    while (Currency.antimatter.gte(upg.cost)) upg.purchase();
  }

  static get entryCount() { return 2; }
  static get autobuyerGroupName() { return "Galaxy Upgrade"; }
  static get isActive() { return player.auto.galaxyUpgrades.isActive; }
  static set isActive(value) { player.auto.galaxyUpgrades.isActive = value; }
}
