# Complete Installation Guide

Step-by-step guide to set up the Tula Students Association full-stack application.

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- ✅ **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
- ✅ **MongoDB** (local or Atlas account) - [Download](https://www.mongodb.com/try/download/community)
- ✅ **Git** (optional) - [Download](https://git-scm.com/)
- ✅ **Code Editor** (VS Code recommended) - [Download](https://code.visualstudio.com/)

### Additional Requirements

- **Cloudinary Account** (free) - [Sign up](https://cloudinary.com/)
- **npm** or **yarn** (comes with Node.js)

---

## 🚀 Installation Steps

### Step 1: Download/Clone Project

If using Git:

```bash
git clone <repository-url>
cd tula-students-association
```

Or download and extract the ZIP file.

### Step 2: Backend Setup

#### 2.1 Navigate to Backend Directory

```bash
cd backend
```

#### 2.2 Install Dependencies

```bash
npm install
```

This will install:

- express
- mongoose
- jsonwebtoken
- bcryptjs
- cloudinary
- multer
- express-validator
- cors
- dotenv

#### 2.3 Set Up MongoDB

**Option A: Local MongoDB**

```bash
# macOS (using Homebrew)
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community

# Windows
# Download and install from mongodb.com
# Start MongoDB service from Services

# Linux (Ubuntu)
sudo apt-get install mongodb
sudo systemctl start mongodb
```

**Option B: MongoDB Atlas (Cloud - Recommended)**

1. Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account
3. Create a new cluster (free tier)
4. Click "Connect" → "Connect your application"
5. Copy the connection string
6. Replace `<password>` with your database password
7. Replace `<dbname>` with `tula-students`

#### 2.4 Set Up Cloudinary

1. Go to [cloudinary.com](https://cloudinary.com/)
2. Sign up for a free account
3. Go to Dashboard
4. Copy the following:
   - Cloud Name
   - API Key
   - API Secret

#### 2.5 Create Environment File

```bash
# Copy the example file
cp .env.example .env

# Or on Windows
copy .env.example .env
```

#### 2.6 Edit .env File

Open `.env` in your code editor and update:

```env
NODE_ENV=development
PORT=5000

# MongoDB Connection
# For local MongoDB:
MONGO_URI=mongodb://localhost:27017/tula-students

# OR for MongoDB Atlas:
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/tula-students

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_change_this_to_something_random
JWT_EXPIRE=30d

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloud_name_here
CLOUDINARY_API_KEY=your_api_key_here
CLOUDINARY_API_SECRET=your_api_secret_here

# Frontend URL
CLIENT_URL=http://localhost:5173
```

**Important:** Change `JWT_SECRET` to a random string!

#### 2.7 Start Backend Server

```bash
# Development mode (with auto-reload)
npm run dev

# Or production mode
npm start
```

You should see:

```
MongoDB Connected: localhost
Server running in development mode on port 5000
```

#### 2.8 Test Backend

Open browser or use curl:

```bash
curl http://localhost:5000
```

Expected response:

```json
{
  "message": "Tula Students Association API",
  "version": "1.0.0"
}
```

### Step 3: Frontend Setup

#### 3.1 Open New Terminal

Keep the backend running and open a new terminal window.

#### 3.2 Navigate to Frontend Directory

```bash
cd frontend
```

#### 3.3 Install Dependencies

```bash
npm install
```

This will install:

- react
- react-dom
- react-router-dom
- vite
- And other dependencies

#### 3.4 Start Frontend Server

```bash
npm run dev
```

You should see:

```
VITE v6.0.11  ready in 500 ms

➜  Local:   http://localhost:5173/
➜  Network: use --host to expose
```

#### 3.5 Open Application

Open your browser and go to:

```
http://localhost:5173
```

You should see the Tula Students Association homepage!

---

## ✅ Verification Checklist

After installation, verify everything works:

### Backend Verification

- [ ] Backend server running on port 5000
- [ ] MongoDB connected successfully
- [ ] No error messages in terminal
- [ ] API root endpoint responds

### Frontend Verification

- [ ] Frontend server running on port 5173
- [ ] Homepage loads correctly
- [ ] Navigation works
- [ ] No console errors (F12 → Console)

### Database Verification

```bash
# Check MongoDB connection
# In MongoDB shell or Compass
use tula-students
show collections
```

### API Verification

```bash
# Test registration
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"test123","role":"student"}'
```

---

## 🧪 Initial Setup & Testing

### 1. Create Admin User

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Admin User",
    "email": "admin@tula.com",
    "password": "admin123",
    "role": "admin"
  }'
```

### 2. Login as Admin

Go to: http://localhost:5173/admin/login

Credentials:

- Email: admin@tula.com
- Password: admin123

### 3. Create Summer Session

In the admin dashboard:

1. Go to "Sessions" tab
2. Click "Create New Session"
3. Fill in:
   - Name: Summer 2024
   - Year: 2024
   - Start Date: 2024-06-01
   - End Date: 2024-08-31
   - Status: Active

### 4. Test Student Registration

1. Go to: http://localhost:5173/student-registration
2. Fill in the form
3. Submit
4. You should be auto-logged in

---

## 🔧 Troubleshooting

### Issue: MongoDB Connection Failed

**Solution:**

```bash
# Check if MongoDB is running
# macOS/Linux
ps aux | grep mongod

# Windows
tasklist | findstr mongod

# Start MongoDB if not running
# macOS
brew services start mongodb-community

# Linux
sudo systemctl start mongodb

# Windows
net start MongoDB
```

### Issue: Port Already in Use

**Solution:**

```bash
# Find process using port 5000
# macOS/Linux
lsof -i :5000

# Windows
netstat -ano | findstr :5000

# Kill the process or change PORT in .env
PORT=5001
```

### Issue: Cloudinary Upload Fails

**Solution:**

1. Verify credentials in `.env`
2. Check Cloudinary dashboard
3. Ensure file size < 10MB
4. Check file type is allowed

### Issue: CORS Error

**Solution:**

1. Verify `CLIENT_URL` in backend `.env`
2. Restart backend server
3. Clear browser cache

### Issue: JWT Token Invalid

**Solution:**

1. Check `JWT_SECRET` is set in `.env`
2. Restart backend server
3. Clear localStorage in browser
4. Login again

### Issue: npm install fails

**Solution:**

```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Reinstall
npm install
```

---

## 📱 Development Tools

### Recommended VS Code Extensions

- ESLint
- Prettier
- MongoDB for VS Code
- Thunder Client (API testing)
- GitLens

### Browser Extensions

- React Developer Tools
- Redux DevTools (optional)

### API Testing Tools

- **Postman** - [Download](https://www.postman.com/downloads/)
- **Thunder Client** - VS Code extension
- **Insomnia** - [Download](https://insomnia.rest/)

---

## 🌐 Environment Setup

### Development Environment

```env
NODE_ENV=development
PORT=5000
MONGO_URI=mongodb://localhost:27017/tula-students
CLIENT_URL=http://localhost:5173
```

### Production Environment

```env
NODE_ENV=production
PORT=5000
MONGO_URI=mongodb+srv://user:pass@cluster.mongodb.net/tula-students
CLIENT_URL=https://your-domain.com
```

---

## 📊 System Requirements

### Minimum Requirements

- **CPU**: Dual-core processor
- **RAM**: 4GB
- **Storage**: 500MB free space
- **OS**: Windows 10, macOS 10.14+, Ubuntu 18.04+

### Recommended Requirements

- **CPU**: Quad-core processor
- **RAM**: 8GB
- **Storage**: 1GB free space
- **Internet**: Stable connection for Cloudinary

---

## 🚀 Next Steps

After successful installation:

1. ✅ Read `QUICK_REFERENCE.md` for quick commands
2. ✅ Review `backend/API_EXAMPLES.md` for API usage
3. ✅ Check `frontend/QUICK_START.md` for testing guide
4. ✅ Explore `FULL_STACK_SUMMARY.md` for complete overview

---

## 📞 Getting Help

If you encounter issues:

1. **Check Documentation**
   - README.md files
   - SETUP_GUIDE.md
   - API_EXAMPLES.md

2. **Review Error Messages**
   - Backend terminal
   - Frontend terminal
   - Browser console (F12)

3. **Verify Configuration**
   - .env file
   - MongoDB connection
   - Cloudinary credentials

4. **Test Components**
   - Backend API endpoints
   - Frontend pages
   - Database connection

---

## ✨ Success!

If you see:

- ✅ Backend running on port 5000
- ✅ Frontend running on port 5173
- ✅ MongoDB connected
- ✅ Homepage loads correctly

**Congratulations! Your installation is complete!** 🎉

You can now:

- Register students and volunteers
- Create summer sessions
- Upload learning materials
- Track donations
- Manage the system as admin

---

## 📚 Additional Resources

- **MongoDB Docs**: https://docs.mongodb.com/
- **Express.js Docs**: https://expressjs.com/
- **React Docs**: https://react.dev/
- **Cloudinary Docs**: https://cloudinary.com/documentation
- **Node.js Docs**: https://nodejs.org/docs/

---

**Happy Coding!** 🚀

**Version**: 1.0.0 | **Last Updated**: February 2026
