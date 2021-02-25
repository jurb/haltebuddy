<template>
  <div>
    <v-container class="pa-0 mb-n4">
      <router-link v-if="!$route.params.page" to="/halteknop/02">
        <img class="map-image" src="@/assets/halteknop01.png"
      /></router-link>
      <router-link v-if="$route.params.page === '02'" to="/halteknop/03">
        <img class="map-image" src="@/assets/halteknop02.png"
      /></router-link>
      <router-link v-if="$route.params.page === '03'" to="/halteknop/04">
        <img class="map-image" src="@/assets/halteknop03.png"
      /></router-link>
      <img class="map-image" src="@/assets/halteknop04.png" />
    </v-container>
  </div>
</template>

<script>
export default {
  name: "Halteknop",
};
</script>

<style lang="scss" scoped>
.map-image {
  width: 100%;
}
</style>
