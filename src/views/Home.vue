<template>
  <v-container class="pa-0 ma-0 error darken-4">
    <router-link to="/profile">
      <img class="landingpage" src="@/assets/landing.png" />
    </router-link>
  </v-container>
</template>

<script>
export default {
  name: "Home",
  computed: {},
  data: () => ({}),
};
</script>

<style lang="scss" scoped>
.landingpage {
  width: 100%;
  height: 812px;
}
</style>
