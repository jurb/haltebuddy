<template>
  <div>
    <v-container class="pa-0 mb-n4">
      <router-link
        v-if="$route.params.page === '01'"
        to="/halteknop-landing/02"
      >
        <img class="map-image" src="@/assets/halteknop01.png"
      /></router-link>
      <router-link
        v-if="$route.params.page === '02'"
        to="/halteknop-landing/03"
      >
        <img class="map-image" src="@/assets/halteknop02.png"
      /></router-link>
      <router-link
        v-if="$route.params.page === '03'"
        to="/halteknop-landing/04"
      >
        <img class="map-image" src="@/assets/halteknop03.png"
      /></router-link>
      <router-link
        v-if="$route.params.page === '04'"
        to="/halteknop-landing/01"
      >
        <img class="map-image" src="@/assets/halteknop04.png" />
      </router-link>
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
