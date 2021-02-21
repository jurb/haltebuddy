<template>
  <div class="ma-4 my-12">
    <h3>
      Ervaringen
    </h3>
    <div class="mx-n4">
      <v-divider />
    </div>
    <v-card elevation="2" class="pa-2 mt-2 text-body-2">
      Obcaecati dicta adipisci ratione quas vel deserunt, mollitia sequi!
    </v-card>
    <v-card elevation="2" class="pa-2 my-4 text-body-2">
      Lorem ipsum dolor sit amet consectetur, adipisicing elit. At doloribus
      earum quisquam quam voluptatibus, dolores saepe commodi natus officiis
      aspernatur quas.
    </v-card>
    <v-btn
      color="secondary"
      block
      depressed
      class="text-none text-body rounded-0 mt-8"
    >
      <v-icon left dark>
        mdi-message-draw
      </v-icon>
      <strong>Deel je ervaring met anderen</strong>
    </v-btn>
    <v-spacer class="my-8" />
    <div class="mx-n4">
      <v-divider />
    </div>
    <v-spacer class="my-8" />
  </div>
</template>

<script>
export default {
  props: ["numberOfReviews"],
};
</script>

<style lang="scss" scoped></style>
