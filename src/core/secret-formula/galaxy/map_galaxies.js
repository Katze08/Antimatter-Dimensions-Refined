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
      return `Size: ${format(this.size)}ly\n Galaxy power +×${format(this.power, 2, 3)}\n Distance: ${format(this.distance)}ly\n Delay: ${format(this.delay)}s`.split("\n");
    },
    // 8 is y (2Mly = 1), 0 is unknown, 200 is x (2Mly = 25).
    layoutPosList: [80200]
  }
};

export function generateGalaxies() {
  let id = 1;
  console.log("test");
  for (let x = -10; x <= 10; x += 2) {
    for (let y = -10; y <= 10; y += 2) {
      if ((Math.random() > 0.3) || ((x = 0) && (y = 0))) {
        continue;
      }
      let size = 1e5;
      switch (Math.floor(Math.random() * 3) + 1) {
        case 1: size = 1e5 * Math.random(); break;
        case 2: size = 1e6 * Math.random(); break;
        case 3: size = 1e7 * Math.random(); break;
      }
      let unsignedX = x;
      let unsignedY = y;
      if (Math.sign(x) < 0) {
        unsignedX = x * -1;
      }
      if (Math.sign(y) < 0) {
        unsignedY = y * -1;
      }
      let distance = unsignedX > unsignedY ? unsignedX : unsignedY;
      let delay = 0;
      if (distance > 10) {
        delay = distance - 10;
      }
      let lplY = 3 + ((y + 10) / 2);
      let lplX = 75 + (((x + 10) / 2) * 25);
      if (lplX === 75) {
        lplX = "075";
      }
      let lpl = `${lplY.toString()}0${lplX.toString()}`;
      galaxies[`${id}`] = {
        id: id,
        label: `${x}; ${y}`,
        family: GALAXY_FAMILY.GALAXY,
        size: size,
        power: Math.sqrt(size / 1e5),
        distance: distance * 1e6,
        delay: delay,
        get description() {
          return `Size: ${format(this.size)}ly\n Galaxy power +×${format(this.power, 2, 3)}\n Distance: ${format(this.distance)}ly\n Delay: ${format(this.delay)}s`.split("\n");
        },
        layoutPosList: [Number(lpl)]
      };
      id++;
    }
  }
}
