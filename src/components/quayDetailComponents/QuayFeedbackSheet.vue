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
          Er klopt iets niet voor mij
        </h2>
      </v-card-actions>
      <v-card-text class="text-body-2 pr-8 pl-4">
        <p v-if="feedbackMode">
          Als een meeting of de score niet klopt, horen we het graag! We sturen
          jouw bevindingen dan gelijk door naar de vervoerder.
        </p>
        <template id="feedback-form" v-if="feedbackMode">
          <v-form>
            <h3 class="mt-4">Vink aan wat niet klopt</h3>
            <div class="mx-n6">
              <v-divider />
            </div>
            <template
              v-if="transportmode !== 'ferry'"
              id="non-ferry-feedback-options"
            >
              <div
                class="detail-wrapper"
                v-for="row in ratingInfo"
                v-bind:key="row.id"
              >
                <template v-if="!row.hidden">
                  <v-row no-gutters class="mt-3 text-body-2">
                    <v-col :cols="1">
                      <!-- <rating-icon :disabled="row.overlay" :rating="row.rating" /> -->
                      <v-checkbox
                        v-model="feedback.checkboxes"
                        :value="row.title"
                        hide-details
                        class="shrink ma-0 text-body-2"
                      />
                    </v-col>
                    <v-col :cols="2" class="ml-4">
                      <img :src="row.icon" />
                    </v-col>
                    <v-col class="ml-6">
                      <h4>{{ row.title }}</h4>
                      <p v-html="row.text"></p>
                    </v-col>
                  </v-row>
                </template>
              </div>
            </template>
            <template id="extra-feedback-options">
              <h3 class="mt-4">En/of maak een melding</h3>
              <div class="mx-n6">
                <v-divider />
              </div>
              <v-row no-gutters class="mt-3 text-body-2">
                <v-col :cols="1">
                  <!-- <rating-icon :disabled="row.overlay" :rating="row.rating" /> -->
                  <v-checkbox
                    v-model="feedback.checkboxes"
                    value="Iets kapot"
                    hide-details
                    class="shrink ma-0 text-body-2"
                  />
                </v-col>
                <v-col :cols="2" class="ml-4">
                  <img :src="require('@/assets/icons/feedbackBroken.svg')" />
                </v-col>
                <v-col class="ml-6">
                  <h4>Er is iets kapot of er ging tijdens de rit wat mis</h4>
                  <p>
                    Bijvoorbeeld een kapotte lift of oprijplank. Hier maken we
                    een melding van bij de vervoerder.
                  </p>
                </v-col>
              </v-row>
              <v-row no-gutters class="mt-3 text-body-2">
                <v-col :cols="1">
                  <!-- <rating-icon :disabled="row.overlay" :rating="row.rating" /> -->
                  <v-checkbox
                    v-model="feedback.checkboxes"
                    value="Iets anders"
                    hide-details
                    class="shrink ma-0 text-body-2"
                  />
                </v-col>
                <v-col :cols="2" class="ml-4">
                  <img :src="require('@/assets/icons/feedbackMystery.svg')" />
                </v-col>
                <v-col class="ml-6">
                  <h4>Er is iets anders aan de hand</h4>
                  <p>
                    We zijn overal benieuwd naar, licht het hieronder ook even
                    toe!
                  </p>
                </v-col>
              </v-row>
            </template>
            <h3 v-if="transportmode === 'ferry'" class="mt-4">
              Wat gaat niet goed bij deze halte?
            </h3>
            <h3 v-else class="mt-4">Kun je dit toelichten?</h3>
            <div class="mx-n4">
              <v-divider />
            </div>
            <v-textarea
              v-model="feedback.textinput"
              label="Uitgebreide uitleg helpt!"
              outlined
              class="py-4 rounded-0"
              hide-details
            ></v-textarea>
            <v-btn
              @click="
                feedbackMode = false;
                thankyoumode = true;
              "
              block
              class="text-none text-body rounded-0"
              color="secondary"
            >
              <v-icon left dark>
                mdi-send
              </v-icon>
              <strong>Stuur op naar vervoerder</strong>
            </v-btn>
          </v-form>
        </template>
        <template v-else-if="thankyoumode">
          <h4>Dankjewel!</h4>
          <p>
            We gaan uitzoeken of we dit kunnen aanpassen.
          </p>
          <h4>Op de hoogte blijven?</h4>
          <p>
            Wil je hierover op de hoogte gehouden worden? Laat je e-mailadres
            achter (optioneel):
          </p>
          <v-form>
            <v-text-field
              label="e-mailadres"
              outlined
              class="py-4 rounded-0"
              hide-details
              v-model="feedback.emailadres"
            />
            <v-btn
              @click="feedbackOpen = false"
              block
              class="text-none text-body rounded-0"
              color="secondary"
            >
              <v-icon left dark v-if="feedback.emailadres !== ''">
                mdi-send
              </v-icon>
              <strong>{{
                feedback.emailadres === ""
                  ? "Verder zonder e-mailadres"
                  : "Hou me op de hoogte"
              }}</strong>
            </v-btn>
          </v-form>
        </template>
      </v-card-text>
    </v-card>
  </v-bottom-sheet>
</template>

<script>
export default {
  props: ["feedbackOpen", "ratingInfo", "transportmode"],
  data: () => ({
    feedback: {
      checkboxes: [],
      textinput: "",
      emailadres: "",
    },
    feedbackMode: false,
    thankyoumode: false,
  }),
  computed: {
    isOpen: function() {
      return this.feedbackOpen;
    },
  },
  watch: {
    feedbackOpen: function(v) {
      if (v) {
        this.feedbackMode = true;
        this.thankyoumode = false;
      } else return;
    },
  },
};
</script>

<style lang="scss" scoped>
.v-card__text {
  color: rgba(0, 0, 0, 0.87) !important;
}
</style>
