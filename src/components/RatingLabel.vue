<template>
  <span class="px-2 py-1 rating-label" :class="scoreColor">
    <strong>{{ scoreText }}</strong
    ><span v-if="rating === 3"
      >&nbsp; <v-icon small color="white">mdi-thumb-up-outline</v-icon></span
    >
  </span>
</template>

<script>
export default {
  name: "RatingLabel",
  props: ["rating"],
  computed: {
    scoreColor: function() {
      return this.rating === 0
        ? "error white--text"
        : this.rating === 1
        ? "accent white--text"
        : this.rating === 2
        ? "gvb-green lighten-2 white--text"
        : this.rating === 3
        ? "gvb-green white--text"
        : "error white--text";
    },
    scoreText: function() {
      return this.rating === 0
        ? "Ontoegankelijk"
        : this.rating === 1
        ? "Matig"
        : this.rating === 2
        ? "Redelijk"
        : this.rating === 3
        ? "Zeer goed"
        : "Onbekende gegevens";
    },
  },
};
</script>

<style lang="scss" scoped>
.rating-label {
  display: inline-block;
}
</style>
