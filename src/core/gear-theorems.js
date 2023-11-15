import { DC } from "./constants";

/**
 * @abstract
 */
export class GearTheoremPurchaseType {
  /**
  * @abstract
  */
  get amount() { throw new NotImplementedError(); }

  /**
  * @abstract
  */
  set amount(value) { throw new NotImplementedError(); }

  add(amount) { this.amount += amount; }

  /**
  * @abstract
  */
  get currency() { throw new NotImplementedError(); }

  get cost() { return this.costBase.times(this.costIncrement.pow(this.amount)); }

  /**
   * @abstract
   */
  get costBase() { throw new NotImplementedError(); }

  /**
   * @abstract
   */
  get costIncrement() { throw new NotImplementedError(); }

  get bulkPossible() {
    return Decimal.affordGeometricSeries(this.currency.value, this.cost, this.costIncrement, 0).toNumber();
  }

  // Note: This is actually just the cost of the largest term of the geometric series. If buying EP without the
  // perk that makes them free, this will be incorrect, but the EP object already overrides this anyway
  bulkCost(amount) {
    return this.cost.times(this.costIncrement.pow(amount - 1));
  }

  purchase(bulk) {
    if (!this.canAfford) return false;
    let purchased = false;
    const amount = this.bulkPossible;
    const buyFn = cost => (this.currency.purchase(cost));
    // This will sometimes buy one too few for EP, so we just have to buy 1 after.
    if (bulk && buyFn(this.bulkCost(amount))) {
      Currency.gearTheorems.add(amount);
      this.add(amount);
      purchased = true;
    }
    if (buyFn(this.cost)) {
      Currency.gearTheorems.add(1);
      this.add(1);
      purchased = true;
    }
    if (purchased) player.requirementChecks.simulation.noPurchasedGT = false;
    return purchased;
  }

  get canAfford() {
    return this.currency.gte(this.cost) && (player.simulations > 0);
  }

  reset() {
    this.amount = 0;
  }
}

GearTheoremPurchaseType.am = new class extends GearTheoremPurchaseType {
  get amount() { return player.gears.amBought; }
  set amount(value) { player.gears.amBought = value; }

  get currency() { return Currency.antimatter; }
  get costBase() { return DC.E100000; }
  get costIncrement() { return DC.D0; }
  /*get costIncrement() {
    let str = "1e9";
    const str2 = "0";
    for (let i = 0; i <= player.gears.amBought + 3; i++) {
      str += str2;
    }
    return new Decimal(str);
  } //needs to be changed, super-exponentially*/
  get cost() {
    return this.costBase.pow(10 ** this.amount);
  }
}();

GearTheoremPurchaseType.ip = new class extends GearTheoremPurchaseType {
  get amount() { return player.gears.ipBought; }
  set amount(value) { player.gears.ipBought = value; }

  get currency() { return Currency.infinityPoints; }
  get costBase() { return DC.E1000; }
  get costIncrement() { return DC.D0; } //needs to be changed, super-exponentially
  get cost() {
    return this.costBase.pow(2 ** this.amount);
  }
}();

GearTheoremPurchaseType.ep = new class extends GearTheoremPurchaseType {
  get amount() { return player.gears.epBought; }
  set amount(value) { player.gears.epBought = value; }

  get currency() { return Currency.eternityPoints; }
  get costBase() { return DC.D1; }
  get costIncrement() { return DC.E2000; }
}();

GearTheoremPurchaseType.rm = new class extends GearTheoremPurchaseType {
  get amount() { return player.gears.rmBought; }
  set amount(value) { player.gears.rmBought = value; }

  get currency() { return Currency.realityMachines; }
  get costBase() { return DC.D1; }
  get costIncrement() { return DC.E50; }
}();

GearTheoremPurchaseType.sim = new class extends GearTheoremPurchaseType {
  get amount() { return player.gears.simBought; }
  set amount(value) { player.gears.simBought = value; }

  get currency() { return Currency.currentSimulations; }
  get costBase() { return DC.D1; }
  get costIncrement() { return DC.D2; }

  bulkCost(amount) {
    return this.costIncrement.pow(amount + this.amount).subtract(this.cost);
  }
}();

export const GearTheorems = {
  checkForBuying(auto) {
    if (PlayerProgress.simulationUnlocked()) return true;
    if (!auto) Modal.message.show(`You need to unlock Simulation.`, { closeEvent: GAME_EVENT.SIMULATION_RESET_AFTER });
    return false;
  },

  buyOne(auto = false, type) {
    if (!this.checkForBuying(auto)) return 0;
    if (!GearTheoremPurchaseType[type].purchase(false)) return 0;
    return 1;
  },

  // This is only called via automation and there's no manual use-case, so we assume auto is true and simplify a bit
  buyOneOfEach() {
    if (!this.checkForBuying(true)) return 0;
    const gtAM = this.buyOne(true, "am");
    const gtIP = this.buyOne(true, "ip");
    const gtEP = this.buyOne(true, "ep");
    const gtRM = this.buyOne(true, "rm");
    const gtSIM = this.buyOne(true, "sim");
    return gtAM + gtIP + gtEP + gtRM + gtSIM;
  },

  buyMax(auto = false) {
    if (!this.checkForBuying(auto)) return 0;
    const gtAM = GearTheoremPurchaseType.am.purchase(true);
    const gtIP = GearTheoremPurchaseType.ip.purchase(true);
    const gtEP = GearTheoremPurchaseType.ep.purchase(true);
    const gtRM = GearTheoremPurchaseType.rm.purchase(true);
    const gtSIM = GearTheoremPurchaseType.sim.purchase(true);
    return gtAM + gtIP + gtEP + gtRM + gtSIM;
  },

  totalPurchased() {
    return GearTheoremPurchaseType.am.amount +
          GearTheoremPurchaseType.ip.amount +
          GearTheoremPurchaseType.ep.amount +
          GearTheoremPurchaseType.rm.amount +
          GearTheoremPurchaseType.sim.amount;
  }
};
