<template>
  <mapbox
    access-token="pk.eyJ1IjoianVyaWFuIiwiYSI6ImNqNTJlMTAzYzBmajEyd242ank0ZGppam8ifQ.JlOhR91CJQnc3U12pbMQwQ"
    :map-options="mapOptions"
    @map-load="loaded"
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
    ...mapGetters(["filteredQuays"]),
    filterQuaysGeoJSON: function() {
      return {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: this.filteredQuays.map((d) => ({
            type: "Feature",
            id: d.quaycode,
            geometry: { type: "Point", coordinates: [d.geo.lon, d.geo.lat] },
            properties: {
              ...d,
            },
          })),
        },
      };
    },
  },
  methods: {
    loaded(map) {
      map.addLayer({
        id: "quays",
        source: this.filterQuaysGeoJSON,
        type: "circle",
        paint: {
          "circle-radius": 4,
          "circle-color": "green",
          "circle-opacity": 0.6,
          "circle-stroke-width": 0,
        },
      });
    },
  },
  data: () => ({
    test: false,
    mapOptions: {
      style: "mapbox://styles/mapbox/light-v9",
      center: [4.9, 52.366667],
      zoom: 12,
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
