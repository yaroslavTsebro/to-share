import { Test, TestingModule } from '@nestjs/testing';
import { ArticlesRepository } from '../repository/articles.repository';
import { TagRepository } from '../tags/repository/tag.repository';
import { ArticlesService } from './articles.service';
import { getModelToken } from '@nestjs/mongoose';
import { ArticleDocument } from '../entity/schema/article.schema';
import { TagDocument } from '../tags/entity/schema/tag.schema';
import { PaginationArticleDto } from '../entity/dto/pagination-article.dto';
import { ResponseArticleDto } from '../entity/dto/response-article.dto';
import { NotFoundException } from '@nestjs/common';
import { ObjectId } from 'mongodb';

describe('ArticlesService', () => {
  let articlesService: ArticlesService;
  let articlesRepository: ArticlesRepository;
  let tagRepository: TagRepository;

  const mockArticleModel = {
    findById: jest.fn(),
    find: jest.fn(),
    findOneAndUpdate: jest.fn(),
    create: jest.fn(),
    findOneAndDelete: jest.fn(),
    countDocuments: jest.fn(),
  };

  const mockTagModel = {
    find: jest.fn(),
    findOneAndUpdate: jest.fn(),
    create: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ArticlesService,
        ArticlesRepository,
        TagRepository,
        {
          provide: getModelToken(ArticleDocument.name),
          useValue: mockArticleModel,
        },
        {
          provide: getModelToken(TagDocument.name),
          useValue: mockTagModel,
        },
      ],
    }).compile();

    articlesService = module.get<ArticlesService>(ArticlesService);
    articlesRepository = module.get<ArticlesRepository>(ArticlesRepository);
    tagRepository = module.get<TagRepository>(TagRepository);
  });

  describe('getById', () => {
    it('should return an article by ID', async () => {
      const articleId = '123fefrwa-32fs';
      const mockArticle: ArticleDocument = {
        _id: new ObjectId(articleId),
        creatorId: 1,
        title: 'Example Article',
        description: 'Description',
        titleImageIds: [],
        usersWhichLikedIds: [],
        content: 'Content',
        likesAmount: 0,
        commentsAmount: 0,
        tags: [],
      };

      mockArticleModel.findById.mockReturnValueOnce(mockArticle);

      const result: ResponseArticleDto =
        await articlesService.getById(articleId);

      expect(result).toEqual(expect.objectContaining(mockArticle));
      expect(mockArticleModel.findById).toHaveBeenCalledWith(articleId);
    });

    it('should throw NotFoundException if article is not found', async () => {
      const nonExistentArticleId = 'non-existent-id';
      mockArticleModel.findById.mockReturnValueOnce(null);

      await expect(
        articlesService.getById(nonExistentArticleId),
      ).rejects.toThrow(NotFoundException);
      expect(mockArticleModel.findById).toHaveBeenCalledWith(
        nonExistentArticleId,
      );
    });
  });

  describe('getByPagination', () => {
    it('should return paginated articles without query, tags, and sort', async () => {
      const page = 1;
      const perPage = 10;

      const mockArticles: ArticleDocument[] = [];
      const mockCount = 2;

      mockArticleModel.find.mockReturnValueOnce(mockArticles);
      mockArticleModel.countDocuments.mockReturnValueOnce(mockCount);

      const result: PaginationArticleDto =
        await articlesService.getByPagination(page, perPage);

      expect(result).toBeInstanceOf(PaginationArticleDto);
      expect(result.entities).toEqual(mockArticles);
      expect(result.count).toEqual(mockCount);
      expect(mockArticleModel.find).toHaveBeenCalledWith(
        {},
        { limit: perPage, skip: 0, sort: {} },
      );
    });
  });
});
