<template>
  <div class="parent pa-2">
    <div class="box">
      <p class="title">
        Met Haltebuddy weet je precies welke haltes er
        <strong>voor jou</strong> toegankelijk zijn. Vul je reisprofiel in, en
        zie precies waar je op moet letten voordat je de bus, tram, of metro in
        stapt!
      </p>
      <p class="text-center text--secondary text-body-2">
        meer weten?<br />
        <v-icon x-large>mdi-chevron-down</v-icon>
      </p>
    </div>
    <div class="box">
      <IPhoneX v-if="$vuetify.breakpoint.smAndUp" />
      <p v-if="$vuetify.breakpoint.xsOnly">
        Op mobiel laten we alleen een link zien
      </p>
    </div>
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
.parent {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 450px));
  place-items: center;
  justify-content: center;
  height: 100vh;
}
</style>
