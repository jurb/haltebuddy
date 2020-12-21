<template>
  <div>
    <!-- <h1>Haltes</h1> -->
    {{ profile }}
    <search-bar />
    <quay-list-item
      v-for="(quay, index) in filteredQuays
        .filter((el) => el.stopplace.stopplacename.publicname)
        .filter((el) =>
          el.stopplace.stopplacename.publicname.includes('plein')
        )"
      :key="index"
      :quay="quay"
    />
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import SearchBar from "@/components/SearchBar.vue";
import QuayListItem from "@/components/QuayListItem.vue";

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
    QuayListItem,
  },
};
</script>

<style lang="scss" scoped></style>
