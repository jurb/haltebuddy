import * as d3 from "d3-scale";

function profileAccessibleScore(quay, profile) {
  const stopRatingRange = [0, 1, 2, 3];

  const stopRatingScale = (domain) =>
    d3
      .scaleThreshold()
      .domain(domain)
      .range(stopRatingRange);

  const adaptations = quay.quayaccessibilityadaptions || {};

  const threshold =
    !adaptations.ramp &&
    !adaptations.stopplaceaccessroute &&
    adaptations.kerbheight > 0;

  const transportMode = quay.quaytransportmodes.transportmodedata.transportmode;

  const stopThresholdProfile = profile.threshold / 100;
  const stopThreshold = threshold ? adaptations.kerbheight : null;
  const stopThresholdDifference = stopThresholdProfile - stopThreshold;
  // voorbeeld: profiel: maxdrempel is 5, situatie: drempel is 6 => difference 5-6= -1
  const stopThresholdRating = threshold
    ? stopRatingScale([-0.01, 0, 0.01])(stopThresholdDifference)
    : 3;

  const stopNarrowestWidthProfile = profile.width / 100;
  const stopNarrowestWidth = adaptations.narrowestpassagewidth;
  const stopNarrowestWidthDifference =
    stopNarrowestWidth - stopNarrowestWidthProfile;
  const stopNarrowestWidthRating = stopRatingScale([-0.05, 0, 0.05])(
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
  // give this the highest rating if user needs a ramp
  const vehicleThresholdRating = profile.ramp
    ? 3
    : stopRatingScale([-0.02, 0, 0.01])(vehicleThresholdDifference);

  const rampRoomWidthProfile = 1.5;
  const rampRoomWidth = adaptations.boardingpositionwidth;
  const rampRoomWidthDifference = rampRoomWidth - rampRoomWidthProfile;
  // give this the highest rating if user does not need a ramp
  const rampRoomWidthRating = profile.ramp
    ? stopRatingScale([-0.2, 0, 0.05])(rampRoomWidthDifference)
    : 3;

  // TODO: rampRoomMinHeight lostrekken in tram en bus variant, en nog rekening houden met afmetingen ramp bus, dat doen we nu nog niet
  const rampRoomMinHeightProfile =
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
  const rampRoomKerbHeight = adaptations.kerbheight;
  const rampRoomMinHeightDifference =
    rampRoomKerbHeight - rampRoomMinHeightProfile;
  // TODO: zie hierboven, ratingschaal moet rekening houden met bus en tram, dit is nog te kort door de bocht
  // give this the highest rating if user does not need a ramp
  const rampRoomMinHeightRating = profile.ramp
    ? stopRatingScale([-0.01, 0, 0])(rampRoomMinHeightDifference)
    : 3;

  const rampRating = Math.min(rampRoomMinHeightRating, rampRoomWidthRating);

  const allRatings = [
    stopThresholdRating,
    stopNarrowestWidthRating,
    vehicleThresholdRating,
    rampRoomWidthRating,
    rampRoomMinHeightRating,
    rampRating,
  ];

  const overallRating = Math.min(
    stopThresholdRating,
    stopNarrowestWidthRating,
    vehicleThresholdRating,
    rampRoomWidthRating,
    rampRoomMinHeightRating,
    rampRating
  );

  return {
    transportMode,
    threshold,

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

    rampRoomWidthProfile,
    rampRoomWidth,
    rampRoomWidthDifference,
    rampRoomWidthRating,

    rampRoomMinHeightProfile,
    rampRoomKerbHeight,
    rampRoomMinHeightDifference,
    rampRoomMinHeightRating,

    rampRating,

    allRatings,
    overallRating,
  };
}

export { profileAccessibleScore };
