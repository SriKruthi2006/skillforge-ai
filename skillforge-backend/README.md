# SkillForge Backend - Spring Boot 3 Application

AI Adaptive Learning & Exam Generator backend built with Spring Boot 3, Spring Security with JWT, Spring Data JPA, and PostgreSQL.

## Project Structure

```
skillforge-backend/
├── pom.xml
├── src/
│   └── main/
│       ├── java/com/skillforge/
│       │   ├── SkillforgeApplication.java (Main class)
│       │   ├── controller/
│       │   │   ├── AuthController.java
│       │   │   ├── TestController.java
│       │   │   ├── CourseController.java
│       │   │   └── QuestionController.java
│       │   ├── entity/
│       │   │   ├── User.java
│       │   │   ├── Course.java
│       │   │   ├── Question.java
│       │   │   └── Result.java
│       │   ├── repository/
│       │   │   ├── UserRepository.java
│       │   │   ├── CourseRepository.java
│       │   │   ├── QuestionRepository.java
│       │   │   └── ResultRepository.java
│       │   ├── service/
│       │   │   ├── AuthService.java
│       │   │   └── DataLoader.java
│       │   ├── security/
│       │   │   ├── JwtTokenProvider.java
│       │   │   ├── JwtAuthenticationFilter.java
│       │   │   └── SecurityConfig.java
│       │   └── dto/
│       │       ├── LoginRequest.java
│       │       ├── RegisterRequest.java
│       │       ├── AuthResponse.java
│       │       ├── CourseDTO.java
│       │       └── QuestionDTO.java
│       └── resources/
│           └── application.yml
```

## Prerequisites

- Java 17 or higher
- Maven 3.8+
- PostgreSQL 12 or higher running on localhost:5432

## Database Setup

1. Create PostgreSQL database:
```sql
CREATE DATABASE skillforge;
```

2. Default credentials (can be changed in `application.yml`):
```
Username: postgres
Password: 2006kruthi
```

## Running the Application

1. **Clone/Navigate to the project**:
```bash
cd skillforge-backend
```

2. **Build the project**:
```bash
mvn clean install
```

3. **Run the application**:
```bash
mvn spring-boot:run
```

Or using Java directly:
```bash
java -jar target/skillforge-1.0.0.jar
```

The application will start on `http://localhost:8080`

## API Endpoints

### Authentication (No Auth Required)
```
POST /api/auth/register       - Register new user
POST /api/auth/login          - Login user
```

### Public Endpoints
```
GET /api/test                 - Test endpoint
GET /api/courses              - Get all courses
GET /api/courses/{id}         - Get course by ID
GET /api/questions            - Get all questions
GET /api/questions/{id}       - Get question by ID
GET /api/questions/course/{courseId} - Get questions by course
```

### Swagger/OpenAPI Documentation
```
http://localhost:8080/swagger-ui.html
http://localhost:8080/v3/api-docs
```

## Authentication Flow

1. **Register** a new user:
```bash
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }'
```

2. **Login** to get JWT token:
```bash
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "student@skillforge.com",
    "password": "student123"
  }'
```

3. **Use token** in protected endpoints:
```bash
curl -H "Authorization: Bearer YOUR_TOKEN" \
  http://localhost:8080/api/protected-endpoint
```

## Sample Data

On first run, the application automatically loads:
- 1 Admin user (admin@skillforge.com / admin123)
- 1 Student user (student@skillforge.com / student123)
- 2 Courses with descriptions
- 5 Questions across courses with different difficulty levels
- 1 Result record

## Dependencies

- **Spring Boot 3.2.0**
  - Spring Web
  - Spring Data JPA
  - Spring Security
  - Spring DevTools

- **JWT Authentication**
  - jjwt 0.12.3

- **Database**
  - PostgreSQL Driver 42.7.1

- **Additional**
  - Lombok for boilerplate reduction
  - Jakarta Validation
  - SpringDoc OpenAPI (Swagger)

## Configuration

All configurations are in `src/main/resources/application.yml`. Key settings:

```yaml
spring:
  datasource:
    url: jdbc:postgresql://localhost:5432/skillforge
    username: postgres
    password: 2006kruthi
  jpa:
    hibernate:
      ddl-auto: update  # auto-creates tables

server:
  port: 8080

app:
  jwt:
    secret: "your-secret-key..."
    expiration: 86400000  # 24 hours in milliseconds
```

## Features

✅ User authentication with JWT  
✅ User registration with password encoding  
✅ Role-based access control (ADMIN, STUDENT)  
✅ Course management  
✅ Question management with difficulty levels  
✅ Result tracking  
✅ Database auto-initialization with sample data  
✅ CORS configuration for frontend integration  
✅ Swagger/OpenAPI documentation  
✅ Input validation with Jakarta Validation  

## Troubleshooting

### PostgreSQL Connection Error
Ensure PostgreSQL is running on localhost:5432 with correct credentials.

### Port Already in Use
Change the port in `application.yml`:
```yaml
server:
  port: 8081
```

### Maven Build Issues
```bash
mvn clean
mvn install -DskipTests
```

## CORS Configuration

The app is configured to accept requests from:
- http://localhost:5173 (Vite React)
- http://localhost:3000 (Create React App)

Modify in `SecurityConfig.java` to add more origins.

## Next Steps

1. Connect the React frontend
2. Implement additional features (quiz generation, AI recommendations)
3. Add more endpoints for results and user analytics
4. Deploy to production with environment variables

## License

MIT License
