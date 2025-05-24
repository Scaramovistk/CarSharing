<template>
  <v-container>
    <v-card>
      <v-card-title>
        Vehicles List
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="vehicles"
        :search="search"
        class="elevation-1"
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title>Vehicles</v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-spacer></v-spacer>
            <v-btn color="primary" dark class="mb-2" to="/vehicles/new">
              New Vehicle
            </v-btn>
          </v-toolbar>
        </template>
        <template v-slot:item.actions="{ item }">
          <v-icon small class="mr-2" @click="editVehicle(item)">
            mdi-pencil
          </v-icon>
          <v-icon small @click="deleteVehicle(item)">
            mdi-delete
          </v-icon>
        </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>

<script>
import { vehicleApi } from '../../infrastructure/api/vehicleApi';

export default {
  name: 'VehicleList',
  data: () => ({
    search: '',
    vehicles: [],
    headers: [
      { text: 'Model', value: 'model' },
      { text: 'Brand', value: 'brand' },
      { text: 'Year', value: 'year' },
      { text: 'License Plate', value: 'licensePlate' },
      { text: 'Status', value: 'status' },
      { text: 'Actions', value: 'actions', sortable: false }
    ]
  }),
  async created() {
    try {
      this.vehicles = await vehicleApi.getAllVehicles();
    } catch (error) {
      console.error('Error loading vehicles:', error);
    }
  },
  methods: {
    editVehicle(item) {
      this.$router.push(`/vehicles/${item.id}/edit`);
    },
    async deleteVehicle(item) {
      try {
        await vehicleApi.deleteVehicle(item.id);
        this.vehicles = this.vehicles.filter(v => v.id !== item.id);
      } catch (error) {
        console.error('Error deleting vehicle:', error);
      }
    }
  }
};
</script> 