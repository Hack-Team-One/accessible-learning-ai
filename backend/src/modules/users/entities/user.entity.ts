import { Entity, PrimaryGeneratedColumn, Column, Index } from 'typeorm';
import { instanceToPlain, Exclude } from 'class-transformer';

export type SystemUser = null;
export type UserWithId = Pick<User, 'id'>;
export type UserWithIdOrSystemUser = UserWithId | SystemUser;

export const SYSTEM_USER: SystemUser = null;

export const USERS_TABLE_NAME = 'users';

@Entity()
export class User {
  // Only email & password are required fields

  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 100,
  })
  email: string;

  @Exclude()
  @Column({
    type: 'varchar',
    length: 100,
  })
  password: string;

  @Column({
    type: 'varchar',
    length: 100,
    nullable: true,
  })
  @Index()
  firstName: string | null;

  @Column({
    type: 'varchar',
    length: 100,
    nullable: true,
  })
  @Index()
  lastName: string | null;

  @Exclude()
  @Column({
    type: 'varchar',
    length: 50,
    nullable: true,
  })
  @Index()
  emailVerificationCode: string | null;

  @Column({ nullable: false, default: false })
  emailVerified: boolean;

  toJSON() {
    return instanceToPlain(this);
  }
}
