import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

import { User } from '../users/user.entity';

import { Venues } from '../venues/venue.entity';

@Entity()
export class Booking {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.bookings, { onDelete: 'CASCADE' })
  user: User;

  @ManyToOne(() => Venues, (venue) => venue.bookings, { onDelete: 'CASCADE' })
  venue: Venues;

  @Column()
  startTime: Date;

  @Column()
  endTime: Date;
}
