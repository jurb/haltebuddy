<template>
  <div class="parent primary secondary">
    <div class="box white--text">
      <div class="demo-callout-box">
        <img
          :src="require('@/assets/demo-callout.svg')"
          alt="interactieve demo aanwijzer"
          class="demo-callout-image"
        />
      </div>
      <p class="title demo-callout-text">
        Met Haltebuddy weet je precies welke haltes er
        <strong>voor jou</strong> toegankelijk zijn. Vul je reisprofiel in, en
        zie precies waar je op moet letten voordat je de bus, tram, of metro in
        stapt!
      </p>
      <p class="text-center text-body-2 mt-16">
        meer weten?<br />
        <v-icon x-large color="white">mdi-chevron-down</v-icon>
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
}

.demo-callout-box {
  position: relative;
  text-align: right;
  margin-top: 75px;
}
.demo-callout-image {
  width: 175px;
}

.demo-callout-text {
  padding-top: 96px;
}
</style>
