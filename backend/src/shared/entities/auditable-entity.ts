import {
  SystemUser,
  User,
  UserWithIdOrSystemUser,
} from 'src/modules/users/entities/user.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Index,
  IsNull,
  JoinColumn,
  ManyToOne,
  UpdateDateColumn,
} from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { WithAlteredRequired } from '../type-helpers';

export const NOT_DELETED_CONDITION = { deletedAt: IsNull() };
export const NOT_DELETED_CONDITION_SQL = 'deletedAt IS NULL';
export const NOT_DELETED_CONDITION_SQL_QUOTED = '"deletedAt" IS NULL';

export enum AuditableEntityFieldName {
  CreatedAt = 'createdAt',
  CreatedByUserId = 'createdByUserId',
  UpdatedAt = 'updatedAt',
  UpdatedByUserId = 'updatedByUserId',
  DeletedAt = 'deletedAt',
  DeletedByUserId = 'deletedByUserId',
}

export abstract class AuditableEntity extends BaseEntity {
  @CreateDateColumn()
  @Index()
  createdAt: Date;

  /**
   * TODO: [MIGRATION][AUDITING][INTEGRITY] figure out how to suppress this foreign key from audit shadow log
   * entities that inherit from this class. (Do not allow onDelete in inherited classes to
   * CASCADE delete an audit shadow row)
   */
  @ManyToOne(() => User, undefined, { cascade: false, onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'created_by_user_id' })
  createdBy?: User | null;

  @Column({
    name: 'created_by_user_id',
    /**
     * null represents the SystemUser
     */
    nullable: true,
  })
  createdByUserId: number | null;

  @UpdateDateColumn()
  @Index()
  updatedAt: Date;

  /**
   * TODO: [MIGRATION][AUDITING][INTEGRITY] figure out how to suppress this foreign key from audit shadow log
   * entities that inherit from this class. (Do not allow onDelete in inherited classes to
   * CASCADE delete an audit shadow row)
   */
  @ManyToOne(() => User, undefined, { cascade: false, onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'updated_by_user_id' })
  updatedBy?: User | null;

  @Column({ name: 'updated_by_user_id', nullable: true })
  updatedByUserId: number | null;

  @DeleteDateColumn()
  @Index()
  deletedAt: Date | null;

  /**
   * The user who deleted this entity
   *
   * TODO: [MIGRATION][AUDITING][INTEGRITY] figure out how to suppress this foreign key from audit shadow log
   * entities that inherit from this class. (Do not allow onDelete in inherited classes to
   * CASCADE delete an audit shadow row)
   */
  @ManyToOne(() => User, undefined, { cascade: false, onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'deleted_by_user_id' })
  deletedBy?: User | null;

  @Column({ name: 'deleted_by_user_id', nullable: true })
  deletedByUserId: number | null;
}

export type AuditableEntityInsert<
  E extends AuditableEntity,
  // TODO: [TYPE] limit I so that it can only have keys in E
  I extends QueryDeepPartialEntity<E> = QueryDeepPartialEntity<E>,
> = WithAlteredRequired<I, 'createdBy', UserWithIdOrSystemUser>

export type AuditableEntityUpdates<T extends AuditableEntity> =
  WithAlteredRequired<
    QueryDeepPartialEntity<T>,
    'updatedBy',
    | WithAlteredRequired<QueryDeepPartialEntity<User>, 'id', User['id']>
    | SystemUser
>;

export type AuditableEntityDeleteUpdates<T extends AuditableEntity> =
  WithAlteredRequired<
    QueryDeepPartialEntity<T>,
    'deletedBy',
    | WithAlteredRequired<QueryDeepPartialEntity<User>, 'id', User['id']>
    | SystemUser
  >;

export enum AuditableEntityRelationsBasic {
  CREATED_BY = 'createdBy',
  UPDATED_BY = 'updatedBy',
  DELETED_BY = 'deletedBy',
}

type Enum<E> = Record<keyof E, number | string> & Record<number, keyof E>;

// TODO: [TYPE] check that E is an enum
export type AuditableEntityRelations<E> = AuditableEntityRelationsBasic | E;

export function createAuditableEntityRelations<E extends Enum<E>>(enumBasic: E) {
  return {
    ...AuditableEntityRelationsBasic,
    ...enumBasic,
  };
}
