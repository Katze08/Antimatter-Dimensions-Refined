<script>
import PerkPointLabel from "@/components/tabs/perks/PerkPointLabel";
import svgPanZoom from "svg-pan-zoom";

export default {
  name: "GalaxyMapTab",
  components: { PerkPointLabel },
  data: () => ({
    nodeState: null,
  }),
  computed: {
    db() {
      return {};
    },
    drawOrder() {
      return null;
    }
  },
  created() {
    return null;
  },
  mounted() {
    // eslint-disable-next-line no-unused-vars
    const panLimiter = function(oldPan, newPan) {
      // In the callback context, "this" is the svgPanZoom object.
      // eslint-disable-next-line no-invalid-this
      const sizes = this.getSizes();
      const leftLimit = sizes.width - ((sizes.viewBox.x + sizes.viewBox.width) * sizes.realZoom);
      const rightLimit = -sizes.viewBox.x * sizes.realZoom;
      const topLimit = sizes.height - ((sizes.viewBox.y + sizes.viewBox.height) * sizes.realZoom);
      const bottomLimit = -sizes.viewBox.y * sizes.realZoom;
      return {
        x: Math.max(leftLimit, Math.min(rightLimit, newPan.x)),
        y: Math.max(topLimit, Math.min(bottomLimit, newPan.y))
      };
    };
    this.panZoom = svgPanZoom(this.$refs.galaxyMapSVG, {
      controlIconsEnabled: true,
      dblClickZoomEnabled: false,
      center: false,
      fit: false,
      zoomScaleSensitivity: 0.3,
      minZoom: 0.64,
      maxZoom: 4,
      beforePan: panLimiter,
    });
    if (GalaxyMapViewportCache.pan) this.panZoom.pan(GalaxyMapViewportCache.pan);
    if (GalaxyMapViewportCache.zoom) this.panZoom.zoom(GalaxyMapViewportCache.zoom);
  },
  beforeDestroy() {
    if (this.panZoom) {
      GalaxyMapViewportCache.zoom = this.panZoom.getZoom();
      GalaxyMapViewportCache.pan = this.panZoom.getPan();
      this.panZoom.destroy();
      delete this.panZoom;
    }
  },
  methods: {
    update() {
      return null;
    }
  }
};
const GalaxyMapViewportCache = {
  pan: { x: 125, y: 125 },
  zoom: 0.75,
};
</script>

<template>
  <!-- Need to wrap whole thing in a div because of properties applied to tabs -->
  <div>
    <svg
      ref="galaxyMapSVG"
      class="c-wide-canvas-element l-celestial-navigation"
    >
      <image
        x="-250"
        y="-350"
        height="1082"
        width="1924"
        href="images/stars-bg.png"
      />
    </svg>
    <br>
    Hover over a galaxy to see its details. Click on it to buy it. The further out the galaxy is from the center, the delay increases. <br>
    There are bigger galaxies with a higher buff and smaller galaxies with smaller buffs. <br>
    Intergalactic upgrades are able to modify the far galaxy soft-cap, the minimum distance cap and the universe size cap. <br>
    They also can unlock galaxy extensibility and fusibility, mechanics to make galaxies even more powerful. <br>
    Extensibility increases the galaxy's size for a reasonable buff. <br>
    Fusibility makes two galaxies collide with each other, drastically increasing their total buff and unleashing an enormous power boost for a short time.
  </div>
</template>

<style scoped>

</style>
