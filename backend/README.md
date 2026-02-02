# Tula Students Association - Backend API

Complete REST API for the Tula Students Association community-based, non-profit system.

## 🚀 Features

- JWT Authentication & Authorization
- Role-Based Access Control (Admin, Volunteer, Student)
- Summer Session Management
- Volunteer & Student Registration
- Teaching Activity Tracking
- Learning Material Upload/Download (Cloudinary)
- Donation Tracking
- Secure File Storage
- Input Validation
- Error Handling

## 🛠️ Tech Stack

- Node.js
- Express.js
- MongoDB with Mongoose
- JWT Authentication
- Cloudinary (File Storage)
- Multer (File Upload)
- bcrypt (Password Hashing)
- express-validator (Validation)

## 📦 Installation

1. Clone the repository

```bash
cd backend
```

2. Install dependencies

```bash
npm install
```

3. Create `.env` file

```bash
cp .env.example .env
```

4. Configure environment variables in `.env`:

```env
NODE_ENV=development
PORT=5000
MONGO_URI=mongodb://localhost:27017/tula-students
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRE=30d
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
CLIENT_URL=http://localhost:5173
```

5. Start the server

```bash
# Development
npm run dev

# Production
npm start
```

## 📚 API Endpoints

### Authentication

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (Protected)

### Summer Sessions

- `POST /api/sessions` - Create session (Admin)
- `GET /api/sessions` - Get all sessions
- `GET /api/sessions/:id` - Get single session
- `PUT /api/sessions/:id` - Update session (Admin)
- `DELETE /api/sessions/:id` - Delete session (Admin)

### Volunteers

- `POST /api/volunteers/register` - Register volunteer
- `GET /api/volunteers` - Get all volunteers (Admin)
- `GET /api/volunteers/:id` - Get single volunteer
- `PUT /api/volunteers/:id` - Update volunteer profile
- `PUT /api/volunteers/:id/approve` - Approve volunteer (Admin)

### Students

- `POST /api/students/register` - Register student
- `GET /api/students` - Get all students (Admin)
- `GET /api/students/:id` - Get single student
- `PUT /api/students/:id` - Update student profile

### Activities

- `POST /api/activities` - Create activity (Admin/Volunteer)
- `GET /api/activities` - Get all activities
- `GET /api/activities/:id` - Get single activity
- `GET /api/activities/session/:sessionId` - Get activities by session
- `PUT /api/activities/:id` - Update activity (Admin)
- `DELETE /api/activities/:id` - Delete activity (Admin)

### Materials

- `POST /api/materials/upload` - Upload material (Admin/Volunteer)
- `GET /api/materials` - Get all materials
- `GET /api/materials/:id` - Get single material
- `GET /api/materials/level/:level` - Get materials by level
- `PUT /api/materials/:id/download` - Increment download count
- `DELETE /api/materials/:id` - Delete material (Admin)

### Donations

- `POST /api/donations` - Create donation
- `GET /api/donations` - Get all donations (Admin)
- `GET /api/donations/:id` - Get single donation (Admin)
- `GET /api/donations/session/:sessionId` - Get donations by session (Admin)
- `GET /api/donations/stats` - Get donation statistics (Admin)
- `PUT /api/donations/:id` - Update donation (Admin)
- `DELETE /api/donations/:id` - Delete donation (Admin)

## 🔐 Authentication

Include JWT token in request headers:

```
Authorization: Bearer <token>
```

## 👥 User Roles

- **Admin**: Full access to all endpoints
- **Volunteer**: Can upload materials, create activities
- **Student**: Can view materials, register

## 📁 Project Structure

```
backend/
├── config/
│   ├── db.js
│   └── cloudinary.js
├── models/
│   ├── User.js
│   ├── SummerSession.js
│   ├── VolunteerProfile.js
│   ├── StudentProfile.js
│   ├── Activity.js
│   ├── Material.js
│   └── Donation.js
├── controllers/
│   ├── authController.js
│   ├── sessionController.js
│   ├── volunteerController.js
│   ├── studentController.js
│   ├── activityController.js
│   ├── materialController.js
│   └── donationController.js
├── routes/
│   ├── authRoutes.js
│   ├── sessionRoutes.js
│   ├── volunteerRoutes.js
│   ├── studentRoutes.js
│   ├── activityRoutes.js
│   ├── materialRoutes.js
│   └── donationRoutes.js
├── middleware/
│   ├── authMiddleware.js
│   ├── roleMiddleware.js
│   └── uploadMiddleware.js
├── utils/
│   └── generateToken.js
├── .env.example
├── .gitignore
├── package.json
├── server.js
└── README.md
```

## 🔒 Security Features

- Password hashing with bcrypt
- JWT token authentication
- Role-based authorization
- Input validation
- CORS enabled
- Environment variables
- Secure file upload

## 📝 Example Requests

### Register Student

```bash
POST /api/students/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "school": "Tula High School",
  "gradeLevel": "Secondary",
  "grade": "Grade 8",
  "subjectInterests": ["Math", "Science"],
  "guardianName": "Jane Doe",
  "phone": "+251912345678"
}
```

### Upload Material

```bash
POST /api/materials/upload
Authorization: Bearer <token>
Content-Type: multipart/form-data

{
  "title": "Math Grade 8 Notes",
  "subject": "Mathematics",
  "level": "Secondary",
  "grade": "Grade 8",
  "fileType": "PDF",
  "description": "Complete notes for Grade 8 Math",
  "summerSession": "session_id",
  "file": <file>
}
```

## 🌐 Cloudinary Setup

1. Create account at [cloudinary.com](https://cloudinary.com)
2. Get your credentials from dashboard
3. Add to `.env` file
4. Files will be stored in `tula-students-materials` folder

## 🚀 Deployment

Ready for deployment to:

- Heroku
- Railway
- Render
- DigitalOcean
- AWS

## 📄 License

MIT

## 👨‍💻 Author

Tula Students Association Development Team
