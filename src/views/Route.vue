<template>
  <div>
    <v-container class="pa-0 mb-n4">
      <router-link v-if="!$route.params.page" to="/route/02">
        <img class="routes-img" src="@/assets/Route_1.png"
      /></router-link>
      <router-link v-if="$route.params.page === '02'" to="/route/03">
        <img class="routes-img" src="@/assets/Route_2.png"
      /></router-link>
      <img class="routes-img" src="@/assets/Route_3.png" />
    </v-container>
  </div>
</template>

<script>
export default { name: "Route" };
</script>

<style lang="scss" scoped>
.routes-img {
  max-width: 100vw;
}
</style>
