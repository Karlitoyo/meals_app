import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Venues } from '../venues/venue.entity';

@Entity()
export class Availability {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Venues, (venue) => venue.id)
  @JoinColumn({ name: 'venueId' })
  venue: Venues;

  @Column({ type: 'timestamp', nullable: true })
  startTime: Date | null;

  @Column({ type: 'timestamp', nullable: true })
  endTime: Date | null;

  @Column({ default: true })
  isAvailable: boolean;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
