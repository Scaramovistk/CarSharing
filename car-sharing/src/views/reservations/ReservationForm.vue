<template>
  <v-container>
    <v-card>
      <v-card-title>
        {{ isEdit ? 'Edit Reservation' : 'New Reservation' }}
      </v-card-title>
      <v-card-text>
        <v-form ref="form" v-model="valid">
          <v-row>
            <v-col cols="12" md="6">
              <v-select
                v-model="reservation.clientId"
                :items="clients"
                item-text="fullName"
                item-value="id"
                label="Client"
                required
                :rules="[v => !!v || 'Client is required']"
              ></v-select>
            </v-col>
            <v-col cols="12" md="6">
              <v-select
                v-model="reservation.vehicleId"
                :items="vehicles"
                item-text="displayName"
                item-value="id"
                label="Vehicle"
                required
                :rules="[v => !!v || 'Vehicle is required']"
              ></v-select>
            </v-col>
            <v-col cols="12" md="6">
              <v-menu
                v-model="startDateMenu"
                :close-on-content-click="false"
                max-width="290"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="reservation.startDate"
                    label="Start Date"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                    :rules="[v => !!v || 'Start date is required']"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="reservation.startDate"
                  @change="startDateMenu = false"
                  :min="new Date().toISOString().substr(0, 10)"
                ></v-date-picker>
              </v-menu>
            </v-col>
            <v-col cols="12" md="6">
              <v-menu
                v-model="endDateMenu"
                :close-on-content-click="false"
                max-width="290"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="reservation.endDate"
                    label="End Date"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                    :rules="[
                      v => !!v || 'End date is required',
                      v => !v || v >= reservation.startDate || 'End date must be after start date'
                    ]"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="reservation.endDate"
                  @change="endDateMenu = false"
                  :min="reservation.startDate"
                ></v-date-picker>
              </v-menu>
            </v-col>
            <v-col cols="12">
              <v-select
                v-model="reservation.status"
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
        <v-btn color="error" text @click="$router.push('/reservations')">
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
import { reservationApi } from '../../infrastructure/api/reservationApi';
import { clientApi } from '../../infrastructure/api/clientApi';
import { vehicleApi } from '../../infrastructure/api/vehicleApi';

export default {
  name: 'ReservationForm',
  data: () => ({
    valid: false,
    startDateMenu: false,
    endDateMenu: false,
    clients: [],
    vehicles: [],
    reservation: {
      clientId: null,
      vehicleId: null,
      startDate: null,
      endDate: null,
      status: 'pending'
    },
    statusOptions: [
      'pending',
      'active',
      'completed',
      'cancelled'
    ]
  }),
  computed: {
    isEdit() {
      return this.$route.params.id !== undefined;
    }
  },
  async created() {
    try {
      this.clients = await clientApi.getAllClients();
      this.vehicles = await vehicleApi.getAllVehicles();
      this.vehicles = this.vehicles.map(v => ({
        ...v,
        displayName: `${v.brand} ${v.model} (${v.licensePlate})`
      }));

      if (this.isEdit) {
        const reservation = await reservationApi.getReservationById(this.$route.params.id);
        this.reservation = {
          ...reservation,
          clientId: reservation.client.id,
          vehicleId: reservation.vehicle.id,
          startDate: reservation.startDate.substr(0, 10),
          endDate: reservation.endDate.substr(0, 10)
        };
      }
    } catch (error) {
      console.error('Error loading data:', error);
      this.$router.push('/reservations');
    }
  },
  methods: {
    async save() {
      if (this.$refs.form.validate()) {
        try {
          if (this.isEdit) {
            await reservationApi.updateReservation(this.$route.params.id, this.reservation);
          } else {
            await reservationApi.createReservation(this.reservation);
          }
          this.$router.push('/reservations');
        } catch (error) {
          console.error('Error saving reservation:', error);
        }
      }
    }
  }
};
</script> 