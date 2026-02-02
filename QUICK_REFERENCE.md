# Quick Reference Card

## 🚀 Start Commands

### Frontend

```bash
cd frontend
npm install
npm run dev
# http://localhost:5173
```

### Backend

```bash
cd backend
npm install
cp .env.example .env
# Edit .env
npm run dev
# http://localhost:5000
```

## 🔑 Test Credentials

**Admin:**

- Email: admin@tula.com
- Password: admin123

## 📁 Project Structure

```
tula-students-association/
├── frontend/          # React app
├── backend/           # Express API
├── README.md          # Main docs
└── FULL_STACK_SUMMARY.md
```

## 🌐 URLs

- Frontend: http://localhost:5173
- Backend: http://localhost:5000
- API Docs: http://localhost:5000/api

## 📚 Key Files

### Frontend

- `frontend/src/App.jsx` - Main app
- `frontend/src/context/AppContext.jsx` - State
- `frontend/src/pages/` - All pages

### Backend

- `backend/server.js` - Entry point
- `backend/models/` - Database models
- `backend/controllers/` - Business logic
- `backend/routes/` - API routes

## 🔐 Environment Variables

```env
# Backend .env
MONGO_URI=mongodb://localhost:27017/tula-students
JWT_SECRET=your_secret_key
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
CLIENT_URL=http://localhost:5173
```

## 📡 Common API Endpoints

```bash
# Auth
POST /api/auth/register
POST /api/auth/login
GET  /api/auth/me

# Sessions
GET  /api/sessions
POST /api/sessions

# Students
POST /api/students/register
GET  /api/students

# Materials
POST /api/materials/upload
GET  /api/materials

# Donations
POST /api/donations
GET  /api/donations
```

## 🛠️ Common Commands

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Check for errors
npm run lint
```

## 📦 Tech Stack

**Frontend:**

- React 19.2.0
- React Router
- Context API
- Vite

**Backend:**

- Node.js
- Express.js
- MongoDB
- JWT
- Cloudinary

## 🔍 Troubleshooting

**MongoDB Connection Error:**

```bash
# Start MongoDB
mongod
```

**Port Already in Use:**

```bash
# Change PORT in .env
PORT=5001
```

**CORS Error:**

```bash
# Update CLIENT_URL in backend .env
CLIENT_URL=http://localhost:5173
```

## 📖 Documentation

- `README.md` - Overview
- `FULL_STACK_SUMMARY.md` - Complete summary
- `backend/SETUP_GUIDE.md` - Backend setup
- `backend/API_EXAMPLES.md` - API examples
- `frontend/README.md` - Frontend docs

## 🎯 User Roles

- **Admin**: Full access
- **Volunteer**: Upload materials, create activities
- **Student**: View materials, download

## 🔄 Typical Workflow

1. Start MongoDB
2. Start backend: `cd backend && npm run dev`
3. Start frontend: `cd frontend && npm run dev`
4. Open browser: http://localhost:5173
5. Login or register
6. Test features

## 📝 Quick Test

```bash
# Test backend
curl http://localhost:5000

# Test login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@tula.com","password":"admin123"}'
```

## 🚀 Deploy

**Frontend:** Vercel, Netlify
**Backend:** Railway, Render
**Database:** MongoDB Atlas

## 💡 Tips

- Save JWT token after login
- Use Bearer token for protected routes
- Check browser console for errors
- Review API_EXAMPLES.md for request formats
- Use Postman for API testing

## 📞 Need Help?

1. Check documentation files
2. Review error messages
3. Verify environment variables
4. Test with provided credentials
5. Check MongoDB connection

---

**Version**: 1.0.0 | **Status**: Production Ready
