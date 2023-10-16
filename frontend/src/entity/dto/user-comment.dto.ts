import { UserRole } from "../user/user";

export class UserCommentDto {
  id: number;
  email: string;
  role: UserRole;
  createdAt: Date;
  avatar: File;
}
