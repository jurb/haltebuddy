<template>
  <div>
    <p><a @click="sheet = true">toggle</a></p>
    <v-bottom-sheet v-model="sheet" hide-overlay
      >Whaaaaat <br /><br /><br /><br /><br />
      iets</v-bottom-sheet
    >
    <ul></ul>

    <li
      v-for="(item, index) in quays
        .filter((el) => el.stopplacename.publicname.includes('plein'))
        .map((el) => el.stopplacename.publicname)"
      :key="index"
    >
      {{ item }}
    </li>
  </div>
</template>

<style>
.v-bottom-sheet {
  /* height: 600px; */
  background-color: white;
}

.v-bottom-sheet:before {
  content: "";
  width: 36px;
  height: 6px;
  position: absolute;
  left: 50%;
  margin-left: -18px;
  margin-top: 6px;
  border-radius: 3px;
  background: #666;
}
</style>

<script>
import { mapGetters, mapState } from "vuex";
export default {
  name: "Home",
  computed: {
    ...mapState(["profile", "quays"]),
    ...mapGetters(["exampleGetter"]),
  },
  data: () => ({
    sheet: false,
  }),
};
</script>
