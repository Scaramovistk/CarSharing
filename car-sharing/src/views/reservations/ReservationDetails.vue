<template>
  <v-container>
    <v-card>
      <v-card-title>
        Reservation Details
      </v-card-title>
      <v-card-text>
        <v-row v-if="reservation">
          <v-col cols="12" md="6">
            <v-list>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>Client</v-list-item-title>
                  <v-list-item-subtitle>{{ reservation.client.fullName }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>Vehicle</v-list-item-title>
                  <v-list-item-subtitle>
                    {{ `${reservation.vehicle.brand} ${reservation.vehicle.model} (${reservation.vehicle.licensePlate})` }}
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>Start Date</v-list-item-title>
                  <v-list-item-subtitle>
                    {{ new Date(reservation.startDate).toLocaleDateString() }}
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>End Date</v-list-item-title>
                  <v-list-item-subtitle>
                    {{ new Date(reservation.endDate).toLocaleDateString() }}
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>Status</v-list-item-title>
                  <v-list-item-subtitle>
                    <v-chip
                      :color="getStatusColor(reservation.status)"
                      text-color="white"
                      small
                    >
                      {{ reservation.status }}
                    </v-chip>
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" text @click="$router.push('/reservations')">
          Back to List
        </v-btn>
        <v-btn color="primary" text @click="$router.push(`/reservations/${reservation.id}/edit`)">
          Edit
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import { reservationApi } from '../../infrastructure/api/reservationApi';

export default {
  name: 'ReservationDetails',
  data: () => ({
    reservation: null
  }),
  async created() {
    try {
      this.reservation = await reservationApi.getReservationById(this.$route.params.id);
    } catch (error) {
      console.error('Error loading reservation:', error);
      this.$router.push('/reservations');
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
    }
  }
};
</script> 