import Vue from "vue";
import Vuex from "vuex";

import { rdToWgs84, getCardinalDirectionShort } from "@/helpers/utils";
import { profileAccessibleScore } from "@/helpers/profileAccessibleScore";

import stops from "@/assets/data/ExportCHBLatest-amsterdam.json";

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
    quaysAll: quays,
    quaysFiltered: quays,
  },
  getters: {
    filteredQuays: (state, getters) => {
      return (
        state.quaysFiltered
          .map((quay) => ({
            ...quay,
            profileAccessibleScore: profileAccessibleScore(quay, state.profile),
          }))
          // I'm filtering the initial results for now, performance of the Halte
          // component isn't great if we show all quays
          // .filter((el) => el.quaynamedata.quayname.includes("kade"))
          .sort((a, b) =>
            a.quaynamedata.quayname.localeCompare(b.quaynamedata.quayname)
          )
      );
    },
  },
  actions: {
    changeQuays({ commit }, e) {
      commit("changeQuays", e);
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
