<template>
  <v-list-item>
    <v-list-item-content>
      <h2 class="mb-1">
        <vehicle-icon
          v-if="quay.transportmode"
          :transportmode="quay.transportmode"
        />
        {{ quay.quayname }}
        &nbsp;
        <distance-text v-if="quay.distance" :distance="quay.distance" />
      </h2>
      <div>
        <div class="mb-2">
          Richting op de kaart: {{ quay.directionfull }} {{ quay.direction }}
        </div>
        <p class="mb-0">
          <v-chip-group column>
            <v-btn
              :color="isFavourite ? 'secondary' : 'white'"
              tile
              class="text-none text-body mt-1 mr-2"
              height="32px"
              @click="updateFavourites"
              :value="isFavourite"
              ><v-icon left>{{
                isFavourite ? "mdi-star" : "mdi-star-outline"
              }}</v-icon
              ><strong>{{
                isFavourite ? "Opgeslagen" : "Opslaan"
              }}</strong></v-btn
            >
            <v-chip
              v-for="route in quay.routes"
              :key="route.id"
              class="mr-2 lines"
              label
              color="secondary"
              outlined
              :ripple="false"
            >
              <strong>{{ route }}</strong>
            </v-chip>
          </v-chip-group>
        </p>
      </div>
    </v-list-item-content>
  </v-list-item>
</template>

<script>
import DistanceText from "@/components/DistanceText.vue";
import VehicleIcon from "@/components/VehicleIcon.vue";

export default {
  components: { VehicleIcon, DistanceText },
  props: ["quay", "isFavourite", "updateFavourites"],
};
</script>
