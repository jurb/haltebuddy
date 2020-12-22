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
            color="secondary"
            background-color="secondary lighten-1"
            dense
            hover
            length="3"
            size="16"
            :value="quay.profileAccessibleScore.overallRating"
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
              <p class="caption">{{ ratingSymbol(3) }} Opgang</p></v-col
            >
            <v-col
              v-if="quay.profileAccessibleScore.threshold"
              align-self="start"
              class="px-0"
              align="center"
            >
              <icon-quay-threshold class="icon" />
              <p class="caption">
                {{
                  ratingSymbol(
                    quay.profileAccessibleScore.stopThresholdRating
                  ) || "?"
                }}
                Drempel<br />
                {{
                  Math.round(quay.profileAccessibleScore.stopThreshold * 100)
                }}cm
              </p></v-col
            >
            <v-col align-self="start" class="px-0" align="center">
              <icon-quay-width class="icon" />
              <p class="caption">
                {{
                  quay.profileAccessibleScore.stopNarrowestWidth
                    ? `${ratingSymbol(
                        quay.profileAccessibleScore.stopNarrowestWidthRating
                      )}
                ${quay.profileAccessibleScore.stopNarrowestWidth}m
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
              <icon-quay-ramp class="icon" />
              <p class="caption">
                {{ ratingSymbol(quay.profileAccessibleScore.rampRating) }} Plank
              </p>
            </v-col>
            <v-col
              v-if="!profile.ramp"
              align-self="start"
              class="px-0"
              align="center"
            >
              <icon-quay-threshold-to-vehicle class="icon" />
              <p class="caption">
                {{
                  ratingSymbol(
                    quay.profileAccessibleScore.vehicleThresholdRating
                  )
                }}
                {{
                  Math.round(
                    quay.profileAccessibleScore.vehicleThreshold * 100
                  )
                }}cm
              </p>
            </v-col>
          </v-row>
        </v-container>
      </v-list-item-content>
    </v-list-item>
    <!-- {{ profile }} -->
    <!-- {{ quay.profileAccessibleScore.allRatings }} -->

    <!-- hoogte:{{ quay.quayaccessibilityadaptions.kerbheight }} <br />
    vehicleThresholdProfile:
    {{ quay.profileAccessibleScore.vehicleThresholdProfile }}<br />
    vehicleThreshold: {{ quay.profileAccessibleScore.vehicleThreshold }}<br />
    vehicleThresholdDifference:
    {{ quay.profileAccessibleScore.vehicleThresholdDifference }}<br />
    vehicleThresholdRating:
    {{ quay.profileAccessibleScore.vehicleThresholdRating }}<br /> -->

    <v-divider></v-divider>
  </div>
</template>

<script>
import IconQuayThreshold from "@/assets/icons/quayThreshold.svg";
import IconQuayNoThreshold from "@/assets/icons/quayNoThreshold.svg";
import IconQuayWidth from "@/assets/icons/quayWidth.svg";
import IconQuayRamp from "@/assets/icons/quayRamp.svg";
import IconQuayThresholdToVehicle from "@/assets/icons/quayThresholdToVehicle.svg";

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
    IconQuayThresholdToVehicle,
  },
};
</script>

<style lang="scss" scoped></style>
