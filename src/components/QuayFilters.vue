<template>
  <div>
    <v-chip-group class="pl-4">
      <div class="ml-1 mt-2">
        <v-chip pill @click="menu = !menu" color="secondary">
          <v-icon left>
            mdi-chevron-down
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
      </div>
      <div class="text-body-2 mt-n1 ml-2">
        <v-switch
          v-model="accessibleonlyFilter"
          label="Alleen toegankelijk"
          color="secondary"
        ></v-switch>
      </div>
    </v-chip-group>
    <v-chip-group
      v-model="vehicleFilter"
      multiple
      mandatory
      class="pl-4"
      v-if="menu"
    >
      <v-chip filter :ripple="false" value="tram">
        Tram
      </v-chip>
      <v-chip filter :ripple="false" value="bus">
        Bus
      </v-chip>
      <v-chip filter :ripple="false" value="metro">
        Metro
      </v-chip>
      <v-chip filter :ripple="false" value="ferry">
        Pont
      </v-chip>
    </v-chip-group>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  name: "QuayFilters",
  data: () => ({
    menu: false,
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
