<template>
  <div>
    <v-bottom-sheet v-model="feedbackopen" scrollable overlay-color="white">
      <v-card height="75vh">
        <v-card-actions>
          <v-icon @click="feedbackopen = false" class="mr-2">mdi-close</v-icon>
          <h2>
            Feedback over deze halte
          </h2>
        </v-card-actions>
        <v-card-text class="text-body-2 pr-8 pl-4">
          <template id="feedback-form" v-if="feedbackmode">
            <v-form>
              <h3 class="mt-4">Vink aan wat niet klopt</h3>
              <div class="mx-n6">
                <v-divider />
              </div>
              <template
                v-if="quay.transportmode !== 'ferry'"
                id="non-ferry-feedback-options"
              >
                <div
                  class="detail-wrapper"
                  v-for="row in ratingInfo"
                  v-bind:key="row.id"
                >
                  <template v-if="!row.hidden">
                    <v-row no-gutters class="mt-3 text-body-2">
                      <v-col :cols="1">
                        <!-- <rating-icon :disabled="row.overlay" :rating="row.rating" /> -->
                        <v-checkbox
                          v-model="feedback.checkboxes"
                          :value="row.title"
                          hide-details
                          class="shrink ma-0 text-body-2"
                        />
                      </v-col>
                      <v-col :cols="3" class="ml-4">
                        <img :src="row.icon" />
                      </v-col>
                      <v-col>
                        <h4>{{ row.title }}</h4>
                        <p v-html="row.text"></p>
                      </v-col>
                    </v-row>
                  </template>
                </div>
              </template>
              <template id="extra-feedback-options">
                <v-row no-gutters class="mt-3 text-body-2">
                  <v-col :cols="1">
                    <!-- <rating-icon :disabled="row.overlay" :rating="row.rating" /> -->
                    <v-checkbox
                      v-model="feedback.checkboxes"
                      value="Iets kapot"
                      hide-details
                      class="shrink ma-0 text-body-2"
                    />
                  </v-col>
                  <v-col :cols="3" class="ml-4">
                    <img :src="require('@/assets/icons/quayRampTram.svg')" />
                  </v-col>
                  <v-col>
                    <h4>Er is iets kapot of er ging tijdens de rit wat mis</h4>
                    <p>
                      Bijvoorbeeld een kapotte lift of oprijplank. Hier maken we
                      een melding van bij de vervoerder.
                    </p>
                  </v-col>
                </v-row>
                <v-row no-gutters class="mt-3 text-body-2">
                  <v-col :cols="1">
                    <!-- <rating-icon :disabled="row.overlay" :rating="row.rating" /> -->
                    <v-checkbox
                      v-model="feedback.checkboxes"
                      value="Iets anders"
                      hide-details
                      class="shrink ma-0 text-body-2"
                    />
                  </v-col>
                  <v-col :cols="3" class="ml-4">
                    <img :src="require('@/assets/icons/quayRampTram.svg')" />
                  </v-col>
                  <v-col>
                    <h4>Er is iets anders aan de hand</h4>
                    <p>
                      We zijn overal benieuwd naar, licht het hieronder ook even
                      toe!
                    </p>
                  </v-col>
                </v-row>
              </template>
              <h3 v-if="quay.transportmode === 'ferry'" class="mt-4">
                Wat gaat niet goed bij deze halte?
              </h3>
              <h3 v-else class="mt-4">Kun je dit toelichten?</h3>
              <div class="mx-n4">
                <v-divider />
              </div>
              <v-textarea
                v-model="feedback.textinput"
                label="Uitgebreide uitleg helpt!"
                outlined
                class="py-4 rounded-0"
                hide-details
              ></v-textarea>
              <v-btn
                @click="
                  feedbackmode = false;
                  thankyoumode = true;
                "
                block
                class="text-none text-body rounded-0"
                color="secondary"
              >
                <v-icon left dark>
                  mdi-send
                </v-icon>
                <strong>Stuur op</strong>
              </v-btn>
            </v-form>
          </template>
          <template v-else-if="thankyoumode">
            <h4>Dankjewel!</h4>
            <p>
              We gaan uitzoeken of we dit kunnen aanpassen.
            </p>
            <h4>Op de hoogte blijven?</h4>
            <p>
              Wil je hierover op de hoogte gehouden worden? Laat je e-mailadres
              achter (optioneel):
            </p>
            <v-form>
              <v-text-field
                label="e-mailadres"
                outlined
                class="py-4 rounded-0"
                hide-details
                v-model="feedback.emailadres"
              />
              <v-btn
                @click="feedbackopen = false"
                block
                class="text-none text-body rounded-0"
                color="secondary"
              >
                <v-icon left dark v-if="feedback.emailadres !== ''">
                  mdi-send
                </v-icon>
                <strong>{{
                  feedback.emailadres === ""
                    ? "Verder zonder e-mailadres"
                    : "Hou me op de hoogte"
                }}</strong>
              </v-btn>
            </v-form>
          </template>
        </v-card-text>
      </v-card>
    </v-bottom-sheet>

    <v-btn icon to="/" class="ma-2">
      <v-icon color="grey darken-4">mdi-arrow-left</v-icon>
    </v-btn>
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
            Richting {{ quay.directionfull }} {{ quay.direction }}
          </div>
          <p class="mb-0">
            <v-chip-group column>
              <v-btn
                color="secondary"
                depressed
                class="text-none text-body mt-1 mr-2 rounded-0"
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
            <template>
              <br />
              <div class="feedback-text-link text-body-2">
                <a @click="feedbackopen = !feedbackopen"
                  >↪ dit klopt niet voor mij</a
                >
              </div>
            </template>
          </div>
        </v-col>
      </v-row>
      <v-divider class="my-3" />
      <template v-if="quay.transportmode === 'ferry'">
        <span class="text-body-2">
          <strong>
            Ponten zijn toegankelijk met een rolstoel, scootmobiel of andere
            hulpmiddelen
          </strong>
        </span>
      </template>
      <template v-if="quay.transportmode !== 'ferry'">
        <div
          class="detail-wrapper"
          v-for="(row, rowIndex) in ratingInfo"
          v-bind:key="row.id"
        >
          <template v-if="!row.hidden">
            <v-overlay
              v-if="row.overlay"
              :absolute="true"
              class="mt-n3 mx-n6"
              :opacity="0.1"
              :z-index="1"
            />
            <v-row no-gutters class="mt-3 text-body-2">
              <v-col :cols="1">
                <rating-icon :disabled="row.overlay" :rating="row.rating" />
              </v-col>
              <v-col :cols="3" class="ml-4">
                <img :src="row.icon" />
              </v-col>
              <v-col>
                <h4>{{ row.title }}</h4>
                <p v-html="row.text"></p>
              </v-col>
              <v-alert
                v-if="row.alert"
                dense
                outlined
                type="error"
                class="text-body-2"
              >
                <strong>{{ row.alert[0] }}</strong
                ><br />{{ row.alert[1] }}
              </v-alert>
            </v-row>
            <v-divider
              v-if="rowIndex < ratingInfo.length - 1"
              :key="`row-divider-${rowIndex}`"
              class="mb-3"
            ></v-divider>
          </template>
        </div>
      </template>
    </div>
    <div class="mx-n4 mt-n4">
      <v-divider />
    </div>

    <div v-if="passes && passes.length" class="ma-4 mt-12">
      <h3>
        Vertrektijden
      </h3>
      <v-alert
        v-if="oldTramWarning"
        dense
        outlined
        type="error"
        class="text-body-2"
      >
        <strong>Op lijn 5 & 19 rijden oude trams</strong><br />Oude trams zijn
        minder goed toegankelijk. De oude trams rijden meestal afwisselend op de
        lijn met nieuwe trams.
      </v-alert>
      <div class="mx-n4">
        <v-divider />
      </div>
      <template v-for="(item, passIndex) in passes">
        <v-row
          :key="`pass-${passIndex}`"
          no-gutters
          class="my-2 text-body-2"
          align="center"
        >
          <v-col :cols="4">
            <vehicle-icon
              :transportmode="quay.transportmode"
              :height="24"
              :width="24"
            />
            &nbsp;&nbsp;<v-chip label color="secondary" outlined>
              <strong>{{ item.LinePublicNumber }}</strong>
            </v-chip>
          </v-col>
          <v-col>{{ item.DestinationName50 }}</v-col>
          <v-col :cols="2"
            ><strong
              >{{ formatDistancePass(item.ExpectedDepartureTime) }} min
            </strong></v-col
          >
        </v-row>
        <v-divider
          v-if="passIndex < passes.length - 1"
          :key="`pass-divider-${passIndex}`"
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
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState, mapActions } from "vuex";

import VehicleIcon from "@/components/VehicleIcon.vue";
import RatingLabel from "@/components/RatingLabel.vue";
import DistanceText from "@/components/DistanceText.vue";
import RatingIcon from "@/components/RatingIcon.vue";

import compareAsc from "date-fns/compareAsc";
import isAfter from "date-fns/isAfter";
import differenceInMinutes from "date-fns/differenceInMinutes";
import parseISO from "date-fns/parseISO";

export default {
  name: "QuayDetail",
  data: () => ({
    OVapi: null,
    saved: false,
    feedbackopen: false,
    feedbackmode: false,
    thankyoumode: false,
    feedback: {
      checkboxes: [],
      textinput: "",
      emailadres: "",
    },
  }),
  watch: {
    feedbackopen: function(v) {
      if (v) {
        this.feedbackmode = true;
        this.thankyoumode = false;
      } else return;
    },
  },
  components: { VehicleIcon, RatingLabel, DistanceText, RatingIcon },
  computed: {
    ...mapGetters(["enhancedQuays"]),
    ...mapState(["profile", "filters"]),
    quay: function() {
      const foundQuay = this.enhancedQuays.find(
        (quay) => quay.quaycode === this.$route.params.quaycode
      );
      return foundQuay;
    },
    ratingInfo: function() {
      return [
        {
          id: "threshold",
          title: "Op de halte komen",
          rating: this.quay.profileAccessibleScore.quayThresholdRating,
          icon: require("@/assets/icons/quayThreshold.svg"),
          text: this.quay.elevatorMalfunction
            ? "Halte mogelijk niet bereikbaar met lift"
            : this.quay.ramp
            ? `Hellingbaan aanwezig, hoogte halte ${Math.round(
                this.quay.profileAccessibleScore.rampKerbHeight * 100
              )} cm`
            : this.quay.lift
            ? `Halte bereikbaar met lift`
            : this.quay.stopplaceaccessroute
            ? `Halte bereikbaar vanaf omgeving, hoogte ${Math.round(
                this.quay.profileAccessibleScore.rampKerbHeight * 100
              )} cm`
            : this.quay.profileAccessibleScore.quayThreshold
            ? `Drempel: ${Math.round(
                this.quay.profileAccessibleScore.quayThreshold * 100
              )} cm`
            : `Drempel onbekend`,
          alert: this.quay?.elevatorMalfunction?.Omschrijving
            ? [
                this.quay.elevatorMalfunction.Omschrijving,
                this.quay.elevatorMalfunction.Prognose,
              ]
            : null,
        },
        {
          id: "width",
          title: "Haltebreedte",
          rating: this.quay.profileAccessibleScore.quayNarrowestWidthRating,
          icon: require("@/assets/icons/quayWidth.svg"),
          text: `${
            this.quay.boardingpositionwidth
              ? `Breedte: ${this.quay.boardingpositionwidth} m`
              : `Breedte onbekend`
          } <br />
          ${
            this.quay.profileAccessibleScore.quayNarrowestWidth
              ? `Smalste doorgang: ${this.quay.profileAccessibleScore.quayNarrowestWidth} m`
              : `Smalste doorgang onbekend`
          }`,
        },
        {
          id: "vehicleThreshold",
          title: "Instappen zonder oprijplank",
          rating: this.quay.profileAccessibleScore.vehicleThresholdRating,
          icon: !this.quay.transportmode
            ? require("@/assets/icons/quayThresholdToVehicle.svg")
            : this.quay.transportmode === "tram"
            ? require("@/assets/icons/quayThresholdToVehicleTram.svg")
            : this.quay.transportmode === "bus"
            ? require("@/assets/icons/quayThresholdToVehicleBus.svg")
            : this.quay.transportmode === "metro"
            ? require("@/assets/icons/quayThresholdToVehicleMetro.svg")
            : require("@/assets/icons/quayThresholdToVehicle.svg"),
          text: `${
            this.quay.transportmode === "metro"
              ? "Metro ingang is gelijkvloers"
              : this.quay.profileAccessibleScore.vehicleThreshold
              ? `Hoogte tot voertuig: ${Math.round(
                  this.quay.profileAccessibleScore.vehicleThreshold * 100
                )} cm`
              : `Hoogte halte onbekend`
          } ${
            this.quay.transportmode && this.quay.transportmode === "tram"
              ? `<br /> Diepte tot tram: 2-5 cm`
              : ""
          }`,
          overlay: this.profile.ramp && this.quay.transportmode !== "metro",
        },
        {
          id: "rampMinHeight",
          title: "Haltehoogte voor oprijplank",
          rating: this.quay.profileAccessibleScore.rampMinHeightRating,
          icon: !this.quay.transportmode
            ? require("@/assets/icons/quayRamp.svg")
            : this.quay.transportmode === "tram"
            ? require("@/assets/icons/quayRampTram.svg")
            : this.quay.transportmode === "bus"
            ? require("@/assets/icons/quayRampBus.svg")
            : this.quay.transportmode === "metro"
            ? require("@/assets/icons/quayRampMetro.svg")
            : require("@/assets/icons/quayRamp.svg"),
          text: `${
            this.quay.profileAccessibleScore.rampMinHeightRating === 3
              ? "Halte <strong>hoog genoeg</strong> voor oprijplank"
              : this.quay.profileAccessibleScore.rampMinHeightRating === 2
              ? `Halte <strong> net hoog genoeg</strong> voor oprijplank`
              : this.quay.profileAccessibleScore.rampMinHeightRating === 1
              ? `Halte <strong>waarschijnlijk niet hoog genoeg</strong> voor oprijplank`
              : this.quay.profileAccessibleScore.rampMinHeightRating === 0
              ? `Halte <strong>niet hoog genoeg</strong> voor oprijplank`
              : `Hoogte halte onbekend`
          }`,
          overlay: !this.profile.ramp,
          hidden: this.quay.transportmode === "metro",
        },
        {
          id: "rampRoomWidth",
          title: "Haltebreedte voor oprijplank",
          rating: this.quay.profileAccessibleScore.rampRoomWidthRating,
          icon: !this.quay.transportmode
            ? require("@/assets/icons/quayRamp.svg")
            : this.quay.transportmode === "tram"
            ? require("@/assets/icons/quayRampTram.svg")
            : this.quay.transportmode === "bus"
            ? require("@/assets/icons/quayRampBus.svg")
            : this.quay.transportmode === "metro"
            ? require("@/assets/icons/quayRampMetro.svg")
            : require("@/assets/icons/quayRamp.svg"),
          text: `${
            this.quay.profileAccessibleScore.rampRoomWidthRating === 3
              ? "Halte <strong>breed genoeg</strong> voor oprijplank"
              : this.quay.profileAccessibleScore.rampRoomWidthRating === 2
              ? `Halte <strong>net breed genoeg</strong> voor oprijplank`
              : this.quay.profileAccessibleScore.rampRoomWidthRating === 1
              ? `Halte <strong>waarschijnlijk niet breed genoeg</strong> voor oprijplank`
              : this.quay.profileAccessibleScore.rampRoomWidthRating === 0
              ? `Halte <strong>niet breed genoeg</strong> voor oprijplank`
              : `Plank breedte onbekend`
          }`,
          overlay: !this.profile.ramp,
          hidden: this.quay.transportmode === "metro",
        },
      ];
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
    destinations: function() {
      return [...new Set(this.passes.map((el) => el.DestinationName50))];
    },
    lineNumbers: function() {
      return this.passes
        ? [...new Set(this.passes.map((el) => el.LinePublicNumber))]
        : null;
    },
    oldTramWarning: function() {
      return this.passes && this.lineNumbers
        ? this.lineNumbers.includes("19") || this.lineNumbers.includes("5")
        : null;
    },
    isFavourite: function() {
      return this.filters.favourites.includes(this.quay.quaycode);
    },
  },
  methods: {
    ...mapActions(["changeFilter"]),
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
    updateFavourites: function() {
      const favouritesPlusQuay = [
        ...new Set([...this.filters.favourites, this.quay.quaycode]),
      ];
      const favouritesMinusQuay = this.filters.favourites.filter(
        (d) => d !== this.quay.quaycode
      );
      if (this.isFavourite) {
        this.changeFilter({
          prop: "favourites",
          value: favouritesMinusQuay,
        });
        return;
      }
      if (!this.isFavourite) {
        this.changeFilter({
          prop: "favourites",
          value: favouritesPlusQuay,
        });
        return;
      } else return;
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
.v-chip.v-chip--outlined.v-chip--active:before {
  opacity: 0;
}
.theme--light.v-chip:hover::before {
  opacity: 0;
}

// TODO: very dirty, fix with vuetify classes or other solution
.v-card__text {
  color: rgba(0, 0, 0, 0.87) !important;
}
.lines {
  line-height: 2rem;
}
</style>
