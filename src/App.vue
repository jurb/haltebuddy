<template>
  <v-app>
    <v-main>
      <v-container fluid class="pa-0">
        <router-view></router-view>
      </v-container>
    </v-main>
    <v-footer>
      <bottom-navigation />
    </v-footer>
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
