<script>
import { DC } from "@/core/constants";


export const COLORS = {
  CHALLENGE_RED: "#DF5050",
  ETERNITY_VIOLET: "#B341E0",
  DILATION_GREEN: "#64DD17",
  LAITELA_DARK: "#302D38",
  TESSERACT_WHITE: "#FFFFFF",
  DOOMED_BLUE: "#179A9B",
  DOOMED_RED: "#CA003B",
  INFINITY_BROWN: "#B67F33",
  REALITY_GREEN: "#0A790C",
  GALACTIC_VIOLET: "#6F277D"
};

export default {
  name: "AntimatterDimensionProgressBar",
  data() {
    return {
      fill: 0,
      tooltip: "",
      displayPercents: "",
      color: COLORS.REALITY_GREEN
    };
  },
  computed: {
    progressBarStyle() {
      return {
        width: `${(this.fill * 100).toFixed(2)}%`,
        backgroundColor: this.color
      };
    }
  },
  methods: {
    // eslint-disable-next-line complexity
    update() {
      this.displayPercents = formatPercents(this.fill, 2);
      const setProgress = (current, goal, tooltip, color) => {
        this.fill = Math.clampMax(current.pLog10() / Decimal.log10(goal), 1);
        this.tooltip = tooltip;
        this.color = color;
      };
      const setLinearProgress = (current, goal, tooltip, color) => {
        this.fill = Math.clampMax(current / goal, 1);
        this.tooltip = tooltip;
        this.color = color;
      };

      // Goals for challenges and challenge-like runs should come first because numbers will always be much smaller
      // than normal and therefore default filling won't be meaningful. Since challenges get completed or abandoned from
      // the inside outwards, we show the goals in that priority as well. It only makes sense to check cel6 and not the
      // others because pre-cel3 completion it'll default to e4000 and cel4/5 don't have meaningful single goals
      const inSpecialRun = Player.isInAntimatterChallenge || EternityChallenge.isRunning || player.dilation.active ||
        Laitela.isRunning;
      if (inSpecialRun) {
        if (Player.isInAntimatterChallenge) {
          let color = COLORS.CHALLENGE_RED;
          if (Player.antimatterChallenge.goal.exponent >= 309){
            color = COLORS.INFINITY_BROWN;
          }
          setProgress(Currency.antimatter.value, Player.antimatterChallenge.goal, "Percentage to Challenge goal", color);
        } else if (EternityChallenge.isRunning) {
          if (Perk.studyECBulk.isBought) {
            // Note: If the EC is fully complete, this prop doesn't exist
            const goal = EternityChallenge.current.gainedCompletionStatus.nextGoalAt;
            if (goal) {
              setProgress(Currency.infinityPoints.value, goal, "Percentage to next Challenge completion", COLORS.ETERNITY_VIOLET);
            } else {
              // In a fully completed EC, there's nothing useful we can show so we just pin it at 100% and say so
              setProgress(Currency.infinityPoints.value, 10, "This Challenge is already fully completed!", COLORS.ETERNITY_VIOLET);
            }
          } else {
            setProgress(Currency.infinityPoints.value, Player.eternityGoal, "Percentage to Eternity Challenge goal", COLORS.ETERNITY_VIOLET);
          }
        } else if (player.dilation.active) {
          if (player.dilation.lastEP.gt(0)) {
            setProgress(Currency.antimatter.value, getTachyonReq(), "Percentage to gain more TP in Dilation", COLORS.DILATION_GREEN);
          } else {
            setProgress(Currency.infinityPoints.value, Player.eternityGoal, "Percentage to Eternity in Dilation", COLORS.DILATION_GREEN);
          }
        } else {
          // Lai'tela destabilization; since the progress bar is logarithmically-scaled, we need to pow10 the arguments
          setProgress(Decimal.pow10(player.celestials.laitela.entropy), 10, "Percentage to Destabilized Reality", COLORS.LAITELA_DARK);
        }
      } else if (Pelle.isDoomed) {
        if (PelleRifts.recursion.milestones[2].canBeApplied || GalaxyGenerator.spentGalaxies > 0) {
          setProgress(Currency.infinityPoints.value, Tesseracts.nextCost, "Percentage to next Tesseract", COLORS.TESSERACT_WHITE);
        } else if (PelleStrikes.dilation.hasStrike) {
          setProgress(Currency.eternityPoints.value, DC.E4000, "Percentage to Galaxy Generator", COLORS.DOOMED_BLUE);
        } else if (PelleStrikes.ECs.hasStrike) {
          setLinearProgress(
            (Math.min(Currency.timeTheorems.max.toNumber() / 12900, 1) +
            Math.min(EternityChallenges.completions / 60, 1)) / 2,
            1, "Percentage to fifth Strike", COLORS.DOOMED_RED);
        } else if (PelleStrikes.eternity.hasStrike) {
          setLinearProgress(Currency.timeTheorems.max.toNumber(), 115, "Percentage to fourth Strike", COLORS.DOOMED_RED);
        } else if (PelleStrikes.powerGalaxies.hasStrike) {
          setProgress(Currency.infinityPoints.value, Player.eternityGoal, "Percentage to third Strike", COLORS.DOOMED_RED);
        } else if (PelleStrikes.infinity.hasStrike) {
          if (player.break) {
            setProgress(Currency.infinityPoints.value, 5e11, "Percentage to second Strike", COLORS.DOOMED_RED);
          } else {
            setProgress(Currency.antimatter.value, Decimal.NUMBER_MAX_VALUE, "Percentage to Infinity", COLORS.INFINITY_BROWN);
          }
        } else if (player.intergalactic) {
          setProgress(Currency.antimatter.value, Decimal.NUMBER_MAX_VALUE, "Percentage to first Strike", COLORS.DOOMED_RED);
        } else {
          setProgress(Currency.antimatter.value, DC.E70, "Percentage till intergalactic", COLORS.GALACTIC_VIOLET);
        }
      } else if (Enslaved.isCompleted) {
        // Show all other goals from the top down, starting at features in the highest prestige layer
        setProgress(Currency.infinityPoints.value, Tesseracts.nextCost, "Percentage to next Tesseract", COLORS.TESSERACT_WHITE);
      } else if (PlayerProgress.dilationUnlocked()) {
        setProgress(Currency.eternityPoints.value, DC.E4000, "Percentage to Reality", COLORS.REALITY_GREEN);
      } else if (InfinityDimension(8).isUnlocked) {
        setProgress(Currency.infinityPoints.value, Player.eternityGoal, "Percentage to Eternity", COLORS.ETERNITY_VIOLET);
      } else if (player.break) {
        const text = `Percentage to unlock a new ${InfinityDimensions.next().hasIPUnlock
          ? "type of Dimension"
          : "Infinity Dimension"}`;
        const nextID = InfinityDimensions.next();
        if (nextID.ipRequirementReached) {
          setProgress(player.records.thisEternity.maxAM, nextID.amRequirement, text, COLORS.INFINITY_BROWN);
        } else {
          setProgress(player.infinityPoints, nextID.ipRequirement, text, COLORS.INFINITY_BROWN);
        }
      } else if (player.intergalactic) {
        setProgress(Currency.antimatter.value, Decimal.NUMBER_MAX_VALUE, "Percentage to Infinity", COLORS.INFINITY_BROWN);
      } else {
        setProgress(Currency.antimatter.value, DC.E70, "Percentage till intergalactic", COLORS.GALACTIC_VIOLET);
      }
    }
  }
};
</script>

<template>
  <div class="c-progress-bar">
    <div
      :style="progressBarStyle"
      class="c-progress-bar__fill"
    >
      <span
        v-tooltip="tooltip"
        class="c-progress-bar__percents"
      >
        {{ displayPercents }}
      </span>
    </div>
  </div>
</template>
