<template>
  <div>
    <address-auto-complete />
    <quay-filters />
    <h4 class="pl-4">Haltes in de buurt van {{ currentLocationName }}</h4>
    <v-divider />
  </div>
</template>

<script>
import { mapState } from "vuex";
import AddressAutoComplete from "./AddressAutoComplete.vue";
import QuayFilters from "./QuayFilters.vue";

export default {
  name: "TopBar",
  components: { AddressAutoComplete, QuayFilters },
  computed: { ...mapState(["currentLocationName"]) },
};
</script>

<style lang="scss" scoped></style>
