<template>
  <div>
    <section class="hero-section primary secondary pa-2 white--text">
      <div class="block">
        <div class="demo-callout-text title mb-16">
          <p>
            <img
              :src="require('@/assets/haltebuddy-logo.svg')"
              alt="logo haltebuddy"
            />
          </p>
          <p>
            Met Haltebuddy weet je precies welke Amsterdamse haltes er
            <strong>voor jou</strong> toegankelijk zijn. Vul je wensen voor
            toegankelijkheid in, en zie waar je op moet letten voordat je de
            bus, tram, of metro in stapt.
          </p>
          <p class="callout">
            Update: de
            <a
              href="https://www.gvb.nl/klantenservice/reizen-met-de-gvb-reisapp-0"
              >GVB app</a
            >
            heeft nu <strong>Haltehulp</strong>: een implementatie van de ideeën
            van Haltebuddy!
          </p>
          <p v-if="$vuetify.breakpoint.xsOnly" class="white--text">
            Bekijk <a href="/">het prototype</a>.
          </p>
        </div>
        <div class="demo-callout-box-buddy" v-if="$vuetify.breakpoint.lgAndUp">
          <img
            :src="require('@/assets/demo-callout-bottom.svg')"
            alt="pijltje naar demo haltebuddy"
            class="demo-callout-image"
          />
        </div>
      </div>
      <div class="block">
        <div class="iframe-demo-box">
          <IPhoneX iframe-url="/" v-if="$vuetify.breakpoint.smAndUp" />
          <br />
          <p>Data laatst geupdate op 15 februari 2022</p>
        </div>
      </div>
    </section>

    <section class="hero-section primary pa-2 white--text">
      <div class="block">
        <div class="iframe-demo-box">
          <IPhoneX
            iframe-url="/halteknop-landing/01"
            v-if="$vuetify.breakpoint.smAndUp"
          />
        </div>
      </div>
      <div class="block">
        <div class="demo-callout-text title mb-16">
          <p>
            <img
              :src="require('@/assets/halteknop-logo.svg')"
              alt="logo halteknop"
            />
          </p>
          <p>
            Voor reizigers met een beperking is instappen vaak een stressvol
            moment.
          </p>
          <p>
            Met Halteknop kun je het OV-personeel laten weten dat je er aan komt
            en bijvoorbeeld extra hulp of tijd nodig hebt bij het instappen.
          </p>
          <p v-if="$vuetify.breakpoint.xsOnly" class="white--text">
            Bekijk <a href="/halteknop/01">de demo</a>.
          </p>
        </div>
        <div class="demo-callout-box" v-if="$vuetify.breakpoint.lgAndUp">
          <img
            :src="require('@/assets/demo-callout-knop-bottom.svg')"
            alt="pijltje naar demo halteknop"
            class="demo-callout-image"
          />
        </div>
      </div>
    </section>

    <section class="explanation-section accent pa-2 white--text">
      <div class="mt-16 mb-8 explanation-section-text">
        <div class="title">
          <p>
            <img
              :src="require('@/assets/landing-demo-video.svg')"
              alt="logo demo video"
            />
          </p>
          <p>
            We mochten Haltebuddy en Halteknop kort laten zien op het Inclusive
            Mobility Lab 2021 van het ministerie van Volksgezondheid, Welzijn en
            Sport.
          </p>
          <div class="video-wrapper">
            <iframe
              width="560"
              height="315"
              src="https://www.youtube-nocookie.com/embed/L02q9eNYlbY"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
          </div>
        </div>
      </div>
    </section>

    <section class="explanation-section error pa-2 white--text">
      <div class="mt-16 explanation-section-text">
        <div class="title">
          <p>
            <img :src="require('@/assets/colofon.svg')" alt="logo colofon" />
          </p>
          <p>
            <img
              src="@/assets/gvb-logo.png"
              alt="gvb logo"
              class="colofon-logo"
            />
            <img
              src="@/assets/clientenbelang-logo.png"
              alt="clientenbelang logo"
              class="colofon-logo"
            />
            <img
              src="@/assets/vra-logo.png"
              alt="gvb logo"
              class="colofon-logo"
            />
            <img
              src="@/assets/gemeente-logo.png"
              alt="gvb logo"
              class="colofon-logo"
            />
          </p>
          <p>
            Haltebuddy en Halteknop zijn prototypes van het focusteam van het
            CTO innovatieteam van de gemeente Amsterdam, in samenwerking met de
            Vervoerregio Amsterdam (VRA), Clientenbelang Amsterdam en de GVB. We
            hebben Haltebuddy en Halteknop ontwikkeld met als doel reizen met
            het OV (mentaal) toegankelijker te maken.
          </p>
          <p>
            De GVB heeft Haltebuddy als concept met gebruikers verder onderzocht
            en uitgewerkt tot een onderdeel van de
            <a
              href="https://www.gvb.nl/klantenservice/reizen-met-de-gvb-reisapp-0"
              >GVB app</a
            >
            onder de naam <strong>Haltehulp</strong>.
          </p>
          <p>
            We tonen met Haltebuddy aan dat reisadvies voor mensen met een
            beperking persoonlijker kan. Dit doen we door een reisprofiel te
            koppelen aan de informatie in het Centraal Haltebestand, en door
            meldingen over kapotte liften en realtime reisinformatie te tonen.
            Het genereren van een reisadvies is buiten scope van dit project,
            maar staat op de planning voor de doorontwikkeling.
          </p>
          <p>
            Met Halteknop willen we aantonen dat het instappen gemakkelijker en
            minder stressvol kan zijn.
          </p>
          <p>
            De experimenten zijn overgedragen aan de GVB en VRA als onderdeel
            van het uitvoeringsprogramma inclusieve mobiliteit van de VRA.
          </p>
          <p>
            <strong
              >Bespreken wat jouw vervoersbedrijf of gemeente kan met dit
              concept?</strong
            >
            Mail
            <a href="mailto:w.passmore@vervoerregio.nl">Willeke Passmore</a>,
            Projectleider Haltebuddy en Halteknop bij de Vervoerregio Amsterdam.
          </p>
          <p>
            <strong>Meer weten over het originele prototype?</strong> Mail
            <a href="mailto:h.faber@amsterdam.nl">Heike Faber</a>
            en
            <a href="mailto:j.baas@amsterdam.nl">Jurian Baas</a>.
          </p>
          <p>
            Gemaakt door Heike Faber, Jurian Baas, Wieteke Nieuwboer en Lino
            Miltenburg van het CTO Innovatieteam van de gemeente Amsterdam.
          </p>
        </div>
        <div class="mt-16">
          <p>
            <v-btn
              color="white black--text"
              class="text-none text-body rounded-0"
              x-large
              href="/files/haltebuddy_evaluatie_en_aanbevelingen_maart_2021.pdf"
              target="_blank"
            >
              <v-icon left dark>
                mdi-download
              </v-icon>
              <strong>Haltebuddy evaluatie</strong>
            </v-btn>
          </p>
          <p>
            <v-btn
              color="white black--text"
              class="text-none text-body rounded-0"
              x-large
              href="/files/Halteknop - concept en evaluatie - april 2021.pdf"
              target="_blank"
            >
              <v-icon left dark>
                mdi-download
              </v-icon>
              <strong>Halteknop conceptuitwerking</strong>
            </v-btn>
          </p>
          <p>
            <v-btn
              color="white black--text"
              class="text-none text-body rounded-0"
              x-large
              href="https://github.com/jurb/haltebuddy"
              target="_blank"
            >
              <v-icon left dark>
                mdi-github
              </v-icon>
              <strong>Broncode van Haltebuddy</strong>
            </v-btn>
          </p>
          <p>
            <v-btn
              color="white black--text"
              class="text-none text-body rounded-0"
              x-large
              href="https://observablehq.com/@jurb/haltebuddy-aanbevelingen-techniek"
              target="_blank"
            >
              <v-icon left dark>
                mdi-robot
              </v-icon>
              <strong>Interactieve documentatie</strong>
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
  created: function() {
    document.title = "Haltebuddy en Halteknop";
  },
};
</script>

<style lang="scss" scoped>
.hero-section {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 500px));
  place-items: center;
  justify-content: center;
}

.explanation-section-text {
  margin: auto;
  max-width: 768px;
}

.demo-callout-box-buddy {
  text-align: right;
}
.demo-callout-image {
  width: 150px;
}

.demo-callout-text {
  padding-top: 15px;
}

.iframe-demo-box {
  padding: 32px;
  text-align: center;
  font-size: 0.75rem;
}

.colofon-logo {
  width: 25%;
  vertical-align: top;
  padding-top: 48px;
  padding-right: 10%;
  padding-bottom: 24px;
}

a {
  color: white !important;
}

.video-wrapper {
  position: relative;
  padding-bottom: 56.25%; /* 16:9 */
  height: 0;
}
.video-wrapper iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.callout {
  background-color: rgb(255, 255, 83);
  color: black;
  padding: 10px;
}

.callout a {
  color: black !important;
}
</style>
