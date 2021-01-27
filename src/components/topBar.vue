<template>
  <div>
    <address-auto-complete />
    <quay-filters />
    <v-divider />
  </div>
</template>

<script>
import AddressAutoComplete from "./AddressAutoComplete.vue";
import QuayFilters from "./QuayFilters.vue";

export default {
  name: "TopBar",
  components: { AddressAutoComplete, QuayFilters },
};
</script>

<style lang="scss" scoped></style>
