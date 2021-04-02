<template>
  <v-bottom-sheet v-model="isOpen" scrollable overlay-color="white" persistent>
    <v-card>
      <v-card-text class="py-4">
        <p class="mt-2">
          <strong>
            Vul je reisprofiel in om te zien hoe toegankelijk halte
            {{ quay.quayname }} voor jou is.
          </strong>
        </p>
        <!-- <h2>Persoonlijk reisprofiel</h2> -->
        <profile class="mx-n6" />
      </v-card-text>
    </v-card>
  </v-bottom-sheet>
</template>

<script>
import { mapState } from "vuex";
import Profile from "@/components/Profile.vue";

export default {
  components: { Profile },
  data: () => ({}),
  computed: {
    ...mapState(["profileSet"]),
    isOpen: function() {
      return this.profileOpen;
    },
  },
  watch: {
    profileSet(val) {
      if (!val) {
        this.$emit("close");
      }
    },
  },
  props: ["profileOpen", "quay"],
};
</script>
