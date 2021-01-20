import * as d3 from "d3-scale";

function profileAccessibleScore(quay, profile) {
  // our rating range (higher is better) and a derived maximum score
  const RATINGRANGE = [0, 1, 2, 3];
  const maximumRating = RATINGRANGE.slice(-1)[0];

  // our rating scale function and domain constants. Calling ratingScale(domain)(number) will output
  // a number from RATINGRANGE, depending on where in the domain the number is.
  // e.g. ratingScale(THRESHOLDDOMAIN)(-0.2) will output '0'
  // and ratingScale(STOPNARROWESTWIDTHDOMAIN)(0.01) will output '2'
  const ratingScale = (domain) =>
    d3
      .scaleThreshold()
      .domain(domain)
      .range(RATINGRANGE);
  // domain constants
  const THRESHOLDDOMAIN = [-0.01, 0, 0.01];
  const STOPNARROWESTWIDTHDOMAIN = [-0.05, 0, 0.05];
  const RAMPROOMWIDTHDOMAIN = [-0.2, 0, 0.05];
  const RAMPROOMMINHEIGHTDOMAIN = [-0.01, 0, 0];
  const VEHICLETHRESHOLDDOMAIN = [-0.02, 0, 0.01];

  // we subtract 1cm from the 30cm of a tram due to wear
  const VEHICLETRAMHEIGHT = 0.29;
  const VEHICLEBUSHEIGHT = 0.23;

  // when using the ramp, we think wheelchair users need a quay width of at least 1.5 meters to be able to board
  const RAMPWIDTHNEEDED = 1.5;

  const WHEELCHAIRMANUAL = "wheelchairManual";
  const WHEELCHAIRELECTRIC = "wheelchairElectric";

  // Ramp min-height values are calculated by the maximum angle the ramp can have,
  // see https://docs.google.com/spreadsheets/d/1ANc_PizZm7Eu82_2hiIWGCYqAqQ7Wi2IE11AMYkdxq0/edit?usp=sharing
  const MINHEIGHT_MANUAL_BUS = 0.161;
  const MINHEIGHT_ELECTRIC_BUS = 0.126;
  const MINHEIGHT_MANUAL_TRAM = 0.221;
  const MINHEIGHT_ELECTRIC_TRAM = 0.186;

  // Threshold rating block
  const threshold =
    !quay.ramp && !quay.stopplaceaccessroute && quay.kerbheight > 0;
  const stopThresholdProfile = profile.threshold / 100;
  const stopThreshold = threshold ? quay.kerbheight : null;
  const stopThresholdDifference = stopThresholdProfile - stopThreshold;
  // voorbeeld: profiel: maxdrempel is 5, situatie: drempel is 6 => difference 5-6= -1
  const stopThresholdRating = threshold
    ? ratingScale(THRESHOLDDOMAIN)(stopThresholdDifference)
    : maximumRating;

  // stopNarrowestWidthRating block
  const stopNarrowestWidthProfile = profile.width / 100;
  const stopNarrowestWidth = quay.narrowestpassagewidth;
  const stopNarrowestWidthDifference =
    stopNarrowestWidth - stopNarrowestWidthProfile;
  const stopNarrowestWidthRating = ratingScale(STOPNARROWESTWIDTHDOMAIN)(
    stopNarrowestWidthDifference
  );

  // vehicleThresholdRating block
  const transportMode = quay.transportmode;
  const vehicleThresholdProfile = profile.threshold / 100;
  const vehicleThreshold =
    transportMode === "tram"
      ? VEHICLETRAMHEIGHT - quay.kerbheight
      : transportMode === "bus"
      ? VEHICLEBUSHEIGHT - quay.kerbheight
      : null;
  const vehicleThresholdDifference = vehicleThresholdProfile - vehicleThreshold;
  // give this the highest rating if user needs a ramp
  const vehicleThresholdRating = profile.ramp
    ? maximumRating
    : ratingScale(VEHICLETHRESHOLDDOMAIN)(vehicleThresholdDifference);

  // rampRoomWidthRating block
  const rampRoomWidthProfile = RAMPWIDTHNEEDED;
  const rampRoomWidth = quay.boardingpositionwidth;
  const rampRoomWidthDifference = rampRoomWidth - rampRoomWidthProfile;
  // give this the highest rating if user does not need a ramp
  const rampRoomWidthRating = profile.ramp
    ? ratingScale(RAMPROOMWIDTHDOMAIN)(rampRoomWidthDifference)
    : maximumRating;

  // rampRoomMinHeightRating block
  // TODO: we don't take the different ramp dimensions of tram and bus into account
  // TODO: add checks for metro and ferry?
  const rampRoomMinHeightProfile =
    profile.profileModality === WHEELCHAIRMANUAL && transportMode === "bus"
      ? MINHEIGHT_MANUAL_BUS
      : profile.profileModality === WHEELCHAIRELECTRIC &&
        transportMode === "bus"
      ? MINHEIGHT_ELECTRIC_BUS
      : profile.profileModality === WHEELCHAIRMANUAL && transportMode === "tram"
      ? MINHEIGHT_MANUAL_TRAM
      : profile.profileModality === WHEELCHAIRELECTRIC &&
        transportMode === "tram"
      ? MINHEIGHT_ELECTRIC_TRAM
      : // for now we throw a null for other transportmodes, leading to a max rating
        null;
  const rampRoomKerbHeight = quay.kerbheight;
  const rampRoomMinHeightDifference =
    rampRoomKerbHeight - rampRoomMinHeightProfile;
  // TODO: maybe there should be a difference in the rating for a bus and a tram quay here
  // give this the highest rating if user does not need a ramp
  const rampRoomMinHeightRating = profile.ramp
    ? ratingScale(RAMPROOMMINHEIGHTDOMAIN)(rampRoomMinHeightDifference)
    : maximumRating;

  // we use a combined ramp rating
  const rampRating = Math.min(rampRoomMinHeightRating, rampRoomWidthRating);

  const allRatings = [
    stopThresholdRating,
    stopNarrowestWidthRating,
    vehicleThresholdRating,
    rampRoomWidthRating,
    rampRoomMinHeightRating,
    rampRating,
  ];

  // the overall rating is the lowest rating of all ratings
  const overallRating = Math.min(...allRatings);

  // to return all calculated constands, we construct them in an object here
  // TODO: is there a better way?
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
