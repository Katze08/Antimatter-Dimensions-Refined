<script>
import ModalWrapperChoice from "@/components/modals/ModalWrapperChoice";
import { becomeIntergalactic } from "@/game";

export default {
  name: "IntergalacticModal",
  components: {
    ModalWrapperChoice
  },
  computed: {
    message() {
      return `Becoming intergalacic will allow you to possess galaxies and alternating them, like increasing their size
      or fusing them together. \n By becoming intergalactic, galaxy upgrades are unlocked.
      The cost for galaxies and galaxy upgrades depend on the distance. \n
      Becoming intergalactic costs ${format(1e70, 0, 0)} antimatter.`.split("\n");
    },
  },
  methods: {
    handleYesClick() {
      becomeIntergalactic();
    }
  },
};
</script>

<template>
  <ModalWrapperChoice
    :show-cancel="false"
    @confirm="handleYesClick"
  >
    <template #header>
      You are about to become intergalactic
    </template>
    <div class="c-modal-message__text">
      <span
        v-for="(line, index) in message"
        :key="index"
      >
        {{ line }} <br>
      </span>
    </div>
    <template #confirm-text>
      Unlock
    </template>
  </ModalWrapperChoice>
</template>
