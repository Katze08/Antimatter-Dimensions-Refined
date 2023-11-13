import { AutobuyerState } from "./autobuyer";

export class GearTheoremAutobuyerState extends AutobuyerState {
  get data() {
    return player.auto.gearTheorems;
  }

  get name() {
    return `Gear Theorem`;
  }

  get isUnlocked() {
    return false;
  }

  get hasUnlimitedBulk() {
    return false;
  }

  tick() {
    if (this.hasUnlimitedBulk) GearTheorems.buyMax(true);
    else GearTheorems.buyOneOfEach();
  }
}
