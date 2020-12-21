import Vue from "vue";
import Vuex from "vuex";

import { rdToWgs84, getCardinalDirectionShort } from "@/helpers/utils";
import { profileAccessibleScore } from "@/helpers/profileAccessibleScore";

import stops from "@/assets/data/ExportCHBLatest-amsterdam.json";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    profile: { width: 90, threshold: 2, ramp: false },
  },
  getters: {
    filteredQuays: (state, getters) => {
      return quays.map((quay) => ({
        ...quay,
        profileAccessibleScore: profileAccessibleScore(quay, state.profile),
        direction: getCardinalDirectionShort(quay.quaybearing.compassdirection),
      }));
    },
  },
  actions: {
    changeProfile({ commit }) {
      commit("changeProfile", null);
    },
  },
  mutations: {
    changeProfile(state, val) {
      state.profile = val;
    },
  },
});

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
  .filter((d) => d.quaystatusdata.quaystatus == "available"); // flaten nested quay arrays
