<template>
  <div>
    <v-autocomplete
      v-model="model"
      :items="filteredItems"
      :loading="isLoading"
      :search-input.sync="search"
      clearable
      item-text="weergavenaam"
      item-value="id"
      label="Zoek adres"
      no-data-text="Niks gevonden"
      :hide-no-data="true"
      no-filter
      solo
      class="px-4 pt-4"
    >
      <template v-slot:append-outer> <location-set-icon /> </template>
    </v-autocomplete>
    <v-divider />
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import locationSetIcon from "@/components/locationSetIcon.vue";
export default {
  name: "AddressAutoComplete",
  components: { locationSetIcon },
  data: () => ({
    isLoading: false,
    items: [],
    search: null,
    model: null,
  }),
  computed: {
    ...mapState(["currentLocation"]),
    filteredItems: function() {
      // remove postal code and city name from results, since we're focussing on Amsterdam right now.
      // for national results just point the autocomplete component to this.items instead
      return this.items.map((d) => ({
        ...d,
        weergavenaam: d.weergavenaam.split(",")[0],
      }));
    },
  },
  methods: {
    ...mapActions(["changeCurrentLocation"]),
    searchSuggestAPI: function(val) {
      // Items have already been loaded
      this.isLoading = true;
      // Lazily load input items
      fetch(
        `https://geodata.nationaalgeoregister.nl/locatieserver/v3/suggest?fq=type:weg OR type:adres&q=${val} AND woonplaatsnaam:Amsterdam`
      )
        .then((res) => res.json())
        .then((res) => {
          this.items = res.response.docs;
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => (this.isLoading = false));
    },
    convertPointString: function(pointstring) {
      // API return PostGIS like string of coordinates, convert to array of numbers and reverse it
      return pointstring
        .replace("POINT(", "")
        .replace(")", "")
        .split(" ")
        .map(Number)
        .slice()
        .reverse();
    },
    setLocationFromResult: function(id) {
      this.isLoading = true;
      fetch(
        `https://geodata.nationaalgeoregister.nl/locatieserver/v3/lookup?id=${id}`
      )
        .then((res) => res.json())
        .then((res) => {
          const centroide_ll = res.response.docs[0].centroide_ll;
          const coords = this.convertPointString(centroide_ll);
          this.changeCurrentLocation(coords);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => (this.isLoading = false));
    },
  },
  watch: {
    search(val) {
      this.searchSuggestAPI(val);
    },
    model(val) {
      this.setLocationFromResult(val);
    },
  },
};
</script>

<style lang="scss" scoped></style>
