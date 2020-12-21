<template>
  <div>
    <search-bar />
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
          item.profileAccessibleScore.stopTresholdRating
        }})
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import SearchBar from "@/components/SearchBar.vue";
export default {
  name: "Haltes",
  computed: {
    ...mapState(["profile", "quays"]),
    ...mapGetters(["filteredQuays"]),
  },
  data: () => ({
    test: false,
  }),
    SearchBar,
};
</script>

<style lang="scss" scoped></style>
