import * as d3 from "d3-scale";

function profileAccessibleScore(quay, profile) {
  // our rating range (higher is better) and a derived maximum score
  const RATINGRANGE = [0, 1, 2, 3];
  const RATINGNA = 4;
  const maximumRating = RATINGRANGE.slice(-1)[0];

  // our rating scale function and domain constants. Calling ratingScale(domain)(number) will output
  // a number from RATINGRANGE, depending on where in the domain the number is.
  // e.g. ratingScale(THRESHOLDDOMAIN)(-0.2) will output '0'
  // and ratingScale(QUAYNARROWESTWIDTHDOMAIN)(0.01) will output '2'
  const ratingScale = (domain) =>
    d3
      .scaleThreshold()
      .domain(domain)
      .range(RATINGRANGE);

  // domain constants
  const THRESHOLDDOMAIN = [-0.02, -0.01, 0];
  const QUAYNARROWESTWIDTHDOMAIN = [-0.05, 0, 0.05];
  const RAMPROOMWIDTHDOMAIN = [-0.2, 0, 0.05];
  const RAMPMINHEIGHTDOMAIN = [-0.04, -0.02, 0];
  const VEHICLETHRESHOLDDOMAIN = [-0.02, -0.01, 0];

  // we subtract 1cm from the 30cm of a tram due to wear
  const VEHICLETRAMHEIGHT = 0.29;
  const VEHICLEBUSHEIGHT = 0.23;

  // when using the ramp, we think wheelchair users need a quay width of at least 1.5 meters to be able to board
  // TODO: do scoot mobile users need more space? (one would think so)
  const RAMPWIDTHNEEDED = 1.5;

  // TODO: pass modality as a parameter, so we can safely check if a known modality is being passed
  const WHEELCHAIRELECTRIC = "Elektrische rolstoel";
  const WHEELCHAIRMANUAL = "Handrolstoel";
  const SCOOTMOBILE = "Scootmobiel";
  const WALKINGAID = "Rollator";

  // Ramp min-height values are calculated by the maximum angle the ramp can have,
  // see https://docs.google.com/spreadsheets/d/1ANc_PizZm7Eu82_2hiIWGCYqAqQ7Wi2IE11AMYkdxq0/edit?usp=sharing
  // TODO: also add a formula for scoot mobiles
  const MINHEIGHT_MANUAL_BUS = 0.161;
  const MINHEIGHT_SCOOTMOBILE_BUS = 0.126;
  const MINHEIGHT_ELECTRIC_BUS = 0.126;
  const MINHEIGHT_MANUAL_TRAM = 0.221;
  const MINHEIGHT_ELECTRIC_TRAM = 0.186;
  const MINHEIGHT_SCOOTMOBILE_TRAM = 0.186;

  const transportMode = quay.transportmode;

  // Threshold rating block
  const threshold = !quay.ramp && !quay.lift && !quay.stopplaceaccessroute;
  const quayThresholdProfile = profile.threshold / 100;
  const quayThreshold = threshold ? quay.kerbheight : undefined;
  const quayThresholdDifference = quayThresholdProfile - quayThreshold;
  // voorbeeld: profiel: maxdrempel is 5, situatie: drempel is 6 => difference 5-6= -1
  const quayThresholdRating =
    threshold && transportMode !== "ferry"
      ? ratingScale(THRESHOLDDOMAIN)(quayThresholdDifference)
      : maximumRating;

  // quayNarrowestWidthRating block
  const quayNarrowestWidthProfile = profile.width / 100;
  const quayNarrowestWidth =
    quay.narrowestpassagewidth || quay.boardingpositionwidth; // a small percentage of quays have an unknown narrowestwidth (mostly metros and ferrys)
  // const quayWidth =
  //   quay.boardingpositionwidth !== 0.01
  //     ? quay.boardingpositionwidth
  //     : quay.narrowestpassagewidth; // a small percentage of quays have an unknown narrowestwidth (mostly metros and ferrys)
  const quayNarrowestWidthDifference =
    quayNarrowestWidth - quayNarrowestWidthProfile;
  const quayNarrowestWidthRating =
    transportMode !== "ferry"
      ? ratingScale(QUAYNARROWESTWIDTHDOMAIN)(quayNarrowestWidthDifference)
      : maximumRating;

  // vehicleThresholdRating block
  const vehicleThresholdProfile = profile.threshold / 100;
  const vehicleThreshold =
    transportMode === "tram"
      ? VEHICLETRAMHEIGHT - quay.kerbheight
      : transportMode === "bus"
      ? VEHICLEBUSHEIGHT - quay.kerbheight
      : // set metro and ferry  treshold to 0, leading to a max rating
      transportMode === "metro" || transportMode === "ferry"
      ? 0
      : null;
  const vehicleThresholdDifference = vehicleThresholdProfile - vehicleThreshold;
  // give this the highest rating if user needs a ramp
  const vehicleThresholdRating = ratingScale(VEHICLETHRESHOLDDOMAIN)(
    vehicleThresholdDifference
  );

  // rampRoomWidthRating block
  const rampRoomWidthProfile = RAMPWIDTHNEEDED;
  const rampRoomWidth = quay.boardingpositionwidth;
  const rampRoomWidthDifference = rampRoomWidth - rampRoomWidthProfile;
  // give this the highest rating if user does not need a ramp
  const rampRoomWidthRating =
    transportMode === "metro" || transportMode === "ferry"
      ? maximumRating
      : ratingScale(RAMPROOMWIDTHDOMAIN)(rampRoomWidthDifference);
  // rampRoomMinHeightRating block
  // TODO: we don't take the different ramp dimensions of tram and bus into account
  // TODO: add checks for metro and ferry?
  const rampMinHeightProfile =
    (profile.modality === WHEELCHAIRMANUAL ||
      profile.modality === WALKINGAID) &&
    transportMode === "bus"
      ? MINHEIGHT_MANUAL_BUS
      : profile.modality === WHEELCHAIRELECTRIC && transportMode === "bus"
      ? MINHEIGHT_ELECTRIC_BUS
      : profile.modality === SCOOTMOBILE && transportMode === "bus"
      ? MINHEIGHT_SCOOTMOBILE_BUS
      : (profile.modality === WHEELCHAIRMANUAL ||
          profile.modality === WALKINGAID) &&
        transportMode === "tram"
      ? MINHEIGHT_MANUAL_TRAM
      : profile.modality === WHEELCHAIRELECTRIC && transportMode === "tram"
      ? MINHEIGHT_ELECTRIC_TRAM
      : profile.modality === SCOOTMOBILE && transportMode === "tram"
      ? MINHEIGHT_SCOOTMOBILE_TRAM
      : // for now we throw a null for other transportmodes, leading to a max rating
        null;
  const rampKerbHeight = quay.kerbheight || 0; // unknown kerbs are presumed to have no height
  const rampMinHeightDifference = rampKerbHeight - rampMinHeightProfile;
  // TODO: maybe there should be a difference in the rating for a bus and a tram quay here
  // give this the highest rating if user does not need a ramp
  const rampMinHeightRating = ratingScale(RAMPMINHEIGHTDOMAIN)(
    rampMinHeightDifference
  );

  // we use a combined ramp rating
  const rampRating = Math.min(rampMinHeightRating, rampRoomWidthRating);

  const allRatings = [
    quayThresholdRating,
    quayNarrowestWidthRating,
    vehicleThresholdRating,
    rampRoomWidthRating,
    rampMinHeightRating,
  ];
  const rampRatings = [
    quayThresholdRating,
    quayNarrowestWidthRating,
    rampRoomWidthRating,
    rampMinHeightRating,
  ];

  const noRampRatings = [
    quayThresholdRating,
    quayNarrowestWidthRating,
    vehicleThresholdRating,
  ];

  // the overall rating is the lowest rating of ramp dependent ratings
  const overallRating = profile.ramp
    ? Math.min(...rampRatings)
    : Math.min(...noRampRatings);

  // to return all calculated constands, we construct them in an object here
  // TODO: is there a better way?
  return {
    transportMode,
    threshold,

    quayThresholdProfile,
    quayThreshold,
    quayThresholdDifference,
    quayThresholdRating,

    quayNarrowestWidthProfile,
    quayNarrowestWidth,
    quayNarrowestWidthDifference,
    quayNarrowestWidthRating,

    vehicleThresholdProfile,
    vehicleThreshold,
    vehicleThresholdDifference,
    vehicleThresholdRating,

    rampRoomWidthProfile,
    rampRoomWidth,
    rampRoomWidthDifference,
    rampRoomWidthRating,

    rampMinHeightProfile,
    rampKerbHeight,
    rampMinHeightDifference,
    rampMinHeightRating,

    rampRating,

    allRatings,
    overallRating,
  };
}

export { profileAccessibleScore };
