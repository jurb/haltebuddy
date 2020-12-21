<template>
  <div>
    <v-toolbar dense>
      <v-text-field
        v-model="searchTerm"
        hide-details
        prepend-icon="mdi-magnify"
        single-line
      ></v-text-field>

      <v-btn icon>
        <v-icon>mdi-crosshairs-gps</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </v-toolbar>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
export default {
  name: "SearchBar",
  computed: {
    ...mapState(["profile", "quays"]),
    ...mapGetters(["filteredQuays"]),
  },
  data: () => ({
    // TODO: move data to store
    test: false,
    searchTerm: "",
    location: null,
    gettingLocation: false,
    errorStr: null,
  }),
  created() {
    //do we support geolocation
    if (!("geolocation" in navigator)) {
      this.errorStr = "Geolocation is not available.";
      return;
    }

    this.gettingLocation = true;
    // get position
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        console.log(pos);
        this.gettingLocation = false;
        this.location = pos;
      },
      (err) => {
        this.gettingLocation = false;
        this.errorStr = err.message;
      }
    );
  },
};
</script>

<style lang="scss" scoped></style>
