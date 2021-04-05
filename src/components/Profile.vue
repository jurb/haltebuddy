<template>
  <div>
    <v-overlay :value="loading" color="white" opacity="1" class="text-center">
      <img :src="require('@/assets/icons/spinner.svg')" class="rotate" />
      <div class="black--text">
        <h1>Persoonlijk advies.</h1>
        <p>
          We berekenen welke OV-haltes<br />
          voor jou toegankelijk zijn.
        </p>
      </div>
    </v-overlay>

    <div class="pa-2 profile-wrapper">
      <v-form>
        <v-card>
          <!-- <v-card-title class="pb-0">Hoe verplaats je je?</v-card-title> -->
          <v-card-text>
            <h2>Hoe verplaats je je?</h2>
            <v-radio-group
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
          <!-- <v-card-title class="pb-0"
            >Hoeveel breedte heb je nodig?</v-card-title
          > -->
          <v-card-text>
            <h2>Hoeveel breedte heb je nodig?</h2>
            <v-slider
              class="mt-14"
              v-model="profileLocal.width"
              prepend-icon=" mdi-chevron-double-left"
              append-icon=" mdi-chevron-double-right"
              thumb-label="always"
              @click:prepend="
                (v) =>
                  changeProfile({
                    prop: 'width',
                    value: profileLocal.width - 1,
                  })
              "
              @click:append="
                (v) =>
                  changeProfile({
                    prop: 'width',
                    value: profileLocal.width + 1,
                  })
              "
              min="40"
              max="150"
              thumb-size="40"
              @end="(v) => changeProfile({ prop: 'width', value: v })"
            >
              <template v-slot:thumb-label="{ value }">
                {{ value }}cm
              </template>
            </v-slider>
          </v-card-text>
        </v-card>
        <div class="pb-6"></div>
        <v-card>
          <!-- <v-card-title class="pb-0"
            >Hoe hoog mag een drempel of de hoogte tot een voertuig
            zijn?</v-card-title
          > -->
          <v-card-text>
            <h2>
              Hoe hoog mag een drempel of de hoogte tot een voertuig zijn?
            </h2>
            <v-radio-group
              v-model="profileLocal.threshold"
              @change="(v) => changeProfile({ prop: 'threshold', value: v })"
              mandatory
            >
              <v-radio label="Maximaal 2 cm" :value="2"> </v-radio>
              <v-radio label="Maximaal 5 cm" :value="5"></v-radio>
              <v-radio label="Maximaal 10 cm" :value="10"></v-radio>
              <v-radio label="Maximaal 15 cm" :value="15"></v-radio>
              <v-radio
                label="Hoogte maakt niet uit"
                :value="Infinity"
              ></v-radio>
            </v-radio-group> </v-card-text
        ></v-card>
        <div class="pb-6"></div>
        <v-card>
          <img
            :src="require('@/assets/icons/quayRamp.svg')"
            class="float-right pt-4 pr-6 pl-3"/>
          <!-- <v-card-title class="pb-0"
            >Wil je gebruik maken van een oprijplank bij hogere drempels?
          </v-card-title> -->
          <v-card-text>
            <h2>
              Wil je gebruik maken van een oprijplank bij hogere drempels?
            </h2>
            <v-switch
              v-model="profileLocal.ramp"
              :label="`Ja`"
              @change="(v) => changeProfile({ prop: 'ramp', value: v })"
            ></v-switch> </v-card-text
        ></v-card>
      </v-form>
      <template>
        <div class="pb-6"></div>
        <v-btn
          color="secondary"
          block
          depressed
          class="text-none text-body rounded-0"
          @click="saveProfile()"
        >
          <v-icon left dark>
            mdi-content-save
          </v-icon>
          <strong>Sla je reisprofiel op</strong>
        </v-btn>
        <div class="pb-12"></div>
      </template>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  name: "Profile",
  props: {
    type: {
      default: "view",
      type: String,
    },
  },
  computed: {
    ...mapState(["profile", "profileSet"]),
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
      "Wandelstok of krukken",
      "Zonder hulpmiddel",
    ],
    loading: false,
  }),
  watch: {},
  methods: {
    ...mapActions(["changeProfile", "changeProfileSet"]),
    saveProfile: function() {
      if (this.$route.name === "QuayDetail") {
        this.changeProfileSet(true);
      } else {
        this.loading = true;
        setTimeout(() => {
          this.changeProfileSet(true);
          this.loading = false;
          this.$router.push({ name: "Quays" });
        }, 3000);
      }
    },
    setValues: function(width, threshold, ramp) {
      this.changeProfile({ prop: "width", value: width });
      this.changeProfile({ prop: "threshold", value: threshold });
      this.changeProfile({ prop: "ramp", value: ramp });
    },
    setModalityDefaults: function(val) {
      this.changeProfile({ prop: "modality", value: val });
      if (val === "Elektrische rolstoel") {
        this.setValues(80, 2, true);
      }
      if (val === "Scootmobiel") {
        this.setValues(80, 2, true);
      }
      if (val === "Handrolstoel") {
        this.setValues(75, 2, true);
      }
      if (val === "Rollator") {
        this.setValues(70, 5, false);
      }
      if (val === "Stok of krukken") {
        this.setValues(50, 10, false);
      }
      if (val === "Zonder hulpmiddel") {
        this.setValues(40, 15, false);
      }
    },
  },
};
</script>

<style lang="scss">
.profile-wrapper {
  // max-width: 375px;
  // margin: auto;
}

.v-card__text,
.theme--light.v-label {
  color: rgba(0, 0, 0, 0.87) !important;
}

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

.v-btn,
.v-card__title {
  letter-spacing: 0 !important;
}
</style>
