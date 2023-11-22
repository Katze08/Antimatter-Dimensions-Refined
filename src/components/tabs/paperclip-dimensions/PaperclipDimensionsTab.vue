<script>
import ClassicPaperclipDimensionsTab from "./ClassicPaperclipDimensionsTab";
import ModernPaperclipDimensionsTab from "./ModernPaperclipDimensionsTab";

export default {
  name: "PaperclipDimensionsTab",
  components: {
    ClassicPaperclipDimensionsTab,
    ModernPaperclipDimensionsTab
  },
  computed: {
    activeComponent() {
      return this.$viewModel.newUI
        ? "ModernPaperclipDimensionsTab"
        : "ClassicPaperclipDimensionsTab";
    }
  },
};
</script>

<template>
  <component :is="activeComponent" />
</template>
