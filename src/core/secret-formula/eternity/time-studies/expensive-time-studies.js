/**
 * List of time study specifications and attributes
 * {
 *  @property {Number} id                   Numerical ID shown for each time study in code and in-game
 *  @property {Number} cost                 Amount of available time theorems required to purchase
 *  @property {Object[]} requirement   Array of Numbers or functions which are checked to determine purchasability
 *  @property {Number} reqType              Number specified by enum in TS_REQUIREMENT_TYPE for requirement behavior
 *    study to also cost space theorems - in all cases this applies if ANY in the array are bought
 *  @property {function: @return String} description  Text to be shown in-game for the time study's effects
 *  @property {function: @return Number} effect       Numerical value for the effects of a study
 *  @property {String[]} cap     Hard-coded cap for studies which don't scale forever
 *  @property {String} formatEffect   Formatting function for effects, if the default formatting isn't appropriate
 * }
 */

export const expensiveTimeStudies = [
  {
    id: 1,
    description: "Multiply Time Theorem generation based on your unspent Perk Points.",
    cost: new Decimal("1e12"),
    requirement: () => TimeStudy.reality.isBought,
    reqType: TS_REQUIREMENT_TYPE.AT_LEAST_ONE,
    effect: () => player.reality.perkPoints + 1
  },
  {
    id: 2,
    description: "Multiply Antimatter Dimensions based on your unspent Reality Machines.",
    cost: new Decimal("1e15"),
    requirement: () => TimeStudy.expensiveStudies(1).isBought,
    reqType: TS_REQUIREMENT_TYPE.AT_LEAST_ONE,
    effect: () => new Decimal("1e1000000").pow(player.reality.realityMachines.exponent)
  },
  {
    id: 3,
    description: () => `Your Dilated Time is multiplied by your Time Theorems raised by ${format(0.85, 2, 2)}. (WIP)`,
    cost: new Decimal("1e18"),
    requirement: [2],
    reqType: TS_REQUIREMENT_TYPE.AT_LEAST_ONE,
  },
  {
    id: 4,
    description: () => `Gain ${formatX(1024, 3)} more Reality Machines. (WIP)`,
    cost: new Decimal("1e21"),
    requirement: [3],
    reqType: TS_REQUIREMENT_TYPE.AT_LEAST_ONE,
  },
  {
    id: 5,
    description: "Multiply your Antimatter Dimensions based on your Infinity Points. (WIP)",
    cost: new Decimal("1e24"),
    requirement: [4],
    reqType: TS_REQUIREMENT_TYPE.AT_LEAST_ONE,
  },
  {
    id: 6,
    description: "Multiply your Antimatter Dimensions based on your Eternity Points. (WIP)",
    cost: new Decimal("1e27"),
    requirement: [5],
    reqType: TS_REQUIREMENT_TYPE.AT_LEAST_ONE,
  },
  {
    id: 7,
    description: "Glyph level is increased by the square root of the exponent of your unspent Reality Machines. (WIP)",
    cost: new Decimal("1e30"),
    requirement: [6],
    reqType: TS_REQUIREMENT_TYPE.AT_LEAST_ONE,
  },
  {
    id: 8,
    description: () => `Your Black hole power is raised by ${format(1.01, 2, 2)}. (WIP)`,
    cost: new Decimal("1e35"),
    requirement: [7],
    reqType: TS_REQUIREMENT_TYPE.AT_LEAST_ONE,
  },
  {
    id: 9,
    description: "Your game speed is multiplied by the exponent of your unspent Time Theorems. (WIP)",
    cost: new Decimal("1e40"),
    requirement: [8],
    reqType: TS_REQUIREMENT_TYPE.AT_LEAST_ONE,
  },
  {
    id: 10,
    description: "Multiply your Time Theorem generation based on your unspent Relic Shards. (WIP)",
    cost: new Decimal("1e50"),
    requirement: [9],
    reqType: TS_REQUIREMENT_TYPE.AT_LEAST_ONE,
  },
  {
    id: 11,
    description: "You gain more Time Theorems based on time spent in this Eternity. (WIP)",
    cost: new Decimal("1e75"),
    requirement: [10],
    reqType: TS_REQUIREMENT_TYPE.AT_LEAST_ONE,
  },
  {
    id: 12,
    description: () => `You gain ${formatPercents(0.01)} of your normal Time Theorem gain if you store real time. (WIP)`,
    cost: new Decimal("1e100"),
    requirement: [11],
    reqType: TS_REQUIREMENT_TYPE.AT_LEAST_ONE,
  },
  {
    id: 13,
    description: "1st Infinity Dimension produces 7th Antimatter Dimensions. (WIP)",
    cost: new Decimal("1e150"),
    requirement: [12],
    reqType: TS_REQUIREMENT_TYPE.AT_LEAST_ONE,
  },
  {
    id: 14,
    description: "Your Useless Paperclips boost your Antimatter production. (WIP)",
    cost: new Decimal("1e200"),
    requirement: [13],
    reqType: TS_REQUIREMENT_TYPE.AT_LEAST_ONE,
  },
  {
    id: 15,
    description: "All dimensions, AM, IP, EP, Replicanti and game speed are multiplied by the exponent of your infinities. (WIP)",
    cost: new Decimal("1.8e308"),
    requirement: [14],
    reqType: TS_REQUIREMENT_TYPE.AT_LEAST_ONE,
  },
  {
    id: 16,
    description: () => `Your current space theorems are multiplied by ${formatInt(10)}. (WIP)`,
    cost: new Decimal("1e500"),
    requirement: [15],
    reqType: TS_REQUIREMENT_TYPE.AT_LEAST_ONE,
  },
  {
    id: 17,
    description: "All dimensions, AM, IP, EP, Replicanti and game speed are multiplied by the amount of your Imaginary Machines. (WIP)",
    cost: new Decimal("1e1000"),
    requirement: [16],
    reqType: TS_REQUIREMENT_TYPE.AT_LEAST_ONE,
  },
  {
    id: 18,
    description: "WIP",
    cost: new Decimal("1e2500"),
    requirement: [17],
    reqType: TS_REQUIREMENT_TYPE.AT_LEAST_ONE,
  },
  {
    id: 19,
    description: "WIP",
    cost: new Decimal("1e10000"),
    requirement: [18],
    reqType: TS_REQUIREMENT_TYPE.AT_LEAST_ONE,
  },
  {
    id: 20,
    description: "WIP",
    cost: new Decimal("1e50000"),
    requirement: [19],
    reqType: TS_REQUIREMENT_TYPE.AT_LEAST_ONE,
  },
  {
    id: 21,
    description: "WIP",
    cost: new Decimal("1e250000"),
    requirement: [20],
    reqType: TS_REQUIREMENT_TYPE.AT_LEAST_ONE,
  },
  {
    id: 22,
    description: "WIP",
    cost: new Decimal("1e1000000"),
    requirement: [21],
    reqType: TS_REQUIREMENT_TYPE.AT_LEAST_ONE,
  }
];
