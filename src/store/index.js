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

// TODO: M&E: move logic like this into a seperate module OR NOT
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
    filteredQuays: (state, getters) => {
      return (
        state.quaysFiltered
          // TODO: M&E: add a filter function here, look if you want to use a helper filter and filter object or something else (lookup filtering on multiple conditions)
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
          }))
          .sort((a, b) => a.distance - b.distance)
      );
    },
  },
  //TODO: use $store.commit to call the mutations, so you can remove these actions
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
