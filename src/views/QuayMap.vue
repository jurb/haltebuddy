<template>
  <div>
    <v-bottom-sheet v-model="sheet" @click:outside="scrollToTop">
      <!-- <template v-slot:activator="{ on, attrs }">
        <v-btn color="orange" dark v-bind="attrs" v-on="on">
          Open Inset
        </v-btn>
      </template> -->
      <v-sheet>
        <!-- <v-btn class="mt-6" text color="error" @click="sheet = !sheet">
          close
        </v-btn> -->
        <quay-list-item :quay="selectedQuay" />
      </v-sheet>
    </v-bottom-sheet>
    <div class="top-bar white"><top-bar /></div>
    <mapbox
      access-token="pk.eyJ1IjoianVyaWFuIiwiYSI6ImNqNTJlMTAzYzBmajEyd242ank0ZGppam8ifQ.JlOhR91CJQnc3U12pbMQwQ"
      :map-options="mapOptions"
      @map-load="loaded"
      @map-init="initMap"
      :nav-control="{ show: false }"
      @map-click:quayMarkers="clicked"
    />
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import Mapbox from "mapbox-gl-vue";
import TopBar from "../components/topBar.vue";

import CustomIcons from "@/helpers/markerIcons.js";
import QuayListItem from "../components/QuayListItem.vue";

export default {
  name: "Kaart",
  components: { Mapbox, TopBar, QuayListItem },
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
    selectedQuay: function() {
      return this.filteredQuays.find(
        (quay) => quay.quaycode === this.selectedQuayCode
      );
    },
    markerGeoJSON: function() {
      return {
        type: "FeatureCollection",
        features: [
          {
            type: "Feature",
            geometry: {
              type: "Point",
              coordinates: this.currentLocation.slice().reverse(),
            },
          },
        ],
      };
    },
    mapOptions: function() {
      return {
        style: "mapbox://styles/mapbox/light-v9",
        center: this.currentLocation.slice().reverse(),
        zoom: 13,
      };
    },
    filterQuaysGeoJSONLayer: function() {
      return {
        type: "geojson",
        data: this.filterQuaysGeoJSON,
        cluster: false,
        clusterMaxZoom: 12, // Max zoom to cluster points on
        clusterRadius: 50, // Radius of each cluster when clustering points (defaults to 50)
      };
    },
    mapboxExpressionMarkers: function() {
      const vehicles = ["Bus", "Metro", "Tram", "Ferry"];
      const colors = ["Red", "Orange", "LightGreen", "Green"];
      const markers = colors.flatMap((color, index) =>
        vehicles.flatMap((vehicle) => [
          [
            "all",
            [
              "==",
              ["get", "overallRating", ["get", "profileAccessibleScore"]],
              index,
            ],
            ["==", ["get", "transportmode"], vehicle.toLowerCase()],
          ],
          `marker${vehicle}${color}-svg`,
        ])
      );
      return markers;
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
        id: "quayMarkers",
        source: this.filterQuaysGeoJSONLayer,
        filter: ["!", ["has", "point_count"]],
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
      map.addLayer({
        id: "quayMarkersClusters",
        source: this.filterQuaysGeoJSONLayer,
        filter: ["has", "point_count"],
        type: "symbol",
        layout: {
          "icon-image": "markerCombiBlue-svg",
          "icon-allow-overlap": true,
          "icon-size": 1,
        },
      });
      this.setMarker();
    },
    // TODO: dirty hack, remove
    scrollToTop() {
      document.getElementById("app").scrollIntoView();
    },
    initMap(map) {
      this.map = map;
    },
    refreshData() {
      this.map.getSource("quayMarkers").setData(this.filterQuaysGeoJSON);
    },
    clicked(map, e) {
      const quaycode = e.features[0].properties.quaycode;
      this.selectedQuayCode = quaycode;
      this.sheet = true;
    },
    setMarker: function() {
      if (this.map.getLayer("markerpoint")) {
        this.map.removeLayer("markerpoint");
      }
      if (this.map.getSource("markerpoint")) {
        this.map.removeSource("markerpoint");
      }

      this.map.addSource("markerpoint", {
        type: "geojson",
        data: this.markerGeoJSON,
      });

      this.map.addLayer({
        id: "markerpoint",
        type: "symbol",
        source: "markerpoint",
        layout: {
          "icon-image": "marker-svg",
          "icon-size": 1.25,
        },
      });
    },
  },
  data: () => ({
    map: {},
    selectedQuayCode: null,
    sheet: false,
  }),
  watch: {
    filteredQuays: function() {
      this.refreshData();
    },
    currentLocation: function() {
      this.map.flyTo({
        center: this.currentLocation.slice().reverse(),
        zoom: 15,
      });

      this.map.getSource("markerpoint").setData(this.markerGeoJSON);
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
  height: 80vh;
}

.top-bar {
  width: 100%;
}
</style>
