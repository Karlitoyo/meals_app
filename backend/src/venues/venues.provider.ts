import { DataSource } from 'typeorm';
import { Venues } from './venue.entity';

export const usersProvider = [
  {
    provide: 'USERS_REPOSITORY',
    useFactory: (connection: DataSource) => connection.getRepository(Venues),
    inject: ['DATABASE_CONNECTION'],
  },
];