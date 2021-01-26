<template>
  <span class="px-1" :class="scoreColor">
    <strong>{{ scoreText }}</strong>
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
        ? "gvb-green lighten-2"
        : this.rating === 3
        ? "gvb-green white--text"
        : "error white--text";
    },
    scoreText: function() {
      return this.rating === 0
        ? "Niet toegankelijk"
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
