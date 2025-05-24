export class IReservationRepository {
  async create(reservation) { throw new Error('Method not implemented'); }
  async findById(id) { throw new Error('Method not implemented'); }
  async update(id, reservationData) { throw new Error('Method not implemented'); }
  async delete(id) { throw new Error('Method not implemented'); }
  async list(filters) { throw new Error('Method not implemented'); }
  async findByVehicle(vehicleId) { throw new Error('Method not implemented'); }
  async findByClient(clientId) { throw new Error('Method not implemented'); }
  async findOverlapping(vehicleId, startDate, endDate) { throw new Error('Method not implemented'); }
  async updateStatus(id, status) { throw new Error('Method not implemented'); }
} 