<template>
  <v-bottom-navigation
    v-model="value"
    background-color="primary"
    dark
    grow
    app
    fixed
  >
    <v-btn value="profile" :input-value="value === 'profile'" to="/profile">
      <span>Reisprofiel</span>
      <v-icon>mdi-account</v-icon>
    </v-btn>
    <v-btn value="stops" :input-value="value === 'stops'" to="/quays">
      <span>Haltes</span>
      <v-icon>mdi-format-list-bulleted-square</v-icon>
    </v-btn>
    <v-btn value="route" :input-value="value === 'route'" to="/route">
      <span>Route</span>
      <v-icon>mdi-routes</v-icon>
    </v-btn>
    <v-btn value="map" :input-value="value === 'map'" to="/quay-map">
      <span>Kaart</span>
      <v-icon>mdi-map-marker</v-icon>
    </v-btn>
    <v-btn
      value="halteknop"
      :input-value="value === 'halteknop'"
      to="/halteknop"
    >
      <span>Halteknop</span>
      <v-icon>mdi-lifebuoy</v-icon>
    </v-btn>
  </v-bottom-navigation>
</template>

<script>
export default {
  name: "BottomNavigation",
  components: {},
  data: () => ({
    value: "",
    //
  }),
};
</script>

<style scoped>
.v-btn {
  /* TODO Already wrote the first !important :) remove! */
  height: inherit !important;
  letter-spacing: 0em;
}
</style>
