import Vue from "vue";
import Vuex from "vuex";

import stops from "@/assets/ExportCHBLatest-amsterdam.json";

import * as d3 from "d3-scale";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    profile: { width: 90, threshold: 2, ramp: false },
  },
  getters: {
    filteredQuays: (state, getters) => {
      return quays.map((el) => ({
        ...el,
        profileAccessibleScore: profileAccessibleScore(el, state.profile),
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

const profileAccessibleScore = (quay, profile) => {
  const stopRatingRange = ["🔴", "🟠", "🤔", "🟢"];
  const stopRatingScaleAsc = (domain) =>
    d3
      .scaleThreshold()
      .domain(domain)
      .range(stopRatingRange);

  const adaptations = quay.quayaccessibilityadaptions || {};
  const threshold =
    !adaptations.ramp &&
    !adaptations.stopplaceaccessroute &&
    adaptations.heightwithenvironment > 0;
  const transportMode = quay.quaytransportmodes.transportmodedata.transportmode;

  const stopTresholdProfile = profile.threshold / 100;
  const stopTreshold = threshold ? adaptations.heightwithenvironment : null;
  const stopTresholdDifference = stopTresholdProfile - stopTreshold;
  // voorbeeld: profiel: maxdrempel is 5, situatie: drempel is 6 => difference 5-6= -1
  const stopTresholdRating = stopRatingScaleAsc([-0.01, 0, 0.01])(
    stopTresholdDifference
  );

  const stopNarrowestWidthProfile = profile.width;
  const stopNarrowestWidth = adaptations.narrowestpassagewidth;
  const stopNarrowestWidthDifference =
    stopNarrowestWidth - stopNarrowestWidthProfile;
  const stopNarrowestWidthRating = stopRatingScaleAsc([-0.05, 0, 0.05])(
    stopNarrowestWidthDifference
  );

  const vehicleTresholdProfile = profile.threshold / 100;
  const vehicleTreshold =
    transportMode === "tram"
      ? 0.29 - adaptations.kerbheight
      : transportMode === "bus"
      ? 0.23 - adaptations.kerbheight
      : null;
  const vehicleTresholdDifference = vehicleTresholdProfile - vehicleTreshold;
  const vehicleTresholdRating = stopRatingScaleAsc([-0.01, 0, 0.01])(
    vehicleTresholdDifference
  );

  const plankRoomWidthProfile = 1.5;
  const plankRoomWidth = adaptations.boardingpositionwidth;
  const plankRoomWidthDifference = plankRoomWidth - plankRoomWidthProfile;
  const plankRoomWidthRating = stopRatingScaleAsc([-0.2, 0, 0.05])(
    plankRoomWidthDifference
  );

  // TODO: plankRoomMinHeight lostrekken in tram en bus variant, en nog rekening houden met afmetingen plank bus, dat doen we nu nog niet
  const plankRoomMinHeightProfile =
    profile.profileModality === "wheelchairManual" && transportMode === "bus"
      ? 0.161
      : profile.profileModality === "wheelchairElectric" &&
        transportMode === "bus"
      ? 0.126
      : profile.profileModality === "wheelchairManual" &&
        transportMode === "tram"
      ? 0.221
      : profile.profileModality === "wheelchairElectric" &&
        transportMode === "tram"
      ? 0.186
      : null;

  const plankRoomKerbHeight = adaptations.kerbheight;
  const plankRoomMinHeightDifference =
    plankRoomKerbHeight - plankRoomMinHeightProfile;
  // TODO: zie hierboven, ratingschaal moet rekening houden met bus en tram, dit is nog te kort door de bocht
  const plankRoomMinHeightRating = stopRatingScaleAsc([-0.01, 0, 0])(
    plankRoomMinHeightDifference
  );

  return {
    transportMode,

    stopTresholdProfile,
    stopTreshold,
    stopTresholdDifference,
    stopTresholdRating,

    stopNarrowestWidthProfile,
    stopNarrowestWidth,
    stopNarrowestWidthDifference,
    stopNarrowestWidthRating,

    vehicleTresholdProfile,
    vehicleTreshold,
    vehicleTresholdDifference,
    vehicleTresholdRating,

    plankRoomWidthProfile,
    plankRoomWidth,
    plankRoomWidthDifference,
    plankRoomWidthRating,

    plankRoomMinHeightProfile,
    plankRoomKerbHeight,
    plankRoomMinHeightDifference,
    plankRoomMinHeightRating,
  };
};

const rdToWgs84 = (x, y) => {
  /**
   * Converts the Dutch coordinate system to standard WGS84 (GPS) coordinates
   *
   * @param x
   * @param y
   * @return {{lon: *, error: null, lat: *}}
   */
  const convert = (x, y) => {
    const x0 = 155000.0;
    const y0 = 463000.0;

    const f0 = 52.156160556;
    const l0 = 5.387638889;

    const a01 = 3236.0331637;
    const b10 = 5261.3028966;
    const a20 = -32.5915821;
    const b11 = 105.9780241;
    const a02 = -0.2472814;
    const b12 = 2.4576469;
    const a21 = -0.8501341;
    const b30 = -0.8192156;
    const a03 = -0.0655238;
    const b31 = -0.0560092;
    const a22 = -0.0171137;
    const b13 = 0.0560089;
    const a40 = 0.0052771;
    const b32 = -0.0025614;
    const a23 = -0.0003859;
    const b14 = 0.001277;
    const a41 = 0.0003314;
    const b50 = 0.0002574;
    const a04 = 0.0000371;
    const b33 = -0.0000973;
    const a42 = 0.0000143;
    const b51 = 0.0000293;
    const a24 = -0.000009;
    const b15 = 0.0000291;

    const dx = (x - x0) * Math.pow(10, -5);
    const dy = (y - y0) * Math.pow(10, -5);

    let df =
      a01 * dy +
      a20 * Math.pow(dx, 2) +
      a02 * Math.pow(dy, 2) +
      a21 * Math.pow(dx, 2) * dy +
      a03 * Math.pow(dy, 3);
    df +=
      a40 * Math.pow(dx, 4) +
      a22 * Math.pow(dx, 2) * Math.pow(dy, 2) +
      a04 * Math.pow(dy, 4) +
      a41 * Math.pow(dx, 4) * dy;
    df +=
      a23 * Math.pow(dx, 2) * Math.pow(dy, 3) +
      a42 * Math.pow(dx, 4) * Math.pow(dy, 2) +
      a24 * Math.pow(dx, 2) * Math.pow(dy, 4);

    const f = f0 + df / 3600;

    let dl =
      b10 * dx +
      b11 * dx * dy +
      b30 * Math.pow(dx, 3) +
      b12 * dx * Math.pow(dy, 2) +
      b31 * Math.pow(dx, 3) * dy;
    dl +=
      b13 * dx * Math.pow(dy, 3) +
      b50 * Math.pow(dx, 5) +
      b32 * Math.pow(dx, 3) * Math.pow(dy, 2) +
      b14 * dx * Math.pow(dy, 4);
    dl +=
      b51 * Math.pow(dx, 5) * dy +
      b33 * Math.pow(dx, 3) * Math.pow(dy, 3) +
      b15 * dx * Math.pow(dy, 5);

    const l = l0 + dl / 3600;

    const fWgs = f + (-96.862 - 11.714 * (f - 52) - 0.125 * (l - 5)) / 100000;
    const lWgs = l + (-37.902 + 0.329 * (f - 52) - 14.667 * (l - 5)) / 100000;

    return {
      error: null,
      lat: fWgs,
      lon: lWgs,
    };
  };

  /**
   * Exports the converter module
   *
   * @param x
   * @param y
   * @return {{lon: *, error: null, lat: *}|{lon: null, error: string, lat: null}}
   */

  x = parseFloat(x);
  y = parseFloat(y);
  if (x < 1000) x *= 1000;
  if (y < 1000) y *= 1000;

  if (x < 0 || x > 290000) {
    return {
      error: new Error("Value 'X' must be between 0 and 290(000)"),
      lat: null,
      lon: null,
    };
  }

  if (y < 290000 || y > 630000) {
    return {
      error: new Error("Value 'Y' must be between 290(000) and 630(000)"),
      lat: null,
      lon: null,
    };
  }

  return convert(x, y);
};

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
