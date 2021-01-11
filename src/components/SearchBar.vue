<template>
  <div>
    <v-toolbar dense>
      <v-text-field
        v-model="searchTerm"
        hide-details
        prepend-icon="mdi-magnify"
        single-line
      ></v-text-field>

      <!-- TODO: you can't remove your search term yet, which is not a great experience -->
      <!-- TODO: load in all quays from store, not just filtered ones -->
      <!-- <v-autocomplete
        v-model="searchTerm"
        dense
        :items="quaysAll"
        item-text="quaynamedata.quayname"
      ></v-autocomplete> -->

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
import { mapGetters, mapState, mapActions } from "vuex";
export default {
  name: "SearchBar",
  computed: {
    ...mapState(["profile", "quaysAll"]),
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
    ...mapActions(["changeQuays"]),
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
  created() {
    // //do we support geolocation
    // if (!("geolocation" in navigator)) {
    //   this.errorStr = "Geolocation is not available.";
    //   return;
    // }
    // this.gettingLocation = true;
    // // get position
    // navigator.geolocation.getCurrentPosition(
    //   (pos) => {
    //     console.log(pos);
    //     this.gettingLocation = false;
    //     this.location = pos;
    //   },
    //   (err) => {
    //     this.gettingLocation = false;
    //     this.errorStr = err.message;
    //   }
    // );
  },
};
</script>

<style lang="scss" scoped></style>
