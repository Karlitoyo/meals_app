import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { User } from '../users/user.entity'; // Import the user entity (assuming you have it)

@Entity()
export class Venues {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => User)
  @JoinColumn()
  user: User; // Link to the user table via a foreign key

  @Column({ type: 'varchar', length: 255 })
  specialty: string;

  @Column({ type: 'jsonb', nullable: true })
  availability: any;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
