import { Test, TestingModule } from '@nestjs/testing';
import { ArticleController } from './articles.controller';
import { ArticleService } from '../services/articles.service';
import { JsonService } from '../services/json.service';

/**
 * Class & test inputs for mocking JsonService
 */
class MockJsonService {
    getAllArticles = jest.fn().mockResolvedValue([
        { id: 1, title: "One", summary: "sum1", author: "John", pubdate: "05-06-2025" },
        { id: 2, title: "", summary: "", author: "Jane", pubdate: "05-06-2025" }
    ]);

    getArticleByID = jest.fn().mockResolvedValue({
        title: "One", summary: "sum1", author: "John", pubdate: "05-06-2025"
    })
}

describe('ArticleController', () => {
    let appController: ArticleController;

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
            controllers: [ArticleController],
            providers: [
                ArticleService,
                { provide: JsonService, useClass: MockJsonService }
            ],
        }).compile();

        appController = app.get<ArticleController>(ArticleController);
    }); 

    it('should be defined', () => {
        expect(ArticleController).toBeDefined();
    });

    describe('getArticles()', () => {
        it('should return all articles, or an empty list', async () => {
            const articles = await appController.getArticles();
            expect(Array.isArray(articles)).toBe(true);
        });
    });

    describe('getArticleByID()', () => {
        it('should return article 1 (which exists)', async () => {
            const article = await appController.getArticleByID('1');
            expect(article.title).toBe('One')
        })
    })
});