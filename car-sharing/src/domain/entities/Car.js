import { Vehicle } from './Vehicle';

export class Car extends Vehicle {
  constructor(
    id, 
    brand, 
    model, 
    year, 
    licensePlate, 
    {
      fuelType = 'gasoline',
      transmission = 'automatic',
      seats = 5,
      mileage = 0,
      dailyRate = 0,
      features = []
    } = {}
  ) {
    super(id, brand, model, year, licensePlate, 'car');
    this._fuelType = fuelType;
    this._transmission = transmission;
    this._seats = seats;
    this._mileage = mileage;
    this._dailyRate = dailyRate;
    this._features = features;
    this._fuelLevel = 100;
  }

  get fuelType() { return this._fuelType; }
  get transmission() { return this._transmission; }
  get seats() { return this._seats; }
  get mileage() { return this._mileage; }
  get dailyRate() { return this._dailyRate; }
  get features() { return [...this._features]; }
  get fuelLevel() { return this._fuelLevel; }

  set dailyRate(value) {
    if (value < 0) throw new Error('Daily rate cannot be negative');
    this._dailyRate = value;
  }

  set mileage(value) {
    if (value < this._mileage) throw new Error('Mileage cannot decrease');
    this._mileage = value;
  }

  set fuelLevel(value) {
    if (value < 0 || value > 100) throw new Error('Fuel level must be between 0 and 100');
    this._fuelLevel = value;
  }

  addFeature(feature) {
    if (!this._features.includes(feature)) {
      this._features.push(feature);
    }
  }

  removeFeature(feature) {
    const index = this._features.indexOf(feature);
    if (index !== -1) {
      this._features.splice(index, 1);
    }
  }

  updateMileage(tripDistance) {
    if (tripDistance < 0) throw new Error('Trip distance cannot be negative');
    this._mileage += tripDistance;
  }

  calculateRentalCost(days) {
    return this._dailyRate * days;
  }

  toJSON() {
    return {
      ...super.toJSON(),
      fuelType: this._fuelType,
      transmission: this._transmission,
      seats: this._seats,
      mileage: this._mileage,
      dailyRate: this._dailyRate,
      features: this._features,
      fuelLevel: this._fuelLevel
    };
  }
} 