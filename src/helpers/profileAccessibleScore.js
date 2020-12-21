import * as d3 from "d3-scale";

function profileAccessibleScore(quay, profile) {
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

  const stopThresholdProfile = profile.threshold / 100;
  const stopThreshold = threshold ? adaptations.heightwithenvironment : null;
  const stopThresholdDifference = stopThresholdProfile - stopThreshold;
  // voorbeeld: profiel: maxdrempel is 5, situatie: drempel is 6 => difference 5-6= -1
  const stopThresholdRating = stopRatingScaleAsc([-0.01, 0, 0.01])(
    stopThresholdDifference
  );

  const stopNarrowestWidthProfile = profile.width / 100;
  const stopNarrowestWidth = adaptations.narrowestpassagewidth;
  const stopNarrowestWidthDifference =
    stopNarrowestWidth - stopNarrowestWidthProfile;
  const stopNarrowestWidthRating = stopRatingScaleAsc([-0.05, 0, 0.05])(
    stopNarrowestWidthDifference
  );

  const vehicleThresholdProfile = profile.threshold / 100;
  const vehicleThreshold =
    transportMode === "tram"
      ? 0.29 - adaptations.kerbheight
      : transportMode === "bus"
      ? 0.23 - adaptations.kerbheight
      : null;
  const vehicleThresholdDifference = vehicleThresholdProfile - vehicleThreshold;
  const vehicleThresholdRating = stopRatingScaleAsc([-0.01, 0, 0.01])(
    vehicleThresholdDifference
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

    stopThresholdProfile,
    stopThreshold,
    stopThresholdDifference,
    stopThresholdRating,

    stopNarrowestWidthProfile,
    stopNarrowestWidth,
    stopNarrowestWidthDifference,
    stopNarrowestWidthRating,

    vehicleThresholdProfile,
    vehicleThreshold,
    vehicleThresholdDifference,
    vehicleThresholdRating,

    plankRoomWidthProfile,
    plankRoomWidth,
    plankRoomWidthDifference,
    plankRoomWidthRating,

    plankRoomMinHeightProfile,
    plankRoomKerbHeight,
    plankRoomMinHeightDifference,
    plankRoomMinHeightRating,
  };
}

export { profileAccessibleScore };
