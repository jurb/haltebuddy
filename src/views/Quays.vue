<template>
  <div class="quays">
    <address-auto-complete />
    <!-- TODO: dynamically adjust height of virtualscroller to viewport height -->
    <v-virtual-scroll
      :items="localQuays"
      max-height="100vh"
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
import AddressAutoComplete from "@/components/AddressAutoComplete.vue";
import QuayListItem from "@/components/QuayListItem.vue";

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
    AddressAutoComplete,
    QuayListItem,
  },
};
</script>

<style lang="scss" scoped>
.quays {
  height: 100vh;
}
</style>
