<div align="center">

# 🚀 Tula Students Association - Backend API

### _Powerful REST API for Community Education Management_

[![Node.js](https://img.shields.io/badge/Node.js-18.x-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-4.18-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-6.0-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![JWT](https://img.shields.io/badge/JWT-Auth-000000?style=for-the-badge&logo=json-web-tokens&logoColor=white)](https://jwt.io/)

**Complete REST API with authentication, file storage, and role-based access control**

[📖 API Docs](#-api-endpoints) • [🔧 Setup Guide](#-installation) • [🔐 Security](#-security-features) • [🚀 Deploy](#-deployment)

---

</div>

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Installation](#-installation)
- [Environment Variables](#-environment-variables)
- [API Endpoints](#-api-endpoints)
- [Authentication](#-authentication)
- [Project Structure](#-project-structure)
- [Security](#-security-features)
- [Deployment](#-deployment)

---

## ✨ Features

<table>
<tr>
<td width="50%">

### 🔐 Authentication & Security

- ✅ JWT-based authentication
- ✅ Role-based access control (RBAC)
- ✅ Password hashing with bcrypt
- ✅ Secure token management
- ✅ Protected routes

</td>
<td width="50%">

### 📚 Core Functionality

- ✅ User registration & login
- ✅ Student & volunteer management
- ✅ Summer session tracking
- ✅ Activity management
- ✅ Donation tracking

</td>
</tr>
<tr>
<td width="50%">

### 📁 File Management

- ✅ Cloudinary integration
- ✅ Secure file uploads
- ✅ Material storage & retrieval
- ✅ Download tracking
- ✅ File type validation

</td>
<td width="50%">

### 🛡️ Data Protection

- ✅ Input validation
- ✅ Error handling
- ✅ CORS configuration
- ✅ Environment variables
- ✅ MongoDB security

</td>
</tr>
</table>

---

## 🛠️ Tech Stack

<div align="center">

| Technology               | Purpose             | Version |
| ------------------------ | ------------------- | ------- |
| 🟢 **Node.js**           | Runtime Environment | 18.x    |
| ⚡ **Express.js**        | Web Framework       | 4.18.x  |
| 🍃 **MongoDB**           | Database            | 6.0+    |
| 🔷 **Mongoose**          | ODM                 | 7.x     |
| 🔑 **JWT**               | Authentication      | 9.x     |
| 🔒 **bcrypt**            | Password Hashing    | 5.x     |
| ☁️ **Cloudinary**        | File Storage        | 1.x     |
| 📤 **Multer**            | File Upload         | 1.x     |
| ✅ **express-validator** | Validation          | 7.x     |

</div>

---

## 🚀 Installation

### Prerequisites

```bash
node >= 18.0.0
npm >= 9.0.0
mongodb >= 6.0.0
```

### Quick Start

1️⃣ **Navigate to backend directory**

```bash
cd backend
```

2️⃣ **Install dependencies**

```bash
npm install
```

3️⃣ **Create environment file**

```bash
cp .env.example .env
```

4️⃣ **Configure environment variables** (see below)

5️⃣ **Start the server**

```bash
# Development mode with auto-reload
npm run dev

# Production mode
npm start
```

6️⃣ **Verify server is running**

```
Server running on http://localhost:5000
```

---

## 🔧 Environment Variables

Create a `.env` file in the backend directory:

```env
# Server Configuration
NODE_ENV=development
PORT=5000

# Database
MONGO_URI=mongodb://localhost:27017/tula-students
# Or MongoDB Atlas:
# MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/tula-students

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_here_change_in_production
JWT_EXPIRE=30d

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Frontend URL (for CORS)
CLIENT_URL=http://localhost:5173
```

### 🔑 Getting Cloudinary Credentials

1. Sign up at [cloudinary.com](https://cloudinary.com)
2. Go to Dashboard
3. Copy Cloud Name, API Key, and API Secret
4. Paste into `.env` file

---

## 📚 API Endpoints

### 🔐 Authentication

| Method | Endpoint                  | Description       | Auth Required |
| ------ | ------------------------- | ----------------- | ------------- |
| `POST` | `/api/auth/register`      | Register new user | ❌            |
| `POST` | `/api/auth/login`         | Login user        | ❌            |
| `GET`  | `/api/auth/me`            | Get current user  | ✅            |
| `PUT`  | `/api/auth/updateprofile` | Update profile    | ✅            |

### 🗓️ Summer Sessions

| Method   | Endpoint            | Description        | Auth Required |
| -------- | ------------------- | ------------------ | ------------- |
| `POST`   | `/api/sessions`     | Create session     | ✅ Admin      |
| `GET`    | `/api/sessions`     | Get all sessions   | ❌            |
| `GET`    | `/api/sessions/:id` | Get single session | ❌            |
| `PUT`    | `/api/sessions/:id` | Update session     | ✅ Admin      |
| `DELETE` | `/api/sessions/:id` | Delete session     | ✅ Admin      |

### 🤝 Volunteers

| Method | Endpoint                      | Description          | Auth Required |
| ------ | ----------------------------- | -------------------- | ------------- |
| `POST` | `/api/volunteers/register`    | Register volunteer   | ❌            |
| `GET`  | `/api/volunteers`             | Get all volunteers   | ✅ Admin      |
| `GET`  | `/api/volunteers/:id`         | Get single volunteer | ✅            |
| `PUT`  | `/api/volunteers/:id`         | Update volunteer     | ✅            |
| `PUT`  | `/api/volunteers/:id/approve` | Approve volunteer    | ✅ Admin      |

### 👨‍🎓 Students

| Method | Endpoint                 | Description        | Auth Required |
| ------ | ------------------------ | ------------------ | ------------- |
| `POST` | `/api/students/register` | Register student   | ❌            |
| `GET`  | `/api/students`          | Get all students   | ✅ Admin      |
| `GET`  | `/api/students/:id`      | Get single student | ✅            |
| `PUT`  | `/api/students/:id`      | Update student     | ✅            |

### 📖 Activities

| Method   | Endpoint                      | Description         | Auth Required      |
| -------- | ----------------------------- | ------------------- | ------------------ |
| `POST`   | `/api/activities`             | Create activity     | ✅ Admin/Volunteer |
| `GET`    | `/api/activities`             | Get all activities  | ❌                 |
| `GET`    | `/api/activities/:id`         | Get single activity | ❌                 |
| `GET`    | `/api/activities/session/:id` | Get by session      | ❌                 |
| `PUT`    | `/api/activities/:id`         | Update activity     | ✅ Admin           |
| `DELETE` | `/api/activities/:id`         | Delete activity     | ✅ Admin           |

### 📚 Materials

| Method   | Endpoint                      | Description         | Auth Required      |
| -------- | ----------------------------- | ------------------- | ------------------ |
| `POST`   | `/api/materials/upload`       | Upload material     | ✅ Admin/Volunteer |
| `GET`    | `/api/materials`              | Get all materials   | ❌                 |
| `GET`    | `/api/materials/:id`          | Get single material | ❌                 |
| `GET`    | `/api/materials/level/:level` | Get by level        | ❌                 |
| `PUT`    | `/api/materials/:id/download` | Track download      | ❌                 |
| `DELETE` | `/api/materials/:id`          | Delete material     | ✅ Admin           |

### 💰 Donations

| Method   | Endpoint                     | Description         | Auth Required |
| -------- | ---------------------------- | ------------------- | ------------- |
| `POST`   | `/api/donations`             | Create donation     | ✅            |
| `GET`    | `/api/donations`             | Get all donations   | ✅ Admin      |
| `GET`    | `/api/donations/:id`         | Get single donation | ✅ Admin      |
| `GET`    | `/api/donations/session/:id` | Get by session      | ✅ Admin      |
| `GET`    | `/api/donations/stats`       | Get statistics      | ✅ Admin      |
| `PUT`    | `/api/donations/:id`         | Update donation     | ✅ Admin      |
| `DELETE` | `/api/donations/:id`         | Delete donation     | ✅ Admin      |

---

## 🔐 Authentication

### Using JWT Tokens

Include the JWT token in request headers:

```bash
Authorization: Bearer <your_jwt_token>
```

### Example Login Request

```bash
POST /api/auth/login
Content-Type: application/json

{
  "email": "admin@tula.org",
  "password": "admin123"
}
```

### Example Response

```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "Admin User",
    "email": "admin@tula.org",
    "role": "admin"
  }
}
```

---

## 👥 User Roles

<table>
<tr>
<td width="33%">

### 🛡️ Admin

- Full system access
- User management
- Content moderation
- Session management
- Analytics access

</td>
<td width="33%">

### 👨‍🏫 Volunteer

- Upload materials
- Create activities
- View students
- Track sessions
- Update profile

</td>
<td width="33%">

### 👨‍🎓 Student

- View materials
- Download resources
- Update profile
- View activities
- Track progress

</td>
</tr>
</table>

---

## 📁 Project Structure

```
backend/
├── 📂 config/
│   ├── db.js                    # MongoDB connection
│   └── cloudinary.js            # Cloudinary setup
├── 📂 models/
│   ├── User.js                  # User model
│   ├── SummerSession.js         # Session model
│   ├── VolunteerProfile.js      # Volunteer model
│   ├── StudentProfile.js        # Student model
│   ├── Activity.js              # Activity model
│   ├── Material.js              # Material model
│   └── Donation.js              # Donation model
├── 📂 controllers/
│   ├── authController.js        # Auth logic
│   ├── sessionController.js     # Session logic
│   ├── volunteerController.js   # Volunteer logic
│   ├── studentController.js     # Student logic
│   ├── activityController.js    # Activity logic
│   ├── materialController.js    # Material logic
│   └── donationController.js    # Donation logic
├── 📂 routes/
│   ├── authRoutes.js            # Auth endpoints
│   ├── sessionRoutes.js         # Session endpoints
│   ├── volunteerRoutes.js       # Volunteer endpoints
│   ├── studentRoutes.js         # Student endpoints
│   ├── activityRoutes.js        # Activity endpoints
│   ├── materialRoutes.js        # Material endpoints
│   └── donationRoutes.js        # Donation endpoints
├── 📂 middleware/
│   ├── authMiddleware.js        # JWT verification
│   ├── roleMiddleware.js        # Role checking
│   └── uploadMiddleware.js      # File upload
├── 📂 utils/
│   └── generateToken.js         # JWT generation
├── .env                         # Environment variables
├── .env.example                 # Example env file
├── .gitignore                   # Git ignore rules
├── package.json                 # Dependencies
├── server.js                    # Entry point
└── README.md                    # Documentation
```

---

## 🛡️ Security Features

### 🔒 Password Security

- Passwords hashed with bcrypt (10 rounds)
- Never stored in plain text
- Secure comparison methods

### 🔑 JWT Security

- Signed tokens with secret key
- Configurable expiration
- Token verification middleware

### 🚪 Access Control

- Role-based permissions
- Protected routes
- Resource ownership validation

### 📝 Input Validation

- express-validator for all inputs
- Sanitization of user data
- Type checking and constraints

### 🌐 CORS Configuration

- Configured for frontend origin
- Credentials support
- Method restrictions

### 📁 File Upload Security

- File type validation
- Size limits
- Secure storage with Cloudinary

---

## 📝 Example Requests

### Register Student

```bash
curl -X POST http://localhost:5000/api/students/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "school": "Tula High School",
    "gradeLevel": "Secondary",
    "grade": "Grade 8",
    "subjectInterests": ["Math", "Science"],
    "guardianName": "Jane Doe",
    "phone": "+251912345678"
  }'
```

### Upload Material

```bash
curl -X POST http://localhost:5000/api/materials/upload \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -F "title=Math Grade 8 Notes" \
  -F "subject=Mathematics" \
  -F "level=Secondary" \
  -F "grade=Grade 8" \
  -F "fileType=PDF" \
  -F "description=Complete notes for Grade 8 Math" \
  -F "summerSession=SESSION_ID" \
  -F "file=@/path/to/file.pdf"
```

---

## 🚀 Deployment

### Deployment Platforms

<table>
<tr>
<td align="center" width="25%">

**Railway**  
[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app)

</td>
<td align="center" width="25%">

**Render**  
Easy deployment  
Free tier available

</td>
<td align="center" width="25%">

**Heroku**  
Classic platform  
Add-ons available

</td>
<td align="center" width="25%">

**DigitalOcean**  
Full control  
Scalable

</td>
</tr>
</table>

### Deployment Checklist

- [ ] Set `NODE_ENV=production`
- [ ] Configure MongoDB Atlas
- [ ] Set secure `JWT_SECRET`
- [ ] Configure Cloudinary
- [ ] Set `CLIENT_URL` to production frontend
- [ ] Enable HTTPS
- [ ] Set up monitoring
- [ ] Configure backups

---

## 🧪 Testing

```bash
# Run tests (when implemented)
npm test

# Run with coverage
npm run test:coverage
```

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

## 🙏 Acknowledgments

- Built with ❤️ for the Tula Students Association
- Powered by [Node.js](https://nodejs.org/)
- Database by [MongoDB](https://www.mongodb.com/)
- File storage by [Cloudinary](https://cloudinary.com/)
- Authentication with [JWT](https://jwt.io/)

---

<div align="center">

### 🌟 Star this repo if you find it helpful!

**Made with 💚 by the Tula Students Association Development Team**

[⬆ Back to Top](#-tula-students-association---backend-api)

</div>
