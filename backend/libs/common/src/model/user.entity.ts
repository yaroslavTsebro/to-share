import { BaseEntity } from '../database';

export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
}

export class User extends BaseEntity<User> {
  email: string;
  password: string;
  role: UserRole;
}
