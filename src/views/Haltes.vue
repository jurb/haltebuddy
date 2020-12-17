<template>
  <div>Haltes</div>
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
