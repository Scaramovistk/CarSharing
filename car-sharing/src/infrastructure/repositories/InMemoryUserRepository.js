import { IUserRepository } from '../../domain/interfaces/IUserRepository';
import { User } from '../../domain/entities/User';
import { Client } from '../../domain/entities/Client';

export class InMemoryUserRepository extends IUserRepository {
  constructor() {
    super();
    this._users = new Map();
  }

  async create(user) {
    if (await this.findByEmail(user.email)) {
      throw new Error('Email already exists');
    }
    this._users.set(user.id, user);
    return user;
  }

  async findById(id) {
    return this._users.get(id) || null;
  }

  async findByEmail(email) {
    return Array.from(this._users.values())
      .find(user => user.email === email) || null;
  }

  async update(id, userData) {
    const user = await this.findById(id);
    if (!user) {
      throw new Error('User not found');
    }

    if (userData.email && userData.email !== user.email) {
      const existingUser = await this.findByEmail(userData.email);
      if (existingUser) {
        throw new Error('Email already in use');
      }
    }

    user.updateProfile(userData);
    this._users.set(id, user);
    return user;
  }

  async delete(id) {
    this._users.delete(id);
  }

  async list(filters = {}) {
    let users = Array.from(this._users.values());

    if (filters.email) {
      users = users.filter(user => 
        user.email.toLowerCase().includes(filters.email.toLowerCase())
      );
    }

    if (filters.firstName) {
      users = users.filter(user => 
        user.firstName.toLowerCase().includes(filters.firstName.toLowerCase())
      );
    }

    if (filters.type === 'client') {
      users = users.filter(user => user instanceof Client);
    } else if (filters.type === 'user') {
      users = users.filter(user => user instanceof User && !(user instanceof Client));
    }

    return users;
  }
} 