<template>
  <v-container>
    <v-card>
      <v-card-title>
        Reservations List
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
        :items="reservations"
        :search="search"
        class="elevation-1"
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title>Reservations</v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-spacer></v-spacer>
            <v-btn color="primary" dark class="mb-2" to="/reservations/new">
              New Reservation
            </v-btn>
          </v-toolbar>
        </template>
        <template v-slot:item.startDate="{ item }">
          {{ new Date(item.startDate).toLocaleDateString() }}
        </template>
        <template v-slot:item.endDate="{ item }">
          {{ new Date(item.endDate).toLocaleDateString() }}
        </template>
        <template v-slot:item.status="{ item }">
          <v-chip
            :color="getStatusColor(item.status)"
            text-color="white"
            small
          >
            {{ item.status }}
          </v-chip>
        </template>
        <template v-slot:item.actions="{ item }">
          <v-icon small class="mr-2" @click="editReservation(item)">
            mdi-pencil
          </v-icon>
          <v-icon small @click="deleteReservation(item)">
            mdi-delete
          </v-icon>
        </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>

<script>
import { reservationApi } from '../../infrastructure/api/reservationApi';

export default {
  name: 'ReservationList',
  data: () => ({
    search: '',
    reservations: [],
    headers: [
      { text: 'Client', value: 'client.fullName' },
      { text: 'Vehicle', value: 'vehicle.model' },
      { text: 'Start Date', value: 'startDate' },
      { text: 'End Date', value: 'endDate' },
      { text: 'Status', value: 'status' },
      { text: 'Actions', value: 'actions', sortable: false }
    ]
  }),
  async created() {
    try {
      this.reservations = await reservationApi.getAllReservations();
    } catch (error) {
      console.error('Error loading reservations:', error);
    }
  },
  methods: {
    getStatusColor(status) {
      const colors = {
        active: 'success',
        pending: 'warning',
        completed: 'info',
        cancelled: 'error'
      };
      return colors[status] || 'grey';
    },
    editReservation(item) {
      this.$router.push(`/reservations/${item.id}/edit`);
    },
    async deleteReservation(item) {
      try {
        await reservationApi.deleteReservation(item.id);
        this.reservations = this.reservations.filter(r => r.id !== item.id);
      } catch (error) {
        console.error('Error deleting reservation:', error);
      }
    }
  }
};
</script> 