import Vue from "vue";
import Vuex from "vuex";

import distance from "@turf/distance";
import * as turf from "@turf/helpers";

// calculations for accessibility and filter options in seperate scripts
import { profileAccessibleScore } from "@/helpers/profileAccessibleScore";

// TODO: review if we can safely remove this line
// import stops from "@/assets/data/ExportCHBLatest-amsterdam.json";

import quaysImport from "@/assets/data/ExportCHBLatest-quays-selection-amsterdam.json";

// TODO: we might want to alter the quays in the node script for performance and seperation of concerns
const quays = quaysImport.filter(
  (d) => d.quaystatusdata.quaystatus == "available"
); // flatten nested quay arrays

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
