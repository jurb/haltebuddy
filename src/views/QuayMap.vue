<template>
  <div>
    <div class="top-bar white"><top-bar /></div>
    <mapbox
      access-token="pk.eyJ1IjoianVyaWFuIiwiYSI6ImNqNTJlMTAzYzBmajEyd242ank0ZGppam8ifQ.JlOhR91CJQnc3U12pbMQwQ"
      :map-options="mapOptions"
      @map-load="loaded"
      @map-init="initMap"
    />
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import Mapbox from "mapbox-gl-vue";
import TopBar from "../components/topBar.vue";

export default {
  name: "Kaart",
  components: { Mapbox, TopBar },
  computed: {
    ...mapState(["profile", "quays", "currentLocation"]),
    ...mapGetters(["filteredQuays"]),
    filterQuaysGeoJSON: function() {
      return {
        type: "FeatureCollection",
        features: this.filteredQuays.map((d) => ({
          type: "Feature",
          id: d.quaycode,
          geometry: { type: "Point", coordinates: [d.geo.lon, d.geo.lat] },
          properties: {
            ...d,
          },
        })),
      };
    },
    mapOptions: function() {
      return {
        style: "mapbox://styles/mapbox/light-v9",
        center: this.currentLocation.slice().reverse(),
        zoom: 14,
      };
    },
    filterQuaysGeoJSONLayer: function() {
      return {
        type: "geojson",
        data: this.filterQuaysGeoJSON,
      };
    },
  },
  methods: {
    loaded(map) {
      map.addLayer({
        id: "quays",
        source: this.filterQuaysGeoJSONLayer,
        type: "circle",
        paint: {
          "circle-radius": 4,
          "circle-color": "green",
          "circle-opacity": 0.6,
          "circle-stroke-width": 0,
        },
      });
    },
    initMap(map) {
      this.map = map;
    },
    refreshData() {
      this.map.getSource("quays").setData(this.filterQuaysGeoJSON);
    },
  },
  data: () => ({
    map: {},
  }),
  watch: {
    filteredQuays: function() {
      this.refreshData();
    },
    currentLocation: function() {
      this.map.flyTo({
        center: this.currentLocation.slice().reverse(),
      });
    },
  },
  created() {
    this.map = null; // here we define map as non-reactive
  },
};
</script>

<style lang="scss" scoped>
#map {
  width: 100%;
  height: 100vh;
}

.top-bar {
  // position: absolute;
  width: 100%;
}
</style>
