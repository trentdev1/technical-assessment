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
My program uses NestJS to implement a basic RESTful API. This API is designed to interact with a database of new articles, used to POST and GET news articles with their data. The program will automaticaly assign a unique, ascending numberial ID to each uploaded article, and automatically return each article a new ID. I used 3 endpoints, allowing the user to post an article to the database, to get all articles and to get an article by it's ID.

I decided to use JSON for this project as it's a simpler, yet very versatile file format that can easily be understood and worked with by most programming languages. I created a JSON service to abstract the code responsible for gathering and sorting data from the JSON file, which mimics a typical database layer such as a DynamoDBClient. I then created ArticlesService, which checks the result of these functions, and throws any relevant errors. If these pass they will be returned by the controller, which directly returns these results to the user at the API endpoints.

Challenges
-
Whilst writing this project, I encountered many challenges which I believe helped me further develop my understanding of how NestJS and TypeScript function.

One of the first problems I encountered was with writing the JsonService. When writing the UpdateArticle, I had to be sure that the passed information would be appended with a unique ID each time. Typically with unique IDs there are either UUIDs or numerical IDs. For this project, I decided to go for numerical IDs. This is because they are simple and easy to understand, and much easier to search with through an API endpoint. UUIDs would have been much longer, and would not serve this purpose well due to their length and complexity, making it much harder to remember and search for an article. To do this, I decided to use a simple tenerary expression. This first checks that the list isn't empty, and this passes it will determine the newest ID (largest number). There is also a fallback ID of 1 to start with, if there are no uploaded articles. The `ids` variable contains a list of all the IDs (article keys in `articles.json`).
```typescript
const lastID = ids.length > 0 ? Math.max(...ids) : 1;
```

Whilst designing my API, I knew I wanted to make an OpenAPI specification as this is standard for APIs, and a really good habit to get into doing. To do this, I used AI to generate a very basic OpenAPI specification. Using rhe generated boilerplate, I built upon it until all API endpoints and their usage was covered. Using AI this way, instead of copy-pasting results, I can improve my knowledge and understanding by writing the specification first hand, ensuring I know what is happening rather than relying on AI to do all the heavy lifting.

When creating a unit test for `ArticleController`, I realised I wasn't too sure how to mock the `JsonService` provider. In order to solve this problem, I again decided to use AI to generate me a simple example of mocking a provider class, and passing it to the `RootTestingModule`. By doing this, I now have a much more solid understanding of how mocking works, and how and when to use mocks such as `useClass` and `useValue`.

Summary of what I learned
-
I decided to take this technical interview as an opportunity to develop my understanding of TypeScript by writing in this language. Therefore, I decided to use NestJS as my framework, as it is both what I am most familiar with and something I wish to improve my knowledge on.

AI Usage
-
As I decided to consider this technical assessment as an opportunity to further develop my knowledge of TypeScript & NestJS, I decided to use as little AI as I could. With this being said, I only used AI as an education tool to gain a better understanding of how different aspects of the program function, and to elaborate and expand my current knowledge. To do this, I was careful not to pass any code in my context, and only relevant information such as:
- The name of the language
- The framework
- The names of functions (and briefly what they do)
- The expected result

# Usage 1

Question
-
`In NestJS (TypeScript), what is the best way to mock my class JsonService in my service ArticlesService. What are the options I have and when would I use them?`
Reply
-
| Approach          | Use Case               | Pros                | Cons                      |
| ----------------- | ---------------------- | ------------------- | ------------------------- |
| `useValue`        | Simple unit testing    | Easy, direct        | Verbose with many methods |
| `jest.mock()`     | Auto-mocking libraries | Less boilerplate    | Needs proper Jest config  |
| Custom Mock Class | Reusable mocks         | Cleaner, extendable | Slightly more setup       |
| `useFactory`      | Dynamic tests          | Flexible per test   | Slightly more complex     |
Lessons learnt
-
This response helped me better understand when certain approaches to mocking classes should be used, as wel as their pros and cons. This allows me to decide which approach is best for me, rather than relying on an AI to decide for me.
