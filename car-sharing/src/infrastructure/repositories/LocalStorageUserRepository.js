import { IUserRepository } from '../../domain/interfaces/IUserRepository';
import { User } from '../../domain/entities/User';
import { Client } from '../../domain/entities/Client';

export class LocalStorageUserRepository extends IUserRepository {
  constructor() {
    super();
    this.STORAGE_KEY = 'car_sharing_users';
  }

  async create(user) {
    const users = this._getAllUsers();
    users.push(user.toJSON());
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(users));
    return user;
  }

  async findById(id) {
    const users = this._getAllUsers();
    const userData = users.find(u => u.id === id);
    if (!userData) return null;
    return this._hydrateUser(userData);
  }

  async findByEmail(email) {
    const users = this._getAllUsers();
    const userData = users.find(u => u.email === email);
    if (!userData) return null;
    return this._hydrateUser(userData);
  }

  async update(id, userData) {
    const users = this._getAllUsers();
    const index = users.findIndex(u => u.id === id);
    if (index === -1) throw new Error('User not found');
    
    users[index] = { ...users[index], ...userData };
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(users));
    return this._hydrateUser(users[index]);
  }

  async delete(id) {
    const users = this._getAllUsers();
    const filteredUsers = users.filter(u => u.id !== id);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(filteredUsers));
  }

  async list(filters = {}) {
    let users = this._getAllUsers();
    
    if (filters.email) {
      users = users.filter(u => u.email.includes(filters.email));
    }
    if (filters.firstName) {
      users = users.filter(u => u.firstName.includes(filters.firstName));
    }
    
    return users.map(u => this._hydrateUser(u));
  }

  _getAllUsers() {
    const data = localStorage.getItem(this.STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  }

  _hydrateUser(userData) {
    if (userData.driverLicense) {
      return new Client(
        userData.id,
        userData.firstName,
        userData.lastName,
        userData.email,
        userData.phoneNumber,
        userData.driverLicense
      );
    }

    return new User(
      userData.id,
      userData.firstName,
      userData.lastName,
      userData.email,
      userData.phoneNumber
    );
  }
} 