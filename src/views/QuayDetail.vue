<template>
  <div>
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
        </v-col>
      </v-row>
      <v-divider class="my-3" />
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
            &nbsp;&nbsp;
            <span class="text-h6">{{
              item.WheelChairAccessible === "ACCESSIBLE" ? "♿︎" : "❌"
            }}</span>
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
    ...mapGetters(["enhancedQuays"]),
    ...mapState(["profile"]),
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
            ? "Hellingbaan aanwezig"
            : this.quay.lift
            ? `Halte bereikbaar met lift`
            : this.quay.stopplaceaccessroute
            ? `Halte bereikbaar vanaf omgeving`
            : this.quay.profileAccessibleScore.quayThreshold
            ? `Drempel: ${this.quay.profileAccessibleScore.quayThreshold *
                100} cm`
            : `Drempel onbekend`,
          alert:
            this.quay?.elevatorMalfunction?.Omschrijving &&
            this.quay?.elevatorMalfunction?.Prognose
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
          icon: require("@/assets/icons/quayThresholdToVehicle.svg"),
          text: `${
            this.quay.profileAccessibleScore.vehicleThreshold
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
          icon: require("@/assets/icons/quayRamproom.svg"),
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
          icon: require("@/assets/icons/quayRamproom.svg"),
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
