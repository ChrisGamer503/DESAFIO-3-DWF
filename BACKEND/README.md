# Desafio 2 - User, Book & Subscription API

This is a RESTful API built with **Spring Boot** for managing users, books, and subscriptions.
It provides a professional structure for CRUD operations, input validation, centralized error handling, pagination, and API documentation via **OpenAPI/Swagger**.
This project is an evolution of the previous Book API (Desafio 1), now supporting multi-entity management and better integration for external clients.

---

## Features
- Users
  * Create, read, update, delete users
  * Input validation (first name, last name, email)
  * Pagination support
- Books
  * Create, read, update, delete books
  * Search books by title
  * Input validation (title, author, publication year)
  * Pagination support
- Subscriptions
  * Create, read, update, delete subscriptions
  * Fetch subscriptions by user ID
  * Input validation (type, start date, end date, user association)
  * Pagination support
- Global Error Handling
  * Consistent JSON responses for validation errors, resource not found, and internal server errors
- API Documentation
  * Swagger UI / OpenAPI integration
- Unit Testing
  * JUnit + Spring Boot Test examples for service layer

---

## Technologies
- Java 17
- Spring Boot 3.5+
- Spring Data JPA + Hibernate
- MySQL
- Lombok
- Validation with `jakarta.validation`
- SpringDoc OpenAPI (Swagger UI)
- Maven

---

## Requirements
- Java 17 or higher
- Maven 3.8+
- MySQL 8+
- IDE (IntelliJ IDEA, Eclipse, VSCode, etc.)

---

## How to Run

1. Clone the repository:
`git clone https://github.com/ChrisGamer503/DWF.git`

2. Navigate to the project folder:
`cd DWF/Proyecto/Desafio2`

3. Create the database in MySQL:
`CREATE DATABASE bookdb;`

4. Configure database connection in src/main/resources/application.properties:
```
spring.datasource.url=jdbc:mysql://localhost:3306/bookdb?useSSL=false&serverTimezone=UTC
spring.datasource.username=root
spring.datasource.password=root
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
server.port=8080
spring.application.name=Desafio1
```

5. Build and run the application:
`mvn clean install`
`mvn spring-boot:run`

6. Access the API at:
- Base URL: `http://localhost:8080/api`
- Swagger UI: `http://localhost:8080/swagger-ui/index.html`

---

## API Endpoints
- Users

| Method | Endpoint           | Description               |
| ------ | ------------------ | ------------------------- |
| GET    | `/api/users`       | Get all users             |
| GET    | `/api/users/paged` | Get users with pagination |
| GET    | `/api/users/{id}`  | Get a user by ID          |
| POST   | `/api/users`       | Create a new user         |
| PUT    | `/api/users/{id}`  | Update a user             |
| DELETE | `/api/users/{id}`  | Delete a user             |

- Books

| Method | Endpoint                   | Description               |
| ------ | -------------------------- | ------------------------- |
| GET    | `/api/books`               | Get all books             |
| GET    | `/api/books/paged`         | Get books with pagination |
| GET    | `/api/books/{id}`          | Get a book by ID          |
| GET    | `/api/books/search?title=` | Search books by title     |
| POST   | `/api/books`               | Create a new book         |
| PUT    | `/api/books/{id}`          | Update a book             |
| DELETE | `/api/books/{id}`          | Delete a book             |

- Subscriptions

| Method | Endpoint                           | Description                       |
| ------ | ---------------------------------- | --------------------------------- |
| GET    | `/api/subscriptions`               | Get all subscriptions             |
| GET    | `/api/subscriptions/paged`         | Get subscriptions with pagination |
| GET    | `/api/subscriptions/user/{userId}` | Get subscriptions by user ID      |
| POST   | `/api/subscriptions`               | Create a new subscription         |
| PUT    | `/api/subscriptions/{id}`          | Update a subscription             |
| DELETE | `/api/subscriptions/{id}`          | Delete a subscription             |


---



## Example JSON Requests

- Create User
POST /api/users
```
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@example.com"
}`

```

- Create Book
POST /api/books
```
{
  "title": "Spring Boot in Action",
  "author": "Craig Walls",
  "publicationYear": 2020
}`

```

- Create Subscription
POST /api/subscriptions
```
{
  "type": "Premium",
  "startDate": "2025-09-21",
  "endDate": "2025-12-21",
  "userId": 1
}`

```

- Error Handling
All errors return a **consistent JSON response**:
```
{
  "status": 400,
  "error": "Bad Request",
  "message": "Validation failed for one or more fields",
  "fieldErrors": {
    "email": "Email must be valid",
    "firstName": "First name is required"
  },
  "timestamp": "2025-09-21T20:30:00"
}`

```

- Testing
  * **Unit Testing (JUnit + Spring Boot Test)** for service layer
  * **Integration testing** via Swagger UI or Postman
  * Run tests with Maven: mvn test
 
## Notes

- All code is written in English.
- Pagination and sorting are available on all main entities (/paged endpoints).
- Centralized error handling ensures uniform JSON responses for clients.
