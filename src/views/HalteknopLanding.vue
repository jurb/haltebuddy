<template>
  <div>
    <v-container class="pa-0 mb-n4">
      <v-carousel height="675" cycle interval="6000" show-arrows-on-hover>
        <v-carousel-item src="@/assets/halteknop01.png"></v-carousel-item>
        <v-carousel-item src="@/assets/halteknop02.png"></v-carousel-item>
        <v-carousel-item src="@/assets/halteknop03.png"></v-carousel-item>
        <v-carousel-item src="@/assets/halteknop04.png"></v-carousel-item>
      </v-carousel>
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

.halteknop-image {
  height: 667px;
}
</style>
