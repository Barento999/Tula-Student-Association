# 🚀 START HERE - Quick Setup Guide

## ✅ Issues Fixed!

The following issues have been resolved:

1. ✅ `.env` file created with default configuration
2. ✅ Duplicate index warnings fixed in models
3. ✅ MongoDB URI configured

---

## 📋 Before You Start

You need:

- ✅ Node.js installed
- ⚠️ **MongoDB running** (see below)
- ⚠️ Cloudinary account (for file uploads)

---

## 🔧 Step 1: Start MongoDB

### Option A: Local MongoDB (Recommended for Development)

**Windows:**

```bash
# If MongoDB is installed as a service
net start MongoDB

# Or run manually
mongod
```

**macOS:**

```bash
# If installed via Homebrew
brew services start mongodb-community

# Or run manually
mongod --config /usr/local/etc/mongod.conf
```

**Linux:**

```bash
sudo systemctl start mongodb
# Or
sudo service mongodb start
```

**Don't have MongoDB installed?**

- Download: https://www.mongodb.com/try/download/community
- Or use MongoDB Atlas (cloud): https://www.mongodb.com/cloud/atlas

### Option B: MongoDB Atlas (Cloud)

1. Go to https://www.mongodb.com/cloud/atlas
2. Create free account
3. Create cluster
4. Get connection string
5. Update `backend/.env`:

```env
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/tula-students
```

---

## 🎯 Step 2: Start Backend

```bash
cd backend
npm install
npm run dev
```

**Expected output:**

```
MongoDB Connected: localhost
Server running in development mode on port 5000
```

**If you see errors, check:**

- Is MongoDB running?
- Is `.env` file present in `backend/` folder?
- Is `MONGO_URI` set correctly?

---

## 🎨 Step 3: Start Frontend

Open a **new terminal** (keep backend running):

```bash
cd frontend
npm install
npm run dev
```

**Expected output:**

```
VITE ready in 500 ms
➜  Local:   http://localhost:5173/
```

---

## 🌐 Step 4: Open Application

Open your browser:

```
http://localhost:5173
```

You should see the Tula Students Association homepage!

---

## 🧪 Step 5: Test the System

### Create Admin User

**Option 1: Using the API**

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

**Option 2: Using the Frontend**

1. Go to http://localhost:5173/admin/login
2. Click "Register" (if available)
3. Or use the API method above first

### Login as Admin

1. Go to: http://localhost:5173/admin/login
2. Email: `admin@tula.com`
3. Password: `admin123`

---

## ⚙️ Configuration

### Update Cloudinary (Required for File Uploads)

1. Sign up at https://cloudinary.com (free)
2. Get your credentials from dashboard
3. Edit `backend/.env`:

```env
CLOUDINARY_CLOUD_NAME=your_actual_cloud_name
CLOUDINARY_API_KEY=your_actual_api_key
CLOUDINARY_API_SECRET=your_actual_api_secret
```

### Update JWT Secret (Recommended)

Edit `backend/.env`:

```env
JWT_SECRET=your_random_secret_key_here
```

---

## ✅ Verification Checklist

- [ ] MongoDB is running
- [ ] Backend server started (port 5000)
- [ ] Frontend server started (port 5173)
- [ ] Homepage loads in browser
- [ ] No errors in terminal
- [ ] Can navigate between pages

---

## 🐛 Troubleshooting

### MongoDB Connection Error

```
Error: connect ECONNREFUSED 127.0.0.1:27017
```

**Solution:** Start MongoDB (see Step 1)

### Port Already in Use

```
Error: listen EADDRINUSE :::5000
```

**Solution:**

```bash
# Change port in backend/.env
PORT=5001
```

### Module Not Found

```
Error: Cannot find module 'express'
```

**Solution:**

```bash
cd backend
npm install
```

### More Issues?

Check `backend/TROUBLESHOOTING.md` for detailed solutions.

---

## 📚 Next Steps

Once everything is running:

1. **Explore the Application**
   - Browse public pages
   - Register as student
   - Apply as volunteer
   - Login as admin

2. **Read Documentation**
   - `README.md` - Project overview
   - `INSTALLATION.md` - Detailed setup
   - `backend/API_EXAMPLES.md` - API usage
   - `QUICK_REFERENCE.md` - Quick commands

3. **Test Features**
   - Create summer sessions
   - Upload materials (need Cloudinary)
   - Track activities
   - Manage donations

---

## 🎉 Success!

If you see:

- ✅ Backend: "Server running in development mode on port 5000"
- ✅ Frontend: "Local: http://localhost:5173/"
- ✅ Browser: Tula Students Association homepage

**You're all set!** 🎊

---

## 📞 Need Help?

1. Check `backend/TROUBLESHOOTING.md`
2. Review error messages in terminal
3. Verify `.env` configuration
4. Make sure MongoDB is running
5. Check browser console (F12)

---

## 🔗 Quick Links

- Frontend: http://localhost:5173
- Backend: http://localhost:5000
- API Docs: http://localhost:5000/api

---

**Happy Coding!** 🚀

**Version**: 1.0.0 | **Status**: Ready to Use
