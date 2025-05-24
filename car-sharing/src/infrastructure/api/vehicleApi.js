import { VehicleFactory } from '../../domain/factories/VehicleFactory';

let vehicles = [];

export const vehicleApi = {
  async createVehicle(vehicleData) {
    try {
      const vehicle = VehicleFactory.createVehicle(vehicleData.type, vehicleData);
      vehicles.push(vehicle);
      return vehicle;
    } catch (error) {
      throw new Error(`Failed to create vehicle: ${error.message}`);
    }
  },

  async getAllVehicles() {
    return vehicles;
  },

  async getVehicleById(id) {
    const vehicle = vehicles.find(v => v.id === id);
    if (!vehicle) {
      throw new Error('Vehicle not found');
    }
    return vehicle;
  },

  async updateVehicle(id, vehicleData) {
    const index = vehicles.findIndex(v => v.id === id);
    if (index === -1) {
      throw new Error('Vehicle not found');
    }

    vehicleData.id = id;
    const updatedVehicle = VehicleFactory.createVehicle(vehicleData.type, vehicleData);
    vehicles[index] = updatedVehicle;
    return updatedVehicle;
  },

  async deleteVehicle(id) {
    const index = vehicles.findIndex(v => v.id === id);
    if (index === -1) {
      throw new Error('Vehicle not found');
    }
    vehicles = vehicles.filter(v => v.id !== id);
    return true;
  },

  async getAvailableVehicles(startDate, endDate) {
    return vehicles.filter(v => v.isAvailable);
  }
};