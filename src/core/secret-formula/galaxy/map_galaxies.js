export const GALAXY_FAMILY = {
  GALAXY: "GALAXY"
};

export let galaxies = {
  centerGalaxy: {
    id: 0,
    label: "CENTER",
    family: GALAXY_FAMILY.GALAXY,
    size: 1e5,
    power: 1.0,
    distance: 0.0,
    delay: 0.0,
    get description() {
      return `Size: ${format(this.size)}ly\n Galaxy power +×${format(this.power, 2, 3)}\n Distance: ${format(this.distance)}ly\n Delay: ${format(this.delay)}s\n Requirement: ${format(player.galaxies * 60 + 80)} 8th Antimatter Dimensions`.split("\n");
    },
    // 8 is y (2Mly = 1), 0 is unknown, 200 is x (2Mly = 25).
    layoutPosList: [80200]
  },
  1: {
    id: 1,
    label: "2; -10",
    family: GALAXY_FAMILY.GALAXY,
    size: 39000,
    power: 0.622,
    distance: 10,
    delay: 0.0,
    get description() {
      return `Size: ${format(this.size)}ly\n Galaxy power +×${format(this.power, 2, 3)}\n Distance: ${format(this.distance)}ly\n Delay: ${format(this.delay)}s\n Requirement: ${format((player.galaxies + this.power) * 60 + 20)} 8th Antimatter Dimensions`.split("\n");
    },
    //((3 + ((y + 10) / 2)) * 10000 + (75 + (((x + 10) / 2) * 25)))
    layoutPosList: [((3 + ((10 + 10) / 2)) * 10000 + (75 + (((2 + 10) / 2) * 25)))]
  },
  2: {
    id: 2,
    label: "-10; -8",
    family: GALAXY_FAMILY.GALAXY,
    size: 967000,
    power: 3.110,
    distance: 10,
    delay: 0.0,
    get description() {
      return `Size: ${format(this.size)}ly\n Galaxy power +×${format(this.power, 2, 3)}\n Distance: ${format(this.distance)}ly\n Delay: ${format(this.delay)}s\n Requirement: ${format((player.galaxies + this.power) * 60 + 20)} 8th Antimatter Dimensions`.split("\n");
    },
    //((3 + ((y + 10) / 2)) * 10000 + (75 + (((x + 10) / 2) * 25)))
    layoutPosList: [((3 + ((8 + 10) / 2)) * 10000 + (75 + (((-10 + 10) / 2) * 25)))]
  },
  3: {
    id: 3,
    label: "-8; -8",
    family: GALAXY_FAMILY.GALAXY,
    size: 56000,
    power: 0.749,
    distance: 8,
    delay: 0.0,
    get description() {
      return `Size: ${format(this.size)}ly\n Galaxy power +×${format(this.power, 2, 3)}\n Distance: ${format(this.distance)}ly\n Delay: ${format(this.delay)}s\n Requirement: ${format((player.galaxies + this.power) * 60 + 20)} 8th Antimatter Dimensions`.split("\n");
    },
    //((3 + ((y + 10) / 2)) * 10000 + (75 + (((x + 10) / 2) * 25)))
    layoutPosList: [((3 + ((8 + 10) / 2)) * 10000 + (75 + (((-8 + 10) / 2) * 25)))]
  },
  4: {
    id: 4,
    label: "-2; -8",
    family: GALAXY_FAMILY.GALAXY,
    size: 978000,
    power: 3.128,
    distance: 8,
    delay: 0.0,
    get description() {
      return `Size: ${format(this.size)}ly\n Galaxy power +×${format(this.power, 2, 3)}\n Distance: ${format(this.distance)}ly\n Delay: ${format(this.delay)}s\n Requirement: ${format((player.galaxies + this.power) * 60 + 20)} 8th Antimatter Dimensions`.split("\n");
    },
    //((3 + ((y + 10) / 2)) * 10000 + (75 + (((x + 10) / 2) * 25)))
    layoutPosList: [((3 + ((8 + 10) / 2)) * 10000 + (75 + (((-2 + 10) / 2) * 25)))]
  },
  5: {
    id: 5,
    label: "2; -8",
    family: GALAXY_FAMILY.GALAXY,
    size: 451000,
    power: 2.124,
    distance: 8,
    delay: 0.0,
    get description() {
      return `Size: ${format(this.size)}ly\n Galaxy power +×${format(this.power, 2, 3)}\n Distance: ${format(this.distance)}ly\n Delay: ${format(this.delay)}s\n Requirement: ${format((player.galaxies + this.power) * 60 + 20)} 8th Antimatter Dimensions`.split("\n");
    },
    //((3 + ((y + 10) / 2)) * 10000 + (75 + (((x + 10) / 2) * 25)))
    layoutPosList: [((3 + ((8 + 10) / 2)) * 10000 + (75 + (((2 + 10) / 2) * 25)))]
  },
  6: {
    id: 6,
    label: "-8; -6",
    family: GALAXY_FAMILY.GALAXY,
    size: 458000,
    power: 2.140,
    distance: 8,
    delay: 0.0,
    get description() {
      return `Size: ${format(this.size)}ly\n Galaxy power +×${format(this.power, 2, 3)}\n Distance: ${format(this.distance)}ly\n Delay: ${format(this.delay)}s\n Requirement: ${format((player.galaxies + this.power) * 60 + 20)} 8th Antimatter Dimensions`.split("\n");
    },
    //((3 + ((y + 10) / 2)) * 10000 + (75 + (((x + 10) / 2) * 25)))
    layoutPosList: [((3 + ((6 + 10) / 2)) * 10000 + (75 + (((-8 + 10) / 2) * 25)))]
  },
  7: {
    id: 7,
    label: "-4; -6",
    family: GALAXY_FAMILY.GALAXY,
    size: 10000,
    power: 0.316,
    distance: 6,
    delay: 0.0,
    get description() {
      return `Size: ${format(this.size)}ly\n Galaxy power +×${format(this.power, 2, 3)}\n Distance: ${format(this.distance)}ly\n Delay: ${format(this.delay)}s\n Requirement: ${format((player.galaxies + this.power) * 60 + 20)} 8th Antimatter Dimensions`.split("\n");
    },
    //((3 + ((y + 10) / 2)) * 10000 + (75 + (((x + 10) / 2) * 25)))
    layoutPosList: [((3 + ((6 + 10) / 2)) * 10000 + (75 + (((-4 + 10) / 2) * 25)))]
  },
  8: {
    id: 8,
    label: "-2; -6",
    family: GALAXY_FAMILY.GALAXY,
    size: 731000,
    power: 2.704,
    distance: 6,
    delay: 0.0,
    get description() {
      return `Size: ${format(this.size)}ly\n Galaxy power +×${format(this.power, 2, 3)}\n Distance: ${format(this.distance)}ly\n Delay: ${format(this.delay)}s\n Requirement: ${format((player.galaxies + this.power) * 60 + 20)} 8th Antimatter Dimensions`.split("\n");
    },
    //((3 + ((y + 10) / 2)) * 10000 + (75 + (((x + 10) / 2) * 25)))
    layoutPosList: [((3 + ((6 + 10) / 2)) * 10000 + (75 + (((-2 + 10) / 2) * 25)))]
  },
  9: {
    id: 9,
    label: "2; -6",
    family: GALAXY_FAMILY.GALAXY,
    size: 10000,
    power: 0.316,
    distance: 6,
    delay: 0.0,
    get description() {
      return `Size: ${format(this.size)}ly\n Galaxy power +×${format(this.power, 2, 3)}\n Distance: ${format(this.distance)}ly\n Delay: ${format(this.delay)}s\n Requirement: ${format((player.galaxies + this.power) * 60 + 20)} 8th Antimatter Dimensions`.split("\n");
    },
    //((3 + ((y + 10) / 2)) * 10000 + (75 + (((x + 10) / 2) * 25)))
    layoutPosList: [((3 + ((6 + 10) / 2)) * 10000 + (75 + (((2 + 10) / 2) * 25)))]
  },
  10: {
    id: 10,
    label: "10; -6",
    family: GALAXY_FAMILY.GALAXY,
    size: 635000,
    power: 2.520,
    distance: 10,
    delay: 0.0,
    get description() {
      return `Size: ${format(this.size)}ly\n Galaxy power +×${format(this.power, 2, 3)}\n Distance: ${format(this.distance)}ly\n Delay: ${format(this.delay)}s\n Requirement: ${format((player.galaxies + this.power) * 60 + 20)} 8th Antimatter Dimensions`.split("\n");
    },
    //((3 + ((y + 10) / 2)) * 10000 + (75 + (((x + 10) / 2) * 25)))
    layoutPosList: [((3 + ((6 + 10) / 2)) * 10000 + (75 + (((10 + 10) / 2) * 25)))]
  },
  11: {
    id: 11,
    label: "-10; -2",
    family: GALAXY_FAMILY.GALAXY,
    size: 525000,
    power: 2.291,
    distance: 10,
    delay: 0.0,
    get description() {
      return `Size: ${format(this.size)}ly\n Galaxy power +×${format(this.power, 2, 3)}\n Distance: ${format(this.distance)}ly\n Delay: ${format(this.delay)}s\n Requirement: ${format((player.galaxies + this.power) * 60 + 20)} 8th Antimatter Dimensions`.split("\n");
    },
    //((3 + ((y + 10) / 2)) * 10000 + (75 + (((x + 10) / 2) * 25)))
    layoutPosList: [((3 + ((2 + 10) / 2)) * 10000 + (75 + (((-10 + 10) / 2) * 25)))]
  },
  12: {
    id: 12,
    label: "-4; -2",
    family: GALAXY_FAMILY.GALAXY,
    size: 42000,
    power: 0.647,
    distance: 4,
    delay: 0.0,
    get description() {
      return `Size: ${format(this.size)}ly\n Galaxy power +×${format(this.power, 2, 3)}\n Distance: ${format(this.distance)}ly\n Delay: ${format(this.delay)}s\n Requirement: ${format((player.galaxies + this.power) * 60 + 20)} 8th Antimatter Dimensions`.split("\n");
    },
    //((3 + ((y + 10) / 2)) * 10000 + (75 + (((x + 10) / 2) * 25)))
    layoutPosList: [((3 + ((2 + 10) / 2)) * 10000 + (75 + (((-4 + 10) / 2) * 25)))]
  },
  13: {
    id: 13,
    label: "-2; -2",
    family: GALAXY_FAMILY.GALAXY,
    size: 950000,
    power: 3.083,
    distance: 2,
    delay: 0.0,
    get description() {
      return `Size: ${format(this.size)}ly\n Galaxy power +×${format(this.power, 2, 3)}\n Distance: ${format(this.distance)}ly\n Delay: ${format(this.delay)}s\n Requirement: ${format((player.galaxies + this.power) * 60 + 20)} 8th Antimatter Dimensions`.split("\n");
    },
    //((3 + ((y + 10) / 2)) * 10000 + (75 + (((x + 10) / 2) * 25)))
    layoutPosList: [((3 + ((2 + 10) / 2)) * 10000 + (75 + (((-2 + 10) / 2) * 25)))]
  },
  14: {
    id: 14,
    label: "4; -2",
    family: GALAXY_FAMILY.GALAXY,
    size: 777000,
    power: 2.787,
    distance: 4,
    delay: 0.0,
    get description() {
      return `Size: ${format(this.size)}ly\n Galaxy power +×${format(this.power, 2, 3)}\n Distance: ${format(this.distance)}ly\n Delay: ${format(this.delay)}s\n Requirement: ${format((player.galaxies + this.power) * 60 + 20)} 8th Antimatter Dimensions`.split("\n");
    },
    //((3 + ((y + 10) / 2)) * 10000 + (75 + (((x + 10) / 2) * 25)))
    layoutPosList: [((3 + ((2 + 10) / 2)) * 10000 + (75 + (((4 + 10) / 2) * 25)))]
  },
  15: {
    id: 15,
    label: "8; -2",
    family: GALAXY_FAMILY.GALAXY,
    size: 741000,
    power: 2.721,
    distance: 8,
    delay: 0.0,
    get description() {
      return `Size: ${format(this.size)}ly\n Galaxy power +×${format(this.power, 2, 3)}\n Distance: ${format(this.distance)}ly\n Delay: ${format(this.delay)}s\n Requirement: ${format((player.galaxies + this.power) * 60 + 20)} 8th Antimatter Dimensions`.split("\n");
    },
    //((3 + ((y + 10) / 2)) * 10000 + (75 + (((x + 10) / 2) * 25)))
    layoutPosList: [((3 + ((2 + 10) / 2)) * 10000 + (75 + (((8 + 10) / 2) * 25)))]
  },
  16: {
    id: 16,
    label: "-2; 0",
    family: GALAXY_FAMILY.GALAXY,
    size: 589000,
    power: 2.427,
    distance: 2,
    delay: 0.0,
    get description() {
      return `Size: ${format(this.size)}ly\n Galaxy power +×${format(this.power, 2, 3)}\n Distance: ${format(this.distance)}ly\n Delay: ${format(this.delay)}s\n Requirement: ${format((player.galaxies + this.power) * 60 + 20)} 8th Antimatter Dimensions`.split("\n");
    },
    //((3 + ((y + 10) / 2)) * 10000 + (75 + (((x + 10) / 2) * 25)))
    layoutPosList: [((3 + ((0 + 10) / 2)) * 10000 + (75 + (((-2 + 10) / 2) * 25)))]
  },
  17: {
    id: 17,
    label: "6; 0",
    family: GALAXY_FAMILY.GALAXY,
    size: 930000,
    power: 3.049,
    distance: 6,
    delay: 0.0,
    get description() {
      return `Size: ${format(this.size)}ly\n Galaxy power +×${format(this.power, 2, 3)}\n Distance: ${format(this.distance)}ly\n Delay: ${format(this.delay)}s\n Requirement: ${format((player.galaxies + this.power) * 60 + 20)} 8th Antimatter Dimensions`.split("\n");
    },
    //((3 + ((y + 10) / 2)) * 10000 + (75 + (((x + 10) / 2) * 25)))
    layoutPosList: [((3 + ((0 + 10) / 2)) * 10000 + (75 + (((6 + 10) / 2) * 25)))]
  },
  18: {
    id: 18,
    label: "8; 0",
    family: GALAXY_FAMILY.GALAXY,
    size: 58000,
    power: 0.762,
    distance: 8,
    delay: 0.0,
    get description() {
      return `Size: ${format(this.size)}ly\n Galaxy power +×${format(this.power, 2, 3)}\n Distance: ${format(this.distance)}ly\n Delay: ${format(this.delay)}s\n Requirement: ${format((player.galaxies + this.power) * 60 + 20)} 8th Antimatter Dimensions`.split("\n");
    },
    //((3 + ((y + 10) / 2)) * 10000 + (75 + (((x + 10) / 2) * 25)))
    layoutPosList: [((3 + ((0 + 10) / 2)) * 10000 + (75 + (((8 + 10) / 2) * 25)))]
  },
  19: {
    id: 19,
    label: "-2; 2",
    family: GALAXY_FAMILY.GALAXY,
    size: 183000,
    power: 1.353,
    distance: 2,
    delay: 0.0,
    get description() {
      return `Size: ${format(this.size)}ly\n Galaxy power +×${format(this.power, 2, 3)}\n Distance: ${format(this.distance)}ly\n Delay: ${format(this.delay)}s\n Requirement: ${format((player.galaxies + this.power) * 60 + 20)} 8th Antimatter Dimensions`.split("\n");
    },
    //((3 + ((y + 10) / 2)) * 10000 + (75 + (((x + 10) / 2) * 25)))
    layoutPosList: [((3 + ((-2 + 10) / 2)) * 10000 + (75 + (((-2 + 10) / 2) * 25)))]
  },
  20: {
    id: 20,
    label: "4; 2",
    family: GALAXY_FAMILY.GALAXY,
    size: 743000,
    power: 2.725,
    distance: 4,
    delay: 0.0,
    get description() {
      return `Size: ${format(this.size)}ly\n Galaxy power +×${format(this.power, 2, 3)}\n Distance: ${format(this.distance)}ly\n Delay: ${format(this.delay)}s\n Requirement: ${format((player.galaxies + this.power) * 60 + 20)} 8th Antimatter Dimensions`.split("\n");
    },
    //((3 + ((y + 10) / 2)) * 10000 + (75 + (((x + 10) / 2) * 25)))
    layoutPosList: [((3 + ((-2 + 10) / 2)) * 10000 + (75 + (((4 + 10) / 2) * 25)))]
  },
  21: {
    id: 21,
    label: "-6; 4",
    family: GALAXY_FAMILY.GALAXY,
    size: 48000,
    power: 0.690,
    distance: 6,
    delay: 0.0,
    get description() {
      return `Size: ${format(this.size)}ly\n Galaxy power +×${format(this.power, 2, 3)}\n Distance: ${format(this.distance)}ly\n Delay: ${format(this.delay)}s\n Requirement: ${format((player.galaxies + this.power) * 60 + 20)} 8th Antimatter Dimensions`.split("\n");
    },
    //((3 + ((y + 10) / 2)) * 10000 + (75 + (((x + 10) / 2) * 25)))
    layoutPosList: [((3 + ((-4 + 10) / 2)) * 10000 + (75 + (((-6 + 10) / 2) * 25)))]
  },
  22: {
    id: 22,
    label: "0; 4",
    family: GALAXY_FAMILY.GALAXY,
    size: 53000,
    power: 0.729,
    distance: 4,
    delay: 0.0,
    get description() {
      return `Size: ${format(this.size)}ly\n Galaxy power +×${format(this.power, 2, 3)}\n Distance: ${format(this.distance)}ly\n Delay: ${format(this.delay)}s\n Requirement: ${format((player.galaxies + this.power) * 60 + 20)} 8th Antimatter Dimensions`.split("\n");
    },
    //((3 + ((y + 10) / 2)) * 10000 + (75 + (((x + 10) / 2) * 25)))
    layoutPosList: [((3 + ((-4 + 10) / 2)) * 10000 + (75 + (((0 + 10) / 2) * 25)))]
  },
  23: {
    id: 23,
    label: "2; 4",
    family: GALAXY_FAMILY.GALAXY,
    size: 42000,
    power: 0.648,
    distance: 4,
    delay: 0.0,
    get description() {
      return `Size: ${format(this.size)}ly\n Galaxy power +×${format(this.power, 2, 3)}\n Distance: ${format(this.distance)}ly\n Delay: ${format(this.delay)}s\n Requirement: ${format((player.galaxies + this.power) * 60 + 20)} 8th Antimatter Dimensions`.split("\n");
    },
    //((3 + ((y + 10) / 2)) * 10000 + (75 + (((x + 10) / 2) * 25)))
    layoutPosList: [((3 + ((-4 + 10) / 2)) * 10000 + (75 + (((2 + 10) / 2) * 25)))]
  },
  24: {
    id: 24,
    label: "-6; 6",
    family: GALAXY_FAMILY.GALAXY,
    size: 727000,
    power: 2.696,
    distance: 6,
    delay: 0.0,
    get description() {
      return `Size: ${format(this.size)}ly\n Galaxy power +×${format(this.power, 2, 3)}\n Distance: ${format(this.distance)}ly\n Delay: ${format(this.delay)}s\n Requirement: ${format((player.galaxies + this.power) * 60 + 20)} 8th Antimatter Dimensions`.split("\n");
    },
    //((3 + ((y + 10) / 2)) * 10000 + (75 + (((x + 10) / 2) * 25)))
    layoutPosList: [((3 + ((-6 + 10) / 2)) * 10000 + (75 + (((-6 + 10) / 2) * 25)))]
  },
  25: {
    id: 25,
    label: "-8; 8",
    family: GALAXY_FAMILY.GALAXY,
    size: 87000,
    power: 0.934,
    distance: 8,
    delay: 0.0,
    get description() {
      return `Size: ${format(this.size)}ly\n Galaxy power +×${format(this.power, 2, 3)}\n Distance: ${format(this.distance)}ly\n Delay: ${format(this.delay)}s\n Requirement: ${format((player.galaxies + this.power) * 60 + 20)} 8th Antimatter Dimensions`.split("\n");
    },
    //((3 + ((y + 10) / 2)) * 10000 + (75 + (((x + 10) / 2) * 25)))
    layoutPosList: [((3 + ((-8 + 10) / 2)) * 10000 + (75 + (((-8 + 10) / 2) * 25)))]
  },
  26: {
    id: 26,
    label: "-2; 8",
    family: GALAXY_FAMILY.GALAXY,
    size: 59000,
    power: 0.770,
    distance: 8,
    delay: 0.0,
    get description() {
      return `Size: ${format(this.size)}ly\n Galaxy power +×${format(this.power, 2, 3)}\n Distance: ${format(this.distance)}ly\n Delay: ${format(this.delay)}s\n Requirement: ${format((player.galaxies + this.power) * 60 + 20)} 8th Antimatter Dimensions`.split("\n");
    },
    //((3 + ((y + 10) / 2)) * 10000 + (75 + (((x + 10) / 2) * 25)))
    layoutPosList: [((3 + ((-8 + 10) / 2)) * 10000 + (75 + (((-2 + 10) / 2) * 25)))]
  },
  27: {
    id: 27,
    label: "4; 8",
    family: GALAXY_FAMILY.GALAXY,
    size: 844000,
    power: 2.906,
    distance: 8,
    delay: 0.0,
    get description() {
      return `Size: ${format(this.size)}ly\n Galaxy power +×${format(this.power, 2, 3)}\n Distance: ${format(this.distance)}ly\n Delay: ${format(this.delay)}s\n Requirement: ${format((player.galaxies + this.power) * 60 + 20)} 8th Antimatter Dimensions`.split("\n");
    },
    //((3 + ((y + 10) / 2)) * 10000 + (75 + (((x + 10) / 2) * 25)))
    layoutPosList: [((3 + ((-8 + 10) / 2)) * 10000 + (75 + (((4 + 10) / 2) * 25)))]
  },
  28: {
    id: 28,
    label: "8; 8",
    family: GALAXY_FAMILY.GALAXY,
    size: 100000,
    power: 1,
    distance: 8,
    delay: 0.0,
    get description() {
      return `Size: ${format(this.size)}ly\n Galaxy power +×${format(this.power, 2, 3)}\n Distance: ${format(this.distance)}ly\n Delay: ${format(this.delay)}s\n Requirement: ${format((player.galaxies + this.power) * 60 + 20)} 8th Antimatter Dimensions`.split("\n");
    },
    //((3 + ((y + 10) / 2)) * 10000 + (75 + (((x + 10) / 2) * 25)))
    layoutPosList: [((3 + ((-8 + 10) / 2)) * 10000 + (75 + (((8 + 10) / 2) * 25)))]
  },
  29: {
    id: 29,
    label: "10; 8",
    family: GALAXY_FAMILY.GALAXY,
    size: 427000,
    power: 2.066,
    distance: 10,
    delay: 0.0,
    get description() {
      return `Size: ${format(this.size)}ly\n Galaxy power +×${format(this.power, 2, 3)}\n Distance: ${format(this.distance)}ly\n Delay: ${format(this.delay)}s\n Requirement: ${format((player.galaxies + this.power) * 60 + 20)} 8th Antimatter Dimensions`.split("\n");
    },
    //((3 + ((y + 10) / 2)) * 10000 + (75 + (((x + 10) / 2) * 25)))
    layoutPosList: [((3 + ((-8 + 10) / 2)) * 10000 + (75 + (((10 + 10) / 2) * 25)))]
  },
  30: {
    id: 30,
    label: "-8; 10",
    family: GALAXY_FAMILY.GALAXY,
    size: 427000,
    power: 2.066,
    distance: 10,
    delay: 0.0,
    get description() {
      return `Size: ${format(this.size)}ly\n Galaxy power +×${format(this.power, 2, 3)}\n Distance: ${format(this.distance)}ly\n Delay: ${format(this.delay)}s\n Requirement: ${format((player.galaxies + this.power) * 60 + 20)} 8th Antimatter Dimensions`.split("\n");
    },
    //((3 + ((y + 10) / 2)) * 10000 + (75 + (((x + 10) / 2) * 25)))
    layoutPosList: [((3 + ((-10 + 10) / 2)) * 10000 + (75 + (((-8 + 10) / 2) * 25)))]
  },
  31: {
    id: 31,
    label: "-6; 10",
    family: GALAXY_FAMILY.GALAXY,
    size: 90000,
    power: 0.948,
    distance: 10,
    delay: 0.0,
    get description() {
      return `Size: ${format(this.size)}ly\n Galaxy power +×${format(this.power, 2, 3)}\n Distance: ${format(this.distance)}ly\n Delay: ${format(this.delay)}s\n Requirement: ${format((player.galaxies + this.power) * 60 + 20)} 8th Antimatter Dimensions`.split("\n");
    },
    //((3 + ((y + 10) / 2)) * 10000 + (75 + (((x + 10) / 2) * 25)))
    layoutPosList: [((3 + ((-10 + 10) / 2)) * 10000 + (75 + (((-6 + 10) / 2) * 25)))]
  },
  32: {
    id: 32,
    label: "8; 10",
    family: GALAXY_FAMILY.GALAXY,
    size: 544000,
    power: 2.333,
    distance: 10,
    delay: 0.0,
    get description() {
      return `Size: ${format(this.size)}ly\n Galaxy power +×${format(this.power, 2, 3)}\n Distance: ${format(this.distance)}ly\n Delay: ${format(this.delay)}s\n Requirement: ${format((player.galaxies + this.power) * 60 + 20)} 8th Antimatter Dimensions`.split("\n");
    },
    //((3 + ((y + 10) / 2)) * 10000 + (75 + (((x + 10) / 2) * 25)))
    layoutPosList: [((3 + ((-10 + 10) / 2)) * 10000 + (75 + (((8 + 10) / 2) * 25)))]
  },
};

export function generateGalaxies() {
  let id = 1;
  if (player.availableMapGalaxiesCurrentInfinity === {}) {
    for (let x = -10; x <= 10; x += 2) {
      for (let y = -10; y <= 10; y += 2) {
        generateGalaxy(id, x, y);
        id++;
      }
    }
    player.availableMapGalaxiesCurrentInfinity = galaxies;
  }// else {
  //  player.availableMapGalaxiesCurrentInfinity.all()
        /*galaxies[`${i}`] = {
          id: player.availableMapGalaxiesCurrentInfinity[i].id,
          label: player.availableMapGalaxiesCurrentInfinity[i].label,
          family: GALAXY_FAMILY.GALAXY,
          size: player.availableMapGalaxiesCurrentInfinity[i].size,
          power: player.availableMapGalaxiesCurrentInfinity[i].power,
          distance: player.availableMapGalaxiesCurrentInfinity[i].distance,
          delay: player.availableMapGalaxiesCurrentInfinity[i].delay,
          get description() {
            return `Size: ${format(this.size)}ly\n Galaxy power +×${format(this.power, 2, 3)}\n Distance: ${format(this.distance)}ly\n Delay: ${format(this.delay)}s\n Requirement: ${format((player.galaxies + this.power) * 60 + 20)} 8th Antimatter Dimensions`.split("\n");
          },
          layoutPosList: [player.availableMapGalaxiesCurrentInfinity[i].layoutPosList]
        };*/
  //}
}

export function generateGalaxy(idVar, x, y) {
  let sizeVar;
  let unsignedX;
  let unsignedY;
  let distance;
  let delayVar;
  let lpl;
  if ((Math.random() > 0.3) || ((x === 0) && (y === 0))) {
    return;
  }
  switch (Math.floor(Math.random() * 2) + 1) {
    case 1: sizeVar = 1e5 * Math.random(); break;
    case 2: sizeVar = 1e6 * Math.random(); break;
    default: sizeVar = 1e5; break;
  }
  if (sizeVar < 1e4) {
    sizeVar = 1e4;
  }
  unsignedX = x;
  unsignedY = y;
  if (Math.sign(x) < 0) {
    unsignedX = x * -1;
  }
  if (Math.sign(y) < 0) {
    unsignedY = y * -1;
  }
  distance = unsignedX > unsignedY ? unsignedX : unsignedY;
  delayVar = 0;
  if (distance > 10) {
    delayVar = distance - 10;
  }
  lpl = ((3 + ((y + 10) / 2)) * 10000 + (75 + (((x + 10) / 2) * 25)));
  galaxies[`${idVar}`] = {
    id: idVar,
    label: `${x}; ${-y}`,
    family: GALAXY_FAMILY.GALAXY,
    size: sizeVar,
    power: Math.sqrt(sizeVar / 1e5),
    distance: distance * 1e6,
    delay: delayVar,
    get description() {
      return `Size: ${format(this.size)}ly\n Galaxy power +×${format(this.power, 2, 3)}\n Distance: ${format(this.distance)}ly\n Delay: ${format(this.delay)}s\n Requirement: ${format((player.galaxies + this.power) * 60 + 20)} 8th Antimatter Dimensions`.split("\n");
    },
    layoutPosList: [lpl]
  };
}
