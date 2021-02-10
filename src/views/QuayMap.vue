<template>
  <div>
    <div class="top-bar white"><top-bar /></div>
    <mapbox
      access-token="pk.eyJ1IjoianVyaWFuIiwiYSI6ImNqNTJlMTAzYzBmajEyd242ank0ZGppam8ifQ.JlOhR91CJQnc3U12pbMQwQ"
      :map-options="mapOptions"
      @map-load="loaded"
      @map-init="initMap"
      :nav-control="{ show: false }"
    />
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import Mapbox from "mapbox-gl-vue";
import TopBar from "../components/topBar.vue";

import CustomIcons from "@/helpers/markerIcons.js";

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
    mapboxExpressionMarkers: function() {
      const vehicles = ["bus", "metro", "tram", "ferry"];
      const colors = ["Red", "Orange", "Green", "Green"];
      return colors.flatMap((color, index) =>
        vehicles.flatMap((vehicle) => [
          [
            "all",
            [
              "==",
              ["get", "overallRating", ["get", "profileAccessibleScore"]],
              index,
            ],
            ["==", ["get", "transportmode"], vehicle],
          ],
          `marker${vehicle.charAt(0).toUpperCase()}${vehicle.slice(
            1
          )}${color}-svg`,
        ])
      );
    },
  },
  methods: {
    loaded(map) {
      CustomIcons.forEach((icon) => {
        let customIcon = new Image(32, 32);
        customIcon.onload = () => map.addImage(icon.name, customIcon);
        customIcon.src = icon.src;
      });
      map.addLayer({
        id: "markers",
        source: this.filterQuaysGeoJSONLayer,
        type: "symbol",
        layout: {
          "icon-image": [
            "case",
            ...this.mapboxExpressionMarkers,
            "markerBusBlue-svg",
          ],
          "icon-allow-overlap": true,
          "icon-size": 1,
        },
      });
    },
    initMap(map) {
      this.map = map;
    },
    refreshData() {
      this.map.getSource("markers").setData(this.filterQuaysGeoJSON);
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
  width: 100%;
}
</style>
