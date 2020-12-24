<template>
  <v-app>
    <!-- <v-navigation-drawer app>
    </v-navigation-drawer> -->

    <!-- <v-app-bar app>
    </v-app-bar> -->

    <!-- Sizes your content based upon application components -->
    <v-main>
      <!-- Provides the application the proper gutter -->
      <v-container fluid>
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </v-container>
    </v-main>

    <v-footer app>
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
