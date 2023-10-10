<script>
import { GalaxyUpgrade } from "@/core/galaxy-upgrades";
import IntergalacticButton from "./IntergalacticButton";
import GalaxyUpgradeButton from "@/components/GalaxyUpgradeButton";

export default {
  name: "GalaxyTab",
  components: {
    IntergalacticButton,
    GalaxyUpgradeButton
  },
  data() {
    return {
      isUnlocked: false
    };
  },
  computed: {
    grid() {
      return [
        [
          GalaxyUpgrade.unlockChallenges,
          GalaxyUpgrade.dimBoostGalaxy,
          GalaxyUpgrade.decreaseDimBoost
        ],
        [
          GalaxyUpgrade.moreAM,
          GalaxyUpgrade.removeMultiplier,
          GalaxyUpgrade.increase8AD
        ],
        [
          GalaxyUpgrade.decreaseDelay,
          GalaxyUpgrade.decreaseDistance,
          GalaxyUpgrade.increaseLy
        ],
        [
          GalaxyUpgrade.extensibility,
          GalaxyUpgrade.fusibility,
          GalaxyUpgrade.extendUniverse
        ]
      ];
    }
  },
  methods: {
    update() {
      this.isUnlocked = ((player.antimatter.exponent >= 70) || player.intergalactic);
    },
    btnClassObject(upgrade) {
      return {
        "l-infinity-upgrade-grid__cell": true,
        "o-infinity-upgrade-btn--multiplier": parseInt(upgrade.id, 10) + 1
      };
    },
    timeDisplayShort(time) {
      return timeDisplayShort(time);
    }
  }
};
</script>

<template>
  <div class="l-break-infinity-tab">
    <div v-if="!isUnlocked">
      Reach
      {{ format(1e70, 2, 0) }} antimatter to become intergalactic (NYI, only the first 6 / 12 upgrades work as for now).
    </div>
    <IntergalacticButton class="l-break-infinity-tab__break-btn" />
    <div
      v-if="isUnlocked"
      class="l-break-infinity-upgrade-grid l-break-infinity-tab__grid"
    >
      <div
        v-for="(column, columnId) in grid"
        :key="columnId"
        class="l-break-infinity-upgrade-grid__row"
      >
        <GalaxyUpgradeButton
          v-for="upgrade in column"
          :key="upgrade.id"
          :upgrade="upgrade"
          :class="btnClassObject(upgrade)"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
