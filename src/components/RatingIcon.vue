<template>
  <!-- <v-btn fab x-small depressed :color="scoreColor" class="icon-round">
    <v-icon>
      {{ scoreIcon }}
    </v-icon>
  </v-btn> -->
  <v-avatar :color="scoreColor" size="24">
    <v-icon dark size="medium">
      {{ scoreIcon }}
    </v-icon>
  </v-avatar>
</template>

<script>
export default {
  name: "RatingIcon",
  props: ["rating", "disabled"],
  computed: {
    scoreColor: function() {
      return this.disabled
        ? "grey white--text"
        : this.rating === 0
        ? "error white--text"
        : this.rating === 1
        ? "accent white--text"
        : this.rating === 2
        ? "gvb-green lighten-2"
        : this.rating === 3
        ? "gvb-green white--text"
        : "error";
    },
    scoreIcon: function() {
      return this.disabled
        ? "mdi-check"
        : this.rating === 0
        ? "mdi-close"
        : this.rating === 1
        ? "mdi-exclamation"
        : this.rating === 2
        ? "mdi-check"
        : this.rating === 3
        ? "mdi-check"
        : "mdi-help";
    },
  },
};
</script>

<style lang="scss" scoped>
// Here I hack vuetify's button to create a round icon, and remove the pointer event. A svg icon is probably better
.icon-round {
  pointer-events: none;
}
</style>
