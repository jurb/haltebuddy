<template>
  <v-icon @click="setLocation" :color="locationSet ? 'primary' : null"
    >mdi-crosshairs-gps</v-icon
  >
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
    ...mapState(["currentLocation", "locationSet"]),
  },
  methods: {
    ...mapActions(["changeCurrentLocation", "changeLocationSet"]),
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
          this.changeLocationSet(true);
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
