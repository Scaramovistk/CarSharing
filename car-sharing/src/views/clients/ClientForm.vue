<template>
  <v-container>
    <v-card>
      <v-card-title>
        {{ isEdit ? 'Edit Client' : 'New Client' }}
      </v-card-title>
      <v-card-text>
        <v-form ref="form" v-model="valid">
          <v-row>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="client.firstName"
                label="First Name"
                required
                :rules="[v => !!v || 'First name is required']"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="client.lastName"
                label="Last Name"
                required
                :rules="[v => !!v || 'Last name is required']"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="client.email"
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
                v-model="client.phoneNumber"
                label="Phone Number"
                required
                :rules="[v => !!v || 'Phone number is required']"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="client.driverLicense"
                label="Driver License"
                required
                :rules="[v => !!v || 'Driver license is required']"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="error" text @click="$router.push('/clients')">
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
import { clientApi } from '../../infrastructure/api/clientApi';

export default {
  name: 'ClientForm',
  data: () => ({
    valid: false,
    client: {
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      driverLicense: ''
    }
  }),
  computed: {
    isEdit() {
      return this.$route.params.id !== undefined;
    }
  },
  async created() {
    if (this.isEdit) {
      try {
        const client = await clientApi.getClientById(this.$route.params.id);
        this.client = { ...client };
      } catch (error) {
        console.error('Error loading client:', error);
        this.$router.push('/clients');
      }
    }
  },
  methods: {
    async save() {
      if (this.$refs.form.validate()) {
        try {
          if (this.isEdit) {
            await clientApi.updateClient(this.$route.params.id, this.client);
          } else {
            await clientApi.createClient(this.client);
          }
          this.$router.push('/clients');
        } catch (error) {
          console.error('Error saving client:', error);
        }
      }
    }
  }
};
</script> 