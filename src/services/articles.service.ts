import { Injectable, NotFoundException } from '@nestjs/common';
import { JsonService } from './json.service'; // Import JsonService
import { ArticleModel } from 'src/services/json.schema';

@Injectable()
export class ArticleService {
    constructor(private readonly jsonService: JsonService) {} 

    async getArticle(id: number): Promise<ArticleModel> {
        const result = await this.jsonService.getArticleByID(id);
        if (!result) {
            throw new NotFoundException('Article was not found.')
        }
        return result!
    }

    async getArticles(): Promise<ArticleModel[]> {
        const result = await this.jsonService.getAllArticles()
        if (!result) {
            throw new NotFoundException('articles.json could not be found!')
        }
        return result;
    }

    async uploadArticle(data: ArticleModel): Promise<ArticleModel> {
        return await this.jsonService.updateArticle(data);
    }
}
