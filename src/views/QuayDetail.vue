<template>
  <div>
    <rating-explanation-sheet
      :rating-explanation-open="ratingExplanationOpen"
      :title="getRatingExplanation(ratingExplanationSelected).title"
      :text="getRatingExplanation(ratingExplanationSelected).text"
      :table-header="
        getRatingExplanation(ratingExplanationSelected).tableHeader
      "
      :rating-explanations="
        getRatingExplanation(ratingExplanationSelected).scoreTable
      "
      @close="ratingExplanationOpen = false"
    />

    <general-explanation-sheet
      :general-explanation-open="generalExplanationOpen"
      @close="generalExplanationOpen = false"
    />

    <quay-feedback-sheet
      :feedback-open="feedbackOpen"
      :rating-info="ratingInfo"
      :transportmode="quay.transportmode"
      @close="feedbackOpen = false"
    />

    <v-btn icon @click="$router.go(-1)" class="ma-2">
      <v-icon color="grey darken-4">mdi-arrow-left</v-icon>
    </v-btn>

    <quay-detail-header
      :quay="quay"
      :is-favourite="isFavourite"
      :update-favourites="updateFavourites"
    />

    <div v-if="quay.profileAccessibleScore" class="ma-4 mt-6">
      <h3>
        Toegankelijkheid
        <v-icon small class="pb-1" @click="generalExplanationOpen = true">
          mdi-information-outline
        </v-icon>
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
                <a @click="feedbackOpen = !feedbackOpen"
                  >↪ dit klopt niet volgens mij</a
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
            <v-row
              no-gutters
              class="mt-3 text-body-2"
              @click="showRatingExplanationSheet(row.id)"
            >
              <v-col :cols="1">
                <rating-icon :disabled="row.overlay" :rating="row.rating" />
              </v-col>
              <v-col :cols="2" class="ml-2">
                <img :src="row.icon" />
              </v-col>
              <v-col class="ml-4">
                <h4>
                  {{ row.title }}
                  <v-icon small class="pb-1" v-if="row.explanation">
                    mdi-information-outline
                  </v-icon>
                </h4>
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

            <v-overlay
              color="grey lighten-2"
              v-if="row.overlay"
              :absolute="true"
              class="mt-n3 mx-n4"
              :opacity="0.75"
              :z-index="1"
            />
            <v-divider
              v-if="
                rowIndex < ratingInfo.length - 1 &&
                  !ratingInfo[rowIndex + 1].overlay
              "
              :key="`row-divider-${rowIndex}`"
              class="mb-3"
            ></v-divider>
          </template>
        </div>
      </template>
    </div>
    <div class="mx-0 mt-n4">
      <v-divider />
    </div>

    <quay-time-table
      class="ma-4 mt-12"
      v-if="passes && passes.length"
      :passes="passes"
      :oldTramWarning="oldTramWarning"
      :transportmode="quay.transportmode"
      :formatDistancePass="formatDistancePass"
    />

    <reviews :numberOfReviews="3" :quaycode="quay.quaycode" />
  </div>
</template>

<script>
import { mapGetters, mapState, mapActions } from "vuex";

// import VehicleIcon from "@/components/VehicleIcon.vue";
// import DistanceText from "@/components/DistanceText.vue";

import RatingLabel from "@/components/RatingLabel.vue";
import RatingIcon from "@/components/RatingIcon.vue";

import RatingExplanationSheet from "@/components/quayDetailComponents/RatingExplanationSheet.vue";
import QuayTimeTable from "@/components/quayDetailComponents/QuayTimeTable.vue";
import GeneralExplanationSheet from "@/components/quayDetailComponents/GeneralExplanationSheet.vue";
import QuayFeedbackSheet from "@/components/quayDetailComponents/QuayFeedbackSheet.vue";
import Reviews from "../components/quayDetailComponents/reviews.vue";
import QuayDetailHeader from "@/components/quayDetailComponents/quayDetailHeader.vue";

import compareAsc from "date-fns/compareAsc";
import isAfter from "date-fns/isAfter";
import differenceInMinutes from "date-fns/differenceInMinutes";
import parseISO from "date-fns/parseISO";

export default {
  name: "QuayDetail",
  data: () => ({
    OVapi: null,
    saved: false,
    ratingExplanationSelected: "",
    feedbackOpen: false,
    ratingExplanationOpen: false,
    generalExplanationOpen: false,
  }),
  components: {
    RatingLabel,
    RatingIcon,
    RatingExplanationSheet,
    QuayTimeTable,
    GeneralExplanationSheet,
    QuayFeedbackSheet,
    Reviews,
    QuayDetailHeader,
  },
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
          explanation: {
            title: "Op de halte komen",
            text:
              "Sommige haltes hebben een drempel of zijn alleen via een trap bereikbaar. We vergelijken de opgang van de halte met de waarde die je in het reisprofiel hebt gegeven bij ‘Hoe hoog mag een drempel zijn’. Vervolgens berekenen we een toegankelijkheidsscore.",
            tableHeader: "De opgang van de halte is:",
            scoreTable: [
              { score: 3, text: "lager dan de waarde in je reisprofiel" },
              {
                score: 2,
                text: "0–1 cm hoger dan de waarde in je reisprofiel",
              },
              {
                score: 1,
                text: "1–2 cm lager dan de waarde in je reisprofiel",
              },
              {
                score: 0,
                text: "meer dan 2 cm hoger dan de waarde in je reisprofiel",
              },
            ],
          },
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
          }. ${
            Math.sign(
              this.quay.profileAccessibleScore.quayNarrowestWidthDifference
            ) === 1
              ? `${Math.round(
                  this.quay.profileAccessibleScore
                    .quayNarrowestWidthDifference * 1000
                ) / 10} cm breder dan de breedte in je profielwaarde.`
              : `Halte is ${-Math.round(
                  this.quay.profileAccessibleScore
                    .quayNarrowestWidthDifference * 1000
                ) / 10} cm minder dan de breedte in je profielwaarde.`
          }`,
          explanation: {
            title: "Is de halte breed genoeg?",
            text:
              "Niet iedere halte is breed genoeg om doorheen te kunnen met een rolstoel of ander hulpmiddel. Zo berekenen we de score:",
            tableHeader: "De breedte van de halte is:",
            scoreTable: [
              { score: 3, text: "5 cm breder dan de waarde in je reisprofiel" },
              {
                score: 2,
                text: "0-5 cm breder dan de waarde in je reisprofiel",
              },
              {
                score: 1,
                text: "tot 5 cm smaller dan de waarde in je reisprofiel",
              },
              {
                score: 0,
                text: "meer dan 5 cm hoger dan de waarde in je reisprofiel",
              },
            ],
          },
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
          explanation: {
            title: "Het voertuig instappen",
            text:
              "We kijken naar de hoogte van het perron en de voertuigen om te bepalen of je het voertuig in kan stappen. We kijken hiervoor naar de drempelwaarde in je profiel.",
            tableHeader: "De hoogte naar het voertuig is:",
            scoreTable: [
              { score: 3, text: "lager dan de waarde in je reisprofiel" },
              {
                score: 2,
                text: "0–1 cm hoger dan de waarde in je reisprofiel",
              },
              {
                score: 1,
                text: "1–2 cm lager dan de waarde in je reisprofiel",
              },
              {
                score: 0,
                text: "meer dan 2 cm hoger dan de waarde in je reisprofiel",
              },
            ],
          },
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
              : `Hoogte halte onbekend, we gaan uit van een hoogte van 0 cm`
          }. ${
            Math.sign(
              this.quay.profileAccessibleScore.rampMinHeightDifference
            ) === 1
              ? `${Math.round(
                  this.quay.profileAccessibleScore.rampMinHeightDifference *
                    1000
                ) / 10} cm hoger dan nodig.`
              : `Halte is ${-Math.round(
                  this.quay.profileAccessibleScore.rampMinHeightDifference *
                    1000
                ) / 10} cm te laag.`
          }`,
          overlay: !this.profile.ramp,
          hidden: this.quay.transportmode === "metro",
          explanation: {
            title: "Is de halte hoog genoeg voor de plank?",
            text:
              "Niet iedere halte is hoog genoeg om de oprijplank aan te laten sluiten.",
            tableHeader: "De halte is:",
            scoreTable: [
              { score: 3, text: "Hoog genoeg voor de plank" },
              {
                score: 1,
                text:
                  "Misschien net hoog genoeg voor de plank, het zal erom spannen.",
              },
              {
                score: 0,
                text:
                  "Te laag om de oprijplank aan te laten sluiten (meer dan 1 cm)",
              },
            ],
          },
        },
        {
          id: "rampRoomWidth",
          title: "Haltebreedte voor oprijplank",
          rating: this.quay.profileAccessibleScore.rampRoomWidthRating,
          icon: require("@/assets/icons/rampRoomWidth.svg"),
          text: `${
            this.quay.profileAccessibleScore.rampRoomWidthRating === 3
              ? "Halte <strong>breed genoeg</strong> voor oprijplank"
              : this.quay.profileAccessibleScore.rampRoomWidthRating === 2
              ? `Halte <strong>net breed genoeg</strong> voor oprijplank`
              : this.quay.profileAccessibleScore.rampRoomWidthRating === 1
              ? `Halte <strong>waarschijnlijk niet breed genoeg</strong> voor oprijplank, al zou het met een brede stoeprand nog kunnen lukken`
              : this.quay.profileAccessibleScore.rampRoomWidthRating === 0
              ? `Halte <strong>niet breed genoeg</strong> voor oprijplank`
              : `Halte breedte onbekend, 0 cm breedte aangehouden.`
          }. ${
            Math.sign(
              this.quay.profileAccessibleScore.rampRoomWidthDifference
            ) === 1
              ? `${Math.round(
                  this.quay.profileAccessibleScore.rampRoomWidthDifference *
                    1000
                ) / 10} cm breder dan de 150 cm die nodig is voor de plank`
              : `Halte is waarschijnlijk ${-Math.round(
                  this.quay.profileAccessibleScore.rampRoomWidthDifference *
                    1000
                ) / 10} cm te kort om de plank uit te schuiven.`
          }`,
          overlay: !this.profile.ramp,
          hidden: this.quay.transportmode === "metro",
          explanation: {
            title: "Is de halte breed genoeg om de plank op te komen?",
            text:
              "Niet iedere halte is breed genoeg voor het uitleggen en comfortabel oprijden van de oprijplank.",
            tableHeader: "De breedte van de halte is:",
            scoreTable: [
              {
                score: 3,
                text:
                  "5 cm breder dan nodig om de oprijplank op te kunnen komen",
              },
              {
                score: 2,
                text:
                  "0-5 cm breder dan nodig om de oprijplank op te kunnen komen",
              },
              {
                score: 1,
                text:
                  "tot 20 cm smaller dan comfortabel is om de oprijplank op te kunnen komen (het zou nog steeds kunnen lukken als de stoeprand breed genoeg is, want die wordt bij de breedte van het perron niet meegerekend)",
              },
              {
                score: 0,
                text:
                  "meer dan 20 cm smaller om comfortabel de oprijplank op te kunnen komen",
              },
            ],
          },
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
    getRatingExplanation: function(id) {
      return this.ratingInfo.find((el) => el.id === id)
        ? this.ratingInfo.find((el) => el.id === id).explanation
        : {};
    },
    showRatingExplanationSheet: function(id) {
      if (this.getRatingExplanation(id)) {
        this.ratingExplanationSelected = id;
        this.ratingExplanationOpen = true;
      }
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
.detail-wrapper {
  position: relative;
}
.feedback-text-link {
  float: right;
  a {
    text-decoration: none;
    color: var(--v-secondary-base);
  }
  font-weight: 700;
}

.lines {
  line-height: 2rem;
}
</style>
