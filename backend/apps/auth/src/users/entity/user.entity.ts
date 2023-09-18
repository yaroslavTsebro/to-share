import { BaseEntity } from '@app/common';
import { Column, Entity, JoinColumn } from 'typeorm';
import Token from '../../token/entity/token.entity';

export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
}

@Entity()
class User extends BaseEntity<User> {
  @Column({ length: 20, unique: true })
  username: string;

  @Column({ length: 60, unique: true })
  email: string;

  @Column({ length: 200, select: false })
  password: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.USER.toString(),
  })
  role: UserRole;

  @JoinColumn()
  token: Token;
}

export default User;
