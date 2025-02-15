import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../users/user.entity';
import { Venues } from '../venues/venue.entity';

@Entity()
export class Booking {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.bookingId, { onDelete: 'CASCADE' })
  user: User;

  @ManyToOne(() => Venues, (venue) => venue.bookings, { onDelete: 'CASCADE' })
  venue: Venues;

  @Column({ nullable: true })
  userId: number;

  @Column({ nullable: true })
  venueId: number;

  @Column()
  startTime: Date;

  @Column()
  endTime: Date;
}
