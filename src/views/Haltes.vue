<template>
  <div>
    <!-- <h1>Haltes</h1> -->
    <search-bar />
    // TODO: dynamically adjust height of virtualscroller to viewport height
    <v-virtual-scroll :items="localQuays" height="600" item-height="165">
      <template v-slot:default="{ item }">
        <quay-list-item :key="index" :quay="item" :profile="profile" />
      </template>
    </v-virtual-scroll>
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
      return this.filteredQuays.filter(
        (el) => el.stopplace.stopplacename.publicname
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
