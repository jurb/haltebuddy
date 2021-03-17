<template>
  <div class="parent primary secondary">
    <div class="box white--text">
      <div class="demo-callout-box" v-if="$vuetify.breakpoint.mdAndUp">
        <img
          :src="require('@/assets/demo-callout.svg')"
          alt="pijltje naar demo"
          class="demo-callout-image"
        />
      </div>
      <div class="demo-callout-text">
        <p class="title">
          Met Haltebuddy weet je precies welke haltes er
          <strong>voor jou</strong> toegankelijk zijn. Vul je reisprofiel in, en
          zie precies waar je op moet letten voordat je de bus, tram, of metro
          in stapt!
        </p>
        <p v-if="$vuetify.breakpoint.xsOnly" class="white--text">
          Bekijk <a href="/">de demo op je mobiel</a>.
        </p>
      </div>
    </div>
    <div class="iframe-demo-box">
      <IPhoneX v-if="$vuetify.breakpoint.smAndUp" />
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
  // position: relative;
  // top: 125px;
  text-align: right;
}
.demo-callout-image {
  width: 175px;
}

.demo-callout-text {
  // position: relative;
  // top: 175px;
  padding-top: 50px;
  margin-bottom: 96px;
}

.iframe-demo-box {
  padding: 32px;
}

a {
  color: white !important;
}
</style>
