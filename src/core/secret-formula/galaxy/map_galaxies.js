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
  }
};

export function generateGalaxies() {
  console.log("test");
  let id = 1;
  for (let x = -10; x <= 10; x += 2) {
    for (let y = -10; y <= 10; y += 2) {
      generateGalaxy(id, x, y);
      id++;
    }
  }
  player.availableMapGalaxiesCurrentInfinity = galaxies;
}

export function generateGalaxy(idVar, x, y) {
  let sizeVar;
  let unsignedX;
  let unsignedY;
  let distance;
  let delayVar;
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
    layoutPosList: [((3 + ((y + 10) / 2)) * 10000 + (75 + (((x + 10) / 2) * 25)))]
  };
}
