import { Entity, PrimaryGeneratedColumn, Column, Index } from 'typeorm';
import { instanceToPlain, Exclude } from 'class-transformer';
import {
  AuditableEntity,
  AuditableEntityInsert,
  NOT_DELETED_CONDITION_SQL_QUOTED,
} from 'src/shared/entities/auditable-entity';
import {
  InsertDefaults,
  OmitProps,
  PickAltered,
} from 'src/shared/type-helpers';

export type SystemUser = null;
export type UserWithId = Pick<User, 'id'>;
export type UserWithIdOrSystemUser = UserWithId | SystemUser;

export const SYSTEM_USER: SystemUser = null;

export const USERS_TABLE_NAME = 'users';

@Entity()
export class BaseUser extends AuditableEntity {
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

@Entity({ name: USERS_TABLE_NAME })
@Index(['email'], { unique: true, where: NOT_DELETED_CONDITION_SQL_QUOTED })
export class User extends BaseUser {
  @PrimaryGeneratedColumn()
  id: number;

  // @OneToOne(() => RefreshToken, refreshToken => refreshToken.user)
  // refreshToken?: RefreshToken | null;

  // @OneToMany(() => Property, property => property.user)
  // properties?: Property[];
}

export type UserInsert = AuditableEntityInsert<
  User,
  OmitProps<
    InsertDefaults<User, 'emailVerified'>,
    // these are altered below
    'password' | 'email'
  > &
    // password and email must be strings
    PickAltered<User, 'password', string> &
    PickAltered<User, 'email', string>
>;
