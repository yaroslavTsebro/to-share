import {
  DELETE_ARTICLE_TITLES,
  GET_ARTICLES_TITLES,
  GET_ARTICLE_TITLES,
  GET_AVATAR,
  GET_AVATARS_BY_USER_IDS,
  SAVE_ARTICLE_TITLE,
  SAVE_AVATAR,
  STATIC_SERVICE,
  UPDATE_ARTICLE_TITLES,
  UpdateArticleFilesResponseDto,
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
  ): Promise<File[]> {
    return await this.staticService.createArticleFiles(dto);
  }

  @MessagePattern(SAVE_AVATAR)
  async createAvatarFile(@Payload() dto: CreateAvatarFileDto): Promise<File> {
    return await this.staticService.createAvatarFile(dto);
  }

  @MessagePattern(GET_AVATARS_BY_USER_IDS)
  async getAvatarsByUserIds(@Payload() ids: number[]): Promise<File[]> {
    return await this.staticService.getAvatarsByIds(ids);
  }

  @MessagePattern(GET_AVATAR)
  async getAvatarFile(@Payload() id: number): Promise<File> {
    return await this.staticService.getAvatarFile(id);
  }

  @MessagePattern(GET_ARTICLE_TITLES)
  async getArticleFiles(@Payload() id: string): Promise<File[]> {
    return await this.staticService.getArticleFiles(id);
  }

  @MessagePattern(GET_ARTICLES_TITLES)
  async getArticlesFiles(@Payload() ids: string[]): Promise<File[][]> {
    return await this.staticService.getArticlesFiles(ids);
  }

  @MessagePattern(DELETE_ARTICLE_TITLES)
  async deleteArticleFiles(@Payload() id: string): Promise<number> {
    return await this.staticService.deleteArticleFiles(id);
  }

  @MessagePattern(UPDATE_ARTICLE_TITLES)
  async updateArticleFiles(
    @Payload() articleId: string,
    @Payload() idsToDelete?: number[],
    @Payload() dto?: CreateArticleFileDto,
  ): Promise<UpdateArticleFilesResponseDto> {
    return await this.staticService.updateArticleFiles(
      articleId,
      idsToDelete,
      dto,
    );
  }
}
