<template>
  <v-bottom-navigation v-model="value" background-color="primary" dark grow app>
    <v-btn value="profile" to="/profile">
      <span>Reisprofiel</span>
      <v-icon>mdi-account</v-icon>
    </v-btn>

    <v-btn value="stops" to="/">
      <span>Haltes</span>
      <v-icon>mdi-heart</v-icon>
    </v-btn>

    <v-btn value="map" to="/quay-map">
      <span>Kaart</span>
      <v-icon>mdi-map-marker</v-icon>
    </v-btn>
    <v-btn value="halteknop" to="/halteknop">
      <span>Halteknop</span>
      <v-icon>mdi-lifebuoy</v-icon>
    </v-btn>
  </v-bottom-navigation>
</template>

<script>
export default {
  name: "App",

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
