<script>
import { BreakInfinityUpgrade } from "@/core/break-infinity-upgrades";
import AutobuyerToggles from "./AutobuyerToggles";
import BigCrunchAutobuyerBox from "./BigCrunchAutobuyerBox";
import DimensionAutobuyerBox from "./DimensionAutobuyerBox";
import DimensionBoostAutobuyerBox from "./DimensionBoostAutobuyerBox";
import EternityAutobuyerBox from "./EternityAutobuyerBox";
import GalaxyAutobuyerBox from "./GalaxyAutobuyerBox";
import OpenModalHotkeysButton from "@/components/OpenModalHotkeysButton";
import RealityAutobuyerBox from "./RealityAutobuyerBox";
import SimpleAutobuyersMultiBox from "./SimpleAutobuyersMultiBox";
import TickspeedAutobuyerBox from "./TickspeedAutobuyerBox";

export default {
  name: "AutobuyersTab",
  components: {
    AutobuyerToggles,
    OpenModalHotkeysButton,
    RealityAutobuyerBox,
    EternityAutobuyerBox,
    BigCrunchAutobuyerBox,
    GalaxyAutobuyerBox,
    DimensionBoostAutobuyerBox,
    TickspeedAutobuyerBox,
    DimensionAutobuyerBox,
    SimpleAutobuyersMultiBox
  },
  data() {
    return {
      hasInfinity: false,
      hasContinuum: false,
      displayADAutobuyersIndividually: false,
      hasInstant: false,
      gearScore: new Decimal(1),
      hasIntervalUpgrade: false
    };
  },
  computed: {
    // It only makes sense to show this if the player has seen gamespeed-altering effects, but we should keep it there
    // permanently as soon as they have
    hasSeenGamespeedAlteringEffects() {
      return PlayerProgress.seenAlteredSpeed();
    },
    gameTickLength() {
      return `${formatInt(player.options.updateRate)} ms`;
    }
  },
  methods: {
    update() {
      this.hasInfinity = PlayerProgress.infinityUnlocked();
      this.hasContinuum = Laitela.continuumActive;
      this.checkADAutoStatus();
      this.hasIntervalUpgrade = BreakInfinityUpgrade.autobuyerSpeed.isBought;
      //if (player.gears.amBought > 0 || player.gears.ipBought > 0 || player.gears.epBought > 0 || player.gears.rmBought > 0/* || player.gears.simBought > 0*/) {
        this.gearScore = Decimal.pow(new Decimal(1.1), player.gears.score);
        //GameUI.update();
      //}
    },
    checkADAutoStatus() {
      const ad = Autobuyer.antimatterDimension;
      // Since you don't need to buy autobuyers in Doomed and unbought ones are hidden, we can check if only the
      // autobuyers you can see (ie, have unlocked) have been maxed.
      if (Pelle.isDoomed) {
        this.displayADAutobuyersIndividually = !ad.zeroIndexed.filter(x => x.isUnlocked)
          .every(x => x.hasUnlimitedBulk && x.hasMaxedInterval);
        return;
      }
      this.hasInstant = ad.hasInstant;
      this.displayADAutobuyersIndividually = !ad.collapseDisplay;
    },
  }
};
</script>

<template>
  <div class="l-autobuyers-tab">
    <AutobuyerToggles />
    <OpenModalHotkeysButton />
    <div v-if="hasSeenGamespeedAlteringEffects">
      Autobuyer intervals and time-based settings are always <b>real time</b> and therefore
      <br>
      unaffected by anything which may alter how fast the game itself is running.
      <br>
      <br>
    </div>
    <b>Autobuyers with no displayed bulk have unlimited bulk by default.</b>
    <b>Antimatter Dimension Autobuyers can have their bulk upgraded once interval is below {{ ((gearScore.toNumber() > 1) ? format(100 / gearScore.toNumber() / (hasIntervalUpgrade ? 2 : 1), 0, 3) : (hasIntervalUpgrade ? formatInt(50) : formatInt(100))) }} ms.</b>
    <b v-if="hasInstant">Autobuyers with "Instant" interval will trigger every game tick ({{ gameTickLength }}).</b>
    <b v-if="gearScore.toNumber() > 1">Intervals are divided by the current gear score unless they are instant.</b>
    <RealityAutobuyerBox class="c-reality-pos" />
    <EternityAutobuyerBox class="c-eternity-pos" />
    <BigCrunchAutobuyerBox class="c-infinity-pos" />
    <GalaxyAutobuyerBox />
    <DimensionBoostAutobuyerBox />
    <TickspeedAutobuyerBox v-if="!hasContinuum" />
    <template v-if="displayADAutobuyersIndividually">
      <DimensionAutobuyerBox
        v-for="tier in 8"
        :key="tier"
        :tier="tier"
      />
    </template>
    <SimpleAutobuyersMultiBox />
  </div>
</template>

<style scoped>
/* This is necessary for the ExpandingControlBox within these components to render in the right stacking order
when they're open. It looks slightly hacky but actually can't be done any other way; each AutobuyerBox creates
its own stacking context, which means that all z-indices specified within are essentially scoped and the
AutobuyerBox components will always render in page order regardless of internal z-indices without these. */
.c-reality-pos {
  z-index: 3;
}

.c-eternity-pos {
  z-index: 2;
}

.c-infinity-pos {
  z-index: 1;
}
</style>
