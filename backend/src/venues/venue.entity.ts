import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Venues {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName?: string;

  @Column()
  lastName?: string;

  @Column({ unique: true })
  email?: string;

  @Column()
  password?: string;

  @Column()
  address?: string;

  @Column()
  city?: string;

  @Column()
  state?: string;

  @Column()
  zip?: string;

  @Column()
  country?: string;

  @Column()
  phone?: string;

  @Column({ default: false })
  isActive?: boolean;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ default: true })
  isVenue?: boolean;
}
