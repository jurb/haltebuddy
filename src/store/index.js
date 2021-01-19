import Vue from "vue";
import Vuex from "vuex";

import distance from "@turf/distance";
import * as turf from "@turf/helpers";

// calculations for accessibility and filter options in seperate scripts
import { profileAccessibleScore } from "@/helpers/profileAccessibleScore";

import quaysImport from "@/assets/data/ExportCHBLatest-quays-selection-amsterdam.json";

// manually generated file from GTFS dump to show lines for each quay
// GTFS downloaded from https://transitfeeds.com/p/ov/814/latest (python notebook available on request)
// Current date: 2021-01-14
import quayRouteNames from "@/assets/data/quay_route_names.json";

const quays = quaysImport
  .filter(
    (quay) =>
      // filter out quays with no current line information
      // TODO: this is tricky, since the quayRouteNames file is manually generated and gets outdated easily
      quay.quaystatusdata.quaystatus == "available" &&
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
      threshold: 12,
      modality: "Electrische rolstoel",
      ramp: false,
      thresholdLess: false,
    },
    currentLocation: [],
    quaysAll: quays,
    quaysFiltered: quays,
  },
  getters: {
    // TODO: build in better error handling than putting in a fake number for distance, probably
    filteredQuays: (state, getters) => {
      console.log(state.quaysAll);
      return (
        state.quaysFiltered
          .map((quay) => ({
            distance: state.currentLocation.length
              ? distance(
                  turf.point(state.currentLocation),
                  turf.point([quay.geo.lat, quay.geo.lon])
                )
              : -1,
            ...quay,
            profileAccessibleScore: profileAccessibleScore(quay, state.profile),
          }))
          // .sort((a, b) =>
          //   a.quaynamedata.quayname.localeCompare(b.quaynamedata.quayname)
          // )
          .sort((a, b) => a.distance - b.distance)
      );
    },
  },
  actions: {
    changeQuays({ commit }, e) {
      commit("changeQuays", e);
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
  },
  mutations: {
    changeQuays(state, val) {
      state.quaysFiltered = val;
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
  },
});
