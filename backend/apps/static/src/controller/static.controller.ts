import {
  GET_ARTICLE_TITLES,
  GET_AVATAR,
  SAVE_ARTICLE_TITLE,
  SAVE_AVATAR,
  STATIC_SERVICE,
} from '@app/common';
import { File } from '../entity/file.entity';
import { Controller, Inject } from '@nestjs/common';
import { IStaticService } from '../service/static-service.interface';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateArticleFileDto } from '../entity/dto/create-file.dto';
import { CreateAvatarFileDto } from '../entity/dto/create-avatar-file.dto';

@Controller()
export class StaticController {
  constructor(
    @Inject(STATIC_SERVICE) private readonly staticService: IStaticService,
  ) {}

  @MessagePattern(SAVE_ARTICLE_TITLE)
  async createArticleFiles(
    @Payload() dto: CreateArticleFileDto,
  ): Promise<string[]> {
    return await this.staticService.createArticleFiles(dto);
  }

  @MessagePattern(SAVE_AVATAR)
  async createAvatarFile(@Payload() dto: CreateAvatarFileDto): Promise<string> {
    return await this.staticService.createAvatarFile(dto);
  }

  @MessagePattern(GET_AVATAR)
  async getAvatarFile(@Payload() id: number): Promise<File> {
    return await this.staticService.getAvatarFile(id);
  }

  @MessagePattern(GET_ARTICLE_TITLES)
  async getArticleFiles(@Payload() id: string): Promise<File[]> {
    return await this.staticService.getArticleFiles(id);
  }
}
