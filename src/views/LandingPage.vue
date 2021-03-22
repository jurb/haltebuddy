<template>
  <div>
    <section class="hero-section primary secondary pa-2 white--text">
      <div>
        <div class="demo-callout-text title">
          <!-- <p>
            <img
              :src="require('@/assets/haltebuddy-logo.svg')"
              alt="logo haltebuddy"
            />
          </p> -->
          <p class="mb-16">
            Met Haltebuddy weet je precies welke haltes er
            <strong>voor jou</strong> toegankelijk zijn. Vul je wensen voor
            toegankelijkheid in, en zie waar je op moet letten voordat je de
            bus, tram, of metro in stapt.
          </p>
          <p>
            Ook kun je via de app het OV-personeel laten weten dat je er aan
            komt en bijvoorbeeld extra hulp of tijd nodig hebt bij het
            instappen.
          </p>
          <p v-if="$vuetify.breakpoint.xsOnly" class="white--text">
            Bekijk <a href="/">de demo</a>.
          </p>
        </div>
        <div class="demo-callout-box" v-if="$vuetify.breakpoint.mdAndUp">
          <img
            :src="require('@/assets/demo-callout-bottom.svg')"
            alt="pijltje naar demo"
            class="demo-callout-image"
          />
        </div>
      </div>
      <div class="iframe-demo-box">
        <IPhoneX v-if="$vuetify.breakpoint.smAndUp" />
      </div>
    </section>
    <section class="explanation-section primary pa-2 white--text">
      <div class="mt-16 explanation-section-text">
        <div class="title">
          <p>
            <img
              :src="require('@/assets/haltebuddy-logo.svg')"
              alt="logo haltebuddy"
            />
          </p>
          <p>
            Haltebuddy is een prototype van het focusteam van het CTO
            innovatieteam van de gemeente Amsterdam, in samenwerking met de
            Vervoerregio Amsterdam (VRA) en de GVB.
          </p>
          <p>
            We hebben Haltebuddy ontwikkeld met als doel reizen met het OV
            (mentaal) toegankelijker te maken. We tonen met het prototype aan
            dat reisadvies voor mensen met een beperking persoonlijker kan. Dit
            doen we door een reisprofiel te koppelen aan de informatie in het
            Centraal Haltebestand. Ook introduceren we het idee van een digitale
            Halteknop om instappen gemakkelijker en minder stressvol te maken.
          </p>
          <p>
            Het experiment Haltebuddy is onderdeel van het uitvoeringsprogramma
            inclusieve mobiliteit van de VRA.
          </p>
        </div>
        <div class="mt-16">
          <p>
            <v-btn
              color="secondary"
              depressed
              class="text-none text-body rounded-0"
              x-large
              href="https://docs.google.com/presentation/d/18z1kKqbTW5bTGFxQfOwhL4FDkDlxv4yhTpL-jijnobo/edit?usp=sharing"
              target="_blank"
            >
              <v-icon left dark>
                mdi-download
              </v-icon>
              <strong>Download de evaluatie</strong>
            </v-btn>
          </p>
          <p>
            <v-btn
              color="secondary"
              depressed
              class="text-none text-body rounded-0"
              x-large
              href="https://github.com/jurb/haltebuddy"
              target="_blank"
            >
              <v-icon left dark>
                mdi-github
              </v-icon>
              <strong>Bekijk de broncode op Github</strong>
            </v-btn>
          </p>
          <p>
            <v-btn
              color="secondary"
              depressed
              class="text-none text-body rounded-0"
              x-large
              href="https://observablehq.com/@jurb/haltebuddy-aanbevelingen-techniek"
              target="_blank"
            >
              <v-icon left dark>
                mdi-robot
              </v-icon>
              <strong>Meer over de techniek</strong>
            </v-btn>
          </p>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import IPhoneX from "@/components/IPhoneX.vue";

export default {
  name: "LandingPage",
  components: { IPhoneX },
  data: () => ({
    value: "",
  }),
};
</script>

<style lang="scss" scoped>
.hero-section {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 500px));
  place-items: center;
  justify-content: center;
}

.explanation-section {
}

.explanation-section-text {
  margin: auto;
  max-width: 768px;
}

.demo-callout-box {
  text-align: right;
}
.demo-callout-image {
  width: 150px;
}

.demo-callout-text {
  padding-top: 50px;
}

.iframe-demo-box {
  padding: 32px;
}

a {
  color: white !important;
}
</style>
