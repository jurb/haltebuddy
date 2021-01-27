<template>
  <v-chip-group class="pl-4">
    <v-chip
      filter
      active-class="secondary"
      :ripple="false"
      v-model="accessibleonlyFilter"
      class="mt-2"
    >
      Alleen toegankelijk
    </v-chip>
    <v-chip-group
      v-model="vehicleFilter"
      multiple
      mandatory
      class="pl-4"
      active-class="secondary"
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
    </v-chip-group>
  </v-chip-group>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  name: "QuayFilters",
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

<style lang="scss" scoped></style>
