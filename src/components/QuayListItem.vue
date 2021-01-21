<template>
  <div>
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title class="mb-1">
          <vehicle-icon :transportmode="quay.transportmode" />
          Halte
          <router-link :to="`quay/${quay.quaycode}`">
            {{ quay.quayname }}
          </router-link>
          &nbsp;
          <distance-text v-if="quay.distance" :distance="quay.distance" />
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
            <rating-label :rating="quay.profileAccessibleScore.overallRating" />
          </div>
        </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
    <v-divider></v-divider>
  </div>
</template>

<script>
import VehicleIcon from "@/components/VehicleIcon.vue";
import RatingLabel from "@/components/RatingLabel.vue";
import DistanceText from "@/components/DistanceText.vue";

export default {
  name: "QuayListItem",
  // TODO: don't pass the whole quay, but only the data you need as props
  props: ["quay"],
  components: { VehicleIcon, RatingLabel, DistanceText },
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
