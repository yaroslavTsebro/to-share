import { BaseEntity } from '@app/common';
import { Column, Entity } from 'typeorm';

export enum UserRole {
  ADMIN,
  USER,
}

@Entity()
class User extends BaseEntity {
  @Column({ length: 20 })
  username: string;

  @Column({ length: 60 })
  email: string;

  @Column({ length: 200 })
  password: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.USER,
  })
  role: UserRole;
}

export default User;
