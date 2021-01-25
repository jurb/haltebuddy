<template>
  <v-autocomplete
    v-model="model"
    :items="filteredItems"
    :loading="isLoading"
    :search-input.sync="search"
    clearable
    item-text="weergavenaam"
    item-value="weergavenaam"
    label="Zoek adres"
    no-data-text="Niks gevonden"
    :hide-no-data="true"
    no-filter
    solo
      class="px-4 pt-4"
    >
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
    locationSelectedItem: function() {
      const coordsFlipped = this.items[0].centroide_ll
        .replace("POINT(", "")
        .replace(")", "")
        .split(" ");
      return [Number(coordsFlipped[1]), Number(coordsFlipped[0])];
    },
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
  },
  watch: {
    search(val) {
      // Items have already been loaded
      this.isLoading = true;
      // Lazily load input items
      fetch(
        `https://geodata.nationaalgeoregister.nl/locatieserver/v3/suggest?fq=type:weg OR type:adres&fl=*&q=${this.search} AND woonplaatsnaam:Amsterdam`
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
    model() {
      this.model ? this.changeCurrentLocation(this.locationSelectedItem) : "";
    },
  },
};
</script>

<style lang="scss" scoped></style>
