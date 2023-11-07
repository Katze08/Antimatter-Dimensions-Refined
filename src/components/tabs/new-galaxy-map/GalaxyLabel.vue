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
      treeLayout: 0,
      physicsEnabled: false,
      physicsOverride: false,
    };
  },
  methods: {
    update() {
      this.pp = Math.floor(Currency.galaxies.value);
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
    You have <span class="c-perk-tab__perk-points">{{ format(pp, 2) }}</span> {{ pluralize("Galaxy", pp) }}, translated to a <span class="c-perk-tab__perk-points">×{{ format(pp, 2, 3) }}</span> galaxy power.
    <br>
    Hover over a galaxy to see its details. Click on it to buy it. The further out the galaxy is from the center,
    <br>
    the higher the delay. The bigger the galaxy, the bigger the buff. Intergalactic upgrades can modify
    <br>
    the minimum distance between two galaxies, the size of the observable universe and the near galaxy limit.
    <br>
    They can also unlock galaxy extensibility and fusibility, mechanics to make galaxies even more powerful.
    <br>
    Extensibility can increase the size of galaxies and therefore it's buff. Fusibility makes two galaxies
    <br>
    collide with each other, drastically increasing their total buff and unleashing an enormous power boost for a short time.
    <br>
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
