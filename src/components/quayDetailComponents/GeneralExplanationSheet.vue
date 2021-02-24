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
          Toegankelijkheid
        </h2>
      </v-card-actions>
      <v-card-text class="text-body-2 pr-8 pl-4">
        Op basis van afmetingen van haltes en voertuigen en jouw reisprofiel
        schatten wij de toegankelijkheid in. De totaalscore is gelijk aan de
        laagste toegankelijkheidswaarde van de scores die van toepassing zijn op
        jouw situatie. Klik op een halteonderdeel voor meer informatie.
      </v-card-text>
    </v-card>
  </v-bottom-sheet>
</template>

<script>
export default {
  props: ["generalExplanationOpen"],
  computed: {
    isOpen: function() {
      return this.generalExplanationOpen;
    },
  },
};
</script>

<style lang="scss" scoped>
// TODO: very dirty, fix with vuetify classes or other solution
.v-card__text {
  color: rgba(0, 0, 0, 0.87) !important;
}
</style>
