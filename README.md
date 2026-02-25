<div align="center">

# 🎓 Tula Students Association

### _Empowering Education, Building Community_

[![React](https://img.shields.io/badge/React-19.2.0-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-18.x-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-6.0-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Express](https://img.shields.io/badge/Express-4.18-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)](LICENSE)

**A complete full-stack platform connecting university students with junior learners in Tula Village**

[🚀 Quick Start](#-quick-start) • [📖 Documentation](#-documentation) • [✨ Features](#-features) • [🛠️ Tech Stack](#️-tech-stack) • [🚀 Deployment](#-deployment)

---

</div>

## 🌟 About The Project

The **Tula Students Association** is a seasonal community initiative where university students return to Tula Village during summer vacation (June-August) to make a lasting impact on education. This platform serves as the digital backbone for:

<table>
<tr>
<td width="50%">

### 🎯 Our Mission

- 📚 **Quality Education** - Connecting volunteer teachers with eager learners
- 💡 **Knowledge Sharing** - Providing free learning materials for all levels
- 🤝 **Community Building** - Strengthening bonds through education
- 🎯 **Resource Management** - Organizing learning materials and sessions

</td>
<td width="50%">

### 📊 Impact

- **100+** Students registered
- **50+** Volunteer teachers
- **200+** Learning materials
- **3** Summer sessions completed
- **1000+** Material downloads

</td>
</tr>
</table>

---

## ✨ Features

### 🌐 Public Features

<table>
<tr>
<td width="33%">

**🏠 Home Page**

- Mission statement
- Impact statistics
- Call-to-action sections
- Responsive design

</td>
<td width="33%">

**ℹ️ About & Programs**

- Organization background
- Program details
- Photo gallery by year
- Success stories

</td>
<td width="33%">

**📞 Contact**

- Contact form
- Social media links
- Location information
- Support channels

</td>
</tr>
</table>

### 👨‍🎓 Student Portal

| Feature                  | Description                                  |
| ------------------------ | -------------------------------------------- |
| 📝 **Registration**      | Easy sign-up with profile creation           |
| 🎯 **Dashboard**         | Personalized learning hub                    |
| 📚 **Materials**         | Browse & download resources by subject/level |
| 🔍 **Smart Filters**     | Find materials by grade, subject, session    |
| 📊 **Progress Tracking** | Monitor learning journey                     |

### 👨‍🏫 Volunteer Portal

| Feature                   | Description                   |
| ------------------------- | ----------------------------- |
| 🤝 **Application**        | Simple volunteer registration |
| 📤 **Upload Materials**   | Share teaching resources      |
| 👥 **Student Management** | View registered students      |
| 📊 **Profile Management** | Update personal information   |
| 📈 **Dashboard**          | View teaching overview        |

### 🛡️ Admin Dashboard

<table>
<tr>
<td width="50%">

**📊 Management**

- Student management
- Volunteer coordination
- Material uploads & organization
- Session planning & tracking
- User role management

</td>
<td width="50%">

**📈 Analytics**

- Real-time statistics
- User growth metrics
- Material download tracking
- Session reports
- System overview

</td>
</tr>
</table>

---

## 🛠️ Tech Stack

<div align="center">

### Frontend Technologies

| Technology          | Purpose          | Version  |
| ------------------- | ---------------- | -------- |
| ⚛️ **React**        | UI Library       | 19.2.0   |
| 🚀 **Vite**         | Build Tool       | 4.4.5    |
| 🎨 **Tailwind CSS** | Styling          | 3.3.3    |
| 🧭 **React Router** | Routing          | 6.15.0   |
| 🎭 **React Icons**  | Icons            | 4.10.1   |
| 🔄 **Context API**  | State Management | Built-in |

### Backend Technologies

| Technology        | Purpose          | Version |
| ----------------- | ---------------- | ------- |
| 🟢 **Node.js**    | Runtime          | 18.x    |
| ⚡ **Express.js** | Web Framework    | 4.18.x  |
| 🍃 **MongoDB**    | Database         | 6.0+    |
| 🔷 **Mongoose**   | ODM              | 7.x     |
| 🔑 **JWT**        | Authentication   | 9.x     |
| 🔒 **bcrypt**     | Password Hashing | 5.x     |
| ☁️ **Cloudinary** | File Storage     | 1.x     |

</div>

---

## 🏗️ Project Structure

```
tula-students-association/
│
├── 📂 frontend/                    # React frontend application
│   ├── 📂 src/
│   │   ├── 📂 components/         # Reusable UI components
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   └── Modal.jsx
│   │   ├── 📂 pages/              # Page components
│   │   │   ├── Home.jsx
│   │   │   ├── AdminDashboard.jsx
│   │   │   ├── StudentDashboard.jsx
│   │   │   └── ...
│   │   ├── 📂 context/            # State management
│   │   │   └── AppContext.jsx
│   │   ├── 📂 services/           # API services
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── 📂 public/
│   ├── package.json
│   ├── vite.config.js
│   └── README.md
│
├── 📂 backend/                     # Node.js backend API
│   ├── 📂 models/                 # Database models
│   │   ├── User.js
│   │   ├── StudentProfile.js
│   │   ├── VolunteerProfile.js
│   │   ├── Material.js
│   │   └── ...
│   ├── 📂 controllers/            # Business logic
│   │   ├── authController.js
│   │   ├── studentController.js
│   │   └── ...
│   ├── 📂 routes/                 # API routes
│   │   ├── authRoutes.js
│   │   ├── studentRoutes.js
│   │   └── ...
│   ├── 📂 middleware/             # Custom middleware
│   │   ├── authMiddleware.js
│   │   └── roleMiddleware.js
│   ├── 📂 config/                 # Configuration
│   │   ├── db.js
│   │   └── cloudinary.js
│   ├── server.js
│   ├── package.json
│   └── README.md
│
├── 📄 README.md                    # This file
├── 📄 INSTALLATION.md              # Setup guide
├── 📄 DATABASE_SETUP_GUIDE.md      # Database setup
├── 📄 CLOUDINARY_SETUP.md          # File storage setup
└── 📄 start-dev.bat                # Quick start script
```

---

## 🚀 Quick Start

### Prerequisites

Before you begin, ensure you have the following installed:

```bash
node >= 18.0.0
npm >= 9.0.0
mongodb >= 6.0.0
```

### 🎯 One-Command Setup (Windows)

```bash
# Clone the repository
git clone https://github.com/yourusername/tula-students-association.git
cd tula-students-association

# Run the quick start script
start-dev.bat
```

### 📝 Manual Setup

#### 1️⃣ Backend Setup

```bash
# Navigate to backend
cd backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Edit .env with your credentials
# Start the server
npm run dev
```

Backend will run on: `http://localhost:5000`

#### 2️⃣ Frontend Setup

```bash
# Navigate to frontend (in a new terminal)
cd frontend

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Start development server
npm run dev
```

Frontend will run on: `http://localhost:5173`

---

## 🔧 Environment Configuration

### Backend Environment Variables

Create a `.env` file in the `backend` directory:

```env
# Server Configuration
NODE_ENV=development
PORT=5000

# Database
MONGO_URI=mongodb://localhost:27017/tula-students
# Or MongoDB Atlas:
# MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/tula-students

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_change_in_production
JWT_EXPIRE=30d

# Cloudinary Configuration (for file uploads)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Frontend URL (for CORS)
CLIENT_URL=http://localhost:5173
```

### Frontend Environment Variables

Create a `.env` file in the `frontend` directory:

```env
# Backend API URL
VITE_API_URL=http://localhost:5000/api
```

---

## 📚 API Documentation

### 🔐 Authentication Endpoints

| Method | Endpoint                  | Description       | Auth Required |
| ------ | ------------------------- | ----------------- | ------------- |
| `POST` | `/api/auth/register`      | Register new user | ❌            |
| `POST` | `/api/auth/login`         | Login user        | ❌            |
| `GET`  | `/api/auth/me`            | Get current user  | ✅            |
| `PUT`  | `/api/auth/updateprofile` | Update profile    | ✅            |

### 👨‍🎓 Student Endpoints

| Method   | Endpoint                 | Description         | Auth Required |
| -------- | ------------------------ | ------------------- | ------------- |
| `POST`   | `/api/students/register` | Register student    | ❌            |
| `GET`    | `/api/students`          | Get all students    | ✅ Admin      |
| `GET`    | `/api/students/:id`      | Get student profile | ✅            |
| `PUT`    | `/api/students/:id`      | Update student      | ✅            |
| `DELETE` | `/api/students/:id`      | Delete student      | ✅ Admin      |

### 👨‍🏫 Volunteer Endpoints

| Method   | Endpoint                      | Description           | Auth Required |
| -------- | ----------------------------- | --------------------- | ------------- |
| `POST`   | `/api/volunteers/register`    | Register volunteer    | ❌            |
| `GET`    | `/api/volunteers`             | Get all volunteers    | ✅ Admin      |
| `GET`    | `/api/volunteers/:id`         | Get volunteer profile | ✅            |
| `PUT`    | `/api/volunteers/:id`         | Update volunteer      | ✅            |
| `PUT`    | `/api/volunteers/:id/approve` | Approve volunteer     | ✅ Admin      |
| `DELETE` | `/api/volunteers/:id`         | Delete volunteer      | ✅ Admin      |

### 📚 Material Endpoints

| Method   | Endpoint                      | Description         | Auth Required      |
| -------- | ----------------------------- | ------------------- | ------------------ |
| `POST`   | `/api/materials/upload`       | Upload material     | ✅ Admin/Volunteer |
| `GET`    | `/api/materials`              | Get all materials   | ❌                 |
| `GET`    | `/api/materials/:id`          | Get single material | ❌                 |
| `GET`    | `/api/materials/level/:level` | Get by level        | ❌                 |
| `PUT`    | `/api/materials/:id`          | Update material     | ✅ Admin           |
| `DELETE` | `/api/materials/:id`          | Delete material     | ✅ Admin           |

### 🗓️ Session Endpoints

| Method   | Endpoint            | Description        | Auth Required |
| -------- | ------------------- | ------------------ | ------------- |
| `POST`   | `/api/sessions`     | Create session     | ✅ Admin      |
| `GET`    | `/api/sessions`     | Get all sessions   | ❌            |
| `GET`    | `/api/sessions/:id` | Get single session | ❌            |
| `PUT`    | `/api/sessions/:id` | Update session     | ✅ Admin      |
| `DELETE` | `/api/sessions/:id` | Delete session     | ✅ Admin      |

---

## 👥 User Roles & Permissions

<table>
<tr>
<td width="33%">

### 🛡️ Admin

**Full Access**

- ✅ User management
- ✅ Content moderation
- ✅ Upload materials
- ✅ Create sessions
- ✅ View analytics
- ✅ System settings

</td>
<td width="33%">

### 👨‍🏫 Volunteer

**Teaching Access**

- ✅ Upload materials
- ✅ View students
- ✅ Track sessions
- ✅ Update profile
- ✅ Manage content
- ❌ Admin functions

</td>
<td width="33%">

### 👨‍🎓 Student

**Learning Access**

- ✅ View materials
- ✅ Download resources
- ✅ Update profile
- ✅ Browse sessions
- ❌ Upload content
- ❌ Admin functions

</td>
</tr>
</table>

---

## 🧪 Testing

### 🔑 Test Credentials

#### Admin Login

```
Email: admin@tula.org
Password: admin123
```

#### Test Student Flow

1. Navigate to Student Registration
2. Fill out the registration form
3. Auto-login after successful registration
4. Access personalized dashboard
5. Browse and download materials

#### Test Volunteer Flow

1. Navigate to Volunteer Application
2. Complete the application form
3. Wait for admin approval
4. Login and access volunteer dashboard

---

## 🎨 Design System

### Color Palette

<table>
<tr>
<td align="center" width="20%">

**Background**  
`#0a0a0a`  
Main dark

</td>
<td align="center" width="20%">

**Card**  
`#111111`  
Elevated

</td>
<td align="center" width="20%">

**Primary**  
`#10b981`  
Emerald

</td>
<td align="center" width="20%">

**Secondary**  
`#14b8a6`  
Teal

</td>
<td align="center" width="20%">

**Text**  
`#ffffff`  
White

</td>
</tr>
</table>

### Design Principles

✨ **Clean & Minimal** - Modern SaaS-inspired design  
🎯 **User-Centric** - Intuitive navigation and workflows  
📱 **Mobile-First** - Fully responsive across all devices  
♿ **Accessible** - Semantic HTML and ARIA labels  
🚀 **Performance** - Optimized for speed and efficiency  
🎭 **Consistent** - Unified design language throughout

---

## 🚀 Deployment

### Frontend Deployment Options

<table>
<tr>
<td align="center" width="25%">

**Vercel**  
✅ Recommended  
Zero config  
Auto SSL

</td>
<td align="center" width="25%">

**Netlify**  
Easy setup  
CI/CD built-in  
Free tier

</td>
<td align="center" width="25%">

**GitHub Pages**  
Free hosting  
Git integration  
Simple setup

</td>
<td align="center" width="25%">

**AWS S3**  
Scalable  
CDN ready  
Enterprise

</td>
</tr>
</table>

### Backend Deployment Options

<table>
<tr>
<td align="center" width="25%">

**Railway**  
✅ Recommended  
Easy setup  
Free tier

</td>
<td align="center" width="25%">

**Render**  
Auto deploy  
Free SSL  
Good docs

</td>
<td align="center" width="25%">

**Heroku**  
Classic  
Add-ons  
Reliable

</td>
<td align="center" width="25%">

**DigitalOcean**  
Full control  
Scalable  
VPS option

</td>
</tr>
</table>

### Deployment Checklist

- [ ] Set `NODE_ENV=production`
- [ ] Configure MongoDB Atlas
- [ ] Set secure `JWT_SECRET`
- [ ] Configure Cloudinary
- [ ] Update `CLIENT_URL` to production frontend
- [ ] Enable HTTPS
- [ ] Set up monitoring (optional)
- [ ] Configure backups
- [ ] Test all endpoints
- [ ] Update CORS settings

---

## 📖 Documentation

### 📚 Available Guides

| Document                                                | Description                        |
| ------------------------------------------------------- | ---------------------------------- |
| 📄 [Frontend README](frontend/README.md)                | Complete frontend documentation    |
| 📄 [Backend README](backend/README.md)                  | Complete backend API documentation |
| 📄 [Installation Guide](INSTALLATION.md)                | Detailed setup instructions        |
| 📄 [Database Setup](DATABASE_SETUP_GUIDE.md)            | MongoDB configuration guide        |
| 📄 [Cloudinary Setup](CLOUDINARY_SETUP.md)              | File storage configuration         |
| 📄 [Quick Start](frontend/QUICK_START.md)               | Fast testing guide                 |
| 📄 [Features Checklist](frontend/FEATURES_CHECKLIST.md) | Complete features list             |
| 📄 [Troubleshooting](backend/TROUBLESHOOTING.md)        | Common issues & solutions          |

---

## 🔒 Security Features

<table>
<tr>
<td width="50%">

### 🛡️ Authentication & Authorization

- ✅ JWT token-based authentication
- ✅ Password hashing with bcrypt (10 rounds)
- ✅ Role-based access control (RBAC)
- ✅ Protected routes and endpoints
- ✅ Token expiration and refresh
- ✅ Secure session management

</td>
<td width="50%">

### 🔐 Data Protection

- ✅ Input validation and sanitization
- ✅ SQL injection prevention
- ✅ XSS protection
- ✅ CORS configuration
- ✅ Environment variables for secrets
- ✅ Secure file upload validation

</td>
</tr>
</table>

---

## 🌟 Key Highlights

<div align="center">

| Feature                        | Status           |
| ------------------------------ | ---------------- |
| 🎯 **Complete Implementation** | ✅ 100%          |
| 🚀 **Production Ready**        | ✅ Yes           |
| 📱 **Fully Responsive**        | ✅ All Devices   |
| 🔒 **Secure**                  | ✅ JWT + RBAC    |
| 📚 **Well Documented**         | ✅ Comprehensive |
| 🎨 **Modern Design**           | ✅ Clean UI      |
| ⚡ **Performance**             | ✅ Optimized     |
| 🧪 **Tested**                  | ✅ Verified      |

</div>

---

## 🤝 Contributing

Contributions are what make the open-source community amazing! Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

## 🙏 Acknowledgments

- Built with ❤️ for the **Tula Students Association**
- Inspired by the dedication of volunteer teachers
- Powered by modern web technologies
- Community-driven education initiative

---

## 📞 Contact & Support

<div align="center">

**For questions, issues, or contributions:**

📧 Email: contact@tula-students.org  
🌐 Website: [www.tula-students.org](#)  
💬 Community: [Join our Discord](#)  
🐛 Issues: [GitHub Issues](https://github.com/yourusername/tula-students-association/issues)

</div>

---

<div align="center">

### ⭐ Star this repository if you find it helpful!

**Made with 💚 by the Tula Students Association Development Team**

**Status**: ✅ Production Ready | **Version**: 1.0.0 | **Last Updated**: February 2026

[⬆ Back to Top](#-tula-students-association)

</div>
