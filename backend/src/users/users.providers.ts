import { DataSource } from 'typeorm';
import { User } from './user.entity';

export const usersProvider = [
  {
    provide: 'USERS_REPOSITORY',
    useFactory: (connection: DataSource) => connection.getRepository(User),
    inject: ['DATABASE_CONNECTION'],
  },
];