import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

import { Booking } from '../bookings/booking.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ default: false })
  isActive: boolean;

  @Column({ default: true })
  isUser: boolean;

  @Column({ nullable: true })
  imageUrl: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ nullable: true })
  phone: string;

  @OneToMany(() => Booking, (booking) => booking.user)
  bookings: Booking[];
}
