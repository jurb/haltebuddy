<template>
  <div>
    <p><a @click="sheet = true">toggle</a></p>
    <v-bottom-sheet v-model="sheet" hide-overlay>
      <div class="pl-2">
        <h1>Heading</h1>
        <br /><br /><br /><br /><br />
        iets
      </div>
    </v-bottom-sheet>
    <h1>Heading</h1>
    <ul>
      <li
        v-for="(item, index) in quays
          .filter((el) => el.stopplacename.publicname.includes('plein'))
          .map((el) => el.stopplacename.publicname)"
        :key="index"
      >
        {{ item }}
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
h1 {
  color: var(--v-secondary-base);
}
</style>

<style>
.v-bottom-sheet {
  background-color: white !important;
}
</style>

<script>
import { mapGetters, mapState } from "vuex";
export default {
  name: "Home",
  computed: {
    ...mapState(["profile", "quays"]),
    ...mapGetters(["filterQuays"]),
  },
  data: () => ({
    sheet: false,
  }),
};
</script>
