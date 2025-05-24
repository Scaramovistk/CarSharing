<template>
  <v-container>
    <v-card>
      <v-card-title>
        Vehicle Details
      </v-card-title>
      <v-card-text>
        <v-row v-if="vehicle">
          <v-col cols="12" md="6">
            <v-list>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>Brand</v-list-item-title>
                  <v-list-item-subtitle>{{ vehicle.brand }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>Model</v-list-item-title>
                  <v-list-item-subtitle>{{ vehicle.model }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>Year</v-list-item-title>
                  <v-list-item-subtitle>{{ vehicle.year }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>License Plate</v-list-item-title>
                  <v-list-item-subtitle>{{ vehicle.licensePlate }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>Status</v-list-item-title>
                  <v-list-item-subtitle>{{ vehicle.status }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" text @click="$router.push('/vehicles')">
          Back to List
        </v-btn>
        <v-btn color="primary" text @click="$router.push(`/vehicles/${vehicle.id}/edit`)">
          Edit
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import { vehicleApi } from '../../infrastructure/api/vehicleApi';

export default {
  name: 'VehicleDetails',
  data: () => ({
    vehicle: null
  }),
  async created() {
    try {
      this.vehicle = await vehicleApi.getVehicleById(this.$route.params.id);
    } catch (error) {
      console.error('Error loading vehicle:', error);
      this.$router.push('/vehicles');
    }
  }
};
</script> 