import Vue from "vue";
import Vuex from "vuex";

import distance from "@turf/distance";
import * as turf from "@turf/helpers";

// calculations for accessibility and filter options in seperate scripts
import { profileAccessibleScore } from "@/helpers/profileAccessibleScore";

import quaysImport from "@/assets/data/ExportCHBLatest-quays-and-props-selection-amsterdam.json";

// manually generated file from GTFS dump to show lines for each quay
// GTFS downloaded from https://transitfeeds.com/p/ov/814/latest (python notebook available on request)
// Current date: 2021-01-14
import quayRouteNames from "@/assets/data/quay_route_names.json";

// TODO: M&E: move logic like this into a seperate module OR NOT
const quays = quaysImport
  .filter(
    (quay) =>
      // filter out quays with no current line information
      // TODO: this is tricky, since the quayRouteNames file is manually generated and gets outdated easily
      quay.quaystatus == "available" &&
      quayRouteNames["route_short_name"][quay.quaycode]
  ) // flatten nested quay arrays
  .map((quay) => ({
    ...quay,
    // add routenames gathered from gtfs set
    routes: quayRouteNames["route_short_name"][quay.quaycode],
  }));

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    profile: {
      width: 90,
      threshold: 15,
      modality: "Electrische rolstoel",
      ramp: false,
      thresholdLess: false,
    },
    filters: {
      vehicles: ["tram", "bus", "metro"],
      accessibleonly: true,
    },
    currentLocation: [],
    locationSet: false,
    quaysAll: quays,
    quaysFiltered: quays,
    GVBdata: [],
  },
  getters: {
    filteredQuays: (state, getters) => {
      return state.quaysFiltered
        .map((quay) => ({
          distance:
            state.currentLocation.length && quay.geo && !quay.geo.error
              ? distance(
                  turf.point(state.currentLocation),
                  turf.point([quay.geo.lat, quay.geo.lon])
                )
              : undefined,
          ...quay,
          profileAccessibleScore: profileAccessibleScore(quay, state.profile),
          elevatorMalfunction: state.GVBdata.find(
            (d) =>
              quay.quayname.includes(d.Station) &&
              quay.transportmode === "metro"
          )
            ? true
            : false,
        }))
        .filter(
          (quay) =>
            state.filters.vehicles.includes(quay.transportmode) &&
            (state.filters.accessibleonly
              ? quay.profileAccessibleScore.overallRating !== 0
              : quay)
        )
        .sort((a, b) => a.distance - b.distance);
    },
  },
  //TODO: use $store.commit to call the mutations, so you can remove these actions
  actions: {
    changeFilter({ commit }, e) {
      commit("changeFilter", e);
    },
    changeQuays({ commit }, e) {
      commit("changeQuays", e);
    },
    changeLocationSet({ commit }, e) {
      commit("changeLocationSet", e);
    },
    changeCurrentLocation({ commit }, e) {
      commit("changeCurrentLocation", e);
    },
    changeProfile({ commit }, e) {
      commit("changeProfile", e);
    },
    changeProfileWidth({ commit }, e) {
      commit("changeProfileWidth", e);
    },
    changeProfileThreshold({ commit }, e) {
      commit("changeProfileThreshold", e);
    },
    changeProfileRamp({ commit }, e) {
      commit("changeProfileRamp", e);
    },
    changeProfileModality({ commit }, e) {
      commit("changeProfileModality", e);
    },
    fetchGVBpage({ commit }, e) {
      const zip = (arr, ...arrs) => {
        return arr.map((val, i) =>
          arrs.reduce((a, arr) => [...a, arr[i]], [val])
        );
      };
      const zipObject = (props, values) => {
        return props.reduce((prev, prop, i) => {
          return Object.assign(prev, { [prop]: values[i] });
        }, {});
      };
      fetch(
        `https://cors-anywhere-jurb-observable.herokuapp.com/https://www.gvb.nl/verstoringen/liften/liften.html`
      )
        .then((res) => res.text())
        .then((html) => {
          const parser = new DOMParser();
          const doc = parser.parseFromString(html, "text/html");
          const rows = doc.querySelectorAll(".views-row");
          const gvbLabels = Array.from(rows, (row) =>
            Array.from(
              row.querySelectorAll(".views-label"),
              (d) => d.textContent
            )
          );
          const gvbContent = Array.from(rows, (row) =>
            Array.from(row.querySelectorAll(".field-content"), (d) =>
              d.textContent
                .trim()
                .replaceAll("\n", " ")
                .replaceAll("                 ", " | ")
                .replaceAll(" Richting", "richting")
            )
          );
          const GVBdataObject = zip(gvbLabels, gvbContent).map((el) =>
            zipObject(el[0], el[1])
          );
          console.log(GVBdataObject);
          commit("setGVBdata", GVBdataObject);
        })
        .catch((error) => console.error(error.message));
    },
  },
  mutations: {
    // TODO: refactor the profile mutations into one mutation, like below with filters
    changeFilter(state, payload) {
      state.filters[payload.prop] = payload.value;
    },
    changeQuays(state, val) {
      state.quaysFiltered = val;
    },
    changeLocationSet(state, val) {
      state.locationSet = val;
    },
    changeCurrentLocation(state, val) {
      state.currentLocation = val;
    },
    changeProfile(state, val) {
      state.profile = val;
    },
    changeProfileWidth(state, val) {
      state.profile.width = val;
    },
    changeProfileThreshold(state, val) {
      state.profile.threshold = val;
    },
    changeProfileRamp(state, val) {
      state.profile.ramp = val;
      state.profile.thresholdLess = val;
      state.profile.threshold = 12;
    },
    changeProfileModality(state, val) {
      state.profile.modality = val;
    },
    setGVBdata(state, val) {
      state.GVBdata = val;
    },
  },
});
