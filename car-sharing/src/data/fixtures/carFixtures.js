import { VehicleFactory } from '../../domain/factories/VehicleFactory';

export const carFixtures = [
  {
    id: '1',
    type: 'car',
    brand: 'Toyota',
    model: 'Camry',
    year: 2022,
    licensePlate: 'ABC123',
    fuelType: 'hybrid',
    transmission: 'automatic',
    seats: 5,
    mileage: 15000,
    dailyRate: 50,
    features: ['GPS', 'Bluetooth', 'Backup Camera']
  },
  {
    id: '2',
    type: 'car',
    brand: 'Tesla',
    model: 'Model 3',
    year: 2023,
    licensePlate: 'EV456',
    fuelType: 'electric',
    transmission: 'automatic',
    seats: 5,
    mileage: 8000,
    dailyRate: 75,
    features: ['Autopilot', 'Premium Sound', 'Glass Roof']
  },
  {
    id: '3',
    type: 'car',
    brand: 'BMW',
    model: 'X5',
    year: 2022,
    licensePlate: 'LUX789',
    fuelType: 'gasoline',
    transmission: 'automatic',
    seats: 7,
    mileage: 20000,
    dailyRate: 85,
    features: ['Leather Seats', 'Panoramic Sunroof', 'Premium Sound']
  },
  {
    id: '4',
    type: 'car',
    brand: 'Honda',
    model: 'CR-V',
    year: 2023,
    licensePlate: 'SUV321',
    fuelType: 'gasoline',
    transmission: 'automatic',
    seats: 5,
    mileage: 12000,
    dailyRate: 45,
    features: ['Apple CarPlay', 'Lane Assist', 'Cruise Control']
  }
];

export const createCarInstances = () => {
  return carFixtures.map(carData => VehicleFactory.createVehicle('car', carData));
}; 