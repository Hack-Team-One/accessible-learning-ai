import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string; // Consider storing hashed passwords only

  @Column()
  firstName: string;

  @Column()
  lastName: string;
}
