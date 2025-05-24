export class User {
  constructor(id, firstName, lastName, email, phoneNumber) {
    this._id = id;
    this._firstName = firstName;
    this._lastName = lastName;
    this._email = email;
    this._phoneNumber = phoneNumber;
    this._createdAt = new Date();
    this._updatedAt = new Date();
  }

  get id() { return this._id; }
  get firstName() { return this._firstName; }
  get lastName() { return this._lastName; }
  get email() { return this._email; }
  get phoneNumber() { return this._phoneNumber; }
  get createdAt() { return this._createdAt; }
  get updatedAt() { return this._updatedAt; }

  set firstName(value) {
    this._firstName = value;
    this._updatedAt = new Date();
  }

  set lastName(value) {
    this._lastName = value;
    this._updatedAt = new Date();
  }

  set email(value) {
    this._email = value;
    this._updatedAt = new Date();
  }

  set phoneNumber(value) {
    this._phoneNumber = value;
    this._updatedAt = new Date();
  }

  getFullName() {
    return `${this._firstName} ${this._lastName}`;
  }

  updateProfile(updates) {
    if (updates.firstName) this.firstName = updates.firstName;
    if (updates.lastName) this.lastName = updates.lastName;
    if (updates.email) this.email = updates.email;
    if (updates.phoneNumber) this.phoneNumber = updates.phoneNumber;
  }

  toJSON() {
    return {
      id: this._id,
      firstName: this._firstName,
      lastName: this._lastName,
      email: this._email,
      phoneNumber: this._phoneNumber,
      createdAt: this._createdAt,
      updatedAt: this._updatedAt
    };
  }
} 