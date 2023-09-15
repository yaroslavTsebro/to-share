import { IsEmail, IsString, IsStrongPassword, Length } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @Length(2, 50)
  username: string;

  @Length(2, 60)
  @IsEmail()
  email: string;

  @IsStrongPassword()
  password: string;
}
