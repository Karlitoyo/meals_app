import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  firstName?: string;

  @Column()
  lastName?: string;

  @Column({ unique: true })
  email?: string;

  @Column()
  password?: string;

  @Column({ default: false })
  isActive?: boolean;

  @Column({ default: true })
  isUser?: boolean;

  @Column({ nullable: true })
  imageUrl?: string;
}