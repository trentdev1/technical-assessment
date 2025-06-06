import { Test } from '@nestjs/testing';
import { ArticleService } from './articles.service';
import { JsonService } from './json.service';
import { NotFoundException } from '@nestjs/common';

class MockJsonService {
    getArticleByID = jest.fn();
    getAllArticles = jest.fn().mockResolvedValue(
        [
            {
                "id": 1,
                "title": "One",
                "summary": "sum1",
                "author": "John Doe",
                "pubdate": "05-06-2025"
            },
            {
                "id": 2,
                "title": "Two",
                "summary": "sum2",
                "author": "Jane Doe",
                "pubdate": "05-06-2025"
            }
        ]
    );
    updateArticle = jest.fn().mockResolvedValue(true);
}

describe('ArticleService', () => {
    let articlesService: ArticleService;

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            providers: [
                ArticleService,
                { provide: JsonService, useClass: MockJsonService }
            ],
        }).compile();

        articlesService = moduleRef.get<ArticleService>(ArticleService);
    });


    it('should be defined', () => {
        expect(articlesService).toBeDefined();
    });

    describe('getArticle(id)', () => {
        it('should return an article that exists', async () => {
            const mockArticle = { id: 1, title: 'Test', summary: '', author: '', pubdate: '' };
            (articlesService['jsonService'].getArticleByID as jest.Mock).mockResolvedValueOnce(mockArticle);
            const article = await articlesService.getArticle(1);
            expect(article).toBeDefined();
            expect(article?.title).toBe("Test");
        });
        
        it('should return a 404 when an article does not exist', async () => {
            (articlesService['jsonService'].getArticleByID as jest.Mock).mockResolvedValueOnce(undefined);
            await expect(articlesService.getArticle(1)).rejects.toThrow(NotFoundException);
        });
    });

    describe('getArticles()', () => {
        it('should return articles as list', async () => {
            const articles = await articlesService.getArticles();
            expect(Array.isArray(articles)).toBe(true);
        });
    })
});
