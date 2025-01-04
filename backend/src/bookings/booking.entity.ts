import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';

import { User } from '../users/user.entity';

import { Venues } from '../venues/venue.entity';

@Entity()

export class Booking {

  @PrimaryGeneratedColumn()
  id: number;
  
  @ManyToOne(() => User, user => user.id)
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToOne(() => Venues, venue => venue.id)
  @JoinColumn({ name: 'venueId' })
  venue: Venues;

  @Column({ type: 'timestamp' })
  startTime: Date;

  @Column({ type: 'timestamp' })
  endTime: Date;

  @Column({ default: 'pending' })
  status: string; // e.g., 'pending', 'confirmed', 'cancelled'

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

}