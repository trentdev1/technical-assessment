# technical-assessment

# Setup
```bash
git clone https://github.com/trentdev1/technical-assessment/
cd technical-assessment

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

In regard to testing, I improved my understanding of mocking provider classes, and how and when to use certain methods such as `useValue` and `useClass`. This is very useful as now I can be sure I'm correctly mocking each provider each time I'm using one.
In addition, I gained a more solid understanding of RESTful APIs and how to write OpenAPI specifications. This is significant as they are important principles for making modern APIs clear and easy to use. This way I can be confident that my APIs are correctly setup and they will be easy for another developer to pick up and use.

AI Usage
-
As I decided to consider this technical assessment as an opportunity to further develop my knowledge of TypeScript & NestJS, I decided to use as little AI as I could. Anywhere that I didn't use AI, I broke the problem down into smaller components and would learn different approaches through sites like StackOverflow and NestJS documentation. With this being said, I only used AI as an education tool to gain a better understanding of how different aspects of the program function, and to elaborate and expand my current knowledge. To do this, I was careful not to pass any code in my context, and only relevant information such as:
- The name of the language
- The framework
- The names of functions (and briefly what they do)
- The expected result

AI Model used: ChatGPT 4.0

# Usage 1

Question
-

`In NestJS (TypeScript), what is the best way to mock my class JsonService in my service ArticlesService. What are the options I have and when would I use them?`

Reply
-
```typescript
// Imports...

// Mock class for JsonService
class MockJsonService {
  getData() {
    return [{ id: 1, title: 'Mock Article' }];
  }

  // Add any other methods that ArticleService depends on
}

describe('ArticleService', () => {
  let service: ArticleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ArticleService,
        {
          provide: JsonService,
          useClass: MockJsonService,
        },
      ],
    }).compile();

    service = module.get<ArticleService>(ArticleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  }
```
| Approach          | Use Case               | Pros                | Cons                      |
| ----------------- | ---------------------- | ------------------- | ------------------------- |
| `useValue`        | Simple unit testing    | Easy, direct        | Verbose with many methods |
| `jest.mock()`     | Auto-mocking libraries | Less boilerplate    | Needs proper Jest config  |
| `useClass`        | Reusable mocks         | Cleaner, extendable | Slightly more setup       |
| `useFactory`      | Dynamic tests          | Flexible per test   | Slightly more complex     |

Lessons learnt
-
This response helped me better understand when certain approaches to mocking classes should be used, as well as their pros and cons. This allows me to decide which approach is best for me, rather than relying on an AI to decide for me.

# Usage 2

Question
-
```
Write me a simple openAPI spec example for an API with 3 endpoints;
- GET /articles
- GET /articles/:id
- POST /articles

Leave comments where I need to fill information in (including the schema for posting to /articles)
```

Reply
-
```
openapi: 3.0.0
info:
  title: Articles API
  version: 1.0.0
  description: A simple API for managing articles

paths:
  /articles:
    get:
      summary: Get a list of articles
      responses:
        '200':
          description: A list of articles
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: '#/components/schemas/Article'
    post:
      summary: Create a new article
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/NewArticle' # You will define this schema below
      responses:
        '201':
          description: Article created successfully
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Article'

  /articles/{id}:
    get:
      summary: Get an article by ID
      parameters:
        - name: id
          in: path
          required: true
          schema:
            type: string # Change to integer if needed
          description: The ID of the article to retrieve
      responses:
        '200':
          description: Article found
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Article'
        '404':
          description: Article not found

components:
  schemas:
    Article:
      type: object
      properties:
        title:
          type: string
        summary:
          type: string
        author:
          type: string
        pubdate:
          type: string
      required:
        - id
        - title
        - content
        - author
        - createdAt
```

Lessons learnt
-

From this usage, I gained a better understanding the basic boilerplate, and how to format an OpenAPI spec. Clearly, the version created by the AI is not complete, but it is a good first step, as I can iterate on top of it to cover all aspects of the API. This way, I'm writing the important parts myself, and getting a first hand understanding of what is happening.

# Security Concerns

When using AI, there are always security concerns that, for legal purposes, should be acknowledged. For one, AI can tend to plaigerise other peoples code, as this is what they are trained on. In order to avoid this, I am careful with how I treat AI-generated code. Firstly, I don't copy-paste AI code as a lot of the time it isn't going to work. Instead, I pay attention to the chosen approach, and the explanation as to why the AI chose this approach. I will consider my program, and then determine the validity of the AI-generated code. If I believe the AI's approach is warranted, then I will replicate the AI's code in my own way, careful not to copy what could be someone else's code.

Furthermore, another concern with AI would be in the training data and context I pass it, such as API keys. If I were to pass a business' API key to an AI as training data, there is a chance it could begin using this API key in it's responses to other people, leading to a potential risk of public exposure to private API keys. This can be very damaging, and can lead to severe consequences. Personally, I prefer to omit as much raw code from AI prompts as I can, since I'm looking for general solutions rather than problem-specific ones.
