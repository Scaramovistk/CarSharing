import { ReservationFactory } from '../../domain/factories/ReservationFactory';
import { clientApi } from './clientApi';
import { vehicleApi } from './vehicleApi';

let reservations = [];

export const reservationApi = {
  async createReservation(reservationData) {
    try {
      const client = await clientApi.getClientById(reservationData.clientId);
      const vehicle = await vehicleApi.getVehicleById(reservationData.vehicleId);

      if (!vehicle.isAvailable) {
        throw new Error('Vehicle is not available');
      }

      const overlapping = await this.findOverlappingReservations(
        vehicle.id,
        new Date(reservationData.startDate),
        new Date(reservationData.endDate)
      );

      if (overlapping.length > 0) {
        throw new Error('Vehicle is already reserved for this period');
      }

      const reservation = ReservationFactory.createReservation({
        client,
        vehicle,
        startDate: reservationData.startDate,
        endDate: reservationData.endDate
      });

      reservations.push(reservation);
      return reservation;
    } catch (error) {
      throw new Error(`Failed to create reservation: ${error.message}`);
    }
  },

  async getAllReservations() {
    return reservations;
  },

  async getReservationById(id) {
    const reservation = reservations.find(r => r.id === id);
    if (!reservation) {
      throw new Error('Reservation not found');
    }
    return reservation;
  },

  async updateReservation(id, reservationData) {
    const index = reservations.findIndex(r => r.id === id);
    if (index === -1) {
      throw new Error('Reservation not found');
    }

    const client = await clientApi.getClientById(reservationData.clientId);
    const vehicle = await vehicleApi.getVehicleById(reservationData.vehicleId);

    const overlapping = await this.findOverlappingReservations(
      vehicle.id,
      new Date(reservationData.startDate),
      new Date(reservationData.endDate),
      id
    );

    if (overlapping.length > 0) {
      throw new Error('Vehicle is already reserved for this period');
    }

    reservationData.id = id;
    const updatedReservation = ReservationFactory.createReservation({
      client,
      vehicle,
      startDate: reservationData.startDate,
      endDate: reservationData.endDate
    });

    reservations[index] = updatedReservation;
    return updatedReservation;
  },

  async deleteReservation(id) {
    const index = reservations.findIndex(r => r.id === id);
    if (index === -1) {
      throw new Error('Reservation not found');
    }
    reservations = reservations.filter(r => r.id !== id);
    return true;
  },

  async findOverlappingReservations(vehicleId, startDate, endDate, excludeId = null) {
    return reservations.filter(r => {
      if (excludeId && r.id === excludeId) return false;
      if (r.vehicle.id !== vehicleId) return false;

      const reservationStart = new Date(r.startDate);
      const reservationEnd = new Date(r.endDate);

      return (
        (startDate >= reservationStart && startDate < reservationEnd) ||
        (endDate > reservationStart && endDate <= reservationEnd) ||
        (startDate <= reservationStart && endDate >= reservationEnd)
      );
    });
  },

  async getReservationsByClient(clientId) {
    return reservations.filter(r => r.client.id === clientId);
  },

  async getReservationsByVehicle(vehicleId) {
    return reservations.filter(r => r.vehicle.id === vehicleId);
  }
};