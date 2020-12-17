<template>
  <div>Kaart</div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
export default {
  name: "Kaart",
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
