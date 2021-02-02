<template>
  <div class="pa-2">
    <!-- <h1>Profiel</h1> -->
    <v-form>
      <v-card>
        <v-card-title class="pb-0">Hoe verplaats je je?</v-card-title>
        <!-- <v-card-subtitle>Vul minstens iets in</v-card-subtitle> -->
        <v-card-text
          ><v-radio-group
            v-model="profileLocal.modality"
            @change="changeProfileModality"
          >
            <v-radio
              v-for="n in modalities"
              :key="n"
              :label="`${n}`"
              :value="n"
            ></v-radio> </v-radio-group
        ></v-card-text>
      </v-card>
      <div><br /></div>
      <v-card>
        <v-card-title class="pb-0">Hoeveel breedte heb je nodig?</v-card-title>
        <!-- <v-card-subtitle>Vul minstens iets in</v-card-subtitle> -->
        <v-card-text>
          <v-slider
            class="mt-14"
            v-model="profileLocal.width"
            prepend-icon=" mdi-chevron-double-left"
            append-icon=" mdi-chevron-double-right"
            thumb-label="always"
            @click:prepend="profileLocal.width--"
            @click:append="profileLocal.width++"
            min="30"
            max="150"
            thumb-size="40"
            @end="changeProfileWidth"
          >
            <template v-slot:thumb-label="{ value }"> {{ value }}cm </template>
          </v-slider>
        </v-card-text>
      </v-card>
      <div><br /></div>
      <v-card>
        <v-card-title class="pb-0">Hoe hoog mag een drempel zijn?</v-card-title>
        <!-- <v-card-subtitle>Vul minstens iets in</v-card-subtitle> -->
        <v-card-text>
          <v-slider
            class="mt-14"
            v-model="profileLocal.threshold"
            prepend-icon=" mdi-chevron-double-down"
            append-icon=" mdi-chevron-double-up"
            thumb-label="always"
            @click:prepend="profileLocal.threshold--"
            @click:append="profileLocal.threshold++"
            :disabled="profileLocal.ramp"
            min="0"
            max="20"
            thumb-size="40"
            @end="changeProfileThreshold"
          >
            <template v-slot:thumb-label="{ value }"> {{ value }}cm </template>
          </v-slider>
          <v-checkbox
            v-model="profileLocal.ramp"
            :label="
              `Ik wil drempelloos reizen (en met de plank het voertuig in)`
            "
            @change="changeProfileRamp"
          ></v-checkbox> </v-card-text
      ></v-card>
    </v-form>
    <div><br /></div>
    <div><br /></div>
  </div>
</template>

<script>
import { mapGetters, mapState, mapActions } from "vuex";
export default {
  name: "Profiel",
  computed: {
    ...mapState(["profile"]),
    profileLocal() {
      return this.profile;
    },
  },
  data: () => ({
    modalities: [
      "Electrische rolstoel",
      "Scootmobiel",
      "Handrolstoel",
      "Rollator",
      "Stok of krukken",
      "Ik reis zonder hulpmiddel",
    ],
  }),
  methods: {
    ...mapActions([
      "changeProfileWidth",
      "changeProfileThreshold",
      "changeProfileRamp",
      "changeProfileModality",
    ]),
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
