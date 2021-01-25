<template>
  <div class="quays">
    <top-bar max-height="10vh" />

    <!-- TODO: dynamically adjust height of virtualscroller to viewport height -->
    <v-virtual-scroll
      :items="localQuays"
      max-height="80vh"
      item-height="142"
      bench="2"
    >
      <template v-slot:default="{ item }">
        <quay-list-item :key="item.quaycode" :quay="item" />
        <div class="py-12"></div>
      </template>
    </v-virtual-scroll>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import QuayListItem from "@/components/QuayListItem.vue";
import TopBar from "../components/topBar.vue";

export default {
  name: "Haltes",
  computed: {
    ...mapGetters(["filteredQuays"]),
    localQuays: function() {
      return this.filteredQuays.filter((quay) => quay.quayname);
    },
  },
  data: () => ({
    test: false,
  }),
  components: {
    QuayListItem,
    TopBar,
  },
};
</script>

<style lang="scss" scoped>
.quays {
  height: 100vh;
}
</style>
