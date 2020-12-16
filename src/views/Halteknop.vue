<template>
  <div>Halteknop</div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
export default {
  name: "Halteknop",
  computed: {
    ...mapState(["profile", "quays"]),
    ...mapGetters(["exampleGetter"]),
  },
  data: () => ({
    test: false,
  }),
};
</script>

<style lang="scss" scoped></style>
