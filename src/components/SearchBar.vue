<template>
  <div>
    <v-toolbar dense>
      <v-text-field
        v-model="searchTerm"
        hide-details
        prepend-icon="mdi-magnify"
        single-line
      ></v-text-field>
      <v-btn icon @click="setLocation">
        <v-icon>mdi-crosshairs-gps</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </v-toolbar>
  </div>
</template>

<script>
import { mapGetters, mapState, mapActions } from "vuex";
export default {
  name: "SearchBar",
  computed: {
    ...mapState(["profile", "quaysAll", "currentLocation"]),
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
  methods: {
    ...mapActions(["changeQuays", "changeCurrentLocation"]),
    setLocation: function() {
      //do we support geolocation
      if (!("geolocation" in navigator)) {
        this.errorStr = "Geolocation is not available.";
        return;
      }
      console.log("setLocation fired");
      this.gettingLocation = true;
      // get position
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          console.log(pos.coords);
          this.gettingLocation = false;
          this.location = [pos.coords.latitude, pos.coords.longitude];
          this.changeCurrentLocation(this.location);
          console.log("current location changed");
        },
        (err) => {
          console.log("error location fired");
          console.log(err.message);
          this.gettingLocation = false;
          this.errorStr = err.message;
        },
        { enableHighAccuracy: false, maximumAge: Infinity, timeout: 60000 }
      );
    },
  },
  watch: {
    // TODO: we can still search for only the first letter, but then we need to implement debouncing
    searchTerm: function() {
      if (this.searchTerm.length > 1) {
        this.changeQuays(
          this.quaysAll.filter((el) =>
            el.quaynamedata.quayname
              .toLowerCase()
              .includes(this.searchTerm.toLowerCase())
          )
        );
      }
      if (!this.searchTerm.length) {
        this.changeQuays(this.quaysAll);
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
