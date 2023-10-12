import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { ICommentsService } from './comments-service.interface';
import {
  ARTICLES_SERVICE,
  IS_ARTICLE_PRESENT,
  STATIC_SERVICE,
  User,
  File,
  GET_AVATARS_BY_USER_IDS,
  UserCommentDto,
  GET_USERS_BY_IDS_FOR_COMMENT,
} from '@app/common';
import { CreateCommentDto } from '../entity/dto/create-comment.dto';
import { UpdateCommentDto } from '../entity/dto/update-comment.dto';
import { ClientProxy } from '@nestjs/microservices';
import { CommentRepository } from '../repository/comment.repository';
import { ResponseCommentDto } from '../entity/dto/response-comment.dto';
import { PaginationCommentDto } from '../entity/dto/pagination-comment.dto';

@Injectable()
export class CommentsService implements ICommentsService {
  constructor(
    private readonly commentsRepository: CommentRepository,
    @Inject(ARTICLES_SERVICE) private readonly articlesService: ClientProxy,
    @Inject(STATIC_SERVICE) private readonly staticl: ClientProxy,
  ) {}

  async delete(id: number, user: User) {
    return await this.commentsRepository.deleteCommentById(id, user.id);
  }

  async getComments(articleId: string, page: number, perPage: number) {
    const comments =
      await this.commentsRepository.getCommentsPaginationWithoutRepliesByArticleId(
        page,
        perPage,
        articleId,
      );
    // const userIds = Array.from(
    //   new Set(comments.map((comment) => comment.userId)),
    // );
    const userIds = comments.map((comment) => comment.userId);
    const count = await this.commentsRepository.getCount(articleId);

    const avatars = await this.articlesService
      .send<File[]>(GET_AVATARS_BY_USER_IDS, userIds)
      .toPromise();

    const users = await this.articlesService
      .send<UserCommentDto[]>(GET_USERS_BY_IDS_FOR_COMMENT, userIds)
      .toPromise();

    const avatarMap: { [key: number]: File } = {};
    avatars.forEach((avatar: File) => {
      avatarMap[avatar.userId] = avatar;
    });

    const usersWithAvatars: UserCommentDto[] = users.map(
      (user: UserCommentDto) => {
        const avatar: File = avatarMap[user.id];
        if (avatar) {
          user.avatar = avatar;
        }
        return user;
      },
    );

    const userMap: { [key: number]: UserCommentDto } = {};
    usersWithAvatars.forEach((user: UserCommentDto) => {
      userMap[user.id] = user;
    });

    const commentsWithUser: ResponseCommentDto[] = [];

    for (let i = 0; i < comments.length; i++) {
      const comment = comments[i];
      const user: UserCommentDto = userMap[comment.userId];
      if (user) {
        const resp = ResponseCommentDto.mapDataToDto(comments[i], user);
        commentsWithUser.push(resp);
      }
    }

    return new PaginationCommentDto(commentsWithUser, count, page, perPage);
  }

  async getReplies(id: number, page: number, perPage: number) {
    const comments = await this.commentsRepository.getRepliesPaginationByRootId(
      id,
      page,
      perPage,
    );
    const userIds = Array.from(
      new Set(comments.map((comment) => comment.userId)),
    );
    const count = (await this.commentsRepository.findOne({ id: id }))
      .numberOfReplies;

    const avatars = await this.articlesService
      .send<File[]>(GET_AVATARS_BY_USER_IDS, userIds)
      .toPromise();

    const users = await this.articlesService
      .send<UserCommentDto[]>(GET_USERS_BY_IDS_FOR_COMMENT, userIds)
      .toPromise();

    const avatarMap: { [key: number]: File } = {};
    avatars.forEach((avatar: File) => {
      avatarMap[avatar.userId] = avatar;
    });

    const usersWithAvatars: UserCommentDto[] = users.map(
      (user: UserCommentDto) => {
        const avatar: File = avatarMap[user.id];
        if (avatar) {
          user.avatar = avatar;
        }
        return user;
      },
    );

    const userMap: { [key: number]: UserCommentDto } = {};
    usersWithAvatars.forEach((user: UserCommentDto) => {
      userMap[user.id] = user;
    });

    const commentsWithUser: ResponseCommentDto[] = [];

    for (let i = 0; i < comments.length; i++) {
      const comment = comments[i];
      const user: UserCommentDto = userMap[comment.userId];
      if (user) {
        const resp = ResponseCommentDto.mapDataToDto(comments[i], user);
        commentsWithUser.push(resp);
      }
    }

    return new PaginationCommentDto(commentsWithUser, count, page, perPage);
  }

  async updateById(id: number, user: User, dto: UpdateCommentDto) {
    return await this.commentsRepository.updateComment(user.id, id, dto.text);
  }

  async create(articleId: string, user: User, dto: CreateCommentDto) {
    const isArticlePresent = await this.articlesService
      .send<boolean>(IS_ARTICLE_PRESENT, articleId)
      .toPromise();

    if (!isArticlePresent) {
      throw new BadRequestException('Article not found');
    }

    if (!dto.rootId && !dto.parentId) {
      return await this.commentsRepository.createRootComment(
        articleId,
        user.id,
        dto.text,
      );
    } else if (dto.rootId && dto.parentId) {
      return await this.commentsRepository.createReply(
        articleId,
        user.id,
        dto.text,
        dto.rootId,
        dto.parentId,
      );
    } else {
      throw new BadRequestException('Bad data');
    }
  }
}
