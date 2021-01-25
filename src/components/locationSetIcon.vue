<template>
  <v-icon @click="setLocation">mdi-crosshairs-gps</v-icon>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  name: "LocationSetIcon",
  data: () => ({
    gettingLocation: false,
    location: null,
    errorStr: "",
  }),
  computed: {
    ...mapState(["currentLocation"]),
  },
  methods: {
    ...mapActions(["changeCurrentLocation"]),
    setLocation: function() {
      //do we support geolocation
      if (!("geolocation" in navigator)) {
        this.errorStr = "Geolocation is not available.";
        return;
      }
      this.gettingLocation = true;
      // get position
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          this.gettingLocation = false;
          this.location = [pos.coords.latitude, pos.coords.longitude];
          this.changeCurrentLocation(this.location);
        },
        (err) => {
          console.error(err.message);
          this.gettingLocation = false;
          this.errorStr = err.message;
          // TODO: the geolocation settings can probably be improved
        },
        { enableHighAccuracy: true, maximumAge: Infinity, timeout: 60000 }
      );
    },
  },
};
</script>
