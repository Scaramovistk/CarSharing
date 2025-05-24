import { Car } from '../entities/Car';

export class VehicleFactory {
  static createVehicle(type, data) {
    const id = data.id || Date.now().toString();

    switch (type.toLowerCase()) {
      case 'car':
        return new Car(
          id,
          data.brand,
          data.model,
          data.year,
          data.licensePlate,
          {
            fuelType: data.fuelType || 'gasoline',
            transmission: data.transmission || 'automatic',
            seats: data.seats || 5,
            mileage: data.mileage || 0,
            dailyRate: data.dailyRate || 0,
            features: data.features || []
          }
        );

      default:
        throw new Error(`Unsupported vehicle type: ${type}`);
    }
  }

  static validateVehicleData(data) {
    const requiredFields = ['brand', 'model', 'year', 'licensePlate'];
    const missingFields = requiredFields.filter(field => !data[field]);
    
    if (missingFields.length > 0) {
      throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
    }

    const currentYear = new Date().getFullYear();
    if (data.year < 1900 || data.year > currentYear + 1) {
      throw new Error('Invalid year');
    }

    if (data.dailyRate !== undefined && data.dailyRate < 0) {
      throw new Error('Daily rate cannot be negative');
    }

    return true;
  }
} 