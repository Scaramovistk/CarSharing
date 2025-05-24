import { Client } from './Client';
import { Vehicle } from './Vehicle';

export class Reservation {
  constructor(id, client, vehicle, startDate, endDate) {
    if (!(client instanceof Client)) {
      throw new Error('Invalid client instance');
    }
    if (!(vehicle instanceof Vehicle)) {
      throw new Error('Invalid vehicle instance');
    }
    if (startDate >= endDate) {
      throw new Error('End date must be after start date');
    }

    this._id = id;
    this._client = client;
    this._vehicle = vehicle;
    this._startDate = new Date(startDate);
    this._endDate = new Date(endDate);
    this._status = 'pending'; // pending, active, completed, cancelled
    this._totalCost = this._calculateTotalCost();
    this._createdAt = new Date();
    this._updatedAt = new Date();
  }

  get id() { return this._id; }
  get client() { return this._client; }
  get vehicle() { return this._vehicle; }
  get startDate() { return new Date(this._startDate); }
  get endDate() { return new Date(this._endDate); }
  get status() { return this._status; }
  get totalCost() { return this._totalCost; }
  get createdAt() { return new Date(this._createdAt); }
  get updatedAt() { return new Date(this._updatedAt); }

  activate() {
    if (this._status !== 'pending') {
      throw new Error('Reservation can only be activated when pending');
    }
    this._status = 'active';
    this._vehicle.isAvailable = false;
    this._updateTimestamp();
  }

  complete() {
    if (this._status !== 'active') {
      throw new Error('Only active reservations can be completed');
    }
    this._status = 'completed';
    this._vehicle.isAvailable = true;
    this._updateTimestamp();
  }

  cancel() {
    if (this._status === 'completed') {
      throw new Error('Cannot cancel completed reservation');
    }
    this._status = 'cancelled';
    this._vehicle.isAvailable = true;
    this._updateTimestamp();
  }

  getDurationInDays() {
    const diffTime = Math.abs(this._endDate - this._startDate);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }

  isOverlapping(otherReservation) {
    return (
      this._startDate < otherReservation.endDate &&
      this._endDate > otherReservation.startDate
    );
  }

  _calculateTotalCost() {
    const days = this.getDurationInDays();
    return this._vehicle.calculateRentalCost(days);
  }

  _updateTimestamp() {
    this._updatedAt = new Date();
  }

  toJSON() {
    return {
      id: this._id,
      clientId: this._client.id,
      vehicleId: this._vehicle.id,
      startDate: this._startDate,
      endDate: this._endDate,
      status: this._status,
      totalCost: this._totalCost,
      createdAt: this._createdAt,
      updatedAt: this._updatedAt
    };
  }
} 