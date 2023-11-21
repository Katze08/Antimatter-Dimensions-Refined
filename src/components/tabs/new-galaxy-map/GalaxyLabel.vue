<script>
import PrimaryButton from "@/components/PrimaryButton";
import { GalaxyNetwork } from "./GalaxyMapTab";

export default {
  name: "GalaxyLabel",
  components: {
    PrimaryButton
  },
  data() {
    return {
      pp: 0,
      amBoughtGalaxies: 0,
      treeLayout: 0,
      physicsEnabled: false,
      physicsOverride: false,
      isIntergalactic: false,
      replicantiGalaxies: 0,
      tachyonGalaxies: 0,
      generatedGalaxies: 0,
      totalGalaxyPower: 0.0
    };
  },
  methods: {
    update() {
      this.pp = Currency.galaxies.value;
      this.amBoughtGalaxies = player.antimatterGalaxiesBought;
      this.isIntergalactic = player.intergalactic;
      this.replicantiGalaxies = player.replicanti.galaxies;
      this.tachyonGalaxies = player.dilation.totalTachyonGalaxies;
      this.generatedGalaxies = player.celestials.pelle.galaxyGenerator.generatedGalaxies;
      this.totalGalaxyPower = Currency.galaxies.value + this.replicantiGalaxies + this.tachyonGalaxies + this.generatedGalaxies;
    },
    centerTree() {
      GalaxyNetwork.resetPosition(true);
    },
    straightenEdges() {
      GalaxyNetwork.setEdgeCurve(false);
      GalaxyNetwork.setEdgeCurve(true);
    },
    cycleLayout() {
      // Step forward once, but if this lands us on a locked layout, keep stepping until it doesn't
      let newIndex = 1 % MapLayout.length;
      while (!(MapLayout[newIndex].isUnlocked?.() ?? true)) {
        newIndex = (newIndex + 1) % MapLayout.length;
      }

      this.treeLayout = newIndex;
      this.physicsOverride = MapLayout[this.treeLayout].forcePhysics;
      GalaxyNetwork.currentLayout = MapLayout[this.treeLayout];
      GalaxyNetwork.setPhysics(false);
      GalaxyNetwork.moveToDefaultLayoutPositions(this.treeLayout);
    }
  }
};
</script>

<template>
  <div class="c-perk-tab__header">
    You have <span class="c-perk-tab__perk-points">{{ amBoughtGalaxies }}</span> <span v-if="replicantiGalaxies > 0">Antimatter </span>{{ pluralize("Galaxy", pp) }} with a summed up galaxy power of <span class="c-perk-tab__perk-points">×{{ format(pp, 2, 3) }}</span>.
    <br>
    <span v-if="replicantiGalaxies > 0">You also have <span class="c-perk-tab__perk-points">{{ replicantiGalaxies }}</span> Replicanti {{ pluralize("Galaxy", replicantiGalaxies) }}<span v-if="tachyonGalaxies > 0">, <span class="c-perk-tab__perk-points">{{ tachyonGalaxies }}</span> Tachyon {{ pluralize("Galaxy", tachyonGalaxies) }}</span><span v-if="generatedGalaxies > 0">, and <span class="c-perk-tab__perk-points">{{ generatedGalaxies }}</span> generated {{ pluralize("Galaxy", generatedGalaxies) }} by the Galaxy Generator</span>. Resulting total galaxy power: <span class="c-perk-tab__perk-points">×{{ format(totalGalaxyPower, 2, 3) }}</span></span>
    <br v-if="replicantiGalaxies > 0">
    Hover over a galaxy to see its details. Click on it to buy it. The further out the galaxy is from the center,
    <br>
    the higher the delay (NYI). The bigger the galaxy, the bigger the galaxy power and requirement. Intergalactic upgrades can modify
    <br>
    the minimum distance between two galaxies, the size of the observable universe and the near galaxy limit (NYI).
    <br>
    They can also unlock galaxy extensibility and fusibility, mechanics that make galaxies even more powerful (NYI).
    <br>
    Extensibility can increase the size of galaxies and therefore it's buff (NYI). Fusibility makes two galaxies
    <br>
    collide with each other, drastically increasing their total buff and unleashing an enormous power boost for a short time (NYI).
    <br>
    <span v-if="isIntergalactic === false">You need to be intergalactic in order to buy galaxies.</span>
    <br v-if="isIntergalactic === false">
    <div class="perk-settings">
      <PrimaryButton
        class="o-primary-btn"
        @click="centerTree"
      >
        Center map at X: {{format(0)}} ly; Y: {{format(0)}} ly
      </PrimaryButton>
    </div>
  </div>
</template>

<style scoped>
.perk-settings > button {
  margin-right: 1rem;
}

.c-button-perk-layout {
  width: 30rem;
  margin-bottom: 1rem;
}

.c-button-physics {
  width: 27rem;
  margin-bottom: 1rem;
}
</style>
