<template>
  <v-container>
    <v-card>
      <v-card-title>
        {{ isEdit ? 'Edit Vehicle' : 'New Vehicle' }}
      </v-card-title>
      <v-card-text>
        <v-form ref="form" v-model="valid">
          <v-row>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="vehicle.brand"
                label="Brand"
                required
                :rules="[v => !!v || 'Brand is required']"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="vehicle.model"
                label="Model"
                required
                :rules="[v => !!v || 'Model is required']"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="vehicle.year"
                label="Year"
                type="number"
                required
                :rules="[
                  v => !!v || 'Year is required',
                  v => v >= 1900 || 'Invalid year'
                ]"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="vehicle.licensePlate"
                label="License Plate"
                required
                :rules="[v => !!v || 'License plate is required']"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-select
                v-model="vehicle.status"
                :items="statusOptions"
                label="Status"
                required
                :rules="[v => !!v || 'Status is required']"
              ></v-select>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="error" text @click="$router.push('/vehicles')">
          Cancel
        </v-btn>
        <v-btn color="success" text @click="save" :disabled="!valid">
          Save
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import { vehicleApi } from '../../infrastructure/api/vehicleApi';

export default {
  name: 'VehicleForm',
  data: () => ({
    valid: false,
    vehicle: {
      type: 'car',
      brand: '',
      model: '',
      year: new Date().getFullYear(),
      licensePlate: '',
      status: 'available'
    },
    statusOptions: [
      'available',
      'rented',
      'maintenance',
      'out_of_service'
    ]
  }),
  computed: {
    isEdit() {
      return this.$route.params.id !== undefined;
    }
  },
  async created() {
    if (this.isEdit) {
      try {
        const vehicle = await vehicleApi.getVehicleById(this.$route.params.id);
        this.vehicle = { ...vehicle };
      } catch (error) {
        console.error('Error loading vehicle:', error);
        this.$router.push('/vehicles');
      }
    }
  },
  methods: {
    async save() {
      if (this.$refs.form.validate()) {
        try {
          if (this.isEdit) {
            await vehicleApi.updateVehicle(this.$route.params.id, this.vehicle);
          } else {
            await vehicleApi.createVehicle(this.vehicle);
          }
          this.$router.push('/vehicles');
        } catch (error) {
          console.error('Error saving vehicle:', error);
        }
      }
    }
  }
};
</script> 