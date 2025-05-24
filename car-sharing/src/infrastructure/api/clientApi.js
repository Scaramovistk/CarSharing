import { ClientFactory } from '../../domain/factories/ClientFactory';

let clients = [];

export const clientApi = {
  async createClient(clientData) {
    try {
      const existingClient = clients.find(c => c.email === clientData.email);
      if (existingClient) {
        throw new Error('A client with this email already exists');
      }

      const client = ClientFactory.createClient(clientData);
      clients.push(client);
      return client;
    } catch (error) {
      throw new Error(`Failed to create client: ${error.message}`);
    }
  },

  async getAllClients() {
    return clients;
  },

  async getClientById(id) {
    const client = clients.find(c => c.id === id);
    if (!client) {
      throw new Error('Client not found');
    }
    return client;
  },

  async updateClient(id, clientData) {
    const index = clients.findIndex(c => c.id === id);
    if (index === -1) {
      throw new Error('Client not found');
    }

    const existingClient = clients.find(c => c.email === clientData.email && c.id !== id);
    if (existingClient) {
      throw new Error('A client with this email already exists');
    }

    clientData.id = id;
    const updatedClient = ClientFactory.createClient(clientData);
    clients[index] = updatedClient;
    return updatedClient;
  },

  async deleteClient(id) {
    const index = clients.findIndex(c => c.id === id);
    if (index === -1) {
      throw new Error('Client not found');
    }
    clients = clients.filter(c => c.id !== id);
    return true;
  }
};