<script>
import { AutomatorPanels } from "@/components/tabs/automator/AutomatorDocs";
import { AUTOMATOR_MODE, AUTOMATOR_TYPE } from "@/core/automator";
import { DC } from "@/core/constants";
import { GlyphTypes } from "@/core/glyph-effects";

export default {
  name: "NewGame",
  data() {
    return {
      opacity: 0,
      visible: false,
      hasMoreCosmetics: false,
      selectedSetName: "",
    };
  },
  computed: {
    style() {
      return {
        opacity: this.opacity,
        visibility: this.visible ? "visible" : "hidden",
      };
    }
  },
  methods: {
    update() {
      this.visible = GameEnd.endState > END_STATE_MARKERS.SHOW_NEW_GAME && !GameEnd.removeAdditionalEnd;
      this.opacity = (GameEnd.endState - END_STATE_MARKERS.SHOW_NEW_GAME) * 2;
      this.hasMoreCosmetics = GlyphAppearanceHandler.lockedSets.length > 0;
      this.selectedSetName = GlyphAppearanceHandler.chosenFromModal?.name ?? "None (will choose randomly)";
    },
    startNewGame() {
      //NG.startNewGame();
      player.antimatter = DC.E0;
      player.simulations++;
      player.antimatterGalaxiesBought = 0;
      player.mapGalaxies = new Set();
      player.availableMapGalaxiesCurrentInfinity = {};
      player.dimensions = {
        antimatter: Array.range(0, 8).map(() => ({
          bought: 0,
          costBumps: 0,
          amount: DC.D0
        })),
        infinity: Array.range(0, 8).map(tier => ({
          isUnlocked: false,
          bought: 0,
          amount: DC.D0,
          cost: [DC.E8, DC.E9, DC.E10, DC.E20, DC.E140, DC.E200, DC.E250, DC.E280][tier],
          baseAmount: 0
        })),
        time: Array.range(0, 8).map(tier => ({
          cost: [DC.D1, DC.D5, DC.E2, DC.E3, DC.E2350, DC.E2650, DC.E3000, DC.E3350][tier],
          amount: DC.D0,
          bought: 0
        }))
      };
      player.sacrificed = DC.E0;
      player.infinityUpgrades = new Set();
      player.galaxyUpgrades = new Set();
      player.galaxyChallengesUnlocked = false;
      player.infinityRebuyables = [0, 0, 0];
      player.galaxyRebuyables = [0, 0, 0, 0];
      player.challenge = {
        normal: {
          current: 0,
          bestTimes: Array.repeat(Number.MAX_VALUE, 11),
          completedBits: 0,
        },
        infinity: {
          current: 0,
          bestTimes: Array.repeat(Number.MAX_VALUE, 8),
          completedBits: 0,
        },
        galaxy: {
          current: 0,
          bestTimes: Array.repeat(Number.MAX_VALUE, 24),
          completedBits: 0,
        },
        eternity: {
          current: 0,
          unlocked: 0,
          requirementBits: 0,
        }
      };
      player.infinity = {
        upgradeBits: 0
      };
      player.infinityPoints = DC.D0;
      player.infinities = DC.D0;
      player.infinitiesBanked = DC.D0;
      player.dimensionBoosts = 0;
      player.galaxies = 0;
      player.chall2Pow = 1;
      player.chall3Pow = DC.D0_01;
      player.matter = DC.D1;
      player.chall9TickspeedCostBumps = 0;
      player.chall8TotalSacrifice = DC.D1;
      player.ic2Count = 0;
      player.partInfinityPoint = 0;
      player.partInfinitied = 0;
      player.break = false;
      player.intergalactic = false;
      player.unlockedGalaxyMap = false;
      player.requirementChecks = {
        infinity: {
          maxAll: false,
          noSacrifice: true,
          noAD8: true,
        },
        eternity: {
          onlyAD1: true,
          onlyAD8: true,
          noAD1: true,
          noRG: true,
        },
        reality: {
          noAM: true,
          noTriads: true,
          noPurchasedTT: true,
          noInfinities: true,
          noEternities: true,
          noContinuum: true,
          maxID1: DC.D0,
          maxStudies: 0,
          maxGlyphs: 0,
          slowestBH: 1,
        },
        permanent: {
          emojiGalaxies: 0,
          singleTickspeed: 0,
          perkTreeDragging: 0
        }
      };
      player.records.thisInfinity = {
        time: 0,
        realTime: 0,
        lastBuyTime: 0,
        maxAM: DC.D0,
        bestIPmin: DC.D0,
        bestIPminVal: DC.D0,
      };
      player.records.bestInfinity = {
        time: Number.MAX_VALUE,
        realTime: Number.MAX_VALUE,
        bestIPminEternity: DC.D0,
        bestIPminReality: DC.D0,
      };
      player.records.thisEternity = {
        time: 0,
        realTime: 0,
        maxAM: DC.D0,
        maxIP: DC.D0,
        bestIPMsWithoutMaxAll: DC.D0,
        bestEPmin: DC.D0,
        bestEPminVal: DC.D0,
        bestInfinitiesPerMs: DC.D0,
      };
      player.records.bestEternity = {
        time: Number.MAX_VALUE,
        realTime: Number.MAX_VALUE,
        bestEPminReality: DC.D0,
      };
      player.records.thisReality = {
        time: 0,
        realTime: 0,
        maxAM: DC.D0,
        maxIP: DC.D0,
        maxEP: DC.D0,
        bestEternitiesPerMs: DC.D0,
        maxReplicanti: DC.D0,
        maxDT: DC.D0,
        bestRSmin: 0,
        bestRSminVal: 0,
      };
      player.records.bestReality = {
        time: Number.MAX_VALUE,
        realTime: Number.MAX_VALUE,
        glyphStrength: 0,
        RM: DC.D0,
        RMSet: [],
        RMmin: DC.D0,
        RMminSet: [],
        glyphLevel: 0,
        glyphLevelSet: [],
        bestEP: DC.D0,
        bestEPSet: [],
        speedSet: [],
        iMCapSet: [],
        laitelaSet: [],
      };
      player.speedrun.isUnlocked = true;
      player.IPMultPurchases = 0;
      player.version = 24;
      player.infinityPower = DC.D1;
      player.postC4Tier = 0;
      player.eternityPoints = DC.D0;
      player.eternities = DC.D0;
      player.eternityUpgrades = new Set();
      player.epmultUpgrades = 0;
      player.timeShards = DC.D0;
      player.totalTickGained = 0;
      player.totalTickBought = 0;
      player.replicanti = {
        unl: false,
        amount: DC.D0,
        chance: 0.01,
        chanceCost: DC.E150,
        interval: 1000,
        intervalCost: DC.E140,
        boughtGalaxyCap: 0,
        galaxies: 0,
        galCost: DC.E170,
      };
      player.timestudy = {
        theorem: DC.D0,
        maxTheorem: DC.D0,
        amBought: 0,
        ipBought: 0,
        epBought: 0,
        studies: [],
        shopMinimized: false,
        preferredPaths: [[], 0],
        presets: new Array(6).fill({
          name: "",
          studies: "",
        }),
      };
      player.eternityChalls = {};
      player.respec = false;
      player.eterc8ids = 50;
      player.eterc8repl = 40;
      player.dilation = {
        studies: [],
        active: false,
        tachyonParticles: DC.D0,
        dilatedTime: DC.D0,
        nextThreshold: DC.E3,
        baseTachyonGalaxies: 0,
        totalTachyonGalaxies: 0,
        upgrades: new Set(),
        rebuyables: {
          1: 0,
          2: 0,
          3: 0,
          11: 0,
          12: 0,
          13: 0,
        },
        lastEP: DC.DM1,
      };
      player.realities = 0;
      player.partSimulatedReality = 0;
      player.reality = {
        realityMachines: DC.D0,
        maxRM: DC.D0,
        imaginaryMachines: 0,
        iMCap: 0,
        glyphs: {
          active: [],
          inventory: [],
          sac: {
            power: 0,
            infinity: 0,
            time: 0,
            replication: 0,
            dilation: 0,
            effarig: 0,
            reality: 0
          },
          undo: [],
          sets: new Array(7).fill({
            name: "",
            glyphs: [],
          }),
          protectedRows: 2,
          filter: {
            select: AUTO_GLYPH_SCORE.LOWEST_SACRIFICE,
            trash: AUTO_GLYPH_REJECT.SACRIFICE,
            simple: 0,
            types: GlyphTypes.list
              .filter(t => ALCHEMY_BASIC_GLYPH_TYPES.includes(t.id))
              .mapToObject(t => t.id, t => ({
                rarity: 0,
                score: 0,
                effectCount: 0,
                specifiedMask: 0,
                effectScores: Array.repeat(0, t.effects.length),
              })),
          },
          createdRealityGlyph: false,
          cosmetics: {
            active: false,
            glowNotification: false,
            unlockedFromNG: [],
            symbolMap: {},
            colorMap: {},
          }
        },
        initialSeed: Math.floor(Date.now() * Math.random() + 1),
        // The seed value should get set from initialSeed upon unlocking reality, but we set it to 1 as a fallback in
        // case somehow it doesn't get set properly. Do not change this to 0, as a seed of 0 causes the game to hang
        seed: 1,
        secondGaussian: 1e6,
        musicSeed: Math.floor(Date.now() * Math.random() + 0xBCDDECCB),
        musicSecondGaussian: 1e6,
        rebuyables: {
          1: 0,
          2: 0,
          3: 0,
          4: 0,
          5: 0,
        },
        upgradeBits: 0,
        upgReqs: 0,
        imaginaryUpgradeBits: 0,
        imaginaryUpgReqs: 0,
        imaginaryRebuyables: {
          1: 0,
          2: 0,
          3: 0,
          4: 0,
          5: 0,
          6: 0,
          7: 0,
          8: 0,
          9: 0,
          10: 0,
        },
        reqLock: {
          reality: 0,
          imaginary: 0,
        },
        perks: new Set(),
        respec: false,
        showGlyphSacrifice: false,
        showSidebarPanel: GLYPH_SIDEBAR_MODE.INVENTORY_MANAGEMENT,
        autoSort: 0,
        autoCollapse: false,
        autoAutoClean: false,
        applyFilterToPurge: false,
        moveGlyphsOnProtection: false,
        perkPoints: 0,
        unlockedEC: 0,
        autoEC: true,
        lastAutoEC: 0,
        partEternitied: DC.D0,
        autoAchieve: true,
        gainedAutoAchievements: true,
        automator: {
          state: {
            mode: AUTOMATOR_MODE.STOP,
            topLevelScript: 0,
            editorScript: 0,
            repeat: true,
            forceRestart: true,
            followExecution: true,
            stack: [],
          },
          scripts: {
          },
          constants: {},
          constantSortOrder: [],
          execTimer: 0,
          type: AUTOMATOR_TYPE.TEXT,
          forceUnlock: false,
          currentInfoPane: AutomatorPanels.INTRO_PAGE,
        },
        achTimer: 0,
        hasCheckedFilter: false,
      };
      player.blackHole = Array.range(0, 2).map(id => ({
        id,
        intervalUpgrades: 0,
        powerUpgrades: 0,
        durationUpgrades: 0,
        phase: 0,
        active: false,
        unlocked: false,
        activations: 0,
      }));
      player.blackHolePause = false;
      player.blackHoleAutoPauseMode = 0;
      player.blackHolePauseTime = 0;
      player.blackHoleNegative = 1;
      player.celestials = {
        teresa: {
          pouredAmount: 0,
          quoteBits: 0,
          unlockBits: 0,
          run: false,
          bestRunAM: DC.D1,
          bestAMSet: [],
          perkShop: Array.repeat(0, 5),
          lastRepeatedMachines: DC.D0
        },
        effarig: {
          relicShards: 0,
          unlockBits: 0,
          run: false,
          quoteBits: 0,
          glyphWeights: {
            ep: 25,
            repl: 25,
            dt: 25,
            eternities: 25
          },
          autoAdjustGlyphWeights: false,
        },
        enslaved: {
          isStoring: false,
          stored: 0,
          isStoringReal: false,
          storedReal: 0,
          autoStoreReal: false,
          isAutoReleasing: false,
          quoteBits: 0,
          unlocks: [],
          run: false,
          completed: false,
          tesseracts: 0,
          hasSecretStudy: false,
          feltEternity: false,
          progressBits: 0,
          hintBits: 0,
          hintUnlockProgress: 0,
          glyphHintsGiven: 0,
          zeroHintTime: 0
        },
        v: {
          unlockBits: 0,
          run: false,
          quoteBits: 0,
          runUnlocks: [0, 0, 0, 0, 0, 0, 0, 0, 0],
          goalReductionSteps: [0, 0, 0, 0, 0, 0, 0, 0, 0],
          STSpent: 0,
          runGlyphs: [[], [], [], [], [], [], [], [], []],
          // The -10 is for glyph count, as glyph count for V is stored internally as a negative number
          runRecords: [-10, 0, 0, 0, 0, 0, 0, 0, 0],
          wantsFlipped: true,
        },
        ra: {
          pets: {
            teresa: {
              level: 1,
              memories: 0,
              memoryChunks: 0,
              memoryUpgrades: 0,
              chunkUpgrades: 0
            },
            effarig: {
              level: 1,
              memories: 0,
              memoryChunks: 0,
              memoryUpgrades: 0,
              chunkUpgrades: 0
            },
            enslaved: {
              level: 1,
              memories: 0,
              memoryChunks: 0,
              memoryUpgrades: 0,
              chunkUpgrades: 0
            },
            v: {
              level: 1,
              memories: 0,
              memoryChunks: 0,
              memoryUpgrades: 0,
              chunkUpgrades: 0
            }
          },
          alchemy: Array.repeat(0, 21)
            .map(() => ({
              amount: 0,
              reaction: false
            })),
          highestRefinementValue: {
            power: 0,
            infinity: 0,
            time: 0,
            replication: 0,
            dilation: 0,
            effarig: 0
          },
          quoteBits: 0,
          momentumTime: 0,
          unlockBits: 0,
          run: false,
          charged: new Set(),
          disCharge: false,
          peakGamespeed: 1,
          petWithRemembrance: ""
        },
        laitela: {
          darkMatter: DC.D0,
          maxDarkMatter: DC.D0,
          run: false,
          quoteBits: 0,
          dimensions: Array.range(0, 4).map(() =>
            ({
              amount: DC.D0,
              intervalUpgrades: 0,
              powerDMUpgrades: 0,
              powerDEUpgrades: 0,
              timeSinceLastUpdate: 0,
              ascensionCount: 0
            })),
          entropy: 0,
          thisCompletion: 3600,
          fastestCompletion: 3600,
          difficultyTier: 0,
          upgrades: {},
          darkMatterMult: 1,
          darkEnergy: 0,
          singularitySorting: {
            displayResource: 0,
            sortResource: 0,
            showCompleted: 0,
            sortOrder: 0,
          },
          singularities: 0,
          singularityCapIncreases: 0,
          lastCheckedMilestones: 0,
          milestoneGlow: true,
        },
        pelle: {
          doomed: false,
          upgrades: new Set(),
          remnants: 0,
          realityShards: DC.D0,
          records: {
            totalAntimatter: DC.D0,
            totalInfinityPoints: DC.D0,
            totalEternityPoints: DC.D0,
          },
          rebuyables: {
            antimatterDimensionMult: 0,
            timeSpeedMult: 0,
            glyphLevels: 0,
            infConversion: 0,
            galaxyPower: 0,
            galaxyGeneratorAdditive: 0,
            galaxyGeneratorMultiplicative: 0,
            galaxyGeneratorAntimatterMult: 0,
            galaxyGeneratorIPMult: 0,
            galaxyGeneratorEPMult: 0,
          },
          rifts: {
            vacuum: {
              fill: DC.D0,
              active: false,
              reducedTo: 1
            },
            decay: {
              fill: DC.D0,
              active: false,
              percentageSpent: 0,
              reducedTo: 1
            },
            chaos: {
              fill: 0,
              active: false,
              reducedTo: 1
            },
            recursion: {
              fill: DC.D0,
              active: false,
              reducedTo: 1
            },
            paradox: {
              fill: DC.D0,
              active: false,
              reducedTo: 1
            }
          },
          progressBits: 0,
          galaxyGenerator: {
            unlocked: false,
            spentGalaxies: 0,
            generatedGalaxies: 0,
            phase: 0,
            sacrificeActive: false
          },
          quoteBits: 0,
          collapsed: {
            upgrades: false,
            rifts: false,
            galaxies: false
          },
          showBought: false,
        }
      };
      player.isGameEnd = false;
    },
    openSelectionModal() {
      Modal.cosmeticSetChoice.show();
    }
  }
};
</script>

<template>
  <div
    class="c-new-game-container"
    :style="style"
  >
    <h2>
      TURNS OUT IT WAS ALL A SIMULATION.
    </h2>
    <h3>You can use the button in the top-right to have a final look at your simulation.</h3>
    <div class="c-new-game-button-container">
      <button
        class="c-new-game-button"
        @click="startNewGame"
      >
        Start a new simulation
      </button>
    </div>
    <br>
    <h3 v-if="hasMoreCosmetics">
      For completing the simulation, you also unlock a new cosmetic set of your choice for Glyphs. These are freely
      modifiable once you reach Reality again, but are purely visual and offer no gameplay bonuses.
      <br>
      <button
        class="c-glyph-new-game-button"
        @click="openSelectionModal"
      >
        Choose Cosmetic Set
      </button>
      <br>
      <br>
      Selected Set: {{ selectedSetName }}
    </h3>
    <h3 v-else>
      You have unlocked all Glyph cosmetic sets!
    </h3>
    <br>
    <h3>
      You can also import "speedrun" to start a special simulation with additional tracking for speedrunning purposes.
    </h3>
  </div>
</template>

<style scoped>
.c-new-game-container {
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 9;
  justify-content: center;
  align-items: center;
  transform: translate(-50%, -50%);
  pointer-events: auto;
}

.t-s12 .c-new-game-container {
  color: white;
}

.c-new-game-button-container {
  display: flex;
  flex-direction: column;
  align-items: stretch;
}

.c-new-game-button {
  font-family: Typewriter;
  background: red;
  border: black;
  border-radius: var(--var-border-radius, 0.5rem);
  margin-top: 1rem;
  padding: 1rem;
  cursor: pointer;
}

.c-glyph-new-game-button{
  font-family: Typewriter;
  background: gray;
  border: black;
  border-radius: var(--var-border-radius, 0.5rem);
  margin-top: 1rem;
  padding: 1rem;
  cursor: pointer;
}
</style>
