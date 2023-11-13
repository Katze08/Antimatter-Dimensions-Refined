<script>

import GearTheoremBuyButton from "@/components/tabs/automation-gears/GearTheoremBuyButton";
import { Currency } from "@/core/currency";
import { GearTheoremPurchaseType, GearTheorems } from "@/core/gear-theorems";
export default {
  name: "AutomationGearsTab",
  components: { GearTheoremBuyButton },
  data() {
    return {
      theoremAmount: new Decimal(0),
      theoremGeneration: new Decimal(0),
      totalGearTheorems: new Decimal(0),
      hasGTAutobuyer: false,
      isAutobuyerOn: false,
      budget: {
        am: new Decimal(0),
        ip: new Decimal(0),
        ep: new Decimal(0),
        rm: new Decimal(0),
        sim: new Decimal(0)
      },
      costs: {
        am: new Decimal(0),
        ip: new Decimal(0),
        ep: new Decimal(0),
        rm: new Decimal(0),
        sim: new Decimal(0)
      },
      multipliers: {
        am: new Decimal(0),
        ip: new Decimal(0),
        ep: new Decimal(0),
        rm: new Decimal(0),
        sim: new Decimal(0)
      },
      score: new Decimal(0),
      hasGTGen: false,
      showGTGen: false,
      invertGTgenDisplay: false,
      shouldDisplay: true,
    };
  },
  computed: {
    formatGearTheoremType() {
      if (this.theoremAmount.gte(1e6)) {
        return format;
      }
      return formatInt;
    },
    GTgenRateText() {
      if (this.theoremGeneration.lt(1 / 3600)) {
        return `one GT every ${TimeSpan.fromSeconds(
          this.theoremGeneration.reciprocal().toNumber()).toStringShort(false)}`;
      }
      if (this.theoremGeneration.lt(0.1)) {
        return `${format(this.theoremGeneration.times(3600), 2, 2)} GT/hour`;
      }
      return `${format(this.theoremGeneration, 2, 2)} GT/sec`;
    },
    totalGearTheoremText() {
      return `${quantify("total Gear Theorem", this.totalGearTheorems, 2, 2, this.formatGearTheoremType)}`;
    }
  },
  watch: {
    isAutobuyerOn(newValue) {
      Autobuyer.gearTheorem.isActive = newValue;
    },
    invertGTgenDisplay(newValue) {
      player.options.invertGTgenDisplay = newValue;
    },
  },
  methods: {
    formatAM(am) {
      return `${format(am)} AM`;
    },
    formatIP(ip) {
      return `${format(ip)} IP`;
    },
    formatEP(ep) {
      return `${format(ep)} EP`;
    },
    formatRM(rm) {
      return `${format(rm)} RM`;
    },
    formatSIM(sim) {
      return `${format(sim)} SIM`;
    },
    buyWithAM() {
      GearTheorems.buyOne(false, "am");
    },
    buyWithIP() {
      GearTheorems.buyOne(false, "ip");
    },
    buyWithEP() {
      GearTheorems.buyOne(false, "ep");
    },
    buyWithRM() {
      GearTheorems.buyOne(false, "rm");
    },
    buyWithSIM() {
      GearTheorems.buyOne(false, "sim");
    },
    /*setScore() {
      player.gears.score === this.score;
    },*/
    update() {
      this.theoremAmount.copyFrom(Currency.gearTheorems);
      this.totalGearTheorems.copyFrom(Currency.gearTheorems.max);
      this.hasGTAutobuyer = Autobuyer.gearTheorem.isUnlocked;
      this.isAutobuyerOn = Autobuyer.gearTheorem.isActive;
      const budget = this.budget;
      budget.am = Currency.antimatter;
      budget.ip = Currency.infinityPoints;
      budget.ep = Currency.eternityPoints;
      budget.rm = Currency.realityMachines;
      budget.sim = Currency.currentSimulations;
      const costs = this.costs;
      costs.am = GearTheoremPurchaseType.am.cost;
      costs.ip = GearTheoremPurchaseType.ip.cost;
      costs.ep = GearTheoremPurchaseType.ep.cost;
      costs.rm = GearTheoremPurchaseType.rm.cost;
      costs.sim = GearTheoremPurchaseType.sim.cost;
      const multipliers = this.multipliers;
      multipliers.am = Decimal.pow(new Decimal(1.1), player.gears.amBought);
      multipliers.ip = Decimal.pow(new Decimal(1.1), player.gears.ipBought);
      multipliers.ep = Decimal.pow(new Decimal(1.1), player.gears.epBought);
      multipliers.rm = Decimal.pow(new Decimal(1.1), player.gears.rmBought);
      multipliers.sim = Decimal.pow(new Decimal(1.1), player.gears.simBought);
      this.score = Decimal.multiply(multipliers.am, Decimal.multiply(multipliers.ip, Decimal.multiply(multipliers.ep, Decimal.multiply(multipliers.rm, multipliers.sim))));
      //this.setScore();
      this.hasGTGen = this.theoremGeneration.gt(0);
      this.showGTGen = this.hasGTGen && (ui.view.shiftDown === this.invertGTgenDisplay);
      this.invertGTgenDisplay = player.options.invertGTgenDisplay;
    }
  }
};
</script>

<template>
  <div>
    <h3>Each upgrade multiplies its multiplier by {{ formatX(1.1, 0, 2) }}.</h3>
    <p class="antimatter-gear">
      <i class='fas fa-cog'></i> Upgrade Ω:
      <GearTheoremBuyButton
        :budget="budget.am"
        :cost="costs.am"
        :format-cost="formatAM"
        :action="buyWithAM"
      />
      {{ formatX(multipliers.am, 3, 2) }}
    </p>
    <p class="infinity-gear">
      <i class='fas fa-cog'></i> Upgrade ∞:
      <GearTheoremBuyButton
        :budget="budget.ip"
        :cost="costs.ip"
        :format-cost="formatIP"
        :action="buyWithIP"
      />
      {{ formatX(multipliers.ip, 3, 2) }}
    </p>
    <p class="eternity-gear">
      <i class='fas fa-cog'></i> Upgrade Δ:
      <GearTheoremBuyButton
        :budget="budget.ep"
        :cost="costs.ep"
        :format-cost="formatEP"
        :action="buyWithEP"
      />
      {{ formatX(multipliers.ep, 3, 2) }}
    </p>
    <p class="reality-gear">
      <i class='fas fa-cog'></i> Upgrade Ϟ:
      <GearTheoremBuyButton
        :budget="budget.rm"
        :cost="costs.rm"
        :format-cost="formatRM"
        :action="buyWithRM"
      />
      {{ formatX(multipliers.rm, 3, 2) }}
    </p>
    <p class="simulation-gear">
      <i class='fas fa-cog'></i> Upgrade <i class='fas fa-desktop'></i>:
      <GearTheoremBuyButton
        :budget="budget.sim"
        :cost="costs.sim"
        :format-cost="formatSIM"
        :action="buyWithSIM"
      />
      {{ formatX(multipliers.sim, 3, 2) }}
    </p>
    <br/>
    <h3>Total gear score: {{ format(multipliers.am, 3, 2) }} × {{ format(multipliers.ip, 3, 2) }} × {{ format(multipliers.ep, 3, 2) }} × {{ format(multipliers.rm, 3, 2) }} × {{ format(multipliers.sim, 3, 2) }} = {{ format(score, 3, 2) }}</h3>
    <h3>All autobuyer intervals are divided by the gear score. Automator speed is multiplied by the gear score.</h3>
  </div>
</template>
