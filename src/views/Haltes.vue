<template>
  <div>
    <h1>Haltes</h1>
    <ul>
      <li v-for="(item, index) in filterQuays" :key="index">
        {{ item }}
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
export default {
  name: "Haltes",
  computed: {
    ...mapState(["profile", "quays"]),
    ...mapGetters(["filterQuays"]),
  },
  data: () => ({
    test: false,
  }),
};
</script>

<style lang="scss" scoped></style>
