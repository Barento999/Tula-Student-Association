# Backend Setup Guide

Complete step-by-step guide to set up the Tula Students Association Backend API.

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- Cloudinary account
- npm or yarn

## Step 1: Install Dependencies

```bash
cd backend
npm install
```

## Step 2: MongoDB Setup

### Option A: Local MongoDB

```bash
# Install MongoDB locally
# macOS
brew install mongodb-community

# Ubuntu
sudo apt-get install mongodb

# Start MongoDB
mongod
```

### Option B: MongoDB Atlas (Cloud)

1. Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Create free account
3. Create cluster
4. Get connection string
5. Whitelist your IP address

## Step 3: Cloudinary Setup

1. Go to [cloudinary.com](https://cloudinary.com)
2. Sign up for free account
3. Go to Dashboard
4. Copy:
   - Cloud Name
   - API Key
   - API Secret

## Step 4: Environment Variables

Create `.env` file in backend directory:

```bash
cp .env.example .env
```

Edit `.env` with your values:

```env
NODE_ENV=development
PORT=5000

# MongoDB - Choose one:
# Local
MONGO_URI=mongodb://localhost:27017/tula-students

# Or Atlas
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/tula-students

# JWT
JWT_SECRET=your_super_secret_jwt_key_change_this
JWT_EXPIRE=30d

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name_here
CLOUDINARY_API_KEY=your_api_key_here
CLOUDINARY_API_SECRET=your_api_secret_here

# Frontend URL
CLIENT_URL=http://localhost:5173
```

## Step 5: Start the Server

### Development Mode (with auto-reload)

```bash
npm run dev
```

### Production Mode

```bash
npm start
```

Server will run on: `http://localhost:5000`

## Step 6: Test the API

### Test Root Endpoint

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

### Create Admin User (First Time)

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

### Login

```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@tula.com",
    "password": "admin123"
  }'
```

Save the returned token for authenticated requests.

## Step 7: Create Summer Session

```bash
curl -X POST http://localhost:5000/api/sessions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "name": "Summer 2024",
    "year": 2024,
    "startDate": "2024-06-01",
    "endDate": "2024-08-31",
    "status": "Active"
  }'
```

## Common Issues & Solutions

### Issue: MongoDB Connection Error

**Solution**:

- Check if MongoDB is running: `mongod`
- Verify MONGO_URI in `.env`
- For Atlas: Check IP whitelist

### Issue: Cloudinary Upload Fails

**Solution**:

- Verify credentials in `.env`
- Check file size (max 10MB)
- Ensure file type is allowed (PDF, DOC, PPT, images)

### Issue: JWT Token Invalid

**Solution**:

- Check JWT_SECRET is set in `.env`
- Ensure token is sent in header: `Authorization: Bearer <token>`
- Token might be expired (default 30 days)

### Issue: CORS Error

**Solution**:

- Update CLIENT_URL in `.env` to match frontend URL
- Check CORS configuration in `server.js`

## API Testing Tools

### Postman

1. Download [Postman](https://www.postman.com/downloads/)
2. Import API collection
3. Set environment variables
4. Test endpoints

### Thunder Client (VS Code Extension)

1. Install Thunder Client extension
2. Create new request
3. Test endpoints

### cURL (Command Line)

```bash
# Example: Get all sessions
curl http://localhost:5000/api/sessions

# Example: Protected route
curl http://localhost:5000/api/students \
  -H "Authorization: Bearer YOUR_TOKEN"
```

## Database Seeding (Optional)

Create `seed.js` file to populate initial data:

```javascript
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const SummerSession = require("./models/SummerSession");

dotenv.config();
connectDB();

const sessions = [
  {
    name: "Summer 2024",
    year: 2024,
    startDate: new Date("2024-06-01"),
    endDate: new Date("2024-08-31"),
    status: "Active",
  },
  {
    name: "Summer 2023",
    year: 2023,
    startDate: new Date("2023-06-01"),
    endDate: new Date("2023-08-31"),
    status: "Completed",
  },
];

const seedData = async () => {
  try {
    await SummerSession.deleteMany();
    await SummerSession.insertMany(sessions);
    console.log("Data seeded successfully");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedData();
```

Run: `node seed.js`

## Production Deployment

### Environment Variables

Set all `.env` variables in your hosting platform

### Recommended Platforms

- **Railway**: Easy deployment, free tier
- **Render**: Free tier available
- **Heroku**: Popular choice
- **DigitalOcean**: More control
- **AWS**: Enterprise solution

### Deployment Checklist

- [ ] Set NODE_ENV=production
- [ ] Use MongoDB Atlas (not local)
- [ ] Set secure JWT_SECRET
- [ ] Configure CORS for production domain
- [ ] Enable HTTPS
- [ ] Set up monitoring
- [ ] Configure backups

## Next Steps

1. Connect frontend to backend
2. Test all API endpoints
3. Implement additional features
4. Add monitoring and logging
5. Set up CI/CD pipeline

## Support

For issues or questions:

- Check API documentation in README.md
- Review error logs
- Test with Postman/Thunder Client
- Verify environment variables

## Security Best Practices

- Never commit `.env` file
- Use strong JWT_SECRET
- Rotate secrets regularly
- Implement rate limiting
- Add request logging
- Use HTTPS in production
- Validate all inputs
- Sanitize user data
