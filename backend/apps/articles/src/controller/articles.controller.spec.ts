import { Test, TestingModule } from '@nestjs/testing';
import { ArticlesController } from './articles.controller';
import { ArticlesService } from '../service/articles.service';

describe('ArticlesController', () => {
  let articlesController: ArticlesController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ArticlesController],
      providers: [ArticlesService],
    }).compile();

    articlesController = app.get<ArticlesController>(ArticlesController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(articlesController.getHello()).toBe('Hello World!');
    });
  });
});
