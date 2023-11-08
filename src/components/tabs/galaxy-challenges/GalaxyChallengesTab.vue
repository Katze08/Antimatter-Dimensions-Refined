<script>
import ChallengeGrid from "@/components/ChallengeGrid";
import ChallengeTabHeader from "@/components/ChallengeTabHeader";
import { GalaxyChallenges } from "@/core/galaxy-challenges";
import GalaxyChallengeBox from "./GalaxyChallengeBox";

export default {
  name: "GalaxyChallengesTab",
  components: {
    ChallengeGrid,
    ChallengeTabHeader,
    GalaxyChallengeBox
  },
  data() {
    return {
      nextGC: 0,
      showAllChallenges: false
    };
  },
  computed: {
    challenges() {
      return GalaxyChallenges.all;
    },
    nextAtDisplay() {
      const first = this.nextGC?.id === 1;
      const next = GalaxyChallenges.nextGCUnlockAM;

      if (first) return `The first Galaxy Challenge unlocks at ${format(next)} antimatter.`;
      return next === undefined
        ? "All Galaxy Challenges unlocked"
        : `Next Galaxy Challenge unlocks at ${format(next)} antimatter.`;
    }
  },
  methods: {
    update() {
      this.nextGC = GalaxyChallenges.nextGC;
      this.showAllChallenges = player.options.showAllChallenges;
    },
    isChallengeVisible(challenge) {
      return challenge.isUnlocked || (this.showAllChallenges && PlayerProgress.eternityUnlocked());
    }
  }
};
</script>

<template>
  <div class="l-challenges-tab">
    <ChallengeTabHeader />
    <div>
      <!-- this is where the Big Crunch Autobuyer text was -->
      <!-- An active Big Crunch Autobuyer will Crunch immediately when -->
      <!-- reaching an Infinity Challenge's antimatter goal, regardless of settings. -->
      Galaxy Challenges are not yet implemented. (NYI) Please be patient.
    </div>
    <!-- <div>{{ nextAtDisplay }}</div> -->
    <!-- <ChallengeGrid -->
    <!--   v-slot="{ challenge }" -->
    <!--   :challenges="challenges" -->
    <!--   :is-challenge-visible="isChallengeVisible" -->
    <!-- > -->
    <!--   <GalaxyChallengeBox :challenge="challenge" /> -->
    <!-- </ChallengeGrid> -->
  </div>
</template>

<style scoped>

</style>
