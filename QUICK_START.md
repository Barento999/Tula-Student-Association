# Quick Start Guide

## 🚀 Getting Started

The application is now running at: **http://localhost:5174/**

## 📋 Test the Application

### 1. Explore Public Pages

- Visit the **Home** page to see the mission and statistics
- Navigate to **About** to learn about the organization
- Check out **Programs** to see all educational offerings
- Browse **Activities** to see past events
- View the **Gallery** for photos from different summer sessions
- Visit **Contact** to see contact information

### 2. Test Student Registration

1. Click **"Student Registration"** in the navigation
2. Fill out the form:
   - Full Name: John Doe
   - School Name: Tula High School
   - Level: Secondary
   - Grade: 8
   - Select subjects (e.g., Mathematics, English)
   - Phone: (optional)
   - Guardian Name: (optional)
3. Click **"Complete Registration"**
4. You'll be automatically logged in and redirected to the **Student Dashboard**

### 3. Explore Student Dashboard

- View your student information
- See available learning materials for your level
- Filter materials by subject and grade
- Click **"Download"** to simulate downloading materials

### 4. Test Volunteer Registration

1. Click **"Volunteer"** in the navigation
2. Fill out the volunteer application:
   - Full Name: Jane Smith
   - University: Example University
   - Department: Computer Science
   - Select subjects you can teach
   - Preferred Level: Secondary
   - Availability: June-August, mornings
3. Click **"Submit Application"**
4. See success confirmation

### 5. Browse Materials (Public)

1. Click **"Materials"** in the navigation
2. Use filters to find specific materials:
   - Filter by Subject
   - Filter by Level
   - Filter by Summer Session
3. Click **"Download Material"** on any card

### 6. Test Admin Features

1. Click **"Admin Login"** in the navigation
2. Enter credentials:
   - **Username**: admin
   - **Password**: admin123
3. Click **"Login"**
4. Explore the Admin Dashboard:
   - **Overview Tab**: See statistics and quick actions
   - **Students Tab**: View all registered students
   - **Volunteers Tab**: View all registered volunteers
   - **Materials Tab**: View and upload learning materials
   - **Sessions Tab**: View and create summer sessions

### 7. Upload a Material (Admin)

1. In Admin Dashboard, go to **Materials** tab
2. Click **"Upload Material"**
3. Fill out the form:
   - Title: "Physics - Electricity Basics"
   - Subject: Physics
   - Level: Secondary
   - Grade: 9
   - File Type: PDF
   - Session: Summer 2024
   - Description: "Introduction to electricity"
4. Click **"Upload Material"**
5. See the new material in the list

### 8. Create a Session (Admin)

1. In Admin Dashboard, go to **Sessions** tab
2. Click **"Create Session"**
3. Fill out the form:
   - Session Name: Summer 2025
   - Year: 2025
   - Start Date: 2025-06-01
   - End Date: 2025-08-31
   - Check "Mark as active session"
4. Click **"Create Session"**
5. See the new session in the grid

## 🎨 Features to Test

### Responsive Design

- Resize your browser window to see mobile layout
- Test the hamburger menu on mobile
- Check that all grids adapt to smaller screens

### Form Validation

- Try submitting forms with empty fields
- See error messages appear
- Watch errors disappear as you fill fields

### Filtering

- Test material filters on Materials page
- Test activity type filters on Activities page
- Test year filters on Gallery page

### Navigation

- Test all navigation links
- Verify protected routes (Student Dashboard, Admin Dashboard)
- Test logout functionality

## 💾 Data Persistence

All data is stored in browser LocalStorage:

- Student registrations
- Volunteer applications
- Uploaded materials
- Created sessions
- User authentication state

To reset all data:

1. Open browser DevTools (F12)
2. Go to Application/Storage tab
3. Clear LocalStorage
4. Refresh the page

## 🎯 Key Pages to Visit

1. **Home** (`/`) - Landing page with mission and CTA
2. **About** (`/about`) - Organization background
3. **Programs** (`/programs`) - Educational programs
4. **Student Registration** (`/student-registration`) - Register as student
5. **Materials** (`/materials`) - Browse learning materials
6. **Volunteer** (`/volunteer`) - Volunteer application
7. **Activities** (`/activities`) - Past activities and events
8. **Gallery** (`/gallery`) - Photo gallery by year
9. **Contact** (`/contact`) - Contact form and info
10. **Student Dashboard** (`/student-dashboard`) - Student portal (requires registration)
11. **Admin Login** (`/admin/login`) - Admin authentication
12. **Admin Dashboard** (`/admin`) - Admin panel (requires login)

## 🔐 Demo Credentials

**Admin Access:**

- Username: `admin`
- Password: `admin123`

## 📱 Mobile Testing

To test on mobile devices on the same network:

1. Stop the current server (Ctrl+C)
2. Run: `npm run dev -- --host`
3. Access using the Network URL shown in terminal

## 🛠️ Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint
```

## ✨ What's Working

✅ Complete routing with React Router
✅ State management with Context API
✅ LocalStorage persistence
✅ Form validation
✅ Mock authentication
✅ Protected routes
✅ Responsive design
✅ Material filtering
✅ Admin CRUD operations
✅ Student dashboard
✅ Volunteer registration
✅ Contact form
✅ Gallery with year filters
✅ Activities with type filters

## 🎉 Enjoy Testing!

The application is fully functional and ready to use. All features work with mock data and LocalStorage persistence.
