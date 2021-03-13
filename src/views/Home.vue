<template>
  <v-container class="pa-0 ma-0">
    <v-row justify="center" no-gutters>
      <v-col cols="auto">
        <router-link to="/profile">
          <img class="landingpage" src="@/assets/landing.png" />
        </router-link>
      </v-col>
    </v-row>
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
  max-width: 375px;
  max-height: 812px;
}
</style>
