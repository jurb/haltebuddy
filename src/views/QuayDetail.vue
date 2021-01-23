<template>
  <div>
    <v-btn icon to="/">
      <v-icon color="grey darken-4">mdi-arrow-left</v-icon>
    </v-btn>
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title class="mb-1">
          <vehicle-icon :transportmode="quay.transportmode" />
          Halte {{ quay.quayname }}
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

    <!-- {{ quay.quayname }} -->
    <!-- <span v-if="OVapi"> {{ passes }}</span> -->
    <div v-if="passes">
      <template v-for="(item, index) in passes">
        <v-list-item :key="item.id">
          <template v-slot:default="{ active }">
            <v-list-item-content>
              <v-list-item-title
                v-text="item.DestinationName50"
              ></v-list-item-title>

              <v-list-item-subtitle>
                <v-chip class="mr-2" label color="secondary" outlined>
                  <strong>{{ item.LinePublicNumber }}</strong>
                </v-chip>
              </v-list-item-subtitle>

              <v-list-item-subtitle
                v-text="formatDistancePass(item.ExpectedDepartureTime)"
              ></v-list-item-subtitle>
            </v-list-item-content>

            <v-list-item-action>
              <v-list-item-action-text
                v-text="item.action"
              ></v-list-item-action-text>

              <v-icon v-if="!active" color="grey lighten-1">
                mdi-star-outline
              </v-icon>

              <v-icon v-else color="yellow darken-3">
                mdi-star
              </v-icon>
            </v-list-item-action>
          </template>
        </v-list-item>
        <v-divider v-if="index < passes.length - 1" :key="index"></v-divider>
      </template>
    </div>
  </div>
</template>

<script>
import VehicleIcon from "@/components/VehicleIcon.vue";
import RatingLabel from "@/components/RatingLabel.vue";
import DistanceText from "@/components/DistanceText.vue";

import { mapGetters, mapState } from "vuex";

import compareAsc from "date-fns/compareAsc";
import formatDistance from "date-fns/formatDistance";
import parseISO from "date-fns/parseISO";
import locale from "date-fns/locale/nl";

export default {
  name: "QuayDetail",
  data: () => ({ OVapi: null }),
  components: { VehicleIcon, RatingLabel, DistanceText },
  computed: {
    ...mapGetters(["filteredQuays"]),
    quay: function() {
      const foundQuay = this.filteredQuays.find(
        (quay) => quay.quaycode === this.$route.params.quaycode
      );
      return foundQuay;
    },
    passes: function() {
      //TODO: don't like this way of error checking
      return this.OVapi
        ? Object.values(this.OVapi.Passes)
            .sort((a, b) =>
              compareAsc(
                parseISO(a.ExpectedArrivalTime),
                parseISO(b.ExpectedArrivalTime)
              )
            )
            .slice(0, 6)
        : null;
    },
  },
  methods: {
    // TODO: add error message to data, show error message in app & add render checks in template
    // TODO: I used middleware to avoid cors errors from ovapi.nl for now. This adds latency (instance needs to spin up)
    // Ideally ovapi.nl needs better headers, but otherwise I should probably use a faster server for the middleware
    fetchOVApi: function(tpccode) {
      fetch(
        `https://cors-anywhere-jurb-observable.herokuapp.com/https://v0.ovapi.nl/tpc/${tpccode}/departures`
      )
        .then((res) => res.json())
        .then((data) => (this.OVapi = data[tpccode]))
        .catch((error) => console.error(error.message));
    },
    formatDistancePass: function(ExpectedDepartureTime) {
      return formatDistance(parseISO(ExpectedDepartureTime), new Date(), {
        addSuffix: true,
        locale,
      });
    },
  },
  mounted() {
    const tpccode = this.quay.quaycode.slice(5);
    this.fetchOVApi(tpccode);
  },
};
</script>

<style lang="scss" scoped>
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

<!-- <v-row no-gutters>
            <v-col
              v-if="!quay.profileAccessibleScore.threshold"
              align-self="start"
              class="px-0"
              align="center"
            >
              <img :src="require('@/assets/icons/quayNoThreshold.svg')" />
              <p class="caption">{{ ratingSymbol(3) }} Opgang</p></v-col
            >
            <v-col
              v-if="quay.profileAccessibleScore.threshold"
              align-self="start"
              class="px-0"
              align="center"
            >
              <img :src="require('@/assets/icons/quayThreshold.svg')" />
              <p class="caption">
                {{
                  Math.round(quay.profileAccessibleScore.stopThreshold * 100)
                }}cm
                {{
                  ratingSymbol(
                    quay.profileAccessibleScore.stopThresholdRating
                  ) || "?"
                }}
              </p></v-col
            >
            <v-col align-self="start" class="px-0" align="center">
              <img :src="require('@/assets/icons/quayWidth.svg')" />
              <p class="caption">
                {{
                  quay.profileAccessibleScore.stopNarrowestWidth
                    ? ` ${
                        quay.profileAccessibleScore.stopNarrowestWidth
                      }m ${ratingSymbol(
                        quay.profileAccessibleScore.stopNarrowestWidthRating
                      )}

                 `
                    : "Breedte onbekend"
                }}
              </p>
            </v-col>
            <v-col
              v-if="profile.ramp"
              align-self="start"
              class="px-0"
              align="center"
            >
              <img :src="require('@/assets/icons/quayRamp.svg')" />
              <p class="caption">
                Plank {{ ratingSymbol(quay.profileAccessibleScore.rampRating) }}
              </p>
            </v-col>
            <v-col
              v-if="!profile.ramp"
              align-self="start"
              class="px-0"
              align="center"
            >
              <img
                :src="require('@/assets/icons/quayThresholdToVehicle.svg')"
              />
              <p class="caption">
                {{
                  Math.round(
                    quay.profileAccessibleScore.vehicleThreshold * 100
                  )
                }}cm
                {{
                  ratingSymbol(
                    quay.profileAccessibleScore.vehicleThresholdRating
                  )
                }}
              </p>
            </v-col>
          </v-row> -->
