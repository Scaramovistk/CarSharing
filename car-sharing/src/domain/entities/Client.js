import { User } from './User';

export class Client extends User {
  constructor(id, firstName, lastName, email, phoneNumber, driverLicense) {
    super(id, firstName, lastName, email, phoneNumber);
    this._driverLicense = driverLicense;
    this._rentedCars = [];
    this._rentalHistory = [];
  }

  get driverLicense() { return this._driverLicense; }
  get rentedCars() { return [...this._rentedCars]; }
  get rentalHistory() { return [...this._rentalHistory]; }

  set driverLicense(value) {
    this._driverLicense = value;
  }

  rentCar(car, startDate, endDate) {
    if (this._rentedCars.find(c => c.id === car.id)) {
      throw new Error('Car is already rented by this client');
    }
    
    const rental = {
      carId: car.id,
      startDate,
      endDate,
      status: 'active'
    };
    
    this._rentedCars.push(car);
    this._rentalHistory.push(rental);
    return rental;
  }

  returnCar(car) {
    const rentalIndex = this._rentedCars.findIndex(c => c.id === car.id);
    if (rentalIndex === -1) {
      throw new Error('Car was not rented by this client');
    }
    
    this._rentedCars.splice(rentalIndex, 1);
    const rental = this._rentalHistory.find(r => r.carId === car.id && r.status === 'active');
    if (rental) {
      rental.status = 'completed';
      rental.returnDate = new Date();
    }
  }

  toJSON() {
    return {
      ...super.toJSON(),
      driverLicense: this._driverLicense,
      rentedCars: this._rentedCars,
      rentalHistory: this._rentalHistory
    };
  }
} 