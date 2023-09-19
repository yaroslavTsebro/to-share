import User from '../../users/entity/user.entity';
import { TokenDto } from '../entity/dto/create-token.dto';
import Token from '../entity/token.entity';

export const TOKEN_SERVICE = Symbol('ITokenService');

export interface ITokenService {
  create(dto: TokenDto, user: User): Promise<Token>;
  update(dto: TokenDto, userId: number): Promise<Token>;
  delete(userId: number): Promise<void>;
  createOrUpdate(dto: TokenDto, user: User): Promise<Token>;
  getByUserIdAndToken(userId: number, token: string): Promise<Token>;
}
