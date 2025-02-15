import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Availability } from '../availability/availability.entity'; // Adjust the path if needed
import { Booking } from '../bookings/booking.entity';

@Entity()
export class Venues {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  firstName?: string;

  @Column({ nullable: true })
  lastName?: string;

  @Column({ unique: true, nullable: true })
  email?: string;

  @Column({ nullable: true })
  password?: string;

  @Column({ nullable: true })
  address?: string;

  @Column({ nullable: true })
  city?: string;

  @Column({ nullable: true })
  state?: string;

  @Column({ nullable: true })
  zip?: string;

  @Column({ nullable: true })
  country?: string;

  @Column({ nullable: true })
  phone?: string;

  @Column({ nullable: true, default: 'Untitled Venue' })
  title?: string;

  @Column({ nullable: true })
  description?: string;

  @Column({ nullable: true })
  imageUrl?: string;

  @Column({ nullable: true })
  capacity?: number;

  @Column({ nullable: true })
  price?: number;

  @Column({ default: false })
  isActive?: boolean;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ default: true })
  isVenue?: boolean;

  // Add the relationship to Availability
  @OneToMany(() => Availability, (availability) => availability.venue, {
    nullable: true,
  })
  availabilities: Availability[]; // One venue can have multiple availabilities

  @OneToMany(() => Booking, (booking) => booking.venue)
  bookings: Booking[];
}
