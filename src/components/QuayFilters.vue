<template>
  <div>
    <v-chip-group class="pl-4">
      <div class="ml-0 mt-2">
        <v-chip
          pill
          @click="
            vehicleMenu = !vehicleMenu;
            settingsMenu = false;
            profileMenu = false;
          "
          color="secondary"
          active-class="primary"
        >
          <v-icon left>
            {{ vehicleMenu ? "mdi-chevron-up" : "mdi-chevron-down" }}
          </v-icon>
          <span class="chip-text"> Voertuig</span>
          <img
            v-if="vehicleFilter.includes('tram')"
            class="chip-icon ml-1"
            :src="require('@/assets/icons/vehicleTramWhite.svg')"/>
          <img
            v-if="vehicleFilter.includes('bus')"
            class="chip-icon ml-1"
            :src="require('@/assets/icons/vehicleBusWhite.svg')"/>
          <img
            v-if="vehicleFilter.includes('metro')"
            class="chip-icon ml-1"
            :src="require('@/assets/icons/vehicleMetroWhite.svg')"/>
          <img
            v-if="vehicleFilter.includes('ferry')"
            class="chip-icon ml-1"
            :src="require('@/assets/icons/vehicleFerryWhite.svg')"
        /></v-chip>
        <v-chip
          pill
          @click="
            settingsMenu = !settingsMenu;
            vehicleMenu = false;
            profileMenu = false;
          "
          color="secondary"
          active-class="primary"
        >
          <v-icon left>
            {{ settingsMenu ? "mdi-chevron-up" : "mdi-chevron-down" }}
          </v-icon>
          <span class="chip-text"> Filters</span>

          <v-icon right> mdi-tune </v-icon>
        </v-chip>
      </div>
    </v-chip-group>
    <v-chip-group
      v-if="vehicleMenu"
      v-model="vehicleFilter"
      multiple
      mandatory
      class="pl-5 py-2 grey lighten-4"
    >
      <v-chip filter :ripple="false" value="tram" class="secondary rounded-0">
        Tram
      </v-chip>
      <v-chip filter :ripple="false" value="bus" class="secondary rounded-0">
        Bus
      </v-chip>
      <v-chip filter :ripple="false" value="metro" class="secondary rounded-0">
        Metro
      </v-chip>
      <v-chip filter :ripple="false" value="ferry" class="secondary rounded-0">
        Pont
      </v-chip>
    </v-chip-group>
    <div v-if="settingsMenu" class="pl-5 py-2 grey lighten-4">
      <v-btn
        tile
        :color="favouritesonly ? 'secondary' : 'white'"
        class="mb-4 mt-1"
        @click="favouritesonly = !favouritesonly"
      >
        <v-icon left>
          {{ favouritesonly ? "mdi-star" : "mdi-star-outline" }}
        </v-icon>
        <strong>Alleen opgeslagen haltes</strong>
        <v-icon right>
          {{ favouritesonly ? "mdi-check-bold" : "" }}
        </v-icon>
      </v-btn>
      <br />
      <!-- <v-switch label="Alleen opgeslagen haltes" v-model="favouritesonly" /> -->
      <strong>Jouw halteadvies</strong> -
      {{
        minimumRating === 0
          ? `laat alles zien`
          : `tenminste ${ratingLabels[minimumRating]}`
      }}
      <br />
      <v-btn-toggle v-model="minimumRating" mandatory group class="mb-4">
        <v-btn class="pa-2 ma-0" :value="0">
          <rating-icon :rating="0" />
        </v-btn>
        <v-btn class="pa-2 ma-0" :value="1">
          <rating-icon :rating="1" />
        </v-btn>
        <v-btn class="pa-2 ma-0" :value="2">
          <rating-icon :rating="2" />
        </v-btn>
        <v-btn class="pa-2 ma-0" :value="3">
          <rating-icon :rating="3" />
        </v-btn>
      </v-btn-toggle>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import RatingIcon from "@/components/RatingIcon.vue";
export default {
  components: { RatingIcon },
  name: "QuayFilters",
  data: () => ({
    vehicleMenu: false,
    profileMenu: false,
    settingsMenu: false,
    ratingLabels: ["ontoegankelijk", "matig", "redelijk", "zeer goed"],
  }),

  computed: {
    ...mapState(["filters"]),
    favouritesonly: {
      get() {
        return this.filters.favouritesonly;
      },
      set(v) {
        return this.changeFilter({
          prop: "favouritesonly",
          value: v,
        });
      },
    },
    minimumRating: {
      get() {
        return this.filters.minimumRating;
      },
      set(v) {
        return this.changeFilter({
          prop: "minimumRating",
          value: v,
        });
      },
    },
    vehicleFilter: {
      get() {
        return this.filters.vehicles;
      },
      set(v) {
        return this.changeFilter({
          prop: "vehicles",
          value: v,
        });
      },
    },
  },
  methods: {
    ...mapActions(["changeFilter"]),
  },
};
</script>

<style lang="scss" scoped>
.chip-icon {
  width: 12px;
  height: 18px;
  vertical-align: bottom;
}
.chip-text {
  line-height: 0.9rem;
}
.v-btn {
  text-transform: none;
}
.v-btn-toggle--group > .v-btn.v-btn {
  border-color: lightgrey;
}
</style>
