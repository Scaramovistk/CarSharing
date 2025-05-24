export class Vehicle {
  constructor(id, brand, model, year, licensePlate, type) {
    if (new.target === Vehicle) {
      throw new Error('Vehicle class cannot be instantiated directly');
    }
    if (!type) {
      throw new Error('Vehicle type must be provided');
    }

    this._id = id;
    this._brand = brand;
    this._model = model;
    this._year = year;
    this._licensePlate = licensePlate;
    this._type = type;
    this._isAvailable = true;
    this._currentLocation = null;
    this._maintenanceHistory = [];
  }

  get id() { return this._id; }
  get brand() { return this._brand; }
  get model() { return this._model; }
  get year() { return this._year; }
  get licensePlate() { return this._licensePlate; }
  get isAvailable() { return this._isAvailable; }
  get currentLocation() { return this._currentLocation; }
  get maintenanceHistory() { return [...this._maintenanceHistory]; }
  get type() { return this._type; }

  set isAvailable(value) {
    this._isAvailable = Boolean(value);
  }

  set currentLocation(location) {
    this._currentLocation = location;
  }

  getFullName() {
    return `${this._brand} ${this._model} (${this._year})`;
  }

  addMaintenanceRecord(record) {
    this._maintenanceHistory.push({
      ...record,
      date: new Date(),
    });
  }

  updateLocation(latitude, longitude) {
    this._currentLocation = { latitude, longitude };
  }

  toJSON() {
    return {
      id: this._id,
      type: this._type,
      brand: this._brand,
      model: this._model,
      year: this._year,
      licensePlate: this._licensePlate,
      isAvailable: this._isAvailable,
      currentLocation: this._currentLocation,
      maintenanceHistory: this._maintenanceHistory
    };
  }
} 