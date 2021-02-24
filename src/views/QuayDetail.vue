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
                <rating-icon :rating="row.rating" />
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
            ? `Hellingbaan aanwezig`
            : this.quay.lift
            ? `Halte bereikbaar met lift`
            : this.quay.stopplaceaccessroute
            ? `Halte bereikbaar vanaf omgeving`
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
              "Niet iedere halte is breed genoeg voor een rolstoel of ander hulpmiddel. Zo berekenen we de score:",
            tableHeader: "De smalste doorgang van de halte is:",
            scoreTable: [
              {
                score: 3,
                text: "meer dan 5 cm breder dan de waarde in je reisprofiel",
              },
              {
                score: 2,
                text: "0 tot 5 cm breder dan de waarde in je reisprofiel",
              },
              {
                score: 1,
                text: "tot 5 cm smaller dan de waarde in je reisprofiel",
              },
              {
                score: 0,
                text: "meer dan 5 cm smaller dan de waarde in je reisprofiel",
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
          text: `Hoogte halte: ${Math.round(
            this.quay.profileAccessibleScore.rampKerbHeight * 100
          )} cm <br />${
            this.quay.transportmode === "metro"
              ? "Metro ingang is gelijkvloers"
              : this.quay.profileAccessibleScore.vehicleThreshold
              ? `Hoogte tot voertuig: ${Math.round(
                  this.quay.profileAccessibleScore.vehicleThreshold * 100
                )} cm`
              : `Hoogte halte onbekend`
          } ${
            this.quay.transportmode && this.quay.transportmode === "tram"
              ? `<br /> Afstand tot tram: 2-5 cm`
              : ""
          }`,
          overlay:
            this.profile.ramp &&
            this.quay.profileAccessibleScore.vehicleThresholdRating <
              this.quay.profileAccessibleScore.rampRating &&
            this.quay.transportmode !== "metro",
          explanation: {
            title: `Het voertuig instappen`,
            text:
              this.quay.transportmode === "bus"
                ? "<p>Bussen in Amsterdam beschikken over een knielsysteem waardoor de vloerhoogte van de bus kan zakken tot 23 cm hoogte. De bus kan daardoor dichterbij de halte komen of soms zelfs tot dezelfde hoogte.</p><p>We vergelijken de hoogte tot het voertuig met de waarde in je reisprofiel bij ‘Hoe hoog mag een drempel zijn’.</p><p><strong>Let op</strong>: De horizontale afstand van de halte tot de bus is afhankelijk van hoe dicht de bus tot de rand van de halte kan stoppen. Hier kunnen we helaas niets over zeggen.</p><p>We berekenen de score alsvolgt:</p>"
                : this.quay.transportmode === "tram"
                ? "De horizontale afstand van de halte tot de tram is ongeveer 4 cm. De vloerhoogte van trams in Amsterdam is standaard 29 cm. Door deze hoogte te vergelijken met de haltehoogte bij de instapplek benaderen we de hoogte tot de tram bij het instappen."
                : this.quay.transportmode === "metro"
                ? "De metro ingang is standaard op de zelfde hoogte als het perron. Hier kan een kleine afwijking in zitten door bijvoorbeeld slijtage van de wielen. Er is ook altijd een kleine horizontale 'gap' tussen de metro en het perron van ongeveer 4 cm."
                : "We kijken naar de hoogte van het perron en de voertuigen om te bepalen of je het voertuig in kan stappen. We kijken hiervoor naar de drempelwaarde in je profiel.",
            tableHeader: "De hoogte tot het voertuig is:",
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
          overlay:
            this.quay.profileAccessibleScore.vehicleThresholdRating >
              this.quay.profileAccessibleScore.rampRating || !this.profile.ramp,
          hidden: this.quay.transportmode === "metro",
          explanation: {
            title: "Is de halte hoog genoeg om de oprijplank te gebruiken?",
            text:
              "In bussen en trams zijn oprijplanken aanwezig. Niet iedere halte is hoog genoeg om de oprijplank te laten aansluiten op de halte.",
            tableHeader: "De halte is:",
            scoreTable: [
              { score: 3, text: "hoog genoeg voor de oprijplank" },
              {
                score: 2,
                text: "waarschijnlijk hoog genoeg voor de plank, 2 cm speling",
              },
              {
                score: 1,
                text:
                  "misschien hoog genoeg voor de plank, tot 4 cm speling, het zal erom spannen.",
              },
              {
                score: 0,
                text:
                  "te laag om de oprijplank aan de laten sluiten (meer dan 4 cm)",
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
              ? `Breedte die overblijft bij gebruik oprijplank: ${Math.round(
                  this.quay.profileAccessibleScore.rampRoomWidthDifference *
                    1000
                ) / 10} cm`
              : `Halte is waarschijnlijk ${-Math.round(
                  this.quay.profileAccessibleScore.rampRoomWidthDifference *
                    1000
                ) / 10} cm te smal om de plank uit te schuiven.`
          }`,
          overlay:
            this.quay.profileAccessibleScore.vehicleThresholdRating >
              this.quay.profileAccessibleScore.rampRating || !this.profile.ramp,
          hidden: this.quay.transportmode === "metro",
          explanation: {
            title: "Is de halte breed genoeg om de oprijplank te gebruiken?",
            text:
              "<p>In bussen en trams zijn oprijplanken aanwezig die gebruikt kunnen worden als de 'gap' naar het voertuig te groot is om het voertuig binnen te gaan. De halte moet voldoende breed zijn om genoeg ruimte te hebben om de oprijplank uit te klappen en er ook nog op te kunnen draaien met bijvoorbeeld een rolstoel.</p><p>We weten niet precies welke oprijplanken in welk voertuig zitten. Het is daarom lastig om precies te berekenen of een halte breed genoeg is. We kunnen wel een goede inschatting maken: als een halte minimaal 150 cm is, dan is deze breed genoeg om de oprijplank te gebruiken.</p><p>Als een halte minder dan 150 cm breed is, dan zou het alsnog kunnen lukken wanneer er een brede stoeprand aanwezig is. De breedte van de stoeprand hebben we namelijk geen informatie over en deze wordt niet meegerekend in de breedte van de halte.</p>",
            tableHeader: "De breedte van de halte is:",
            scoreTable: [
              {
                score: 3,
                text: "meer dan 155 cm",
              },
              {
                score: 2,
                text: "150 tot 155 cm",
              },
              {
                score: 1,
                text:
                  "130 - 150 cm (misschien lukt het alsnog om de oprijplank te gebruiken als er een brede stoeprand aanwezig is)",
              },
              {
                score: 0,
                text: "smaller dan 130 cm",
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
