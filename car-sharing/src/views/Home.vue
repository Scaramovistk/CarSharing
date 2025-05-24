<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-toolbar color="primary" dark>
            <v-toolbar-title>Car Sharing Dashboard</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn icon @click="refreshData">
              <v-icon>mdi-refresh</v-icon>
            </v-btn>
          </v-toolbar>
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" md="4">
        <v-card>
          <v-card-title class="d-flex justify-space-between">
            Clients
            <v-btn color="primary" @click="openClientDialog">
              <v-icon left>mdi-plus</v-icon>
              Add Client
            </v-btn>
          </v-card-title>
          <v-card-text>
            <v-data-table
              :headers="clientHeaders"
              :items="_clientsData"
              :search="clientSearch"
              :loading="loading"
              class="elevation-1"
            >
              <template v-slot:top>
                <v-text-field
                  v-model="clientSearch"
                  label="Search Clients"
                  prepend-icon="mdi-magnify"
                  single-line
                  hide-details
                  class="mx-4"
                ></v-text-field>
              </template>
              <template v-slot:item.name="{ item }">
                {{ item.firstName }} {{ item.lastName }}
              </template>
              <template v-slot:item.actions="{ item }">
                <v-icon small class="mr-2" @click="editClient(item)">mdi-pencil</v-icon>
                <v-icon small @click="deleteClient(item)">mdi-delete</v-icon>
              </template>
            </v-data-table>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="4">
        <v-card>
          <v-card-title class="d-flex justify-space-between">
            Vehicles
            <v-btn color="primary" @click="openVehicleDialog">
              <v-icon left>mdi-plus</v-icon>
              Add Vehicle
            </v-btn>
          </v-card-title>
          <v-card-text>
            <v-data-table
              :headers="vehicleHeaders"
              :items="vehicles"
              :search="vehicleSearch"
              :loading="loading"
              class="elevation-1"
            >
              <template v-slot:top>
                <v-text-field
                  v-model="vehicleSearch"
                  label="Search Vehicles"
                  prepend-icon="mdi-magnify"
                  single-line
                  hide-details
                  class="mx-4"
                ></v-text-field>
              </template>
              <template v-slot:item.actions="{ item }">
                <v-icon small class="mr-2" @click="editVehicle(item)">mdi-pencil</v-icon>
                <v-icon small @click="deleteVehicle(item)">mdi-delete</v-icon>
              </template>
            </v-data-table>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="4">
        <v-card>
          <v-card-title class="d-flex justify-space-between">
            Reservations
            <v-btn color="primary" @click="openReservationDialog">
              <v-icon left>mdi-plus</v-icon>
              Add Reservation
            </v-btn>
          </v-card-title>
          <v-card-text>
            <v-data-table
              :headers="reservationHeaders"
              :items="reservations"
              :search="reservationSearch"
              :loading="loading"
              class="elevation-1"
            >
              <template v-slot:top>
                <v-text-field
                  v-model="reservationSearch"
                  label="Search Reservations"
                  prepend-icon="mdi-magnify"
                  single-line
                  hide-details
                  class="mx-4"
                ></v-text-field>
              </template>
              <template v-slot:item.actions="{ item }">
                <v-icon small class="mr-2" @click="editReservation(item)">mdi-pencil</v-icon>
                <v-icon small @click="deleteReservation(item)">mdi-delete</v-icon>
              </template>
            </v-data-table>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-dialog v-model="clientDialog" max-width="500px">
      <v-card>
        <v-card-title>
          <span class="text-h5">{{ formTitle('Client') }}</span>
        </v-card-title>

        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="editedClient.firstName"
                  label="First Name"
                  required
                  :rules="[v => !!v || 'First name is required']"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="editedClient.lastName"
                  label="Last Name"
                  required
                  :rules="[v => !!v || 'Last name is required']"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="editedClient.email"
                  label="Email"
                  required
                  :rules="[
                    v => !!v || 'Email is required',
                    v => /.+@.+\..+/.test(v) || 'Email must be valid'
                  ]"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="editedClient.phoneNumber"
                  label="Phone Number"
                  required
                  :rules="[v => !!v || 'Phone number is required']"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="editedClient.driverLicense"
                  label="Driver License"
                  required
                  :rules="[v => !!v || 'Driver license is required']"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error" text @click="closeClientDialog">Cancel</v-btn>
          <v-btn color="success" text @click="saveClient">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="vehicleDialog" max-width="500px">
      <v-card>
        <v-card-title>
          <span class="text-h5">{{ formTitle('Vehicle') }}</span>
        </v-card-title>

        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6">
                <v-select
                  v-model="editedVehicle.type"
                  :items="['car']"
                  label="Type"
                  required
                  :rules="[v => !!v || 'Type is required']"
                  disabled
                ></v-select>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="editedVehicle.brand"
                  label="Brand"
                  required
                  :rules="[v => !!v || 'Brand is required']"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="editedVehicle.model"
                  label="Model"
                  required
                  :rules="[v => !!v || 'Model is required']"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="editedVehicle.year"
                  label="Year"
                  type="number"
                  required
                  :rules="[
                    v => !!v || 'Year is required',
                    v => v >= 1900 || 'Year must be 1900 or later',
                    v => v <= new Date().getFullYear() + 1 || 'Invalid future year'
                  ]"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="editedVehicle.licensePlate"
                  label="License Plate"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-select
                  v-model="editedVehicle.fuelType"
                  :items="['gasoline', 'diesel', 'electric', 'hybrid']"
                  label="Fuel Type"
                  required
                ></v-select>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="editedVehicle.dailyRate"
                  label="Daily Rate"
                  type="number"
                  prefix="$"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error" text @click="closeVehicleDialog">Cancel</v-btn>
          <v-btn color="success" text @click="saveVehicle">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="reservationDialog" max-width="500px">
      <v-card>
        <v-card-title>
          <span class="text-h5">{{ formTitle('Reservation') }}</span>
        </v-card-title>

        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-select
                  v-model="editedReservation.clientId"
                  :items="_clientsData"
                  item-value="id"
                  :item-text="item => `${item.firstName} ${item.lastName}`"
                  label="Select Client"
                  required
                  :rules="[v => !!v || 'Client is required']"
                ></v-select>
              </v-col>
              <v-col cols="12">
                <v-select
                  v-model="editedReservation.vehicleId"
                  :items="availableVehicles"
                  item-text="displayText"
                  item-value="id"
                  label="Select Vehicle"
                  required
                  :rules="[v => !!v || 'Vehicle is required']"
                ></v-select>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="editedReservation.startDate"
                  label="Start Date"
                  prepend-icon="mdi-calendar"
                  placeholder="YYYY-MM-DD"
                  :rules="[
                    v => !!v || 'Start date is required',
                    v => /^\d{4}-\d{2}-\d{2}$/.test(v) || 'Date must be in YYYY-MM-DD format',
                    v => isValidDate(v) || 'Please enter a valid date',
                    v => isNotPastDate(v) || 'Date cannot be in the past'
                  ]"
                  @input="validateDates"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="editedReservation.endDate"
                  label="End Date"
                  prepend-icon="mdi-calendar"
                  placeholder="YYYY-MM-DD"
                  :rules="[
                    v => !!v || 'End date is required',
                    v => /^\d{4}-\d{2}-\d{2}$/.test(v) || 'Date must be in YYYY-MM-DD format',
                    v => isValidDate(v) || 'Please enter a valid date',
                    v => isNotPastDate(v) || 'Date cannot be in the past',
                    v => isEndDateAfterStartDate(v) || 'End date must be after start date'
                  ]"
                  @input="validateDates"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error" text @click="closeReservationDialog">Cancel</v-btn>
          <v-btn color="success" text @click="saveReservation">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-snackbar v-model="snackbar" :color="snackbarColor" timeout="3000">
      {{ snackbarText }}
      <template v-slot:action="{ attrs }">
        <v-btn text v-bind="attrs" @click="snackbar = false">Close</v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>

<script>
import { defineComponent } from 'vue';
import { clientApi } from '../infrastructure/api/clientApi';
import { vehicleApi } from '../infrastructure/api/vehicleApi';
import { reservationApi } from '../infrastructure/api/reservationApi';

export default defineComponent({
  name: 'Home',

  data: () => ({
    loading: false,
    snackbar: false,
    snackbarText: '',
    snackbarColor: 'success',

    _clientsData: [],
    vehicles: [],
    reservations: [],
    availableVehicles: [],

    clientSearch: '',
    vehicleSearch: '',
    reservationSearch: '',

    clientDialog: false,
    vehicleDialog: false,
    reservationDialog: false,

    editedIndex: -1,
    editedClient: {
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      driverLicense: ''
    },
    editedVehicle: {
      type: 'car',
      brand: '',
      model: '',
      year: new Date().getFullYear(),
      licensePlate: '',
      fuelType: 'gasoline',
      dailyRate: 0
    },
    editedReservation: {
      clientId: '',
      vehicleId: '',
      startDate: new Date().toISOString().substr(0, 10),
      endDate: new Date().toISOString().substr(0, 10)
    },

    clientHeaders: [
      { text: 'Name', value: 'name', sortable: false },
      { text: 'Email', value: 'email' },
      { text: 'Phone', value: 'phoneNumber' },
      { text: 'Driver License', value: 'driverLicense' },
      { text: 'Actions', value: 'actions', sortable: false }
    ],
    vehicleHeaders: [
      { text: 'Brand', value: 'brand' },
      { text: 'Model', value: 'model' },
      { text: 'Year', value: 'year' },
      { text: 'License Plate', value: 'licensePlate' },
      { text: 'Daily Rate', value: 'dailyRate' },
      { text: 'Actions', value: 'actions', sortable: false }
    ],
    reservationHeaders: [
      { text: 'Client', value: 'client.fullName' },
      { text: 'Vehicle', value: 'vehicle.brand' },
      { text: 'Start Date', value: 'startDate' },
      { text: 'End Date', value: 'endDate' },
      { text: 'Actions', value: 'actions', sortable: false }
    ]
  }),

  computed: {
    formTitle() {
      return (type) => {
        return this.editedIndex === -1 ? `New ${type}` : `Edit ${type}`;
      };
    },
    formattedVehicles() {
      return this.vehicles.map(vehicle => ({
        ...vehicle,
        displayText: `${vehicle.brand} ${vehicle.model} (${vehicle.year}) - ${vehicle.licensePlate}`
      }));
    }
  },

  created() {
    this.initialize();
  },

  methods: {
    async initialize() {
      this.loading = true;
      try {
        const [clients, vehicles, reservations] = await Promise.all([
          clientApi.getAllClients(),
          vehicleApi.getAllVehicles(),
          reservationApi.getAllReservations()
        ]);
        this._clientsData = clients;
        this.vehicles = vehicles;
        this.availableVehicles = this.formattedVehicles;
        this.reservations = reservations;
      } catch (error) {
        this.showError(error.message);
      }
      this.loading = false;
    },

    refreshData() {
      this.initialize();
    },

    showSuccess(message) {
      this.snackbarColor = 'success';
      this.snackbarText = message;
      this.snackbar = true;
    },

    showError(message) {
      this.snackbarColor = 'error';
      this.snackbarText = message;
      this.snackbar = true;
    },

    openClientDialog() {
      this.editedIndex = -1;
      this.editedClient = {
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        driverLicense: ''
      };
      this.clientDialog = true;
    },

    openVehicleDialog() {
      this.editedIndex = -1;
      this.editedVehicle = {
        type: 'car',
        brand: '',
        model: '',
        year: new Date().getFullYear(),
        licensePlate: '',
        fuelType: 'gasoline',
        dailyRate: 0
      };
      this.vehicleDialog = true;
    },

    openReservationDialog() {
      this.editedIndex = -1;
      this.editedReservation = {
        clientId: '',
        vehicleId: '',
        startDate: new Date().toISOString().substr(0, 10),
        endDate: new Date().toISOString().substr(0, 10)
      };
      this.reservationDialog = true;
    },

    editClient(item) {
      const fullClientData = this._clientsData.find(c => c.id === item.id);
      this.editedIndex = this._clientsData.indexOf(fullClientData);
      this.editedClient = Object.assign({}, fullClientData);
      this.clientDialog = true;
    },

    editVehicle(item) {
      this.editedIndex = this.vehicles.indexOf(item);
      this.editedVehicle = Object.assign({}, item);
      this.vehicleDialog = true;
    },

    editReservation(item) {
      this.editedIndex = this.reservations.indexOf(item);
      this.editedReservation = {
        clientId: item.client.id,
        vehicleId: item.vehicle.id,
        startDate: item.startDate,
        endDate: item.endDate
      };
      this.reservationDialog = true;
    },

    async deleteClient(item) {
      try {
        await clientApi.deleteClient(item.id);
        this._clientsData = this._clientsData.filter(c => c.id !== item.id);
        this.showSuccess('Client deleted successfully');
      } catch (error) {
        this.showError(error.message);
      }
    },

    async deleteVehicle(item) {
      try {
        await vehicleApi.deleteVehicle(item.id);
        this.vehicles = this.vehicles.filter(v => v.id !== item.id);
        this.showSuccess('Vehicle deleted successfully');
      } catch (error) {
        this.showError(error.message);
      }
    },

    async deleteReservation(item) {
      try {
        await reservationApi.deleteReservation(item.id);
        this.reservations = this.reservations.filter(r => r.id !== item.id);
        this.showSuccess('Reservation deleted successfully');
      } catch (error) {
        this.showError(error.message);
      }
    },

    closeClientDialog() {
      this.clientDialog = false;
      this.$nextTick(() => {
        this.editedClient = {
          firstName: '',
          lastName: '',
          email: '',
          phoneNumber: '',
          driverLicense: ''
        };
        this.editedIndex = -1;
      });
    },

    closeVehicleDialog() {
      this.vehicleDialog = false;
      this.editedIndex = -1;
      this.editedVehicle = {
        type: 'car',
        brand: '',
        model: '',
        year: new Date().getFullYear(),
        licensePlate: '',
        fuelType: 'gasoline',
        dailyRate: 0
      };
    },

    closeReservationDialog() {
      this.reservationDialog = false;
      this.editedIndex = -1;
      this.editedReservation = {
        clientId: '',
        vehicleId: '',
        startDate: new Date().toISOString().substr(0, 10),
        endDate: new Date().toISOString().substr(0, 10)
      };
    },

    async saveClient() {
      try {
        let response;
        if (this.editedIndex > -1) {
          response = await clientApi.updateClient(this.editedClient.id, this.editedClient);
          Object.assign(this._clientsData[this.editedIndex], response);
        } else {
          response = await clientApi.createClient(this.editedClient);
          this._clientsData.push(response);
        }
        this.closeClientDialog();
        this.showSuccess(`Client ${this.editedIndex > -1 ? 'updated' : 'created'} successfully`);
      } catch (error) {
        this.showError(error.message);
      }
    },

    async saveVehicle() {
      try {
        let response;
        if (this.editedIndex > -1) {
          response = await vehicleApi.updateVehicle(this.editedVehicle.id, this.editedVehicle);
          Object.assign(this.vehicles[this.editedIndex], response);
        } else {
          response = await vehicleApi.createVehicle(this.editedVehicle);
          this.vehicles.push(response);
        }
        this.closeVehicleDialog();
        this.showSuccess(`Vehicle ${this.editedIndex > -1 ? 'updated' : 'created'} successfully`);
      } catch (error) {
        this.showError(error.message);
      }
    },

    async saveReservation() {
      try {
        let response;
        if (this.editedIndex > -1) {
          response = await reservationApi.updateReservation(
            this.reservations[this.editedIndex].id,
            this.editedReservation
          );
          Object.assign(this.reservations[this.editedIndex], response);
        } else {
          response = await reservationApi.createReservation(this.editedReservation);
          this.reservations.push(response);
        }
        this.closeReservationDialog();
        this.showSuccess(`Reservation ${this.editedIndex > -1 ? 'updated' : 'created'} successfully`);
      } catch (error) {
        this.showError(error.message);
      }
    },

    isValidDate(dateStr) {
      if (!/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) return false;
      const date = new Date(dateStr);
      if (isNaN(date.getTime())) return false;
      
      const [year, month, day] = dateStr.split('-').map(Number);
      return date.getFullYear() === year &&
             date.getMonth() + 1 === month &&
             date.getDate() === day;
    },

    isNotPastDate(dateStr) {
      if (!this.isValidDate(dateStr)) return false;
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const inputDate = new Date(dateStr);
      return inputDate >= today;
    },

    isEndDateAfterStartDate(endDateStr) {
      if (!this.isValidDate(endDateStr) || !this.isValidDate(this.editedReservation.startDate)) {
        return false;
      }
      const startDate = new Date(this.editedReservation.startDate);
      const endDate = new Date(endDateStr);
      return endDate >= startDate;
    },

    validateDates() {
      if (this.editedReservation.startDate && !/^\d{4}-\d{2}-\d{2}$/.test(this.editedReservation.startDate)) {
        this.editedReservation.startDate = this.formatDateInput(this.editedReservation.startDate);
      }
      if (this.editedReservation.endDate && !/^\d{4}-\d{2}-\d{2}$/.test(this.editedReservation.endDate)) {
        this.editedReservation.endDate = this.formatDateInput(this.editedReservation.endDate);
      }
    },

    formatDateInput(value) {
      const digits = value.replace(/\D/g, '');
      
      // Format as YYYY-MM-DD
      if (digits.length >= 8) {
        const year = digits.substring(0, 4);
        const month = digits.substring(4, 6);
        const day = digits.substring(6, 8);
        return `${year}-${month}-${day}`;
      }
      return value;
    }
  }
});
</script> 