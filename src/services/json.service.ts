import { Injectable } from '@nestjs/common';
import { ArticleModel } from './json.schema'
import { writeFileSync, readFileSync } from 'fs';

@Injectable()
export class JsonService { 
    /**
     * Upload a new article, overwriting any previous entry for that ID.
     * @param article - The article data to be uploaded.
     * @param id - Optional id value to update instead of create.
     * @returns a boolean value indicating the function has passed.
     */
    async updateArticle(
        article: ArticleModel,
        id?: number
    ): Promise<ArticleModel> {
        const articleFile = readFileSync('articles.json').toString();

        const parsedArticle = JSON.parse(
            JSON.stringify(article, null, 4)
        );
        const parsedRoot = JSON.parse(articleFile);
        let newID: number;
        if (typeof id == 'number') {
            newID = id;
        } else {
            const ids = Object.keys(parsedRoot).map(Number);
            const lastID = ids.length > 0 ? Math.max(...ids) : 1;
            newID = lastID + 1;
        }
        
        parsedRoot[newID] = parsedArticle;

        writeFileSync('articles.json', JSON.stringify(parsedRoot, null, 4))
        parsedArticle.id = newID
        return parsedArticle as ArticleModel;
    }

    /**
     * Return an article as ArticleModel 
     * @param id - The query ID.
     * @returns the requested article by the ID.
     */
    async getArticleByID(
        id: number
    ): Promise<ArticleModel | undefined> {
        const articleFile = readFileSync('articles.json').toString();
        const parsedRoot = JSON.parse(articleFile);

        const article = parsedRoot[id];
        if (!article) {
            return undefined;
        }
        
        // Assign ID to output
        article.id = id;

        return article as ArticleModel;
    }

    /**
     * Gathers all articles as a list of models
     * @returns a list of ArticleModels
     */
    async getAllArticles(): Promise<ArticleModel[]> {
        const articleFile = readFileSync('articles.json').toString();
        const parsedRoot = JSON.parse(articleFile);
        
        for (const key of Object.keys(parsedRoot)) {
            parsedRoot[key].id = Number(key);
        }

        return Object.values(parsedRoot);
    }
}
