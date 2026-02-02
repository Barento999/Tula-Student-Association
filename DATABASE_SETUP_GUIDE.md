# Database Integration Complete! 🎉

Your frontend is now connected to the MongoDB Atlas backend database!

## What Changed

### ✅ Frontend Now Uses Real Database

- **Before**: Data stored in browser localStorage (temporary)
- **After**: Data stored in MongoDB Atlas (permanent)

### ✅ Real Authentication

- **Before**: Simulated login
- **After**: JWT token-based authentication with secure password hashing

### ✅ API Integration

- Created `frontend/src/services/api.js` - API service layer
- Updated `frontend/src/context/AppContext.jsx` - Now uses backend API
- Created `frontend/.env` - Environment configuration

## How to Start the Application

### 1. Start the Backend Server

```bash
cd backend
npm install  # If not already installed
npm start
```

The backend will run on: `http://localhost:5000`

You should see:

```
Server running in development mode on port 5000
MongoDB Connected: cluster0.ha01uqj.mongodb.net
```

### 2. Start the Frontend

Open a NEW terminal window:

```bash
cd frontend
npm install  # If not already installed
npm run dev
```

The frontend will run on: `http://localhost:5173`

## Testing the Integration

### 1. Register a New Student

1. Go to `http://localhost:5173`
2. Click "Register" → "Student Registration"
3. Fill out the form with:
   - First Name, Middle Name, Last Name
   - Email (must be unique)
   - Password (min 6 characters)
   - Phone, Gender
   - School, Level, Grade
   - Guardian Name
   - Subject Interests (select at least one)
4. Click "Complete Registration"
5. You'll be auto-logged in and redirected to student profile

### 2. Register a Volunteer

1. Click "Volunteer" in navigation
2. Fill out the volunteer form
3. After registration, you'll be auto-logged in

### 3. Admin Login

To access admin dashboard, you need to create an admin user in the database.

**Option 1: Using MongoDB Compass or Atlas**

1. Connect to your database
2. Go to `tula-students` database → `users` collection
3. Create a new document:

```json
{
  "name": "Admin User",
  "email": "admin@tula.org",
  "password": "$2a$10$YourHashedPasswordHere",
  "role": "admin",
  "isActive": true,
  "createdAt": "2024-01-01T00:00:00.000Z"
}
```

**Option 2: Create via API** (easier)
Use Postman or curl:

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Admin User",
    "email": "admin@tula.org",
    "password": "admin123",
    "role": "admin"
  }'
```

Then login at: `http://localhost:5173/admin/login`

## API Endpoints Available

### Authentication

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (requires token)

### Students

- `POST /api/students/register` - Register student (creates user + profile)
- `GET /api/students` - Get all students (admin only)
- `GET /api/students/:id` - Get single student
- `PUT /api/students/:id` - Update student profile

### Volunteers

- `POST /api/volunteers/register` - Register volunteer
- `GET /api/volunteers` - Get all volunteers (admin only)
- `GET /api/volunteers/:id` - Get single volunteer
- `PUT /api/volunteers/:id` - Update volunteer profile

### Materials

- `POST /api/materials` - Create material (admin only)
- `GET /api/materials` - Get all materials
- `GET /api/materials/:id` - Get single material
- `PUT /api/materials/:id` - Update material (admin only)
- `DELETE /api/materials/:id` - Delete material (admin only)

### Sessions

- `POST /api/sessions` - Create session (admin only)
- `GET /api/sessions` - Get all sessions
- `GET /api/sessions/:id` - Get single session
- `PUT /api/sessions/:id` - Update session (admin only)
- `DELETE /api/sessions/:id` - Delete session (admin only)
- `PUT /api/sessions/:id/activate` - Set session as active (admin only)

## Environment Variables

### Backend (.env)

```env
NODE_ENV=development
PORT=5000
MONGO_URI=mongodb+srv://barentohashum11_db_user:EvaGRk6Uym8MkbIA@cluster0.ha01uqj.mongodb.net/tula-students?retryWrites=true&w=majority&appName=Cluster0
JWT_SECRET=tula_students_secret_key_2024_change_this_in_production
JWT_EXPIRE=30d
CLIENT_URL=http://localhost:5173
```

### Frontend (.env)

```env
VITE_API_URL=http://localhost:5000/api
```

## Data Flow

### Registration Flow:

1. User fills form → Frontend
2. Frontend sends data → Backend API
3. Backend creates User + Profile → MongoDB
4. Backend returns user with JWT token
5. Frontend stores token → localStorage
6. User is logged in automatically

### Login Flow:

1. User enters credentials → Frontend
2. Frontend sends to `/api/auth/login` → Backend
3. Backend verifies password → MongoDB
4. Backend returns user with JWT token
5. Frontend stores token and fetches all data
6. User sees their dashboard

### CRUD Operations:

1. User performs action (create/update/delete)
2. Frontend sends request with JWT token
3. Backend verifies token and permission
4. Backend performs operation → MongoDB
5. Backend returns updated data
6. Frontend updates local state
7. UI reflects changes immediately

## Troubleshooting

### Backend won't start

- Check if MongoDB URI is correct in `backend/.env`
- Ensure port 5000 is not in use
- Run `npm install` in backend folder

### Frontend can't connect to backend

- Ensure backend is running on port 5000
- Check `frontend/.env` has correct API URL
- Check browser console for CORS errors

### "User already exists" error

- Email must be unique
- Try a different email address
- Or delete the user from MongoDB

### Authentication errors

- Clear localStorage: `localStorage.clear()` in browser console
- Logout and login again
- Check if JWT_SECRET matches in backend

### Data not showing in admin dashboard

- Ensure you're logged in as admin
- Check backend console for errors
- Verify data exists in MongoDB

## Database Structure

### Collections:

1. **users** - All user accounts (students, volunteers, admins)
2. **studentprofiles** - Student-specific data
3. **volunteerprofiles** - Volunteer-specific data
4. **materials** - Learning materials
5. **summersessions** - Summer session information
6. **activities** - Activity records
7. **donations** - Donation records

## Security Features

✅ Password hashing with bcrypt
✅ JWT token authentication
✅ Protected routes (require authentication)
✅ Role-based access control (admin, student, volunteer)
✅ Input validation
✅ CORS protection
✅ MongoDB injection prevention

## Next Steps

1. **Test all features** - Register students, volunteers, create materials
2. **Create admin account** - Follow instructions above
3. **Customize** - Add more features as needed
4. **Deploy** - When ready, deploy to production

## Production Deployment Notes

When deploying to production:

1. Update `MONGO_URI` to production database
2. Change `JWT_SECRET` to a strong random string
3. Set `NODE_ENV=production`
4. Update `CLIENT_URL` to production frontend URL
5. Update `VITE_API_URL` to production backend URL
6. Enable HTTPS
7. Set up proper error logging
8. Configure rate limiting
9. Set up database backups

## Support

If you encounter any issues:

1. Check backend console for errors
2. Check browser console for errors
3. Verify both servers are running
4. Check MongoDB Atlas connection
5. Ensure environment variables are correct

---

**Congratulations! Your application now has a fully functional database backend!** 🚀
