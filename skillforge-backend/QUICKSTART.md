# SkillForge Backend - Quick Start Guide

## ✅ Project Successfully Created!

Your complete Spring Boot 3 backend for SkillForge has been built and is ready to run.

## 📋 Project Specifications Met

✅ Clean project structure with only essential files  
✅ Spring Boot 3.2.0  
✅ PostgreSQL database integration  
✅ JWT-based authentication  
✅ Complete JPA entity model  
✅ Sample data loader (auto-loads on startup)  
✅ RESTful API endpoints  
✅ Input validation  
✅ CORS configuration  
✅ Swagger/OpenAPI documentation  

## 🚀 Running the Application

### Prerequisites
- PostgreSQL 12+ running on `localhost:5432`
- Database credentials: `postgres` / `2006kruthi`
- Java 17 or higher

### Steps to Run

1. **Create PostgreSQL Database**:
```sql
CREATE DATABASE skillforge;
```

2. **Navigate to backend directory**:
```bash
cd skillforge-backend
```

3. **Run the application**:
```bash
mvn spring-boot:run
```

Or build and run the JAR:
```bash
mvn clean package
java -jar target/skillforge-1.0.0.jar
```

The application starts on `http://localhost:8080`

## 📊 Automatic Sample Data

On first run, the application automatically creates:

**Users:**
- Admin: `admin@skillforge.com` / `admin123`
- Student: `student@skillforge.com` / `student123`

**Courses:**
1. Java Programming Basics
2. Advanced Spring Boot

**Questions:** 5 questions with varying difficulty levels (EASY, MEDIUM, HARD)

**Results:** 1 sample result record

## 🔐 Authentication Flow

### 1. Register New User
```bash
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }'
```

### 2. Login
```bash
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "student@skillforge.com",
    "password": "student123"
  }'
```

Response:
```json
{
  "token": "eyJhbGciOiJIUzI1NiJ9...",
  "email": "student@skillforge.com",
  "name": "John Doe",
  "role": "STUDENT"
}
```

### 3. Use Token in Requests
```bash
curl -H "Authorization: Bearer YOUR_TOKEN" \
  http://localhost:8080/api/courses
```

## 📡 API Endpoints

### Public Endpoints (No Auth Required)

**Test Endpoint:**
```
GET /api/test
Returns: "SkillForge Backend Running Successfully"
```

**Get All Courses:**
```
GET /api/courses
```

**Get Course by ID:**
```
GET /api/courses/{id}
```

**Get All Questions:**
```
GET /api/questions
```

**Get Question by ID:**
```
GET /api/questions/{id}
```

**Get Questions by Course:**
```
GET /api/questions/course/{courseId}
```

### Authentication Endpoints

**Register:**
```
POST /api/auth/register
Body: { name, email, password }
```

**Login:**
```
POST /api/auth/login
Body: { email, password }
```

### Protected Endpoints (Auth Required)
Add request header: `Authorization: Bearer <JWT_TOKEN>`

## 📖 API Documentation

Access interactive Swagger UI:
```
http://localhost:8080/swagger-ui.html
```

OpenAPI JSON:
```
http://localhost:8080/v3/api-docs
```

## 🗄️ Database Schema

**Users Table**
- id (Long, Primary Key)
- name (String)
- email (String, Unique)
- password (String, Encoded)
- role (ADMIN, STUDENT)
- created_at (Timestamp)

**Courses Table**
- id (Long, Primary Key)
- title (String)
- description (Text)
- created_at (Timestamp)

**Questions Table**
- id (Long, Primary Key)
- content (Text)
- difficulty (EASY, MEDIUM, HARD)
- course_id (Foreign Key)
- created_at (Timestamp)

**Results Table**
- id (Long, Primary Key)
- score (Integer)
- user_id (Foreign Key)
- course_id (Foreign Key)
- created_at (Timestamp)

## 📁 Project Structure

```
skillforge-backend/
├── pom.xml                          # Maven configuration
├── README.md                         # Detailed documentation
├── .gitignore                        # Git ignore file
├── src/main/
│   ├── java/com/skillforge/
│   │   ├── SkillforgeApplication.java       # Main application class
│   │   ├── controller/                      # REST endpoints
│   │   │   ├── AuthController.java
│   │   │   ├── TestController.java
│   │   │   ├── CourseController.java
│   │   │   └── QuestionController.java
│   │   ├── entity/                          # JPA entities
│   │   │   ├── User.java
│   │   │   ├── Course.java
│   │   │   ├── Question.java
│   │   │   └── Result.java
│   │   ├── repository/                      # Data access layer
│   │   │   ├── UserRepository.java
│   │   │   ├── CourseRepository.java
│   │   │   ├── QuestionRepository.java
│   │   │   └── ResultRepository.java
│   │   ├── service/                         # Business logic
│   │   │   ├── AuthService.java
│   │   │   └── DataLoader.java
│   │   ├── security/                        # Security configuration
│   │   │   ├── JwtTokenProvider.java
│   │   │   ├── JwtAuthenticationFilter.java
│   │   │   └── SecurityConfig.java
│   │   └── dto/                             # Data transfer objects
│   │       ├── LoginRequest.java
│   │       ├── RegisterRequest.java
│   │       ├── AuthResponse.java
│   │       ├── CourseDTO.java
│   │       └── QuestionDTO.java
│   └── resources/
│       └── application.yml                   # Application configuration
└── target/                                  # Build output (JAR file)
    └── skillforge-1.0.0.jar
```

## ⚙️ Configuration

Edit `src/main/resources/application.yml` to customize:

```yaml
spring:
  datasource:
    url: jdbc:postgresql://localhost:5432/skillforge
    username: postgres
    password: 2006kruthi
  jpa:
    hibernate:
      ddl-auto: update
    show-sql: true

server:
  port: 8080

app:
  jwt:
    secret: "your-32-character-secret-key"
    expiration: 86400000  # 24 hours
```

## 🔍 Accessing Database

```bash
psql -U postgres -d skillforge
```

Check created tables:
```sql
\dt
```

View users:
```sql
SELECT * FROM users;
```

## ❌ Troubleshooting

**PostgreSQL Connection Error:**
- Verify PostgreSQL is running
- Check credentials in `application.yml`
- Ensure database `skillforge` exists

**Port 8080 Already in Use:**
- Change port in `application.yml`:
```yaml
server:
  port: 8081
```

**Build Failure:**
```bash
mvn clean
mvn install -DskipTests
```

## 🔄 Next Steps

1. **Connect React Frontend** - Update CORS origins if needed
2. **Implement Additional Features:**
   - User profile endpoints
   - Quiz/exam endpoints
   - AI recommendations
   - Analytics endpoints
3. **Enhance Security:**
   - Use environment variables for secrets
   - Implement refresh tokens
   - Add rate limiting
4. **Add Business Logic:**
   - Score calculation
   - Difficulty progression
   - Performance analytics

## 📝 Technology Stack

- **Spring Boot 3.2.0** - Application framework
- **Spring Data JPA** - ORM and data access
- **Spring Security** - Authentication & authorization
- **JWT (jjwt)** - Token-based authentication
- **PostgreSQL** - Database
- **Maven** - Build tool
- **Swagger/OpenAPI** - API documentation
- **Jakarta Validation** - Input validation

## 🎯 Features Implemented

✅ User registration with password encoding  
✅ JWT-based login authentication  
✅ Role-based access control (ADMIN, STUDENT)  
✅ Course management  
✅ Question management with difficulty levels  
✅ Result tracking  
✅ Automatic database initialization  
✅ CORS configuration for frontend integration  
✅ Comprehensive error handling  
✅ Input validation  
✅ RESTful API design  

## 📞 Support

If you encounter issues:
1. Check the logs in the terminal
2. Verify PostgreSQL is running
3. Check that port 8080 is available
4. Ensure Java 17+ is installed
5. Review the detailed README.md file

---

**Project is ready to run! Start the Spring Boot application and connect your React frontend.**
