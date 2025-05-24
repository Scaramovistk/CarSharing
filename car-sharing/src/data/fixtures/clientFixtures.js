import { ClientFactory } from '../../domain/factories/ClientFactory';

export const clientFixtures = [
  {
    id: '1',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phoneNumber: '+1234567890',
    driverLicense: 'DL123456789'
  },
  {
    id: '2',
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'jane.smith@example.com',
    phoneNumber: '+1987654321',
    driverLicense: 'DL987654321'
  },
  {
    id: '3',
    firstName: 'Michael',
    lastName: 'Johnson',
    email: 'michael.j@example.com',
    phoneNumber: '+1122334455',
    driverLicense: 'DL112233445'
  },
  {
    id: '4',
    firstName: 'Sarah',
    lastName: 'Williams',
    email: 'sarah.w@example.com',
    phoneNumber: '+1555666777',
    driverLicense: 'DL555666777'
  }
];

export const createClientInstances = () => {
  return clientFixtures.map(clientData => ClientFactory.createClient(clientData));
}; 