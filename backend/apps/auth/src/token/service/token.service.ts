import {
  Inject,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { ITokenService } from './token-service.interface';
import { TokenDto } from '../entity/dto/create-token.dto';
import Token from '../entity/token.entity';
import { TokenRepository } from '../repository/token.repository';
import User from '../../users/entity/user.entity';

@Injectable()
export class TokenService implements ITokenService {
  constructor(
    @Inject(TokenRepository) private readonly tokenRepository: TokenRepository,
  ) {}
  async delete(id: number): Promise<void> {
    await this.tokenRepository.findOneAndDelete({ id });
  }

  async create(dto: TokenDto, user: User): Promise<Token> {
    const token = new Token({ ...dto });
    token.user = user;
    return await this.tokenRepository.create(token);
  }

  async update(dto: TokenDto, userId: number): Promise<Token> {
    return await this.tokenRepository.findOneAndUpdate(
      { user: { id: userId } },
      { token: dto.token },
    );
  }
  async createOrUpdate(dto: TokenDto, user: User): Promise<Token> {
    const token = await this.tokenRepository.findOne({
      user: { id: dto.userId },
    });
    if (token) {
      return await this.update(dto, user.id);
    } else {
      return await this.create(dto, user);
    }
  }

  private async validateCreateTokenDto(tokenDto: TokenDto) {
    try {
      await this.tokenRepository.findOneOrThrow({
        user: { id: tokenDto.userId },
      });
    } catch (err) {
      return;
    }
    throw new UnprocessableEntityException('Email or username already exists.');
  }
}
