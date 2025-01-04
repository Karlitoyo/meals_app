import { DataSource } from 'typeorm';
import { Booking } from './booking.entity';

export const usersProvider = [
  {
    provide: 'USERS_REPOSITORY',
    useFactory: (connection: DataSource) => connection.getRepository(Booking),
    inject: ['DATABASE_CONNECTION'],
  },
];