import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

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
  plugins: [createPersistedState()],
  state: {
    profile: {
      width: 75,
      threshold: 2,
      modality: "Elektrische rolstoel",
      ramp: true,
    },
    filters: {
      vehicles: ["tram", "bus", "metro", "ferry"],
      favourites: [],
      accessibleonly: true,
      minimumRating: 0,
      favouritesonly: false,
    },
    // initial location (center of Amsterdam according to wikipedia)
    currentLocation: [52.369, 4.9041],
    currentLocationName: "Amsterdam",
    lastSelectedQuay: null,
    locationSet: false,
    quaysAll: quays,
    quaysFiltered: quays,
    GVBdata: [],
    userReviews: [
      {
        showEverywhere: true,
        quaycode: "",
        name: "Sjoerd",
        stars: 3,
        text:
          "Halte op komen lukt gemakkelijk, maar weinig ruimte voor oprijplank. De plank is best steil en ik kan er met mijn elektrische rolstoel net opdraaien.",
        timestamp: 1613986114197,
      },
      {
        showEverywhere: true,
        quaycode: "",
        name: "Faye",
        stars: 4,
        text:
          "Je moet de weg oversteken in een bocht om op de halte te kunnen komen. Dat is gevaarlijk voor mij met mijn rollator. Verder een fijne halte.",
        timestamp: 1613986114197,
      },
    ],
  },
  getters: {
    enhancedQuays: (state, getters) => {
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
          ),
        }))
        .sort((a, b) => a.distance - b.distance);
    },
    filteredQuays: (state, getters) => {
      return getters.enhancedQuays.filter(
        (quay) =>
          state.filters.vehicles.includes(quay.transportmode) &&
          quay.profileAccessibleScore.overallRating >=
            state.filters.minimumRating &&
          (state.filters.favouritesonly
            ? state.filters.favourites.includes(quay.quaycode)
            : true)
      );
    },
    reviews: (state) => (quaycode) => {
      return state.userReviews.filter(
        (d) => d.showEverywhere || d.quaycode === quaycode
      );
    },
  },
  //TODO: use $store.commit to call the mutations, so you can remove these actions
  actions: {
    changeFilter({ commit }, e) {
      commit("changeFilter", e);
    },
    changeProfile({ commit }, e) {
      commit("changeProfile", e);
    },
    changeQuays({ commit }, e) {
      commit("changeQuays", e);
    },
    changeLocationSet({ commit }, e) {
      commit("changeLocationSet", e);
    },
    changelastSelectedQuay({ commit }, e) {
      commit("changelastSelectedQuay", e);
    },
    addReview({ commit }, e) {
      commit("addReview", e);
    },
    changeCurrentLocation({ commit }, e) {
      commit("changeCurrentLocation", e);
    },
    changeCurrentLocationName({ commit }, e) {
      commit("changeCurrentLocationName", e);
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
    changeProfile(state, payload) {
      state.profile[payload.prop] = payload.value;
    },
    changeQuays(state, val) {
      state.quaysFiltered = val;
    },
    changeLocationSet(state, val) {
      state.locationSet = val;
    },
    changelastSelectedQuay(state, val) {
      state.lastSelectedQuay = val;
    },
    addReview(state, val) {
      state.userReviews = [...state.userReviews, val];
    },
    changeCurrentLocation(state, val) {
      state.currentLocation = val;
    },
    changeCurrentLocationName(state, val) {
      state.currentLocationName = val;
    },
    setGVBdata(state, val) {
      state.GVBdata = val;
    },
  },
});
