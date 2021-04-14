<template>
  <v-app>
    <v-main>
      <v-container fluid class="pa-0 ma-0">
        <router-view></router-view>
      </v-container>
    </v-main>
    <!-- TODO: removed footer element here because it produced a ghost element on flipping open the profile menu in the top filter, investigate if we can bring it back since it's semantically better to keep it -->
    <bottom-navigation
      v-if="
        $route.name !== 'Home' &&
          $route.name !== 'LandingPage' &&
          $route.name !== 'HalteknopLanding'
      "
    />
  </v-app>
</template>
<script>
// @ is an alias to /src
import BottomNavigation from "@/components/BottomNavigation.vue";

export default {
  name: "App",
  components: {
    BottomNavigation,
  },
};
</script>

<style>
::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
html {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}
</style>
