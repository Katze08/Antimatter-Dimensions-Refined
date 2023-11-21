<script>
import GalaxyLabel from "@/components/tabs/new-galaxy-map/GalaxyLabel";
import { Galaxies } from "@/core/map_galaxies";
import { GALAXY_FAMILY } from "@/core/secret-formula/galaxy/map_galaxies";
import { DataSet, Network } from "vis-network";

export default {
  name: "GalaxyMap",
  components: {
    GalaxyLabel
  },
  data() {
    return {
      currentEighthDims: 0,
      currentGalaxies: 0,
      pendingUpdate: false
    };
  },
  computed: {
    showHintText() {
      return ui.view.shiftDown || player.options.showHintText.perks;
    }
  },
  methods: {
    update() {
      if ((this.currentEighthDims !== player.dimensions.antimatter[7].amount.toNumber()) || (this.currentGalaxies !== player.galaxies)) {
        this.pendingUpdate = true;
      } else {
        this.pendingUpdate = false;
      }
      this.currentEighthDims = player.dimensions.antimatter[7].amount.toNumber();
      this.currentGalaxies = player.galaxies;
      if (this.pendingUpdate) {
        GameUI.update();
      }
    }
  },
  watch: {
    showHintText(newValue) {
      if (ui.view.theme === "S9") GalaxyNetwork.setLabelVisibility(false);
      else GalaxyNetwork.setLabelVisibility(newValue);
    }
  },
  created() {
    // eslint-disable-next-line max-statements-per-line
    EventHub.ui.on(GAME_EVENT.GALAXY_BOUGHT, () => { GalaxyNetwork.updatePerkColor(); GalaxyNetwork.updateDescription(); });
  },
  mounted() {
    GalaxyNetwork.initialStabilization = false;
    GalaxyNetwork.currentLayout = PerkLayouts[0];
    GalaxyNetwork.initializeIfNeeded();
    if (ui.view.theme === "S9") GalaxyNetwork.setLabelVisibility(false);
    else GalaxyNetwork.setLabelVisibility(ui.view.shiftDown || player.options.showHintText.perks);
    GalaxyNetwork.updatePerkColor();
    GalaxyNetwork.updatePerkSize();
    GalaxyNetwork.updateDescription();
    this.$refs.tab.appendChild(GalaxyNetwork.container);
    GalaxyNetwork.moveToDefaultLayoutPositions(0);
  }
};

// Primary is lifted from the study tree (mostly),
// secondary is primary -15% l in hsl, apart from reality which is -10%
const perkColors = () => ({
  [GALAXY_FAMILY.GALAXY]: {
    primary: "#b840d0",
    secondary: "#6F277D"
  }
});

// Coordinate specifications are sometimes given in a grid index, so we need to spread them out to the proper scaling.
// Positions with |x| < 20 and |y| < 12 will display well with a scale factor of 10.
// When making new layouts, the grid coordinates need to be multiplied by 5
function globalScale(vec, factor) {
  return vec.matrixTransform(factor, 0, 0, factor);
}

function positionNumToVector(num) {
  const xPart = num % 400;
  const yPart = Math.floor(num / 400);
  return new Vector(5 * (xPart - 200), 5 * (yPart - 200));
}

// Specification for different starting layouts
export const PerkLayouts = [
  {
    buttonText: "Default Untangled",
    position: config => positionNumToVector(config.layoutPosList[0]),
  }
];

export const GalaxyNetwork = {
  container: undefined,
  network: undefined,
  nodes: undefined,
  minScale: 0.2,
  maxScale: 4,
  lastPerkNotation: "",
  pulseTimer: 0,
  initialStabilization: false,
  currentLayout: {},
  initializeIfNeeded() {
    const notation = Notations.current.name;
    if (this.container !== undefined && notation === this.lastPerkNotation) return;
    this.lastPerkNotation = notation;

    this.makeNetwork();

    this.network.on("click", params => {
      const id = params.nodes[0];
      if (!isFinite(id)) return;
      if (((player.dimensions.antimatter[7].amount.toNumber()) >= (((player.galaxies + Galaxies.find(id).config.power) * 60) + 20)) && player.intergalactic === true) {
        Galaxies.find(id).purchase();
        softReset(0);
        player.galaxies += Galaxies.find(id).config.power;
        player.dimensionBoosts = 0;
        player.antimatterGalaxiesBought++;
        this.updatePerkColor();
        this.updatePerkSize();
        this.updateDescription();
      }
    });

    this.network.on("zoom", () => {
      const scale = this.network.getScale();
      const clampedScale = Math.clamp(scale, this.minScale, this.maxScale);
      if (scale !== clampedScale) {
        this.network.moveTo({ scale: clampedScale });
      }
    });

    this.network.on("stabilizationIterationsDone", () => {
      // Centering the perk tree doesn't work until the physics-based movement has stopped after the initial creation
      if (!this.initialStabilization) {
        this.resetPosition(true);
        this.initialStabilization = true;
      }
      this.setPhysics(false);
    });
  },
  makeNetwork() {
    // Need to do some html to be able to apply some css for when in doomed
    function htmlTitle(html) {
      const container = document.createElement("div");
      container.innerHTML = html;
      return container;
    }
    // Just for a bit of fun, tangle it up a bit unless the player specifically chooses not to
    const selectPos = config => PerkLayouts[0].position(config);
    this.nodes = new DataSet(Galaxies.all.map(galaxy => ({
      id: galaxy.id,
      label: galaxy.config.label,
      shape: "diamond",
      // As far as I am aware, vis.js doesn't support arbitrary CSS styling; nevertheless, we still want the original
      // description to be visible instead of being hidden by disable/lock text
      title: (`${galaxy.config.description}`),
      x: selectPos(galaxy.config).x,
      y: selectPos(galaxy.config).y,
    })));

    const edges = [];

    const nodeData = {
      nodes: this.nodes,
      edges
    };

    const nodeOptions = {
      interaction: {
        hover: true,
        hoverConnectedEdges: false,
        selectConnectedEdges: false,
        tooltipDelay: 0,
      },
      nodes: {
        shape: "dot",
        size: 18,
        font: {
          size: 0
        },
        borderWidth: 2,
        shadow: true
      },
      edges: {
        width: 2,
        shadow: true,
        hoverWidth: width => width,
        selectionWidth: width => width,
        color: {
          inherit: "both"
        },
        hidden: ui.view.theme === "S9"
      },
    };

    const container = document.createElement("div");
    container.className = "c-wide-canvas-element vis-network c-perk-network";
    container.tabIndex = 900;
    const canvas = document.createElement("canvas");
    canvas.className = "c-perk-network__canvas";
    container.appendChild(canvas);
    this.container = container;

    this.network = new Network(container, nodeData, nodeOptions);
  },
  setPhysics(state) {
    const newState = this.currentLayout.forcePhysics === undefined ? state : this.currentLayout.forcePhysics;
    this.network.setOptions({ physics: { enabled: newState } });
  },
  setEdgeCurve(state) {
    const newState = this.currentLayout.straightEdges === undefined ? state : !this.currentLayout.straightEdges;
    this.network.setOptions({ edges: { smooth: { enabled: newState } } });
  },
  moveToDefaultLayoutPositions(layoutIndex) {
    // Things go wonky if we don't turn these off before moving
    this.setPhysics(false);
    this.setEdgeCurve(false);

    for (const key of Object.keys(GalaxyNetwork.network.getPositions())) {
      const id = Number(key);
      const config = Galaxies.all.find(p => p.id === id).config;
      const target = PerkLayouts[0].position(config);
      this.network.moveNode(id, target.x, target.y);
    }

    // Properly set attributes and window after all the movement
    this.initialStabilization = false;
    this.resetPosition(false);
    this.setEdgeCurve(true);
  },
  forceNetworkRemake() {
    this.container = undefined;
    this.initializeIfNeeded();
    // Tangled trees use physics to bring it to a semi-usable state; it gets set properly again after stabilization
    this.setPhysics(true);
  },
  resetPosition(centerOnStart) {
    const center = centerOnStart
      ? GalaxyNetwork.network.body.nodes[GameDatabase.galaxy.galaxies.centerGalaxy.id]
      : (PerkLayouts[0].centerOffset ?? new Vector(0, 0));
    this.network.moveTo({ position: { x: center.x, y: center.y }, scale: 0.4, offset: { x: 0, y: 0 } });
  },
  setLabelVisibility(areVisible) {
    const options = {
      nodes: {
        font: {
          size: areVisible ? 20 : 0,
          color: Theme.current().isDark() ? "#DDDDDD" : "#222222",
        }
      }
    };
    this.network.setOptions(options);
  },
  updatePerkColor() {
    this.perkColorList = this.perkColorList ?? perkColors();
    const perkColorList = this.perkColorList;

    function nodeColor(perk) {
      const perkColor = perkColorList[perk.config.family];
      const primaryColor = perkColor.primary;
      const secondaryColor = perkColor.secondary;

      const canBeBought = (player.dimensions.antimatter[7].amount.toNumber() >= ((player.galaxies + perk.config.power) * 60 + 20));
      const isBought = perk.isBought;

      let backgroundColor;
      if (canBeBought) {
        if (Theme.current().isDark()) backgroundColor = "#EEEEEE";
        else backgroundColor = "#111111";
      } else if (isBought) backgroundColor = primaryColor;
      else if (Theme.current().isDark()) backgroundColor = "#333333";
      else backgroundColor = "#CCCCCC";

      const hoverColor = canBeBought || isBought ? primaryColor : "#656565";
      const borderColor = secondaryColor;

      return {
        background: backgroundColor,
        border: borderColor,
        hover: {
          background: hoverColor,
          border: borderColor
        },
        highlight: {
          background: backgroundColor,
          border: borderColor
        }
      };
    }

    const data = Galaxies.all
      .map(perk => ({ id: perk.id, color: nodeColor(perk) }));
    this.nodes.update(data);
  },
  updatePerkSize() {
    function nodeSize(perk) {
      GalaxyNetwork.pulseTimer += 0.1;
      // Make the nodes pulse continuously on Cancer theme
      const mod = Theme.current().name === "S4"
        ? 10 * Math.sin(5 * GalaxyNetwork.pulseTimer + 0.1 * perk._config.id)
        : 0;
      if (perk.isBought) return 25 + mod;
      if (perk.canBeBought) return 20 + mod;
      return 12 + mod;
    }

    const data = Galaxies.all
      .map(perk => ({ id: perk.id, size: nodeSize(perk) }));
    this.nodes.update(data);
  },
  updateDescription() {
    function desc(perk) {
      return `Size: ${format(perk.config.size)}ly\n Galaxy power +${formatX(perk.config.power, 2, 3)}\n Distance: ${format(perk.config.distance)}ly\n Delay: ${format(perk.config.delay)}s\n Requirement: ${formatInt(player.galaxies * 60 + 80)} 8th Antimatter Dimensions`.split("\n");
    }
    const data = Galaxies.all
      .map(perk => ({ id: perk.id, description: desc(perk) }));
    this.nodes.update(data);
  }
};
</script>

<template>
  <div
    ref="tab"
    class="c-perk-tab"
  >
    <GalaxyLabel />
  </div>
</template>

<style scoped>

</style>
