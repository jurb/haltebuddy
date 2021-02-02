<template>
  <div>
    <v-chip-group class="pl-4">
      <!-- <v-chip-group>
        <v-chip
          filter
          :ripple="false"
          v-model="accessibleonlyFilter"
          class="mt-2"
          color="secondary"
        >
          {{ accessibleonlyFilter ? "Alleen toegankelijk" : "Alle haltes" }}
        </v-chip>
      </v-chip-group> -->

      <div class="ml-1 mt-2">
        <v-menu
          v-model="menu"
          bottom
          right
          transition="scale-transition"
          origin="top"
          :close-on-content-click="false"
        >
          <template v-slot:activator="{ on }">
            <v-chip pill v-on="on" color="secondary">
              <v-icon left>
                mdi-chevron-down
              </v-icon>
              Voertuigen</v-chip
            >
          </template>
          <v-card width="300">
            <v-chip-group
              v-model="vehicleFilter"
              multiple
              mandatory
              class="pl-4"
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
          </v-card>
        </v-menu>
      </div>
      <div class="text-body-2 mt-n1 ml-2">
        <v-switch
          v-model="accessibleonlyFilter"
          label="Alleen toegankelijk"
          color="secondary"
        ></v-switch>
      </div>
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

<style lang="scss" scoped></style>
