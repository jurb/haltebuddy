<template>
  <div>
    <h3>
      Vertrektijden
    </h3>
    <v-alert
      v-if="oldTramWarning"
      dense
      outlined
      type="error"
      class="text-body-2"
    >
      <strong>Op lijn 5 & 19 rijden oude trams</strong><br />Oude trams zijn
      minder goed toegankelijk. De oude trams rijden meestal afwisselend op de
      lijn met nieuwe trams.
    </v-alert>
    <div class="mx-n4">
      <v-divider />
    </div>
    <template v-for="(item, passIndex) in passes">
      <v-row
        :key="`pass-${passIndex}`"
        no-gutters
        class="my-2 text-body-2"
        align="center"
      >
        <v-col :cols="4">
          <vehicle-icon
            :transportmode="transportmode"
            :height="24"
            :width="24"
          />
          &nbsp;&nbsp;<v-chip label color="secondary" outlined>
            <strong>{{ item.LinePublicNumber }}</strong>
          </v-chip>
        </v-col>
        <v-col>{{ item.DestinationName50 }}</v-col>
        <v-col :cols="2"
          ><strong
            >{{ formatDistancePass(item.ExpectedDepartureTime) }} min
          </strong></v-col
        >
      </v-row>
      <v-divider
        v-if="passIndex < passes.length - 1"
        :key="`pass-divider-${passIndex}`"
      ></v-divider>
    </template>
    <div class="mx-n4">
      <v-divider />
    </div>
  </div>
</template>

<script>
import VehicleIcon from "@/components/VehicleIcon.vue";
export default {
  components: { VehicleIcon },
  props: ["passes", "transportmode", "oldTramWarning", "formatDistancePass"],
};
</script>

<style scoped>
.v-chip {
  padding: 0 6px;
}
</style>
