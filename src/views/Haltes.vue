<template>
  <div>
    <h1>Haltes</h1>
    <ul>
      <li
        v-for="(item, index) in filteredQuays
          .filter((el) => el.stopplace.stopplacename.publicname)
          .filter((el) =>
            el.stopplace.stopplacename.publicname.includes('plein')
          )
          .map((el) => el.stopplace.stopplacename.publicname)"
        :key="index"
      >
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
    ...mapGetters(["filteredQuays"]),
  },
  data: () => ({
    test: false,
  }),
};
</script>

<style lang="scss" scoped></style>
