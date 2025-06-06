import { Controller, Get, Param, Post, Body, NotFoundException } from '@nestjs/common';
import { ArticleService } from '../services/articles.service';
import { ArticleModel } from 'src/services/json.schema';

@Controller('/api/articles')
export class ArticleController {
    constructor(private readonly appService: ArticleService) {}

    @Get()
    async getArticles(): Promise<ArticleModel[]> {
        return await this.appService.getArticles();
    }

    @Get(':id')
    async getArticleByID(@Param('id') id: string): Promise<ArticleModel> {
        return await this.appService.getArticle(Number(id));
    }

    @Post()
    async uploadArticle(@Body() article: ArticleModel): Promise<ArticleModel> {
        return await this.appService.uploadArticle(article);
    }
}
