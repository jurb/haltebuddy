<template>
  <span class="text--secondary text-body-2">
    {{ distanceText }}
  </span>
</template>

<script>
export default {
  name: "DistanceText",
  props: ["distance"],
  computed: {
    distanceText: function() {
      const distancePrecision = Number.parseFloat(this.distance).toPrecision(2);
      return this.distance < 1
        ? `${Math.round(distancePrecision * 1000)}m`
        : `${distancePrecision}km`;
    },
  },
};
</script>

<style lang="scss" scoped></style>
