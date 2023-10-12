import { User, UserRole } from '../user.entity';
import { File } from '../file.entity';

export class UserCommentDto {
  id: number;
  email: string;
  role: UserRole;
  createdAt: Date;
  avatar: File;

  static mapUserToDto(user: User): UserCommentDto {
    const result = new UserCommentDto();
    result.id = user.id;
    result.email = user.email;
    result.role = user.role;
    result.createdAt = user.createdAt;
    return result;
  }

  static mapUsersToDtos(users: User[]): UserCommentDto[] {
    return users.map((user) => this.mapUserToDto(user));
  }
}
