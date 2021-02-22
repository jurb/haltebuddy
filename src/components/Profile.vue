<template>
  <div>
    <v-overlay :value="loading" color="white" opacity="1">
      <img :src="require('@/assets/icons/spinner.svg')" class="rotate" />
      <div class="black--text">
        <h1>Eén moment.</h1>
        <p>
          We berekenen welke OV-haltes<br />
          voor jou toegankelijk zijn.
        </p>
      </div>
    </v-overlay>

    <div class="pa-2">
      <!-- <h1>Profiel</h1> -->
      <v-form v-if="type === 'view'">
        <v-card>
          <v-card-title class="pb-0">Hoe verplaats je je?</v-card-title>
          <!-- <v-card-subtitle>Vul minstens iets in</v-card-subtitle> -->
          <v-card-text
            ><v-radio-group
              v-model="profileLocal.modality"
              @change="setModalityDefaults"
            >
              <v-radio v-for="n in modalities" :key="n" :value="n">
                <template v-slot:label>
                  {{ n }}
                  <img
                    :src="require(`@/assets/icons/modalities/${n}.svg`)"
                    class="pl-1"
                  />
                </template>
              </v-radio>
            </v-radio-group>
            <p>
              We vullen alvast waarden in die passen bij de meeste mensen
              {{
                profileLocal.modality === "Zonder hulpmiddel"
                  ? "zonder hulpmiddel"
                  : `met een ${profileLocal.modality.toLowerCase()}`
              }}.
            </p>
          </v-card-text>
        </v-card>
        <div class="pb-6"></div>
        <v-card>
          <v-card-title class="pb-0"
            >Hoeveel breedte heb je nodig?</v-card-title
          >
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
              <template v-slot:thumb-label="{ value }">
                {{ value }}cm
              </template>
            </v-slider>
          </v-card-text>
        </v-card>
        <div class="pb-6"></div>
        <v-card>
          <v-card-title class="pb-0">Gebruik je de oprijplank?</v-card-title>
          <v-card-text>
            <v-switch
              v-model="profileLocal.ramp"
              :label="`Houd rekening met de oprijplank`"
              @change="changeProfileRamp"
            ></v-switch> </v-card-text
        ></v-card>
        <div class="pb-6"></div>
        <v-card>
          <v-card-title class="pb-0"
            >Hoe hoog mag een drempel zijn?</v-card-title
          >
          <v-card-text>
            <v-radio-group
              v-model="profileLocal.threshold"
              @change="changeProfileThreshold"
              mandatory
            >
              <v-radio label="Gelijkvloers–2 cm" :value="2"> </v-radio>
              <v-radio label="2–5 cm" :value="5"></v-radio>
              <v-radio label="5–15 cm" :value="15"></v-radio>
              <v-radio
                label="De hoogte maakt niet uit"
                :value="Infinity"
              ></v-radio>
            </v-radio-group> </v-card-text
        ></v-card>
      </v-form>
      <template v-if="type === 'view'">
        <div class="pb-6"></div>
        <v-btn
          color="secondary"
          block
          depressed
          class="text-none text-body rounded-0"
          @click="loading = !loading"
        >
          <v-icon left dark>
            mdi-content-save
          </v-icon>
          <strong>Sla je profiel op</strong>
        </v-btn>
        <div class="pb-12"></div>
      </template>

      <v-form v-if="type === 'inline'">
        <h4>Hoeveel breedte heb je nodig?</h4>
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
          @dragleave="changeProfileWidth"
        >
          <template v-slot:thumb-label="{ value }"> {{ value }}cm </template>
        </v-slider>
        <h4>Oprijplank?</h4>
        <v-switch
          v-model="profileLocal.ramp"
          :label="`Houd rekening met de oprijplank`"
          @change="changeProfileRamp"
        ></v-switch>
        <h4>Drempel</h4>
        <v-radio-group
          v-model="profileLocal.threshold"
          @change="changeProfileThreshold"
          mandatory
        >
          <v-radio label="Gelijkvloers–2 cm" :value="2"> </v-radio>
          <v-radio label="2–5 cm" :value="5"></v-radio>
          <v-radio label="5–15 cm" :value="15"></v-radio>
          <v-radio label="De hoogte maakt niet uit" :value="999"></v-radio>
        </v-radio-group>
      </v-form>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  name: "Profiel",
  props: {
    type: {
      default: "view",
      type: String,
    },
  },
  computed: {
    ...mapState(["profile"]),
    profileLocal() {
      return this.profile;
    },
    modalityLocal() {
      return this.profile.modality;
    },
  },
  data: () => ({
    modalities: [
      "Elektrische rolstoel",
      "Scootmobiel",
      "Handrolstoel",
      "Rollator",
      "Stok of krukken",
      "Zonder hulpmiddel",
    ],
    loading: false,
  }),
  watch: {
    loading(val) {
      val &&
        setTimeout(() => {
          this.loading = false;
          this.$router.push({ name: "Quays" });
        }, 3000);
    },
  },
  methods: {
    ...mapActions([
      "changeProfileWidth",
      "changeProfileThreshold",
      "changeProfileRamp",
      "changeProfileModality",
    ]),
    setValues: function(width, threshold, ramp) {
      this.changeProfileWidth(width);
      this.changeProfileThreshold(threshold);
      this.changeProfileRamp(ramp);
    },
    setModalityDefaults: function(val) {
      if (val === "Elektrische rolstoel") {
        this.setValues(80, 2, true);
      }
      if (val === "Scootmobiel") {
        this.setValues(100, 2, true);
      }
      if (val === "Handrolstoel") {
        this.setValues(70, 2, true);
      }
      if (val === "Rollator") {
        this.setValues(60, 2, false);
      }
      if (val === "Stok of krukken") {
        this.setValues(50, 5, false);
      }
      if (val === "Zonder hulpmiddel") {
        this.setValues(40, 15, false);
      }
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

.rotate {
  animation: rotation 2s infinite linear;
}

@keyframes rotation {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(359deg);
  }
}

.v-btn {
  letter-spacing: 0;
}
</style>
