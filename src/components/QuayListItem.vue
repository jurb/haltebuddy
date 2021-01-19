<template>
  <div>
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title class="mb-1">
          <img :src="vehicleIcon" class="vehicle-icon" />
          Halte {{ quay.stopplace.stopplacename.publicname }} &nbsp;<span
            class="text--secondary text-body-2"
            v-if="quay.distance"
          >
            {{ distanceText }}
          </span>
        </v-list-item-title>
        <v-list-item-subtitle>
          <div class="mb-2">
            Richting {{ quay.directionfull }} {{ quay.direction }}
          </div>
          <div class="mb-2">
            <v-chip
              v-for="route in quay.routes"
              :key="route.id"
              class="mr-2"
              label
              color="secondary"
              outlined
            >
              <strong>{{ route }}</strong>
            </v-chip>
          </div>
          <div class="my-1 content">
            Toegankelijkheid:
            <span class="px-1" :class="scoreColor"
              ><strong>{{ scoreText }}</strong></span
            >
          </div>
        </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
    <v-divider></v-divider>
  </div>
</template>

<script>
export default {
  name: "QuayListItem",
  props: ["quay"],
  computed: {
    scoreColor: function() {
      const rating = this.quay.profileAccessibleScore.overallRating;
      return rating === 0
        ? "error white--text"
        : rating === 1
        ? "accent white--text"
        : rating === 2
        ? "gvb-yellow"
        : rating === 3
        ? "gvb-green white--text"
        : "error";
    },
    scoreText: function() {
      const rating = this.quay.profileAccessibleScore.overallRating;
      return rating === 0
        ? "Niet toegankelijk"
        : rating === 1
        ? "Misschien"
        : rating === 2
        ? "Redelijk"
        : rating === 3
        ? "Zeer goed"
        : "Fout in beoordeling";
    },
    vehicleIcon: function() {
      const tmode = this.quay.quaytransportmodes.transportmodedata
        .transportmode;
      return tmode === "tram"
        ? require("@/assets/icons/vehicleCircleTram.svg")
        : tmode === "metro"
        ? require("@/assets/icons/vehicleCircleMetro.svg")
        : tmode === "bus"
        ? require("@/assets/icons/vehicleCircleBus.svg")
        : tmode === "ferry"
        ? require("@/assets/icons/vehicleCircleFerry.svg")
        : require("@/assets/icons/vehicleCircleTram.svg");
    },
    distanceText: function() {
      const distancePrecision = Number.parseFloat(
        this.quay.distance
      ).toPrecision(2);
      return this.quay.distance < 1
        ? `${Math.round(distancePrecision * 1000)}m`
        : `${distancePrecision}km`;
    },
  },
};
</script>

<style scoped>
.v-list-item__title {
  font-size: 1.15em;
  font-weight: 700;
}
.v-list-item__subtitle {
  color: rgba(0, 0, 0, 0.87) !important;
}
.v-chip {
  padding: 0 6px;
}
.vehicle-icon {
  height: 25px;
  width: 25px;
  vertical-align: middle;
}
</style>
