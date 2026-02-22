# ⚡ SKILLFORGE - QUICK REFERENCE GUIDE

## 🚀 START ALL SERVICES (in order)

### 1. Start PostgreSQL
```bash
"C:\Program Files\PostgreSQL\17\bin\pg_ctl" -D "C:\Program Files\PostgreSQL\17\data" start
```
✅ Check: Can connect to localhost:5432

### 2. Start Backend
```bash
cd d:\skillforge\skillforge-backend
java -jar target\skillforge-1.0.0.jar
```
✅ Check: http://localhost:8080 (should show Spring Boot splash)

### 3. Start Frontend
```bash
cd d:\skillforge\frontend-vite
npm run dev
```
✅ Check: http://localhost:5173 (should show login page)

---

## 📱 ACCESS POINTS

| Service | URL | Purpose |
|---------|-----|---------|
| Frontend | http://localhost:5173 | React Vite app |
| Backend | http://localhost:8080 | Spring Boot API |
| Database | localhost:5432 | PostgreSQL |
| API | http://localhost:8080/api | REST endpoints |

---

## 🔐 DEMO LOGIN CREDENTIALS

### Student Account
```
Email: student@skillforge.com
Password: password
Role: STUDENT
```

### Admin Account
```
Email: admin@skillforge.com
Password: password
Role: ADMIN
```

---

## 📂 IMPORTANT DIRECTORIES

| Path | Content |
|------|---------|
| `d:\skillforge\skillforge-backend\` | Java backend |
| `d:\skillforge\frontend-vite\src\` | React components |
| `d:\skillforge\frontend-vite\src\pages\` | Page components |
| `d:\skillforge\frontend-vite\src\components\` | Reusable components |

---

## 🔧 USEFUL COMMANDS

### Backend
```bash
# Build backend
cd d:\skillforge\skillforge-backend
mvn clean package

# Run backend
java -jar target\skillforge-1.0.0.jar
```

### Frontend
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Database
```bash
# Start PostgreSQL
"C:\Program Files\PostgreSQL\17\bin\pg_ctl" -D "C:\Program Files\PostgreSQL\17\data" start

# Connect to database
psql -h localhost -U postgres -d skillforge

# Create database (if needed)
CREATE DATABASE skillforge;
```

---

## 📊 KEY FEATURE LOCATIONS

### Student Features

| Feature | Component |
|---------|-----------|
| Dashboard | `/frontend-vite/src/pages/student/StudentDashboard.jsx` |
| Courses | `/frontend-vite/src/pages/student/Courses.jsx` |
| Tests | `/frontend-vite/src/pages/student/TestPage.jsx` |
| Reports | `/frontend-vite/src/pages/student/Report.jsx` |
| Profile | `/frontend-vite/src/pages/student/Profile.jsx` |

### Admin Features

| Feature | Component |
|---------|-----------|
| Dashboard | `/frontend-vite/src/pages/admin/AdminDashboard.jsx` |
| Courses | `/frontend-vite/src/pages/admin/ManageCourses.jsx` |
| Questions | `/frontend-vite/src/pages/admin/ManageQuestions.jsx` |
| Users | `/frontend-vite/src/pages/admin/ManageUsers.jsx` |
| Reports | `/frontend-vite/src/pages/admin/Reports.jsx` |

---

## 🎨 COMPONENTS REFERENCE

### UI Components

```javascript
// Button
<Button variant="primary" size="md">Click</Button>
// Variants: primary, secondary, danger, success, outline
// Sizes: sm, md, lg

// Card
<Card className="p-6">Content</Card>

// Modal
<Modal isOpen={open} onClose={close} title="Title">
  Content
</Modal>

// ProgressBar
<ProgressBar value={65} max={100} color="blue" />
// Colors: blue, green, red, purple, yellow

// StatsCard
<StatsCard title="Title" value={123} icon={IconComponent} />
```

---

## 🔗 API ENDPOINTS

### Auth
```
POST /api/auth/login
POST /api/auth/register
POST /api/auth/logout
```

### Student
```
GET /api/student/dashboard
GET /api/student/courses
GET /api/student/tests
GET /api/student/reports
POST /api/student/tests/{id}/start
POST /api/student/tests/{id}/submit
```

### Admin
```
GET /api/admin/dashboard

# Courses
GET /api/admin/courses
POST /api/admin/courses
PUT /api/admin/courses/{id}
DELETE /api/admin/courses/{id}

# Questions
GET /api/admin/questions
POST /api/admin/questions
PUT /api/admin/questions/{id}
DELETE /api/admin/questions/{id}

# Users
GET /api/admin/users
PUT /api/admin/users/{id}/role
DELETE /api/admin/users/{id}
```

---

## 💾 DATABASE INFO

### Connection Details
```
Host: localhost
Port: 5432
Database: skillforge
User: postgres
Password: 2006kruthi
```

### Main Tables
- `users` - User accounts
- `courses` - Course information
- `questions` - Test questions
- `tests` - Test metadata
- `submissions` - Student submissions
- `performance` - Performance metrics

---

## 🎯 NAVIGATION STRUCTURE

```
Login/Register
    ↓
├─ Student Dashboard
│   ├─ Courses
│   ├─ Tests
│   ├─ Reports
│   └─ Profile
│
└─ Admin Dashboard
    ├─ Manage Courses
    ├─ Manage Questions
    ├─ Manage Users
    └─ Reports
```

---

## ✅ VERIFICATION CHECKLIST

After starting all services, verify:

- [ ] PostgreSQL is running
- [ ] Can connect to database
- [ ] Backend starts without errors
- [ ] Frontend loads at localhost:5173
- [ ] Login page appears
- [ ] Can login with student/admin credentials
- [ ] Can see dashboard after login
- [ ] Navigation works
- [ ] Can access all pages

---

## 🐛 QUICK FIXES

### Frontend not loading
```bash
cd d:\skillforge\frontend-vite
rm node_modules package-lock.json
npm install
npm run dev
```

### Backend not starting
```bash
# Check if port 8080 is in use
netstat -ano | findstr :8080
# If in use, restart or use different port
```

### Database not connecting
```bash
# Verify database exists
psql -h localhost -U postgres -l

# Recreate if needed
psql -h localhost -U postgres -c "CREATE DATABASE skillforge;"
```

---

## 📝 USEFUL RESOURCES

### Documentation Files
- `d:\skillforge\SKILLFORGE_COMPLETE.md` - Full project overview
- `d:\skillforge\frontend-vite\FRONTEND_SETUP.md` - Frontend guide
- `d:\skillforge\frontend-vite\FRONTEND_COMPLETE.md` - Frontend status

### Framework Documentation
- React: https://react.dev
- Tailwind: https://tailwindcss.com
- Spring Boot: https://spring.io/projects/spring-boot
- PostgreSQL: https://www.postgresql.org/docs/

---

## 🎯 WORKFLOW

### Daily Development
```bash
# 1. Open 3 terminals

# Terminal 1: Backend
cd d:\skillforge\skillforge-backend
java -jar target\skillforge-1.0.0.jar

# Terminal 2: Frontend
cd d:\skillforge\frontend-vite
npm run dev

# Terminal 3: Database (if needed)
"C:\Program Files\PostgreSQL\17\bin\pg_ctl" -D "C:\Program Files\PostgreSQL\17\data" start

# 4. Open browser
# http://localhost:5173
```

---

## 🚀 DEPLOYMENT

### Build Frontend
```bash
cd d:\skillforge\frontend-vite
npm run build
# Creates: dist/ folder ready for deployment
```

### Build Backend
```bash
cd d:\skillforge\skillforge-backend
mvn clean package
# Creates: target/skillforge-1.0.0.jar
```

### Deploy to Cloud
- Frontend: Deploy `dist/` to Vercel/Netlify
- Backend: Deploy JAR to Heroku/AWS
- Database: Use managed PostgreSQL

---

## 📞 TROUBLESHOOTING CONTACTS

### Issue: "Cannot connect to database"
- Check PostgreSQL service
- Verify port 5432 is accessible
- Check credentials in application.yml

### Issue: "Can't reach backend from frontend"
- Verify backend running on 8080
- Check CORS configuration
- Verify vite.config.mjs proxy

### Issue: "Page shows blank"
- Clear browser cache
- Check console for errors
- Restart frontend dev server

---

## 🎉 SUCCESS INDICATORS

✅ **Backend**: Shows "Started SkillforgeApplication" message  
✅ **Frontend**: Shows login page with SkillForge logo  
✅ **Database**: Can query with psql  
✅ **Integration**: Can login and access dashboard  

---

## 📊 PERFORMANCE NOTES

- Frontend built: 921 modules, 687KB minified, 198KB gzipped
- Hot reload enabled via Vite HMR
- API requests cached where appropriate
- Database queries optimized with indexes

---

**Last Updated**: February 21, 2026  
**Status**: Ready for Production  
**Version**: 1.0.0
