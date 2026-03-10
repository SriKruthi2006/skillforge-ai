# 🧪 LESSON VIEWER - QUICK TEST GUIDE

## ✅ SETUP STATUS

- ✅ Backend: Running on http://localhost:8080
- ✅ Frontend: Running on http://localhost:5173
- ✅ Database: Connected

---

## 🚀 START SERVERS (IF NOT RUNNING)

### Terminal 1 - Backend
```bash
cd skillforge-backend
java -jar target/skillforge-backend-0.0.1-SNAPSHOT.jar
```
✅ Runs on: http://localhost:8080

### Terminal 2 - Frontend
```bash
cd frontend-vite
npm run dev
```
✅ Runs on: http://localhost:5173

---

## 🧪 TESTING CHECKLIST

### Test 1: Login as Student
**URL:** http://localhost:5173/login

**Credentials:**
```
Email: student@skillforge.com
Password: password
```

**Expected Result:**
- ✅ Login successful
- ✅ Redirected to /student/dashboard

---

### Test 2: Navigate to Course Player
**URL:** http://localhost:5173/student/courses/{courseId}/player

**Example:** http://localhost:5173/student/courses/1/player

**Expected Result:**
- ✅ Course title displays
- ✅ Progress bar shows (e.g., "0/10 lessons")
- ✅ Left sidebar shows topics with lessons
- ✅ Main area shows "Select a lesson from the sidebar"

---

### Test 3: Click a Lesson
**Action:** Click on a lesson in the left sidebar (e.g., "Introduction")

**Expected Result:**
- ✅ Lesson title displays at top ("Introduction")
- ✅ YouTube video embeds and displays
- ✅ Lesson content shows below video
- ✅ "Mark as Completed" button appears at bottom
- ✅ Lesson is highlighted in sidebar

---

### Test 4: Mark Lesson Complete
**Action:** Click "Mark as Completed" button

**Expected Result:**
- ✅ Button disappears
- ✅ Checkmark (✔) appears next to lesson name in sidebar
- ✅ Progress bar increments (e.g., "1/10 lessons = 10%")
- ✅ No errors in browser console

---

### Test 5: Mark Multiple Lessons
**Action:** Repeat Test 3-4 for 5 more lessons

**Expected Result:**
- ✅ Each lesson shows checkmark after completion
- ✅ Progress bar updates: "6/10 lessons = 60%"
- ✅ Sidebar shows mix of completed (✔) and uncompleted lessons

---

### Test 6: Reload Page
**Action:** Refresh the browser (F5 or Ctrl+R)

**Expected Result:**
- ✅ Progress persists
- ✅ Checkmarks still visible
- ✅ Progress bar shows same value
- ✅ No data loss

---

### Test 7: Video Functionality
**Action:** While on a lesson with video, test video player

**Expected Result:**
- ✅ Video plays without errors
- ✅ Can seek/pause/resume
- ✅ Can fullscreen (button visible)
- ✅ No CORS errors in console

---

### Test 8: API Debugging
**Open Browser DevTools** (F12)

**Network Tab:**
- Watch for these API calls:
  1. `GET /api/student/courses/{id}/topics` - Load topics
  2. `GET /api/student/topics/{id}/lesson` - Load lessons for each topic
  3. `GET /api/student/progress/{id}/details` - Load progress
  4. `POST /api/student/progress/complete` - Mark complete
  5. `GET /api/student/progress/{id}/details` - Refresh progress

**Expected Output:**
- ✅ All requests return 200 OK
- ✅ Response bodies contain expected data
- ✅ No 404 or 500 errors
- ✅ Authorization header (Bearer token) included

---

### Test 9: Responsive Design
**Action:** Test on different screen sizes

**Desktop (1920x1080):**
- ✅ Sidebar takes ~25% width
- ✅ Content area takes ~75% width
- ✅ Video is full width of content area

**Laptop (1366x768):**
- ✅ Layout still readable
- ✅ No text overlap
- ✅ Video still visible

**Mobile (375x667):**
- ✅ Sidebar collapses or scrolls
- ✅ Video maintains aspect ratio
- ✅ Buttons remain clickable

---

### Test 10: Error Handling
**Action:** Try these error scenarios

**Scenario A - Invalid Course:**
- URL: http://localhost:5173/student/courses/9999/player
- Expected: Error message or 404 page

**Scenario B - No Lessons:**
- URL: http://localhost:5173/student/courses/2/player (course with no lessons)
- Expected: Sidebar shows topics but no lessons, main area shows "Select a lesson"

**Scenario C - Network Error:**
- Stop backend server
- Refresh page
- Expected: Error message, no crash

---

## 📊 API ENDPOINT VERIFICATION

### 1️⃣ Get Topics for Course
```bash
curl http://localhost:8080/api/student/courses/1/topics \
  -H "Authorization: Bearer YOUR_TOKEN"
```

**Expected Response:**
```json
[
  {
    "id": 1,
    "title": "Basics"
  },
  {
    "id": 2,
    "title": "Advanced"
  }
]
```

---

### 2️⃣ Get Lessons for Topic
```bash
curl http://localhost:8080/api/student/topics/1/lesson \
  -H "Authorization: Bearer YOUR_TOKEN"
```

**Expected Response:**
```json
[
  {
    "id": 1,
    "title": "Introduction",
    "content": "Introduction text...",
    "videoUrl": "https://www.youtube.com/embed/abc123"
  }
]
```

---

### 3️⃣ Mark Lesson Complete
```bash
curl -X POST http://localhost:8080/api/student/progress/complete \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"lessonId": 1}'
```

**Expected Response:**
```json
{
  "id": 101,
  "studentId": 1,
  "courseId": 1,
  "lessonId": 1,
  "completed": true,
  "completedAt": 1678900000000
}
```

---

### 4️⃣ Get Course Progress
```bash
curl http://localhost:8080/api/student/progress/1/details \
  -H "Authorization: Bearer YOUR_TOKEN"
```

**Expected Response:**
```json
{
  "completedLessons": 3,
  "totalLessons": 10,
  "progress": 30,
  "completedLessonIds": [1, 3, 5]
}
```

---

## 🔍 DEBUGGING TIPS

### If video doesn't load:
1. Check video URL format (should be `www.youtube.com/embed/ID`)
2. Check CORS is enabled in backend
3. Verify JWT token is valid

### If progress doesn't update:
1. Check browser DevTools Network tab
2. Verify POST request returns 200
3. Check progress GET request returns updated data
4. Clear browser cache (Ctrl+Shift+Del)

### If lessons don't appear:
1. Check database has lesson data
2. Verify relationship: Course → Topic → Lesson
3. Check topic_id in lesson table

### If sidebar doesn't show:
1. Verify topics are returned from API
2. Check console for JavaScript errors
3. Verify CourseSidebar component renders

---

## ✅ PASSING CRITERIA

All 10 tests pass:
- [x] Login works
- [x] Course page loads
- [x] Lessons display
- [x] Video plays
- [x] Mark complete works
- [x] Progress bar updates
- [x] Checkmarks appear
- [x] Reload persists data
- [x] APIs respond correctly
- [x] Responsive on all devices

---

## 📝 NOTES

- Database: PostgreSQL with test data
- JWT tokens: Stored in localStorage
- Lesson videos: YouTube embeds
- Progress: Stored in database table
- Student ID: Hardcoded to 1 (update with auth context)

---

Last Updated: March 10, 2026
