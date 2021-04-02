<template>
  <div>
    <div class="pa-4">
      <h3>Reisprofiel</h3>
      <p>
        Vul hieronder jouw reisprofiel in om te zien welke haltes voor jou
        toegankelijk zijn.
      </p>
    </div>
    <profile />
  </div>
</template>

<script>
import Profile from "@/components/Profile.vue";
export default {
  components: { Profile },
};
</script>

<style lang="scss" scoped></style>
