<template>
  <v-container>
    <v-card>
      <v-card-title>
        Client Details
      </v-card-title>
      <v-card-text>
        <v-row v-if="client">
          <v-col cols="12" md="6">
            <v-list>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>Name</v-list-item-title>
                  <v-list-item-subtitle>{{ client.firstName }} {{ client.lastName }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>Email</v-list-item-title>
                  <v-list-item-subtitle>{{ client.email }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>Phone Number</v-list-item-title>
                  <v-list-item-subtitle>{{ client.phoneNumber }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>Driver License</v-list-item-title>
                  <v-list-item-subtitle>{{ client.driverLicense }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" text @click="$router.push('/clients')">
          Back to List
        </v-btn>
        <v-btn color="primary" text @click="$router.push(`/clients/${client.id}/edit`)">
          Edit
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import { clientApi } from '../../infrastructure/api/clientApi';

export default {
  name: 'ClientDetails',
  data: () => ({
    client: null
  }),
  async created() {
    try {
      this.client = await clientApi.getClientById(this.$route.params.id);
    } catch (error) {
      console.error('Error loading client:', error);
      this.$router.push('/clients');
    }
  }
};
</script> 