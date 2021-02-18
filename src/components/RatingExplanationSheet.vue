<template>
  <v-bottom-sheet
    v-model="isOpen"
    scrollable
    overlay-color="white"
    @click:outside="$emit('close')"
  >
    <v-card height="75vh">
      <v-card-actions>
        <v-icon @click="$emit('close')" class="mr-2">mdi-close</v-icon>
        <h2>
          <!-- {{scoreExplanation.title}} -->
          {{ title }}
        </h2>
      </v-card-actions>
      <v-card-text class="text-body-2 pr-8 pl-4">
        {{ text }}
        <v-row class="text-body-2">
          <v-col :cols="5"><strong>Score</strong></v-col>
          <v-col :cols="7">
            <strong>{{ tableHeader }}</strong>
          </v-col>
        </v-row>
        <v-row
          class="text-body-2"
          v-for="row in ratingExplanations"
          :key="row.score"
        >
          <v-col :cols="5"><rating-label :rating="row.score"/></v-col>
          <v-col :cols="7" class="pt-2">
            {{ row.text }}
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-bottom-sheet>
</template>

<script>
import RatingLabel from "./RatingLabel.vue";
export default {
  components: { RatingLabel },
  data: () => ({}),
  computed: {
    isOpen: function() {
      return this.ratingExplanationOpen;
    },
  },
  props: [
    "ratingExplanationOpen",
    "title",
    "text",
    "tableHeader",
    "ratingExplanations",
  ],
};
</script>

<style lang="scss" scoped>
// TODO: very dirty, fix with vuetify classes or other solution
.v-card__text {
  color: rgba(0, 0, 0, 0.87) !important;
}
</style>
