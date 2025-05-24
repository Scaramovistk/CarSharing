import { Client } from '../entities/Client';

export class ClientFactory {
  static createClient(data) {
    this.validateClientData(data);
    
    const id = data.id || Date.now().toString();
    return new Client(
      id,
      data.firstName,
      data.lastName,
      data.email,
      data.phoneNumber,
      data.driverLicense
    );
  }

  static validateClientData(data) {
    const requiredFields = ['firstName', 'lastName', 'email', 'phoneNumber', 'driverLicense'];
    const missingFields = requiredFields.filter(field => !data[field]);
    
    if (missingFields.length > 0) {
      throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
    }

    if (!this._isValidEmail(data.email)) {
      throw new Error('Invalid email format');
    }

    if (!this._isValidPhoneNumber(data.phoneNumber)) {
      throw new Error('Invalid phone number format');
    }

    if (data.driverLicense.length < 5) {
      throw new Error('Invalid driver license format');
    }

    return true;
  }

  static _isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  static _isValidPhoneNumber(phone) {
    return /^\+?[\d\s-]{8,}$/.test(phone);
  }
} 