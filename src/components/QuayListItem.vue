<template>
  <div>
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title class="mb-1">
          <!-- TODO: use a computed property to calculate the require string -->
          <img
            v-if="
              quay.quaytransportmodes.transportmodedata.transportmode === 'tram'
            "
            :src="require('@/assets/icons/vehicleTram.svg')"
          />
          <img
            v-else-if="
              quay.quaytransportmodes.transportmodedata.transportmode === 'bus'
            "
            :src="require('@/assets/icons/vehicleBus.svg')"
          />

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
            <!-- TODO: add a computed property for the class names, and one for the text string -->
            <span
              v-if="quay.profileAccessibleScore.overallRating === 0"
              class="error px-1 white--text"
              ><strong>Niet toegankelijk</strong></span
            >
            <span
              v-if="quay.profileAccessibleScore.overallRating === 1"
              class="accent white--text px-1"
              ><strong>Misschien</strong></span
            >
            <span
              v-if="quay.profileAccessibleScore.overallRating === 2"
              class="gvb-yellow px-1"
              ><strong>Redelijk</strong></span
            >
            <span
              v-if="quay.profileAccessibleScore.overallRating === 3"
              class="gvb-green white--text px-1"
              ><strong>Zeer goed</strong></span
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
</style>
