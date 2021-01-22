<template>
  <div>
    <v-btn icon to="/">
      <v-icon color="grey darken-4">mdi-arrow-left</v-icon>
    </v-btn>
    <!-- {{ quay }} -->
    <span v-if="OVapi">
      {{ Object.values(OVapi.Passes).map((d) => d.LinePublicNumber) }}</span
    >
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";

export default {
  name: "QuayDetail",
  data: () => ({ OVapi: null }),
  computed: {
    ...mapGetters(["filteredQuays"]),
    quay: function() {
      const foundQuay = this.filteredQuays.find(
        (quay) => quay.quaycode === this.$route.params.quaycode
      );
      return foundQuay;
    },
  },
  methods: {
    // TODO: add error handling to data, add render checks in template
    fetchOVApi: function(tpccode) {
      fetch(`https://v0.ovapi.nl/tpc/${tpccode}/departures`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => (this.OVapi = data[tpccode]))
        .catch((error) => alert(error.message));
    },
  },
  mounted() {
    const tpccode = this.quay.quaycode.slice(5);
    this.fetchOVApi(tpccode);
  },
  components: {},
};
</script>

<style lang="scss" scoped></style>

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
