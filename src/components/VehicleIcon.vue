<template>
  <img :src="vehicleIcon" class="vehicle-icon" />
</template>

<script>
export default {
  name: "VehicleIcon",
  props: ["transportmode"],
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
  },
};
</script>

<style lang="scss" scoped>
.vehicle-icon {
  height: 25px;
  width: 25px;
  vertical-align: middle;
}
</style>
