import { PlayerProgress } from "@/core/player-progress";

export const tabs = [
  {
    key: "dimensions",
    name: "Dimensions",
    hideAt: 2.9,
    id: 0,
    hidable: true,
    subtabs: [
      {
        key: "antimatter",
        name: "Antimatter Dimensions",
        symbol: "Ω",
        component: "AntimatterDimensionsTab",
        id: 0,
        hidable: true,
      },
      {
        key: "infinity",
        name: "Infinity Dimensions",
        hideAt: 2.7,
        symbol: "∞",
        component: "InfinityDimensionsTab",
        condition: () =>
          PlayerProgress.simulationUnlocked() ||
          PlayerProgress.realityUnlocked() ||
          PlayerProgress.eternityUnlocked() ||
          InfinityDimension(1).isUnlocked,
        id: 1,
        hidable: true,
      },
      {
        key: "time",
        name: "Time Dimensions",
        hideAt: 2.6,
        symbol: "Δ",
        component: "TimeDimensionsTab",
        condition: () =>
          PlayerProgress.simulationUnlocked() ||
          PlayerProgress.realityUnlocked() ||
          PlayerProgress.eternityUnlocked(),
        id: 2,
        hidable: true,
      },
    ]
  },
  {
    key: "options",
    name: "Options",
    hideAt: 1.6,
    id: 1,
    hidable: false,
    subtabs: [
      {
        key: "saving",
        name: "Saving",
        symbol: "<i class='fas fa-save'></i>",
        component: "OptionsSavingTab",
        id: 0,
        hidable: false,
      },
      {
        key: "visual",
        name: "Visual",
        symbol: "<i class='fas fa-palette'></i>",
        component: "OptionsVisualTab",
        id: 1,
        hidable: false,
      },
      {
        key: "gameplay",
        name: "Gameplay",
        symbol: "<i class='fas fa-wrench'></i>",
        component: "OptionsGameplayTab",
        id: 2,
        hidable: false,
      }
    ]
  },
  {
    key: "statistics",
    name: "Statistics",
    hideAt: 1.7,
    id: 2,
    hidable: true,
    subtabs: [
      {
        key: "statistics",
        name: "Statistics",
        symbol: "<i class='fas fa-clipboard-list'></i>",
        component: "StatisticsTab",
        id: 0,
        hidable: true,
      },
      {
        key: "challenges",
        name: "Challenge records",
        symbol: "<i class='fas fa-stopwatch'></i>",
        component: "ChallengeRecordsTab",
        condition: () =>
          PlayerProgress.simulationUnlocked() ||
          PlayerProgress.realityUnlocked() ||
          PlayerProgress.eternityUnlocked() ||
          PlayerProgress.challengeCompleted(),
        id: 1,
        hidable: true,
      },
      {
        key: "prestige runs",
        name: "Past Prestige Runs",
        symbol: "<i class='fas fa-list-ol'></i>",
        component: "PastPrestigeRunsTab",
        condition: () =>
          PlayerProgress.simulationUnlocked() ||
          PlayerProgress.realityUnlocked() ||
          PlayerProgress.eternityUnlocked() ||
          PlayerProgress.infinityUnlocked(),
        id: 2,
        hidable: true,
      },
      {
        key: "multipliers",
        name: "Multiplier Breakdown",
        symbol: "<i class='fas fa-calculator'></i>",
        component: "MultiplierBreakdownTab",
        condition: () =>
          PlayerProgress.simulationUnlocked() ||
          PlayerProgress.realityUnlocked() ||
          PlayerProgress.eternityUnlocked() ||
          PlayerProgress.infinityUnlocked(),
        id: 3,
        hidable: true,
      },
      {
        key: "glyph sets",
        name: "Glyph Set Records",
        symbol: "<i class='fas fa-ellipsis-h'></i>",
        component: "GlyphSetRecordsTab",
        condition: () =>
          PlayerProgress.simulationUnlocked() ||
          PlayerProgress.realityUnlocked(),
        id: 4,
        hidable: true,
      },
      {
        key: "speedrun milestones",
        name: "Speedrun Milestones",
        symbol: "<i class='fas fa-flag-checkered'></i>",
        component: "SpeedrunMilestonesTab",
        condition: () => player.speedrun.isActive,
        id: 5,
        hidable: true,
      },
      {
        key: "speedrun records",
        name: "Speedrun Records",
        symbol: "<i class='fas fa-ranking-star'></i>",
        component: "PreviousSpeedrunTab",
        condition: () => Object.keys(player.speedrun.previousRuns).length > 0,
        id: 6,
        hidable: true,
      },
    ]
  },
  {
    key: "achievements",
    name: "Achievements",
    hideAt: 1.9,
    id: 3,
    hidable: true,
    subtabs: [
      {
        key: "normal",
        name: "Achievements",
        symbol: "<i class='fas fa-trophy'></i>",
        component: "NormalAchievementsTab",
        id: 0,
        hidable: true,
      },
      {
        key: "secret",
        name: "Secret Achievements",
        symbol: "<i class='fas fa-question'></i>",
        component: "SecretAchievementTab",
        id: 1,
        hidable: true,
      }
    ]
  },
  {
    key: "automation",
    name: "Automation",
    id: 4,
    hideAt: 2.1,
    condition: () =>
      PlayerProgress.simulationUnlocked() ||
      PlayerProgress.realityUnlocked() ||
      PlayerProgress.eternityUnlocked() ||
      PlayerProgress.infinityUnlocked() ||
      player.records.totalAntimatter.gte(1e40),
    hidable: true,
    subtabs: [
      {
        key: "autobuyers",
        name: "Autobuyers",
        symbol: "<i class='fas fa-cog'></i>",
        component: "AutobuyersTab",
        id: 0,
        hidable: true,
      },
      {
        key: "automator",
        name: "Automator",
        symbol: "<i class='fas fa-code'></i>",
        component: "AutomatorTab",
        condition: () =>
          PlayerProgress.simulationUnlocked() ||
          PlayerProgress.realityUnlocked(),
        id: 1,
        hidable: true,
      },
      {
        key: "gears",
        name: "Automation Gears",
        symbol: "<i class='fas fa-gears'></i>",
        component: "AutomationGearsTab",
        condition: () =>
          PlayerProgress.simulationUnlocked() || player.hadSimulationOnce,
        id: 2,
        hidable: true,
      },
    ]
  },
  {
    key: "challenges",
    name: "Challenges",
    hideAt: 2,
    condition: () =>
      PlayerProgress.simulationUnlocked() ||
      PlayerProgress.realityUnlocked() ||
      PlayerProgress.eternityUnlocked() ||
      PlayerProgress.infinityUnlocked() ||
      PlayerProgress.galaxyChallengeUnlocked(),
    id: 5,
    hidable: true,
    subtabs: [
      {
        key: "galaxy",
        name: "Galaxy Challenges",
        symbol: "<i class='fa-solid fa-fan'></i>",
        component: "GalaxyChallengesTab",
        condition: () => {
          if (player.galaxyUpgrades.has("unlockChallenges")) {
            player.galaxyChallengesUnlocked = true;
            return true;
          }
          if (PlayerProgress.simulationUnlocked()) {
            return true;
          }
          return player.galaxyChallengesUnlocked;

        },
        id: 3,
        hidable: true
      },
      {
        key: "normal",
        name: "Normal Challenges",
        symbol: "Ω",
        component: "NormalChallengesTab",
        condition: () =>
          PlayerProgress.infinityUnlocked() ||
          PlayerProgress.eternityUnlocked() ||
          PlayerProgress.realityUnlocked() ||
          PlayerProgress.simulationUnlocked(),
        id: 0,
        hidable: true
      },
      {
        key: "infinity",
        name: "Infinity Challenges",
        symbol: "∞",
        component: "infinity-challenges-tab",
        condition: () => PlayerProgress.simulationUnlocked() || PlayerProgress.realityUnlocked() || PlayerProgress.hasBroken() || Pelle.isDoomed,
        id: 1,
        hidable: true
      },
      {
        key: "eternity",
        name: "Eternity Challenges",
        symbol: "Δ",
        component: "eternity-challenges-tab",
        condition: () =>
          PlayerProgress.simulationUnlocked() ||
          PlayerProgress.realityUnlocked() ||
          player.challenge.eternity.unlocked !== 0 ||
          EternityChallenges.all.some(ec => ec.completions > 0),
        id: 2,
        hidable: true
      }
    ],
  },
  {
    key: "infinity",
    name: "Infinity",
    hideAt: 2.2,
    UIClass: "o-tab-btn--infinity",
    before: "InfinityPointsHeader",
    id: 6,
    condition: () =>
      PlayerProgress.simulationUnlocked() ||
      PlayerProgress.realityUnlocked() ||
      PlayerProgress.eternityUnlocked() ||
      PlayerProgress.infinityUnlocked(),
    hidable: true,
    subtabs: [
      {
        key: "upgrades",
        name: "Infinity Upgrades",
        symbol: "<i class='fas fa-arrow-up'></i>",
        component: "InfinityUpgradesTab",
        condition: () =>
          PlayerProgress.simulationUnlocked() ||
          PlayerProgress.realityUnlocked() ||
          PlayerProgress.eternityUnlocked() ||
          PlayerProgress.infinityUnlocked(),
        id: 0,
        hidable: true,
      },
      {
        key: "break",
        name: "Break Infinity",
        symbol: "∝",
        component: "BreakInfinityTab",
        condition: () =>
          PlayerProgress.simulationUnlocked() ||
          PlayerProgress.realityUnlocked() ||
          PlayerProgress.eternityUnlocked() ||
          PlayerProgress.infinityUnlocked(),
        id: 1,
        hidable: true,
      },
      {
        key: "replicanti",
        name: "Replicanti",
        symbol: "Ξ",
        component: "ReplicantiTab",
        condition: () =>
          PlayerProgress.simulationUnlocked() ||
          PlayerProgress.realityUnlocked() ||
          PlayerProgress.eternityUnlocked() ||
          PlayerProgress.infinityUnlocked(),
        id: 2,
        hidable: true,
      }
    ],
  },
  {
    key: "eternity",
    name: "Eternity",
    hideAt: 1.8,
    UIClass: "o-tab-btn--eternity",
    condition: () =>
      PlayerProgress.simulationUnlocked() ||
      PlayerProgress.realityUnlocked() ||
      PlayerProgress.eternityUnlocked(),
    before: "EternityPointsHeader",
    id: 7,
    hidable: true,
    subtabs: [
      {
        key: "studies",
        name: "Time Studies",
        symbol: "<i class='fas fa-book'></i>",
        component: "TimeStudiesTab",
        id: 0,
        hidable: true,
      },
      {
        key: "upgrades",
        name: "Eternity Upgrades",
        symbol: "<i class='fas fa-arrow-up'></i>",
        component: "EternityUpgradesTab",
        id: 1,
        hidable: true,
      },
      {
        key: "milestones",
        name: "Eternity Milestones",
        symbol: "<i class='fas fa-star'></i>",
        component: "EternityMilestonesTab",
        id: 2,
        hidable: true,
      },
      {
        key: "dilation",
        name: "Time Dilation",
        symbol: "Ψ",
        component: "TimeDilationTab",
        condition: () => PlayerProgress.dilationUnlocked() || PlayerProgress.realityUnlocked() || PlayerProgress.simulationUnlocked(),
        id: 3,
        hidable: true,
      }
    ],
  },
  {
    key: "reality",
    name: "Reality",
    hideAt: 2.3,
    UIClass: "o-tab-btn--reality",
    condition: () => PlayerProgress.simulationUnlocked() || PlayerProgress.realityUnlocked() || TimeStudy.reality.isBought,
    id: 8,
    hidable: true,
    subtabs: [
      {
        key: "glyphs",
        name: "Glyphs",
        symbol: "<i class='fas fa-clone'></i>",
        component: "GlyphsTab",
        id: 0,
        hidable: true,
      },
      {
        key: "upgrades",
        name: "Reality Upgrades",
        symbol: "<i class='fas fa-arrow-up'></i>",
        component: "RealityUpgradesTab",
        id: 1,
        hidable: true,
      },
      {
        key: "imag_upgrades",
        name: "Imaginary Upgrades",
        symbol: "<i class='fas fa-level-up-alt'></i>",
        component: "ImaginaryUpgradesTab",
        condition: () => PlayerProgress.simulationUnlocked() || MachineHandler.isIMUnlocked,
        id: 2,
        hidable: true,
      },
      {
        key: "perks",
        name: "Perks",
        symbol: "<i class='fas fa-project-diagram'></i>",
        component: "PerksTab",
        id: 3,
        hidable: true,
      },
      {
        key: "hole",
        name: "Black Hole",
        symbol: "<i class='fas fa-circle'></i>",
        component: "BlackHoleTab",
        condition: () => PlayerProgress.simulationUnlocked() || PlayerProgress.realityUnlocked(),
        id: 4,
        hidable: true,
      },
      {
        key: "alchemy",
        name: "Glyph Alchemy",
        symbol: "<i class='fas fa-vial'></i>",
        component: "AlchemyTab",
        condition: () => PlayerProgress.simulationUnlocked() || Ra.unlocks.unlockGlyphAlchemy.canBeApplied,
        id: 5,
        hidable: true,
      },
    ],
  },
  {
    key: "celestials",
    name: "Celestials",
    hideAt: 2.4,
    UIClass: "o-tab-btn--celestial",
    condition: () => PlayerProgress.simulationUnlocked() || Teresa.isUnlocked,
    id: 9,
    hidable: true,
    subtabs: [
      {
        key: "celestial-navigation",
        name: "Celestial Navigation",
        symbol: "<i class='fas fa-map-marked-alt'></i>",
        component: "CelestialNavigationTab",
        id: 0,
        hidable: true,
      },
      {
        key: "teresa",
        name: "Teresa",
        symbol: "Ϟ",
        component: "TeresaTab",
        id: 1,
        hidable: true,
      },
      {
        key: "effarig",
        name: "Effarig",
        symbol: "Ϙ",
        component: "EffarigTab",
        condition: () => PlayerProgress.simulationUnlocked() || TeresaUnlocks.effarig.isUnlocked,
        id: 2,
        hidable: true,
      },
      {
        key: "enslaved",
        name: "The Nameless Ones",
        symbol: "<div class='o-tab-btn--cel3'>\uf0c1</div>",
        component: "EnslavedTab",
        condition: () => PlayerProgress.simulationUnlocked() || EffarigUnlock.eternity.isUnlocked,
        id: 3,
        hidable: true,
      },
      {
        key: "v",
        name: "V",
        symbol: "⌬",
        component: "VTab",
        condition: () => PlayerProgress.simulationUnlocked() || Achievement(151).isUnlocked,
        id: 4,
        hidable: true,
      },
      {
        key: "ra",
        name: "Ra",
        symbol: "<i class='fas fa-sun'></i>",
        component: "RaTab",
        condition: () => PlayerProgress.simulationUnlocked() || VUnlocks.raUnlock.isUnlocked,
        id: 5,
        hidable: true,
      },
      {
        key: "laitela",
        name: "Lai'tela",
        symbol: "ᛝ",
        component: "LaitelaTab",
        condition: () => PlayerProgress.simulationUnlocked() || Laitela.isUnlocked,
        id: 6,
        hidable: true,
      },
      {
        key: "pelle",
        name: "Pelle",
        symbol: "♅",
        component: "PelleTab",
        condition: () => PlayerProgress.simulationUnlocked() || Pelle.isUnlocked,
        id: 7,
        hidable: true,
      }
    ]
  },
  {
    key: "shop",
    name: "Shop",
    newUIClass: "shop",
    hideAt: 1.5,
    condition: () => Cloud.isAvailable,
    id: 10,
    hidable: true,
    subtabs: [
      {
        key: "shop",
        name: "Shop",
        symbol: "$",
        component: "ShopTab",
        id: 0,
        hidable: true
      }
    ]
  },
  {
    key: "galaxy",
    name: "Galaxy",
    hideAt: 2.9,
    UIClass: "o-tab-btn--galaxy",
    id: 11,
    condition: () => {
      if (player.dimensionBoosts >= 4 || PlayerProgress.infinityUnlocked() || PlayerProgress.eternityUnlocked() || PlayerProgress.realityUnlocked() || PlayerProgress.simulationUnlocked()) {
        player.wasOnceIntergalactical = true;
      }
      return player.wasOnceIntergalactical;
    },
    hidable: true,
    subtabs: [
      {
        key: "upgrades",
        name: "Galaxy Upgrades",
        symbol: "<i class='fas fa-arrow-up'></i>",
        component: "GalaxyTab",
        id: 0,
        hidable: true
      }, {
        key: "map",
        name: "Galaxy Map",
        symbol: "<i class='fas fa-map-marked-alt'></i>",
        component: "GalaxyMapTab",
        condition: () => PlayerProgress.infinityUnlocked() || PlayerProgress.eternityUnlocked() || PlayerProgress.realityUnlocked() || PlayerProgress.simulationUnlocked() || player.unlockedGalaxyMap,
        id: 1,
        hidable: true
      }, {
        key: "extensibility",
        name: "Galaxy Extender",
        symbol: "<i class='fas fa-expand-arrows-alt'></i>",
        component: "SimulationSettingsTab",
        condition: () => {
          if (player.galaxyUpgrades.has("extensibility") || PlayerProgress.infinityUnlocked() || PlayerProgress.eternityUnlocked() || PlayerProgress.realityUnlocked() || PlayerProgress.simulationUnlocked()) {
            player.unlockedExtensibility = true;
            return true;
          }
          return player.unlockedExtensibility;
        },
        id: 2,
        hidable: true
      }, {
        key: "fusibility",
        name: "Galaxy Fuser",
        symbol: "<i class='fas fa-compress-arrows-alt'></i>",
        component: "SimulationSettingsTab",
        condition: () => {
          if (player.galaxyUpgrades.has("fusibility") || PlayerProgress.infinityUnlocked() || PlayerProgress.eternityUnlocked() || PlayerProgress.realityUnlocked() || PlayerProgress.simulationUnlocked()) {
            player.unlockedFusibility = true;
            return true;
          }
          return player.unlockedFusibility;
        },
        id: 3,
        hidable: true
      }
    ]
  },
  {
    key: "simulation",
    name: "Simulation",
    hideAt: 2.9,
    UIClass: "o-tab-btn--simulation",
    id: 12,
    condition: () => PlayerProgress.simulationUnlocked() || player.hadSimulationOnce,
    hidable: true,
    subtabs: [
      {
        key: "settings",
        name: "Simulation settings",
        symbol: "<i class='fas fa-cog'></i>",
        component: "SimulationSettingsTab",
        id: 0,
        hidable: true
      }
    ]
  }
];
