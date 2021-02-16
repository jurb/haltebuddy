<template>
  <div>
    <v-chip-group class="pl-4">
      <div class="ml-1 mt-2">
        <v-chip
          pill
          @click="
            vehicleMenu = !vehicleMenu;
            profileMenu = false;
            accessibilityMenu = false;
          "
          color="primary"
          active-class="secondary"
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
            profileMenu = !profileMenu;
            vehicleMenu = false;
            accessibilityMenu = false;
          "
          color="primary"
          active-class="secondary"
        >
          <v-icon left>
            {{ profileMenu ? "mdi-chevron-up" : "mdi-chevron-down" }}
          </v-icon>
          <v-icon> mdi-account </v-icon>
        </v-chip>
        <v-chip
          pill
          @click="
            accessibilityMenu = !accessibilityMenu;
            vehicleMenu = false;
            profileMenu = false;
          "
          color="primary"
          active-class="secondary"
        >
          <v-icon left>
            {{ accessibilityMenu ? "mdi-chevron-up" : "mdi-chevron-down" }}
          </v-icon>
          <v-icon> mdi-tune </v-icon>
        </v-chip>
      </div>
    </v-chip-group>
    <div v-if="accessibilityMenu" class="pl-5 py-6 pt-2 grey lighten-4">
      <v-switch
        v-model="accessibleonlyFilter"
        label="Alleen toegankelijke haltes"
        color="secondary"
        hide-details
      ></v-switch>
    </div>
    <v-chip-group
      v-if="vehicleMenu"
      v-model="vehicleFilter"
      multiple
      mandatory
      class="pl-5 py-2 grey lighten-4"
    >
      <v-chip filter :ripple="false" value="tram" class="secondary">
        Tram
      </v-chip>
      <v-chip filter :ripple="false" value="bus" class="secondary">
        Bus
      </v-chip>
      <v-chip filter :ripple="false" value="metro" class="secondary">
        Metro
      </v-chip>
      <v-chip filter :ripple="false" value="ferry" class="secondary">
        Pont
      </v-chip>
    </v-chip-group>

    <template v-if="profileMenu">
      <div class="px-3 grey lighten-4">
        <h3 class="pa-2">Profiel</h3>
        <profile type="inline" />
      </div>
    </template>
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
    accessibilityMenu: false,
  }),

  computed: {
    ...mapState(["filters"]),
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
    accessibleonlyFilter: {
      get() {
        return this.filters.accessibleonly;
      },
      set(v) {
        return this.changeFilter({
          prop: "accessibleonly",
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
