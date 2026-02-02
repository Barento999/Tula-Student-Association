# Troubleshooting Guide

## Common Issues and Solutions

### 1. MongoDB Connection Error

**Error:**

```
Error: The `uri` parameter to `openUri()` must be a string, got "undefined"
```

**Solution:**

1. Make sure `.env` file exists in the `backend/` directory
2. Check that `MONGO_URI` is set in `.env`
3. Verify MongoDB is running (if using local)

```bash
# Check if .env exists
ls backend/.env

# If not, create it
cp backend/.env.example backend/.env

# Edit .env and set MONGO_URI
# For local MongoDB:
MONGO_URI=mongodb://localhost:27017/tula-students

# For MongoDB Atlas:
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/tula-students
```

### 2. Duplicate Index Warning

**Warning:**

```
[MONGOOSE] Warning: Duplicate schema index on {"userId":1} found
```

**Solution:**
This has been fixed in the latest version. If you still see it:

1. Drop the database and restart
2. Or ignore it (it's just a warning, not an error)

```bash
# In MongoDB shell
use tula-students
db.dropDatabase()
```

### 3. Port Already in Use

**Error:**

```
Error: listen EADDRINUSE: address already in use :::5000
```

**Solution:**

```bash
# Find process using port 5000
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# macOS/Linux
lsof -i :5000
kill -9 <PID>

# Or change port in .env
PORT=5001
```

### 4. Cloudinary Upload Fails

**Error:**

```
Error: Must supply api_key
```

**Solution:**

1. Sign up at cloudinary.com
2. Get your credentials from dashboard
3. Add to `.env`:

```env
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### 5. CORS Error

**Error:**

```
Access to fetch at 'http://localhost:5000' from origin 'http://localhost:5173' has been blocked by CORS
```

**Solution:**

1. Check `CLIENT_URL` in backend `.env`
2. Make sure it matches your frontend URL

```env
CLIENT_URL=http://localhost:5173
```

### 6. JWT Token Invalid

**Error:**

```
Error: jwt malformed
```

**Solution:**

1. Check `JWT_SECRET` is set in `.env`
2. Clear localStorage in browser
3. Login again

### 7. Module Not Found

**Error:**

```
Error: Cannot find module 'express'
```

**Solution:**

```bash
cd backend
npm install
```

### 8. MongoDB Not Running

**Error:**

```
MongoNetworkError: connect ECONNREFUSED 127.0.0.1:27017
```

**Solution:**

```bash
# Start MongoDB
# macOS
brew services start mongodb-community

# Linux
sudo systemctl start mongodb

# Windows
net start MongoDB

# Or use MongoDB Atlas (cloud)
```

### 9. File Upload Size Limit

**Error:**

```
Error: File too large
```

**Solution:**
The limit is set to 10MB. To change:

```javascript
// backend/middleware/uploadMiddleware.js
limits: {
  fileSize: 20 * 1024 * 1024, // 20MB
}
```

### 10. Environment Variables Not Loading

**Error:**

```
undefined values in process.env
```

**Solution:**

1. Make sure `.env` file is in `backend/` directory
2. Restart the server
3. Check file is named exactly `.env` (not `.env.txt`)

```bash
# Verify .env location
ls -la backend/.env

# Restart server
npm run dev
```

## Quick Fixes

### Reset Everything

```bash
# Stop all servers
# Delete node_modules
rm -rf backend/node_modules

# Delete .env
rm backend/.env

# Reinstall
cd backend
npm install
cp .env.example .env
# Edit .env with your values
npm run dev
```

### Check Server Status

```bash
# Test backend
curl http://localhost:5000

# Expected response:
# {"message":"Tula Students Association API","version":"1.0.0"}
```

### Verify MongoDB Connection

```bash
# MongoDB shell
mongosh

# Or MongoDB Compass
# Connect to: mongodb://localhost:27017
```

### Test API Endpoint

```bash
# Test registration
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@test.com","password":"test123","role":"student"}'
```

## Getting Help

1. Check error message carefully
2. Review `.env` configuration
3. Verify MongoDB is running
4. Check console logs
5. Review documentation files

## Useful Commands

```bash
# Check Node version
node -v

# Check npm version
npm -v

# Check MongoDB status
mongod --version

# View backend logs
cd backend
npm run dev

# Clear npm cache
npm cache clean --force

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

## Contact & Support

- Check README.md files
- Review SETUP_GUIDE.md
- Read API_EXAMPLES.md
- Check INSTALLATION.md
