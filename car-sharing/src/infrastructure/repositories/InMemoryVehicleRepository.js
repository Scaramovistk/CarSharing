import { IVehicleRepository } from '../../domain/interfaces/IVehicleRepository';
import { Vehicle } from '../../domain/entities/Vehicle';

export class InMemoryVehicleRepository extends IVehicleRepository {
  constructor() {
    super();
    this._vehicles = new Map();
  }

  async create(vehicle) {
    if (await this.findById(vehicle.id)) {
      throw new Error('Vehicle with this ID already exists');
    }
    this._vehicles.set(vehicle.id, vehicle);
    return vehicle;
  }

  async findById(id) {
    return this._vehicles.get(id) || null;
  }

  async update(id, vehicleData) {
    const vehicle = await this.findById(id);
    if (!vehicle) {
      throw new Error('Vehicle not found');
    }

    Object.assign(vehicle, vehicleData);
    this._vehicles.set(id, vehicle);
    return vehicle;
  }

  async delete(id) {
    this._vehicles.delete(id);
  }

  async list(filters = {}) {
    let vehicles = Array.from(this._vehicles.values());

    if (filters.type) {
      vehicles = vehicles.filter(v => v.type === filters.type);
    }

    if (filters.brand) {
      vehicles = vehicles.filter(v => 
        v.brand.toLowerCase().includes(filters.brand.toLowerCase())
      );
    }

    if (filters.isAvailable !== undefined) {
      vehicles = vehicles.filter(v => v.isAvailable === filters.isAvailable);
    }

    if (filters.minYear) {
      vehicles = vehicles.filter(v => v.year >= filters.minYear);
    }

    if (filters.maxYear) {
      vehicles = vehicles.filter(v => v.year <= filters.maxYear);
    }

    return vehicles;
  }

  async findAvailable(startDate, endDate, type = null) {
    const vehicles = await this.list({ isAvailable: true, type });
    
    return vehicles;
  }

  async updateAvailability(id, isAvailable) {
    const vehicle = await this.findById(id);
    if (!vehicle) {
      throw new Error('Vehicle not found');
    }
    
    vehicle.isAvailable = isAvailable;
    this._vehicles.set(id, vehicle);
    return vehicle;
  }
} 