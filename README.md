# technical-assessment

# Setup
```bash
git clone <your-repo-url>
cd news-article-api

npm install
```

# Run
Developer Mode
```bash
npm run start:dev
```
Production Mode
```bash
npm run build
npm run start:prod
```

You can access the API from [http://localhost:3000/api/articles](http://localhost:3000/api/articles).


# API Endpoints

- `GET /api/articles` — List all articles
- `GET /api/articles/:id` — Get article by ID
- `POST /api/articles` — Add a new article (JSON body)

# Testing

Unit tests
```bash
npm run test
```

OpenAPI documentation at openapi.yaml

Explanation of Solutions
-
My program uses NestJS to implement a basic RESTful API. This API is designed to interact with a database of new articles, used to POST and GET news articles with their data. The program will automaticaly assign a unique, ascending numberial ID to each uploaded article, and automatically return each article a new ID.

Challenges
-


Summary of what I learned
-
I decided to take this technical interview as an opportunity to develop my understanding of TypeScript by writing in this language. Therefore, I decided to use NestJS as my framework, as it is both what I am most familiar with and something I wish to improve my knowledge on.

AI Usage
-
As I decided to consider this technical assessment as an opportunity to further develop my knowledge of TypeScript & NestJS, I decided to use as little AI as I could.
