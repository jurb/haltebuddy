<template>
  <div class="ma-4 my-12">
    <h3>
      Ervaringen
    </h3>
    <div class="mx-n4">
      <v-divider />
    </div>
    <template v-if="!feedbackMode">
      <v-card
        v-for="review in quayReviews"
        :key="review.id"
        elevation="2"
        class="pa-2 mt-2 text-body-2"
      >
        <div>
          <span class="grey--text pr-1">{{ review.timeDistance }} geleden</span>
          <v-rating
            :value="review.stars"
            dense
            small
            background-color="grey lighten-1"
            color="primary"
            class="rating"
            readonly
          ></v-rating>
        </div>
        <strong>{{ review.name }}</strong
        >: {{ review.text }}
      </v-card>

      <v-btn
        @click="feedbackMode = true"
        color="secondary"
        block
        depressed
        class="text-none text-body rounded-0 mt-8"
      >
        <v-icon left dark>
          mdi-message-draw
        </v-icon>
        <strong>Deel je ervaring met anderen</strong>
      </v-btn>
    </template>

    <template v-if="feedbackMode">
      <v-form>
        <v-text-field
          v-model="feedback.name"
          label="Naam"
          outlined
          class="py-4 rounded-0"
          hide-details
          required
        />
        <v-textarea
          v-model="feedback.text"
          label="Beschrijf je ervaring met deze halte"
          outlined
          class="py-4 rounded-0"
          hide-details
          required
        ></v-textarea>
        Jouw score
        <v-rating
          v-model="feedback.stars"
          dense
          large
          background-color="grey lighten-1"
          color="primary"
          class="rating"
        ></v-rating>
        <v-btn
          @click="addReviewLocal()"
          block
          class="text-none text-body rounded-0 mt-4"
          color="secondary"
          :disabled="feedback.text.length === 0"
        >
          <v-icon left dark>
            mdi-share
          </v-icon>
          <strong>Deel met je mede-reizigers</strong>
        </v-btn>
      </v-form>
    </template>

    <v-spacer class="my-8" />
    <div class="mx-n4">
      <v-divider />
    </div>
    <v-spacer class="my-8" />
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import formatDistance from "date-fns/formatDistance";
import { nl } from "date-fns/locale";

export default {
  props: ["numberOfReviews", "quaycode"],
  data: () => ({
    feedbackMode: false,
    feedback: {
      name: "",
      stars: 0,
      text: "",
    },
  }),
  computed: {
    ...mapGetters(["reviews"]),
    quayReviews: function() {
      return this.reviews(this.quaycode).map((el) => ({
        ...el,
        timeDistance: formatDistance(Date.now(), new Date(el.timestamp), {
          locale: nl,
        }),
      }));
    },
  },
  methods: {
    ...mapActions(["addReview"]),
    addReviewLocal: function() {
      this.addReview({
        ...this.feedback,
        quaycode: this.quaycode,
        timestamp: Date.now(),
      });
      this.feedbackMode = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.rating {
  display: inline;
}
</style>
