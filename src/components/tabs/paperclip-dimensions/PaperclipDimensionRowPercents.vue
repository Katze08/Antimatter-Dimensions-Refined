<script>

export default {
  name: "PaperclipDimensionRowPercents",
  props: {
    cost: {
      type: Decimal,
      required: true
    }
  },
  data() {
    return {
      tooltip: "",
      displayPercents: ""
    };
  },
  methods: {
    // eslint-disable-next-line complexity
    update() {
      this.displayPercents = (formatPercents(this.fill, 2) === "Infinite%") ? "" : formatPercents(this.fill, 2);
      const setProgress = (current, goal, tooltip) => {
        this.fill = Math.clampMax(current.pLog10() / Decimal.log10(goal), 1);
        this.tooltip = tooltip;
      };
      setProgress(Currency.antimatter.value, this.$props.cost, "Percentage to buy more");
    }
  }
};
</script>

<template>
  <div>
    <span
      v-tooltip="tooltip"
      class="dimensions-percents"
    >
      {{ displayPercents }}
    </span>
  </div>
</template>
