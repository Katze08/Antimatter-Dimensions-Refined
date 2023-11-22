<script>
export default {
  name: "IntergalacticButton",
  data() {
    return {
      isIntergalactic: false,
      isUnlocked: false
    };
  },
  computed: {
    classObject() {
      return {
        "o-infinity-upgrade-btn": true,
        "o-infinity-upgrade-btn--color-2": true,
        "o-infinity-upgrade-btn--available": this.isUnlocked,
        "o-infinity-upgrade-btn--unavailable": !this.isUnlocked,
        "o-infinity-upgrade-btn--unclickable": this.isIntergalactic,
      };
    },
    tooltip() {
      return undefined;
    },
    text() {
      return this.isIntergalactic ? "ALREADY INTERGALACTIC" : "BECOME INTERGALACTIC";
    }
  },
  methods: {
    update() {
      this.isIntergalactic = player.intergalactic;
      this.isUnlocked = (((player.antimatter.exponent >= 70) && (player.dimensionBoosts >= 4)) || player.intergalactic);
    },
    clicked() {
      if (!this.isIntergalactic && this.isUnlocked) Modal.intergalactic.show();
    }
  }
};
</script>

<template>
  <button
    v-tooltip="tooltip"
    :class="classObject"
    @click="clicked"
  >
    {{ text }}
  </button>
</template>

<style scoped>

</style>
