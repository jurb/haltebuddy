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
          Type
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
          <v-icon> mdi-tune </v-icon>
        </v-chip>
        <v-chip
          pill
          @click="
            profileMenu = !profileMenu;
            vehicleMenu = false;
            settingsMenu = false;
          "
          color="secondary"
          active-class="primary"
        >
          <v-icon left>
            {{ profileMenu ? "mdi-chevron-up" : "mdi-chevron-down" }}
          </v-icon>
          <v-icon> mdi-account </v-icon>
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
      <v-chip filter :ripple="false" value="tram" class="primary">
        Tram
      </v-chip>
      <v-chip filter :ripple="false" value="bus" class="primary">
        Bus
      </v-chip>
      <v-chip filter :ripple="false" value="metro" class="primary">
        Metro
      </v-chip>
      <v-chip filter :ripple="false" value="ferry" class="primary">
        Pont
      </v-chip>
    </v-chip-group>
    <div v-if="settingsMenu" class="pl-5 py-2 grey lighten-4">
      <h3>Filters</h3>

      <v-chip-group v-model="filterProperties" multiple>
        <v-chip filter :ripple="false" class="primary" value="accessibleonly">
          Toegankelijke haltes
        </v-chip>
        <v-chip filter :ripple="false" class="primary" value="favouritesonly">
          Opgeslagen
          <v-icon color="white">{{
            this.filterProperties.includes("favouritesonly")
              ? "mdi-star"
              : "mdi-star-outline"
          }}</v-icon>
        </v-chip>
      </v-chip-group>
    </div>
    <div v-if="profileMenu">
      <div class="px-3 grey lighten-4">
        <h3 class="pa-2">Profiel</h3>
        <profile type="inline" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import Profile from "@/components/Profile.vue";
export default {
  components: { Profile },
  name: "QuayFilters",
  data: () => ({
    vehicleMenu: false,
    profileMenu: false,
    settingsMenu: false,
  }),

  computed: {
    ...mapState(["filters"]),
    filterProperties: {
      get() {
        return this.filters.filterProperties;
      },
      set(v) {
        return this.changeFilter({
          prop: "filterProperties",
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
</style>
