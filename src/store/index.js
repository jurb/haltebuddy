import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    profile: { width: 50, height: 2 },
  },
  getters: {
    // put values from filter data in one array so we can filter the steps on them
    exampleGetter: (state, getters) => (el) => {
      return state;
    },
  },
  actions: {
    actionExample({ commit }) {
      commit("mutationExample", null);
    },
  },
  mutations: {
    mutationExample(state, val) {
      state.profile = val;
    },
  },
});
