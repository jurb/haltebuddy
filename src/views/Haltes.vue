<template>
  <div>
    <!-- <h1>Haltes</h1> -->
    <search-bar />
    <quay-card
      v-for="(quay, index) in filteredQuays
        .filter((el) => el.stopplace.stopplacename.publicname)
        .filter((el) =>
          el.stopplace.stopplacename.publicname.includes('plein')
        )"
      :key="index"
      :quay="quay"
    />
    <ul>
      <li
        v-for="(item, index) in filteredQuays
          .filter((el) => el.stopplace.stopplacename.publicname)
          .filter((el) =>
            el.stopplace.stopplacename.publicname.includes('plein')
          )"
        :key="index"
      >
        {{ item.stopplace.stopplacename.publicname }} ({{
          item.profileAccessibleScore.stopThresholdRating
        }})
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import SearchBar from "@/components/SearchBar.vue";
import QuayCard from "@/components/QuayCard.vue";

export default {
  name: "Haltes",
  computed: {
    ...mapState(["profile", "quays"]),
    ...mapGetters(["filteredQuays"]),
  },
  data: () => ({
    test: false,
  }),
  components: {
    SearchBar,
    QuayCard,
  },
};
</script>

<style lang="scss" scoped></style>
