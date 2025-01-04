import { DataSource } from 'typeorm';
import { Availability } from './availability.entity';

export const usersProvider = [
  {
    provide: 'USERS_REPOSITORY',
    useFactory: (connection: DataSource) => connection.getRepository(Availability),
    inject: ['DATABASE_CONNECTION'],
  },
];