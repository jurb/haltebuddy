<template>
  <v-bottom-navigation v-model="value" color="primary" grow absolute>
    <v-btn value="profile">
      <span>Reisprofiel</span>

      <v-icon>mdi-account</v-icon>
    </v-btn>

    <v-btn value="stops">
      <span>Haltes</span>

      <v-icon>mdi-heart</v-icon>
    </v-btn>

    <v-btn value="map">
      <span>Kaart</span>

      <v-icon>mdi-map-marker</v-icon>
    </v-btn>
    <v-btn value="halteknop">
      <span>Instapknop</span>

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
