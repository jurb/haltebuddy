<template>
  <div>haltekaartje: {{ quay.stopplace.stopplacecode }}</div>
</template>

<script>
export default {
  data: () => ({
    value: "",
    //
  }),
  props: ["quay"],
};
</script>

<style lang="scss" scoped></style>
