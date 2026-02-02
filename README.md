# Tula Students Association

Complete full-stack web application for the Tula Students Association - a community-based, non-profit system supporting education in Tula Village.

## 🎯 Project Overview

The Tula Students Association is a seasonal initiative where university students return home during summer vacation (June-August) to:

- Teach junior students at elementary, secondary, and preparatory levels
- Support the local community with educational materials and resources
- Provide downloadable learning materials for registered students
- Track donations and community activities

## 🏗️ Project Structure

```
tula-students-association/
├── frontend/          # React + Vite frontend application
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   └── ...
│   └── package.json
│
├── backend/           # Node.js + Express REST API
│   ├── models/
│   ├── controllers/
│   ├── routes/
│   ├── middleware/
│   ├── config/
│   └── package.json
│
└── README.md
```

## 🚀 Tech Stack

### Frontend

- React 19.2.0
- React Router DOM
- Context API (State Management)
- Custom CSS (WhatsApp-inspired design)
- Vite (Build tool)

### Backend

- Node.js + Express.js
- MongoDB + Mongoose
- JWT Authentication
- Cloudinary (File Storage)
- Multer (File Upload)
- bcrypt (Password Hashing)
- express-validator

## ✨ Features

### Public Features

- Home page with mission and impact statistics
- About page with organization background
- Programs overview
- Photo gallery by year
- Contact form
- Donation page with payment integration

### Student Features

- Registration with profile creation
- Personalized dashboard
- Browse and download learning materials
- Filter materials by subject, level, and session

### Volunteer Features

- Application submission
- Profile management
- Upload learning materials
- Track teaching activities

### Admin Features

- Complete dashboard with statistics
- Manage students and volunteers
- Upload and manage learning materials
- Create and manage summer sessions
- Track donations
- View all activities

## 🎨 Design System

**Color Palette:**

- Main Background: `#0B141A`
- Primary Text: `#E9EDEF`
- Secondary Text: `#8696A0`
- WhatsApp Green: `#25D366`
- Unread Badge Green: `#00A884`

**Design Principles:**

- Clean, educational, humanitarian UI
- Mobile-first responsive design
- Smooth animations and transitions
- Accessible and semantic HTML

## 📦 Installation & Setup

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- Cloudinary account
- npm or yarn

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on: `http://localhost:5173`

### Backend Setup

```bash
cd backend
npm install

# Create .env file
cp .env.example .env

# Edit .env with your credentials
# Start server
npm run dev
```

Backend runs on: `http://localhost:5000`

**See detailed setup instructions:**

- Frontend: `frontend/README.md`
- Backend: `backend/SETUP_GUIDE.md`

## 🔐 Environment Variables

### Backend (.env)

```env
NODE_ENV=development
PORT=5000
MONGO_URI=mongodb://localhost:27017/tula-students
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRE=30d
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
CLIENT_URL=http://localhost:5173
```

## 📚 API Documentation

### Authentication

- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Summer Sessions

- `POST /api/sessions` - Create session (Admin)
- `GET /api/sessions` - Get all sessions
- `PUT /api/sessions/:id` - Update session (Admin)
- `DELETE /api/sessions/:id` - Delete session (Admin)

### Students

- `POST /api/students/register` - Register student
- `GET /api/students` - Get all students (Admin)
- `GET /api/students/:id` - Get student profile
- `PUT /api/students/:id` - Update student profile

### Volunteers

- `POST /api/volunteers/register` - Register volunteer
- `GET /api/volunteers` - Get all volunteers (Admin)
- `PUT /api/volunteers/:id/approve` - Approve volunteer (Admin)

### Materials

- `POST /api/materials/upload` - Upload material (Admin/Volunteer)
- `GET /api/materials` - Get all materials
- `GET /api/materials/level/:level` - Get by level
- `DELETE /api/materials/:id` - Delete material (Admin)

### Activities

- `POST /api/activities` - Create activity (Admin/Volunteer)
- `GET /api/activities` - Get all activities
- `GET /api/activities/session/:sessionId` - Get by session

### Donations

- `POST /api/donations` - Create donation
- `GET /api/donations` - Get all donations (Admin)
- `GET /api/donations/stats` - Get statistics (Admin)

## 👥 User Roles

- **Admin**: Full system access
- **Volunteer**: Upload materials, create activities
- **Student**: View and download materials

## 🧪 Testing

### Test Admin Login

**Credentials:**

- Username: `admin`
- Password: `admin123`

### Test Student Flow

1. Register as student
2. Auto-login after registration
3. Access dashboard
4. Browse materials

## 🚀 Deployment

### Frontend Deployment

- Vercel (Recommended)
- Netlify
- GitHub Pages

### Backend Deployment

- Railway (Recommended)
- Render
- Heroku
- DigitalOcean

### Database

- MongoDB Atlas (Cloud)

### File Storage

- Cloudinary (Configured)

## 📝 Documentation Files

- `README.md` - This file
- `frontend/README.md` - Frontend documentation
- `frontend/QUICK_START.md` - Frontend testing guide
- `frontend/FEATURES_CHECKLIST.md` - Complete features list
- `backend/README.md` - Backend API documentation
- `backend/SETUP_GUIDE.md` - Backend setup guide

## 🔒 Security Features

- JWT token authentication
- Password hashing with bcrypt
- Role-based access control
- Input validation
- CORS configuration
- Secure file upload
- Environment variables

## 🌟 Key Highlights

- **100% Complete**: All features implemented
- **Production Ready**: Clean, scalable code
- **Fully Responsive**: Works on all devices
- **Secure**: JWT auth, role-based access
- **Well Documented**: Comprehensive guides
- **Easy to Deploy**: Ready for production

## 📄 License

MIT

## 🙏 Acknowledgments

Built for the Tula Students Association community initiative to support education in Tula Village.

## 📞 Support

For questions or issues:

- Check documentation files
- Review setup guides
- Test with provided credentials

---

**Status**: ✅ Production Ready | **Version**: 1.0.0 | **Last Updated**: 2024
