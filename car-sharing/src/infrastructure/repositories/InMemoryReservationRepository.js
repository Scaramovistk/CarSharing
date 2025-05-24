import { IReservationRepository } from '../../domain/interfaces/IReservationRepository';

export class InMemoryReservationRepository extends IReservationRepository {
  constructor() {
    super();
    this._reservations = new Map();
  }

  async create(reservation) {
    if (await this.findById(reservation.id)) {
      throw new Error('Reservation with this ID already exists');
    }

    const overlapping = await this.findOverlapping(
      reservation.vehicle.id,
      reservation.startDate,
      reservation.endDate
    );

    if (overlapping.length > 0) {
      throw new Error('Vehicle is already reserved for this period');
    }

    this._reservations.set(reservation.id, reservation);
    return reservation;
  }

  async findById(id) {
    return this._reservations.get(id) || null;
  }

  async update(id, reservationData) {
    const reservation = await this.findById(id);
    if (!reservation) {
      throw new Error('Reservation not found');
    }

    if (reservationData.startDate || reservationData.endDate) {
      const overlapping = await this.findOverlapping(
        reservation.vehicle.id,
        reservationData.startDate || reservation.startDate,
        reservationData.endDate || reservation.endDate
      );

      if (overlapping.length > 0 && !overlapping.every(r => r.id === id)) {
        throw new Error('Vehicle is already reserved for this period');
      }
    }

    Object.assign(reservation, reservationData);
    this._reservations.set(id, reservation);
    return reservation;
  }

  async delete(id) {
    this._reservations.delete(id);
  }

  async list(filters = {}) {
    let reservations = Array.from(this._reservations.values());

    if (filters.status) {
      reservations = reservations.filter(r => r.status === filters.status);
    }

    if (filters.startDate) {
      reservations = reservations.filter(r => r.startDate >= filters.startDate);
    }

    if (filters.endDate) {
      reservations = reservations.filter(r => r.endDate <= filters.endDate);
    }

    return reservations;
  }

  async findByVehicle(vehicleId) {
    return Array.from(this._reservations.values())
      .filter(reservation => reservation.vehicle.id === vehicleId);
  }

  async findByClient(clientId) {
    return Array.from(this._reservations.values())
      .filter(reservation => reservation.client.id === clientId);
  }

  async findOverlapping(vehicleId, startDate, endDate) {
    return Array.from(this._reservations.values())
      .filter(reservation => 
        reservation.vehicle.id === vehicleId &&
        reservation.status !== 'cancelled' &&
        startDate < reservation.endDate &&
        endDate > reservation.startDate
      );
  }

  async updateStatus(id, status) {
    const reservation = await this.findById(id);
    if (!reservation) {
      throw new Error('Reservation not found');
    }

    const validStatuses = ['pending', 'active', 'completed', 'cancelled'];
    if (!validStatuses.includes(status)) {
      throw new Error('Invalid status');
    }

    reservation.status = status;
    this._reservations.set(id, reservation);
    return reservation;
  }
} 