<template>
  <v-card flat color="transparent">
    <v-subheader>Hoe breed is je rolstoel?</v-subheader>
    <v-card-text>
      <v-slider
        v-model="width"
        prepend-icon=" mdi-chevron-double-left"
        append-icon=" mdi-chevron-double-right"
        thumb-label="always"
        @click:prepend="width--"
        @click:append="width++"
      >
        <template v-slot:thumb-label="{ value }"> {{ value }}m </template>
      </v-slider>
    </v-card-text>

    <!-- <v-subheader>Alarm volume</v-subheader>

    <v-card-text>
      <v-slider v-model="alarm" append-icon="mdi-alarm"></v-slider>
    </v-card-text>

    <v-subheader>Icon click callback</v-subheader>

    <v-card-text>
      <v-slider
        v-model="zoom"
        append-icon="mdi-magnify-plus-outline"
        prepend-icon="mdi-magnify-minus-outline"
        @click:append="zoomIn"
        @click:prepend="zoomOut"
      ></v-slider>
    </v-card-text> -->
  </v-card>
</template>

<script>
import { mapGetters, mapState } from "vuex";
export default {
  name: "Profiel",
  computed: {
    ...mapState(["profile", "quays"]),
    ...mapGetters(["exampleGetter"]),
  },
  data: () => ({
    width: 0,
  }),
  methods: {
    dec(d) {
      d = d - 10 || 0;
    },
    inc(d) {
      this.width = this.width + 10 || 100;
    },
  },
};
</script>

<style lang="scss">
.v-slider__thumb:after {
  transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
  content: "";
  color: inherit;
  width: 400%;
  height: 400%;
  border-radius: 50%;
  background: transparent;
  position: absolute;
  left: -150%;
  top: -150%;
}
</style>
