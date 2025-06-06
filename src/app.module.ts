import { Module } from '@nestjs/common';
import { ArticleController } from './controllers/articles.controller';
import { ArticleService } from './services/articles.service';
import { JsonService } from './services/json.service';

@Module({
  imports: [],
  controllers: [ArticleController],
  providers: [ArticleService, JsonService],
})
export class AppModule {}
