<template>
  <div>haltekaartje: {{ quay.stopplace.stopplacecode }}</div>
</template>

<script>
import IconQuayHeight from "@/assets/icons/quayHeight.svg";
import IconQuayWidth from "@/assets/icons/quayWidth.svg";

export default {
  data: () => ({
    value: "",
    //
  }),
  props: ["quay"],
  components: { IconQuayWidth, IconQuayHeight },
};
</script>

<style lang="scss" scoped></style>
