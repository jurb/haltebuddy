<template>
  <mapbox
    access-token="pk.eyJ1IjoianVyaWFuIiwiYSI6ImNqNTJlMTAzYzBmajEyd242ank0ZGppam8ifQ.JlOhR91CJQnc3U12pbMQwQ"
    :map-options="mapOptions"
  />
</template>

<script>
import { mapGetters, mapState } from "vuex";
import Mapbox from "mapbox-gl-vue";

export default {
  name: "Kaart",
  components: { Mapbox },
  computed: {
    ...mapState(["profile", "quays"]),
    ...mapGetters(["filterQuays"]),
  },
  data: () => ({
    test: false,
    mapOptions: {
      style: "mapbox://styles/mapbox/light-v9",
      center: [-96, 37.8],
      zoom: 3,
    },
  }),
};
</script>

<style lang="scss" scoped>
#map {
  width: 100%;
  height: 100vh;
}
</style>
