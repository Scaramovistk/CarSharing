<template>
  <v-container>
    <v-card>
      <v-card-title>
        Clients List
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
        :items="clients"
        :search="search"
        class="elevation-1"
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title>Clients</v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-spacer></v-spacer>
            <v-btn color="primary" dark class="mb-2" to="/clients/new">
              New Client
            </v-btn>
          </v-toolbar>
        </template>
        <template v-slot:item.actions="{ item }">
          <v-icon small class="mr-2" @click="editClient(item)">
            mdi-pencil
          </v-icon>
          <v-icon small @click="deleteClient(item)">
            mdi-delete
          </v-icon>
        </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>

<script>
import { clientApi } from '../../infrastructure/api/clientApi';

export default {
  name: 'ClientList',
  data: () => ({
    search: '',
    clients: [],
    headers: [
      { text: 'Name', value: 'fullName' },
      { text: 'Email', value: 'email' },
      { text: 'Phone', value: 'phoneNumber' },
      { text: 'Actions', value: 'actions', sortable: false }
    ]
  }),
  async created() {
    try {
      this.clients = await clientApi.getAllClients();
    } catch (error) {
      console.error('Error loading clients:', error);
    }
  },
  methods: {
    editClient(item) {
      this.$router.push(`/clients/${item.id}/edit`);
    },
    async deleteClient(item) {
      try {
        await clientApi.deleteClient(item.id);
        this.clients = this.clients.filter(c => c.id !== item.id);
      } catch (error) {
        console.error('Error deleting client:', error);
      }
    }
  }
};
</script> 