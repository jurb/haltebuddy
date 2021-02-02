<template>
  <div class="quays">
    <top-bar max-height="10vh" />
    <v-alert
      v-if="$route.params.fromProfile"
      color="primary"
      dense
      text
      dismissible
      class="text-body-2 mb-0"
      >De toegankelijkheidsscore is aangepast op jouw profiel
    </v-alert>

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
import { mapGetters, mapState, mapActions } from "vuex";
import QuayListItem from "@/components/QuayListItem.vue";
import TopBar from "../components/topBar.vue";

export default {
  name: "Quays",
  data: () => ({
    test: false,
  }),
  computed: {
    ...mapGetters(["filteredQuays"]),
    localQuays: function() {
      return this.filteredQuays.filter((quay) => quay.quayname);
    },
  },
  methods: {
    ...mapActions(["fetchGVBpage"]),
  },
  mounted() {
    this.fetchGVBpage();
  },
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
