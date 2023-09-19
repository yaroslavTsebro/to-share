import { IsString, Length } from 'class-validator';

export class ChangeUsernameDto {
  @IsString()
  @Length(2, 50)
  username: string;
}
