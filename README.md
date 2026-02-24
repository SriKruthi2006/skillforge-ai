# 🚀 SkillForge – Learning & Assessment Platform

SkillForge is a full‑stack learning and assessment web application designed for students to practice aptitude, logical reasoning, verbal ability, and programming languages like Python and Java.

It provides role‑based dashboards for Students and Admin with progress tracking, tests, leaderboard, and performance analytics.

---

# 🌟 Features

## 👨‍🎓 Student Features
- Secure login & registration (JWT authentication)
- Role‑based dashboard
- Course learning with topics (basic → advanced)
- Video & assignment options per topic
- Course progress tracking
- Upcoming tests section
- Results & performance report
- Leaderboard ranking system
- Editable profile with progress bars

## 👨‍💼 Admin Features
- Admin dashboard
- Manage students
- Manage tests & courses
- Monitor student performance

---

# 🛠 Tech Stack

## Frontend
- React.js
- Vite
- React Router DOM
- Context API
- Custom CSS

## Backend
- Spring Boot
- Spring Security
- JWT Authentication
- REST APIs
- PostgreSQL

## 🗄 Database
- PostgreSQL



# 🔐 Authentication System

Role‑based login implemented using JWT.

After login:
- ADMIN → redirected to admin dashboard
- STUDENT → redirected to student dashboard

JWT token stored in localStorage for authentication.



## 📁 Project Folder Structure

```
skillforge/
│
├── frontend-vite/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── auth/
│   │   │   ├── student/
│   │   │   └── admin/
│   │   ├── styles/
│   │   ├── services/
│   │   └── assets/
│
└── backend/
    ├── controller/
    ├── service/
    ├── repository/
    ├── dto/
    ├── entity/
    └── config/
```

# ⚙️ Installation & Setup

## 🔹 Frontend Setup

Open terminal:

cd frontend-vite <br>
npm install<br>
npm run dev<br>


Frontend runs on:
http://localhost:5173

## 🔹 Backend Setup

Open backend folder:

cd backend<br>
mvn spring-boot:run<br>

Backend runs on:
http://localhost:8080


---

# 📚 Modules Overview

## 📘 Courses
Subjects included:
- Aptitude
- Logical Reasoning
- Python
- Java

Each subject contains:
- Topic list
- Completion status
- Progress bar
- Video & assignment options

## 📝 Tests
- Upcoming tests
- Test details
- Duration
- Attempt option

## 📊 Results
- Exam scores
- Performance tracking
- Report view option

## 🏆 Leaderboard
- Student ranking
- Top performers highlighted
- Score comparison

## 👤 Profile
- Editable profile
- Course progress bars
- Clean professional UI

---

# 🎯 Future Enhancements

- Video integration for real courses
- Assignment submission system
- Admin analytics dashboard
- Email verification system
- Dark/light mode toggle

---

# 👩‍💻 Developed By

**Malasani Kumaraswamy Sri Kruthi**

SkillForge – Learning & Assessment Platform  
Full Stack Project (React + Spring Boot)


