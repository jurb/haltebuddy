import Vue from "vue";
import Vuex from "vuex";

import quays from "@/assets/ExportCHBLatest-amsterdam.json";

import * as d3 from "d3-scale";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    profile: { width: 90, threshold: 2, ramp: false },
    quays: quays,
  },
  getters: {
    filterQuays: (state, getters) => {
      return state.quays
        .filter((el) => el.stopplacename.publicname.includes("plein"))
        .map((el) => el.stopplacename.publicname);
    },
    stopRatingRange: () => ["🔴", "🟠", "🤔", "🟢"],
    stopRatingScaleAsc: (state, getters) => (domain) =>
      d3
        .scaleThreshold()
        .domain(domain)
        .range(getters.stopRatingRange),
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
