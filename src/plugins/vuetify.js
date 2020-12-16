import Vue from "vue";
import Vuetify from "vuetify/lib/framework";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    options: { customProperties: true },
    themes: {
      light: {
        primary: {
          base: "#009ee3", // GVB cyaan
          lighten1: "#d3dff3",
        },
        secondary: {
          base: "#0863b5", // GVB blauw
          lighten1: "#d4edfc",
        },
        accent: {
          base: "#f39100", // Oranje
          lighten1: "#feead3",
        },
        error: "#e3001f", // Rood
        "gvb-yellow": "#fec600",
        "gvb-pink": "#e50064",
        "gvb-green": "#13a538",
        "gvb-purple": "#fec600",
      },
    },
  },
});
