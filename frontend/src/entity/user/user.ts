import Token from "./token/token";

export enum UserRole {
  ADMIN = "admin",
  USER = "user",
}

export class User {
  id: number;
  username: string;
  email: string;
  password: string;
  role: UserRole;
  token: Token;
  createdAt: Date;
  updatedAt: Date;
}
