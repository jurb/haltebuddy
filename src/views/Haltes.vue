<template>
  <div>
    <!-- <h1>Haltes</h1> -->
    <search-bar />
    <quay-list-item
      v-for="(quay, index) in localQuays"
      :key="index"
      :quay="quay"
      :profile="profile"
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
    localQuays: function() {
      return this.filteredQuays
        .filter((el) => el.stopplace.stopplacename.publicname)
        .filter((el) =>
          el.stopplace.stopplacename.publicname.includes("plein")
        );
    },
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
