<template>
  <div>
    <!-- <v-container class="pa-0">
      <v-row no-gutters>
        <v-col align-self="end">
          <h3 class="pt-10 px-3">Halteknop</h3>
        </v-col>
        <v-col align-self="end" class="mb-n2">
          <img :src="require('@/assets/adameva01.svg')" alt="" />
          <img :src="require('@/assets/adameva02.svg')" alt="" class="ml-2" />
          <img :src="require('@/assets/adameva03.svg')" alt="" class="ml-4" />
        </v-col>
      </v-row>
    </v-container>
    <v-divider />

    <v-container class="pa-0 px-3">
      <v-row
        ><v-col class="text-body-2"
          >Laat de bestuurder van een voertuig weten dat je extra hulp of tijd
          nodig hebt bij het instappen. Activeer de halteknop als je op de halte
          staat.</v-col
        ></v-row
      >
    </v-container>
    <v-divider /> -->
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
      <router-link v-if="$route.params.page === '04'" to="/halteknop">
        <img class="map-image" src="@/assets/halteknop04.png"
      /></router-link>
    </v-container>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
export default {
  name: "Halteknop",
  computed: {},
  data: () => ({
    test: false,
  }),
};
</script>

<style lang="scss" scoped>
.map-image {
  width: 100%;
}
</style>
