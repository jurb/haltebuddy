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
            length="5"
            size="16"
            :value="3"
          ></v-rating>
        </v-list-item-subtitle>
        <v-container>
          <v-row no-gutters>
            <v-col align-self="end">
              <icon-quay-height class="icon" />
              <p class="caption">
                Hoogte
                {{ quay.profileAccessibleScore.stopThresholdRating || "？" }}
              </p></v-col
            >
            <v-col align-self="end">
              <icon-quay-width class="icon" />
              <p class="caption">
                Breedte
                {{
                  quay.profileAccessibleScore.stopNarrowestWidthRating || "？"
                }}
              </p>
            </v-col>
            <v-col align-self="end"> </v-col>
          </v-row>
        </v-container>

        <!-- {{ quay.profileAccessibleScore.vehicleThresholdRating }} -->
        <!-- {{ quay.profileAccessibleScore.plankRoomWidthRating }} -->
        <!-- {{ quay.profileAccessibleScore.plankRoomMinHeightRating }} -->
      </v-list-item-content>
    </v-list-item>
    <v-divider></v-divider>
  </div>
</template>

<script>
import IconQuayThreshold from "@/assets/icons/quayThreshold.svg";
import IconQuayNoThreshold from "@/assets/icons/quayNoThreshold.svg";
import IconQuayWidth from "@/assets/icons/quayWidth.svg";
import IconQuayRamp from "@/assets/icons/quayRamp.svg";

export default {
  data: () => ({
    value: "",
    //
  }),
  methods: {
    ratingSymbol: function(i) {
      return ["🔴", "🟠", "🤔", "🟢"][i];
    },
  },
  components: {
    IconQuayThreshold,
    IconQuayNoThreshold,
    IconQuayWidth,
    IconQuayRamp,
  },
};
</script>

<style lang="scss" scoped></style>
