import Vue from "vue";
import Vuex from "vuex";

import { rdToWgs84, getCardinalDirectionShort } from "@/helpers/utils";
import { profileAccessibleScore } from "@/helpers/profileAccessibleScore";

import stops from "@/assets/data/ExportCHBLatest-amsterdam.json";

// TODO: we might want to alter the quays in the node script for performance and seperation of concerns
const quays = stops
  .map((stopplace) => {
    const { quays, ...stop } = stopplace; // destructure quays and stop objects in own constants
    const quaysWrapped =
      { ...quays }["quay"] instanceof Array
        ? { ...quays }["quay"]
        : [{ ...quays }["quay"]]; // if there is a single quay object, put it in an array so we can map over it

    const quaysWithStop = quaysWrapped
      .filter((el) => el) // remove empty arrays
      .map((quay) => ({
        // map over each quay
        ...quay, // destructure whole quay object
        stopplace: stop, // also add the stopplace information
        geo: rdToWgs84(
          quay.quaylocationdata["rd-x"],
          quay.quaylocationdata["rd-y"]
        ), // add wsg84 coordinates
      }));

    return quaysWithStop;
  })
  .flat()
  .filter((d) => d.quaystatusdata.quaystatus == "available"); // flatten nested quay arrays

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
            direction: getCardinalDirectionShort(
              quay.quaybearing.compassdirection
            ),
          }))
          // I'm filtering the initial results for now, performance of the Halte
          // component isn't great if we show all quays
          .filter((el) => el.quaynamedata.quayname.includes("plein"))
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
