<template>
  <div>
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title
          >{{ quay.stopplace.stopplacename.publicname }} –
          {{ quay.quaytransportmodes.transportmodedata.transportmode }}
          {{ quay.direction }}
          <span class="float-right"
            >{{
              ["1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣", "6️⃣", "7️⃣", "8️⃣", "9️⃣"][
                Math.floor(Math.random() * 9)
              ]
            }}{{
              ["1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣", "6️⃣", "7️⃣", "8️⃣", "9️⃣"][
                Math.floor(Math.random() * 9)
              ]
            }}</span
          >
        </v-list-item-title>
        <v-list-item-subtitle>
          <v-rating
            color="gvb-yellow"
            dense
            hover
            length="4"
            size="16"
            :value="quay.profileAccessibleScore.overallRating + 1"
          ></v-rating>
        </v-list-item-subtitle>
        <v-container fluid class="px-0">
          <v-row no-gutters>
            <v-col
              v-if="!quay.profileAccessibleScore.threshold"
              align-self="start"
              class="px-0"
              align="center"
            >
              <icon-quay-no-threshold class="icon" />
              <p class="caption">Opgang {{ ratingSymbol(3) }}</p></v-col
            >
            <v-col
              v-if="quay.profileAccessibleScore.threshold"
              align-self="start"
              class="px-0"
              align="center"
            >
              <icon-quay-threshold class="icon" />
              <p class="caption">
                Drempel<br />
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
              <icon-quay-width class="icon" />
              <p class="caption">
                {{
                  quay.profileAccessibleScore.stopNarrowestWidth
                    ? `Breedte
                ${quay.profileAccessibleScore.stopNarrowestWidth}m
                  ${ratingSymbol(
                    quay.profileAccessibleScore.stopNarrowestWidthRating
                  )}`
                    : "Breedte onbekend"
                }}
              </p>
            </v-col>
            <v-col align-self="start" class="px-0" align="center">
              <icon-quay-ramp class="icon" />
              <p class="caption">
                Plank {{ ratingSymbol(quay.profileAccessibleScore.rampRating) }}
              </p>
            </v-col>
          </v-row>
        </v-container>
      </v-list-item-content>
    </v-list-item>
    <!-- {{ profile }} -->
    <!-- {{ quay.profileAccessibleScore.allRatings }} -->

    hoogte:{{ quay.quayaccessibilityadaptions.kerbheight }} <br />
    vehicleThresholdProfile:
    {{ quay.profileAccessibleScore.vehicleThresholdProfile }}<br />
    vehicleThreshold: {{ quay.profileAccessibleScore.vehicleThreshold }}<br />
    vehicleThresholdDifference:
    {{ quay.profileAccessibleScore.vehicleThresholdDifference }}<br />
    vehicleThresholdRating:
    {{ quay.profileAccessibleScore.vehicleThresholdRating }}<br />

    <v-divider></v-divider>
  </div>
</template>

<script>
import IconQuayThreshold from "@/assets/icons/quayThreshold.svg";
import IconQuayNoThreshold from "@/assets/icons/quayNoThreshold.svg";
import IconQuayWidth from "@/assets/icons/quayWidth.svg";
import IconQuayRamp from "@/assets/icons/quayRamp.svg";

export default {
  name: "QuayListItem",
  data: () => ({
    value: "",
    //
  }),
  methods: {
    ratingSymbol: function(i) {
      return ["🔴", "🟠", "🤔", "🟢"][i];
    },
  },
  props: ["quay", "profile"],
  components: {
    IconQuayThreshold,
    IconQuayNoThreshold,
    IconQuayWidth,
    IconQuayRamp,
  },
};
</script>

<style lang="scss" scoped></style>
