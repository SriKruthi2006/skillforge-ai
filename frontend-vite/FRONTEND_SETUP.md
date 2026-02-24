# SkillForge Frontend - Complete Setup Guide

## 🎯 Project Overview

SkillForge is a modern AI-powered adaptive learning platform with a professional SaaS-style frontend built with React, Vite, and Tailwind CSS.

## 📦 Tech Stack

- **Frontend Framework**: React 18.2.0
- **Build Tool**: Vite 5.1.0
- **Styling**: Tailwind CSS 3.4.7
- **HTTP Client**: Axios 1.4.0
- **Routing**: React Router DOM 6.14.1
- **Charts**: Recharts 2.4.0
- **State Management**: React Context API

## 🚀 Quick Start

### Prerequisites
- Node.js 16+
- npm or yarn

### Installation

```bash
# Navigate to frontend directory
cd frontend-vite

# Install dependencies
npm install

# Start development server
npm run dev
```

The frontend will be available at **http://localhost:5173**

### Build for Production

```bash
npm run build
npm run preview
```

## 📁 Project Structure

```
src/
├── components/
│   ├── layout/
│   │   ├── Layout.jsx        # Main layout wrapper
│   │   ├── Sidebar.jsx       # Navigation sidebar
│   │   └── Navbar.jsx        # Top navigation bar
│   └── ui/
│       ├── Button.jsx        # Reusable button component
│       ├── Card.jsx          # Reusable card component
│       ├── Modal.jsx         # Modal dialog component
│       ├── ProgressBar.jsx   # Progress indicator
│       └── StatsCard.jsx     # Statistics card
├── pages/
│   ├── auth/
│   │   ├── Login.jsx         # Login page
│   │   └── Register.jsx      # Registration page
│   ├── student/
│   │   ├── StudentDashboard.jsx  # Student dashboard
│   │   ├── Courses.jsx           # Course listings
│   │   ├── TestPage.jsx          # Test taking interface
│   │   ├── Report.jsx            # Performance reports
│   │   └── Profile.jsx           # User profile
│   └── admin/
│       ├── AdminDashboard.jsx    # Admin dashboard
│       ├── ManageCourses.jsx     # Course management
│       ├── ManageQuestions.jsx   # Question management
│       ├── ManageUsers.jsx       # User management
│       └── Reports.jsx           # Analytics reports
├── context/
│   └── AuthContext.jsx       # Authentication context
├── services/
│   └── api.js                # API client with axios
├── App.jsx                   # Main app component
├── main.jsx                  # Entry point
└── index.css                 # Global styles
```

## 🔐 Authentication

### Login Credentials (Demo)

**Student Account:**
- Email: `student@skillforge.com`
- Password: `password`

**Admin Account:**
- Email: `admin@skillforge.com`
- Password: `password`

### How Authentication Works

1. User logs in via Login page
2. Credentials sent to backend API
3. Backend returns JWT token and user data
4. Token stored in localStorage
5. Axios interceptor adds token to all API requests
6. Protected routes check authentication status
7. Unauthorized requests (401) redirect to login

## 🎨 UI Components

### Button
```jsx
<Button variant="primary" size="md">
  Click Me
</Button>
```
Variants: `primary`, `secondary`, `danger`, `success`, `outline`
Sizes: `sm`, `md`, `lg`

### Card
```jsx
<Card className="p-6">
  Content here
</Card>
```

### StatsCard
```jsx
<StatsCard
  title="Tests Completed"
  value={12}
  icon={TestIcon}
  trend={{ isPositive: true, text: '+2 this month' }}
/>
```

### Modal
```jsx
<Modal
  isOpen={showModal}
  onClose={() => setShowModal(false)}
  title="Confirm Action"
>
  Modal content
</Modal>
```

### ProgressBar
```jsx
<ProgressBar value={65} max={100} color="blue" />
```
Colors: `blue`, `green`, `red`, `purple`, `yellow`

## 📊 Pages Overview

### Student Dashboard
- Welcome message with personalized greeting
- Statistics cards (tests completed, average score, learning time, topics mastered)
- Performance chart showing score trends
- Upcoming tests section
- AI-recommended learning topics

### Student Courses
- Grid layout of available courses
- Course progress indicators
- Topic counts
- Quick actions (Start/Continue Learning)

### Student Tests
- Timer countdown
- Question navigator grid
- Difficulty badges
- Multiple choice options
- Visual feedback for answered questions
- Submit test functionality

### Student Reports
- Overall performance summary
- Weak areas analysis
- Strong areas highlight
- Topic mastery chart
- AI-recommended practice areas
- Detailed statistics

### Admin Dashboard
- Key metrics (total users, active users, courses, tests)
- User growth chart
- Test statistics by difficulty
- Recent activity feed

### Admin Course Management
- Table view of all courses
- Add/Edit/Delete operations
- Modal-based forms
- Real-time updates

### Admin Question Management
- Question browser with filters
- Difficulty indicators
- Course assignments
- CRUD operations

### Admin User Management
- User listing
- Role management (Student/Admin)
- User account control
- Status indicators

## 🔗 API Integration

All API calls go through `src/services/api.js`:

```javascript
// Base URL: http://localhost:8080/api

// Auth endpoints
authAPI.login(credentials)
authAPI.register(userData)
authAPI.logout()

// Student endpoints
studentAPI.getDashboard()
studentAPI.getCourses()
studentAPI.getTests()
studentAPI.getReports()
studentAPI.startTest(testId)
studentAPI.submitTest(testId, answers)

// Admin endpoints
adminAPI.getDashboard()
adminAPI.getAllCourses()
adminAPI.createCourse(courseData)
adminAPI.updateCourse(id, courseData)
adminAPI.deleteCourse(id)
adminAPI.getAllQuestions()
adminAPI.createQuestion(questionData)
adminAPI.updateQuestion(id, questionData)
adminAPI.deleteQuestion(id)
adminAPI.getAllUsers()
adminAPI.updateUserRole(id, role)
adminAPI.deleteUser(id)
```

## 🎯 Design System

### Color Palette
- **Primary**: Blue (#3b82f6)
- **Secondary**: Gray (#6b7280)
- **Success**: Green (#10b981)
- **Warning**: Yellow (#f59e0b)
- **Danger**: Red (#ef4444)

### Typography
- **Font Family**: Inter
- **Headings**: Bold, increased letter-spacing
- **Body**: Regular weight with 1.5 line-height

### Spacing
- Uses Tailwind's 4px base unit
- Consistent padding/margins: 4, 6, 8, 12, 16, 24, 32, 48px

### Responsive Grid
- Mobile-first approach
- Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)

## 🔄 State Management

Uses React Context API for:
- User authentication state
- Auth token management
- Role-based access control

No Redux needed - context is sufficient for this scale.

## 📱 Responsive Design

All pages are fully responsive:
- **Mobile**: Single column layouts
- **Tablet**: 2-column grids
- **Desktop**: 3-4 column layouts
- Touch-friendly buttons and inputs

## 🚀 Performance Optimizations

- Lazy route loading via React Router
- Optimized re-renders with proper React hooks
- Efficient chart rendering with Recharts
- CSS-in-JS with Tailwind (no runtime overhead)

## 🐛 Common Issues & Solutions

### Issue: Module not found errors
**Solution**: Run `npm install` to ensure all dependencies are installed

### Issue: API 401 errors
**Solution**: Check that backend is running and token is valid in localStorage

### Issue: Vite HMR issues
**Solution**: Restart dev server with `npm run dev`

### Issue: Tailwind classes not working
**Solution**: Ensure vite.config.mjs is properly configured and restart dev server

## 📚 Additional Resources

- [React Documentation](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [Recharts](https://recharts.org)
- [React Router](https://reactrouter.com)
- [Axios](https://axios-http.com)

## 🤝 Contributing

To add new pages:
1. Create component in appropriate `pages` directory
2. Import in `App.jsx`
3. Add route configuration
4. Wrap with `ProtectedRoute` if needed

To add new components:
1. Create in `components/` with appropriate subdirectory
2. Ensure it's reusable and properly typed
3. Document props and usage

## 📝 Development Notes

- All pages use the Layout component for consistent navigation
- Use `useAuth()` hook to access auth state
- Import API methods from `services/api.js`
- Follow the existing component structure for consistency
- Mobile-first responsive design throughout

## 🔐 Security Notes

- JWT tokens stored in localStorage (http-only would be more secure for production)
- API interceptor handles token injection
- Protected routes validate role before rendering
- CORS configured on backend
- Sensitive endpoints require authentication

---

**Frontend is fully functional and ready for integration with the backend!**
