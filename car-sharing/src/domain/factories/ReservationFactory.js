import { Reservation } from '../entities/Reservation';
import { Client } from '../entities/Client';
import { Vehicle } from '../entities/Vehicle';

export class ReservationFactory {
  static createReservation(data) {
    this.validateReservationData(data);

    const id = data.id || Date.now().toString();
    return new Reservation(
      id,
      data.client,
      data.vehicle,
      new Date(data.startDate),
      new Date(data.endDate)
    );
  }

  static validateReservationData(data) {
    if (!(data.client instanceof Client)) {
      throw new Error('Invalid client instance');
    }

    if (!(data.vehicle instanceof Vehicle)) {
      throw new Error('Invalid vehicle instance');
    }

    if (!data.startDate || !data.endDate) {
      throw new Error('Start date and end date are required');
    }

    const startDate = new Date(data.startDate);
    const endDate = new Date(data.endDate);

    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
      throw new Error('Invalid date format');
    }

    if (startDate >= endDate) {
      throw new Error('End date must be after start date');
    }

    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    
    if (startDate < currentDate) {
      throw new Error('Start date cannot be in the past');
    }

    const maxRentalDays = 30;
    const rentalDays = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
    if (rentalDays > maxRentalDays) {
      throw new Error(`Rental duration cannot exceed ${maxRentalDays} days`);
    }

    return true;
  }

  static calculateTotalCost(vehicle, startDate, endDate) {
    const days = Math.ceil((new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24));
    return vehicle.calculateRentalCost(days);
  }
} 