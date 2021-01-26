<template>
  <img :src="vehicleIcon" class="vehicle-icon" :style="cssVars" />
</template>

<script>
export default {
  name: "VehicleIcon",
  props: {
    transportmode: String,
    height: { type: Number, default: 32 },
    width: { type: Number, default: 32 },
  },
  computed: {
    vehicleIcon: function() {
      return this.transportmode === "tram"
        ? require("@/assets/icons/vehicleCircleTram.svg")
        : this.transportmode === "metro"
        ? require("@/assets/icons/vehicleCircleMetro.svg")
        : this.transportmode === "bus"
        ? require("@/assets/icons/vehicleCircleBus.svg")
        : this.transportmode === "ferry"
        ? require("@/assets/icons/vehicleCircleFerry.svg")
        : require("@/assets/icons/vehicleCircleTram.svg");
    },
    cssVars: function() {
      return {
        "--height": this.height + "px",
        "--width": this.width + "px",
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.vehicle-icon {
  height: var(--height);
  width: var(--width);
  vertical-align: middle;
}
</style>
