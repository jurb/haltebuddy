<template>
  <div>
    <v-btn icon to="/" class="ma-2">
      <v-icon color="grey darken-4">mdi-arrow-left</v-icon>
    </v-btn>
    <v-list-item>
      <v-list-item-content>
        <h2 class="mb-1">
          <vehicle-icon :transportmode="quay.transportmode" />
          {{ quay.quayname }}
          &nbsp;
          <distance-text v-if="quay.distance" :distance="quay.distance" />
        </h2>
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
        </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
    <!-- <div class="mx-n4">
      <v-divider />
    </div> -->
    <div v-if="quay.profileAccessibleScore" class="ma-4 mt-6">
      <h3>
        Toegankelijkheid
      </h3>
      <div class="mx-n4">
        <v-divider />
      </div>
      <v-row no-gutters class="mt-3 text-body-2">
        <v-col>
          <div class="my-1 content">
            Totaal beoordeling:
            <rating-label :rating="quay.profileAccessibleScore.overallRating" />
            <br />
            <div class="feedback-text-link text-body-2">
              <a href="#">↪ dit klopt niet voor mij</a>
            </div>
          </div>
        </v-col></v-row
      >
      <v-divider class="my-3" />
      <v-row no-gutters class="mt-3 text-body-2">
        <v-col :cols="1">
          <rating-icon
            :rating="quay.profileAccessibleScore.quayThresholdRating"
          />
        </v-col>
        <v-col :cols="3" class="ml-4">
          <img :src="require('@/assets/icons/quayThreshold.svg')" />
        </v-col>
        <v-col>
          <h4>Op de halte komen</h4>
          <p>
            {{
              quay.elevatorMalfunction
                ? "Halte mogelijk niet bereikbaar met lift"
                : quay.ramp
                ? "Hellingbaan aanwezig"
                : quay.lift
                ? `Halte bereikbaar met lift`
                : quay.stopplaceaccessroute
                ? `Halte bereikbaar vanaf omgeving`
                : quay.profileAccessibleScore.quayThreshold
                ? `Drempel: ${quay.profileAccessibleScore.quayThreshold *
                    100} cm`
                : `Drempel onbekend`
            }}<br />
          </p>
          <v-alert dense outlined type="error" class="text-body-2">
            <strong>{{ quay.elevatorMalfunction.Omschrijving }}</strong
            ><br />{{ quay.elevatorMalfunction.Prognose }}
          </v-alert>
        </v-col>
      </v-row>
      <v-divider class="mb-3" />

      <v-row no-gutters class="text-body-2">
        <v-col :cols="1">
          <rating-icon
            :rating="quay.profileAccessibleScore.quayNarrowestWidthRating"
          />
        </v-col>
        <v-col :cols="3" class="ml-4">
          <img :src="require('@/assets/icons/quayWidth.svg')" />
        </v-col>
        <v-col>
          <h4>Haltebreedte</h4>
          <p>
            {{
              quay.boardingpositionwidth
                ? `Breedte: ${quay.boardingpositionwidth} m`
                : `Breedte onbekend`
            }}<br />
            {{
              quay.profileAccessibleScore.quayNarrowestWidth
                ? `Smalste doorgang: ${quay.profileAccessibleScore.quayNarrowestWidth} m`
                : `Smalste doorgang onbekend`
            }}
          </p>
        </v-col>
      </v-row>
      <v-divider class="mb-3" />

      <div id="no-ramp-rows" class="detail-wrapper">
        <v-overlay
          v-if="profile.ramp"
          :absolute="true"
          class="mt-n3 mx-n6"
          :opacity="0.1"
        />
        <v-row no-gutters class="text-body-2">
          <v-col :cols="1">
            <rating-icon
              :disabled="profile.ramp"
              :rating="quay.profileAccessibleScore.vehicleThresholdRating"
            />
          </v-col>
          <v-col :cols="3" class="ml-4">
            <img :src="require('@/assets/icons/quayThresholdToVehicle.svg')" />
          </v-col>
          <v-col>
            <h4>Instappen zonder plank</h4>
            <p>
              {{
                quay.profileAccessibleScore.vehicleThreshold
                  ? `Hoogte tot voertuig: ${Math.round(
                      quay.profileAccessibleScore.vehicleThreshold * 100
                    )} cm`
                  : `Hoogte halte onbekend`
              }}

              <br />
              <span v-if="quay.transportmode === 'tram'"
                >Diepte tot tram: 2-5 cm</span
              >
            </p>
          </v-col>
        </v-row>
      </div>

      <div id="ramp-rows" class="detail-wrapper">
        <v-divider class="mb-3" />
        <v-overlay
          v-if="!profile.ramp"
          :absolute="true"
          class="mx-n6"
          :opacity="0.1"
          :z-index="1"
        />
        <v-row no-gutters class="text-body-2">
          <v-col :cols="1">
            <rating-icon
              :disabled="!profile.ramp"
              :rating="quay.profileAccessibleScore.rampMinHeightRating"
            />
          </v-col>
          <v-col :cols="3" class="ml-4">
            <img :src="require('@/assets/icons/quayRamproom.svg')" />
          </v-col>
          <v-col>
            <h4>Haltehoogte voor plank</h4>
            <p v-if="quay.profileAccessibleScore.rampMinHeightRating === 3">
              Halte hoog genoeg voor plank
            </p>
            <p v-if="quay.profileAccessibleScore.rampMinHeightRating === 2">
              Halte
              <strong>
                net
              </strong>
              hoog genoeg voor plank
            </p>
            <p v-if="quay.profileAccessibleScore.rampMinHeightRating === 1">
              Halte waarschijnlijk <strong>niet</strong> hoog genoeg voor plank
            </p>
            <p
              v-else-if="quay.profileAccessibleScore.rampMinHeightRating === 0"
            >
              Halte <strong>niet</strong> hoog genoeg voor plank
            </p>
          </v-col>
        </v-row>
        <v-divider class="mb-3" />
        <v-row no-gutters class="text-body-2">
          <v-col :cols="1">
            <rating-icon
              :disabled="!profile.ramp"
              :rating="quay.profileAccessibleScore.rampRoomWidthRating"
            />
          </v-col>
          <v-col :cols="3" class="ml-4">
            <img :src="require('@/assets/icons/quayRamproom.svg')" />
          </v-col>
          <v-col>
            <h4>Haltebreedte voor plank</h4>
            <p v-if="quay.profileAccessibleScore.rampRoomWidthRating === 3">
              Halte breed genoeg voor oprijplank
            </p>
            <p v-if="quay.profileAccessibleScore.rampRoomWidthRating === 2">
              Halte
              <strong>
                net
              </strong>
              breed genoeg voor plank
            </p>
            <p v-if="quay.profileAccessibleScore.rampRoomWidthRating === 1">
              Halte waarschijnlijk <strong>niet</strong> breed genoeg voor plank
            </p>
            <p
              v-else-if="quay.profileAccessibleScore.rampRoomWidthRating === 0"
            >
              Halte <strong>niet</strong> breed genoeg voor plank
            </p>
          </v-col>
        </v-row>
        <div class="feedback-text-link text-body-2">
          <a href="#">↪ er lijkt iets niet te kloppen</a>
        </div>
      </div>
    </div>
    <div class="mx-n4 mt-n4">
      <v-divider />
    </div>
    <div v-if="passes && passes.length" class="ma-4 mt-12">
      <h3>
        Vertrektijden
      </h3>
      <div class="mx-n4">
        <v-divider />
      </div>
      <template v-for="(item, index) in passes">
        <v-row :key="`pass-${index}`" no-gutters class="my-2 text-body-2">
          <v-col :cols="3">
            <vehicle-icon
              :transportmode="quay.transportmode"
              :height="24"
              :width="24"
            />
            <v-chip label color="secondary" outlined class="ml-2">
              <strong>{{ item.LinePublicNumber }}</strong>
            </v-chip>
          </v-col>
          <v-col class="pt-1">{{ item.DestinationName50 }}</v-col>
          <v-col :cols="2" class="ml-2 pt-1"
            ><strong
              >{{ formatDistancePass(item.ExpectedDepartureTime) }} min
            </strong></v-col
          >
        </v-row>

        <v-divider
          v-if="index < passes.length - 1"
          :key="`divider-${index}`"
        ></v-divider>
      </template>
      <div class="mx-n4">
        <v-divider />
      </div>
    </div>

    <div class="ma-4 my-12">
      <h3>
        Reviews
      </h3>
      <div class="mx-n4">
        <v-divider />
      </div>
      <v-card elevation="2" class="pa-2 mt-2 text-body-2">
        Obcaecati dicta adipisci ratione quas vel deserunt, mollitia sequi!
      </v-card>
      <v-card elevation="2" class="pa-2 my-4 text-body-2">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. At doloribus
        earum quisquam quam voluptatibus, dolores saepe commodi natus officiis
        aspernatur quas.
      </v-card>
      <v-spacer class="my-8" />
      <div class="mx-n4">
        <v-divider />
      </div>
      <v-spacer class="my-8" />
      <v-btn
        block
        class="text-none text-body"
        color="secondary"
        Maak
        een
        melding
      >
        <v-icon left dark>
          mdi-alert
        </v-icon>
        <strong>Maak een melding</strong>
      </v-btn>
      <v-spacer class="my-16" />
    </div>
  </div>
</template>

<script>
import VehicleIcon from "@/components/VehicleIcon.vue";
import RatingLabel from "@/components/RatingLabel.vue";
import DistanceText from "@/components/DistanceText.vue";

import { mapGetters, mapState } from "vuex";

import compareAsc from "date-fns/compareAsc";
import isAfter from "date-fns/isAfter";
import differenceInMinutes from "date-fns/differenceInMinutes";
import parseISO from "date-fns/parseISO";
import RatingIcon from "../components/RatingIcon.vue";

export default {
  name: "QuayDetail",
  data: () => ({ OVapi: null }),
  components: { VehicleIcon, RatingLabel, DistanceText, RatingIcon },
  computed: {
    ...mapGetters(["filteredQuays"]),
    ...mapState(["profile"]),
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
            .filter((d) =>
              isAfter(parseISO(d.ExpectedDepartureTime), new Date())
            )
            .sort((a, b) =>
              compareAsc(
                parseISO(a.ExpectedDepartureTime),
                parseISO(b.ExpectedDepartureTime)
              )
            )
            .slice(0, 6)
        : null;
    },
    directions: function() {
      return [...new Set(this.passes.map((el) => el.DestinationName50))];
    },
  },
  methods: {
    // TODO: move this and other API calls to seperate script / store methods
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
      return differenceInMinutes(parseISO(ExpectedDepartureTime), new Date());
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
.detail-wrapper {
  position: relative;
}
.v-btn {
  letter-spacing: 0;
}
.feedback-text-link {
  float: right;
  a {
    text-decoration: none;
    color: var(--v-secondary-base);
  }
  font-weight: 700;
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
