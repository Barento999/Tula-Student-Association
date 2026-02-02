# API Examples & Testing Guide

Complete examples for testing all API endpoints.

## Base URL

```
http://localhost:5000
```

## 1. Authentication

### Register Admin

```bash
POST /api/auth/register
Content-Type: application/json

{
  "name": "Admin User",
  "email": "admin@tula.com",
  "password": "admin123",
  "role": "admin"
}
```

### Register Student (via Auth)

```bash
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "student"
}
```

### Login

```bash
POST /api/auth/login
Content-Type: application/json

{
  "email": "admin@tula.com",
  "password": "admin123"
}

Response:
{
  "_id": "...",
  "name": "Admin User",
  "email": "admin@tula.com",
  "role": "admin",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Get Current User

```bash
GET /api/auth/me
Authorization: Bearer YOUR_TOKEN
```

## 2. Summer Sessions

### Create Session (Admin Only)

```bash
POST /api/sessions
Authorization: Bearer ADMIN_TOKEN
Content-Type: application/json

{
  "name": "Summer 2024",
  "year": 2024,
  "startDate": "2024-06-01",
  "endDate": "2024-08-31",
  "status": "Active",
  "description": "Summer teaching program 2024"
}
```

### Get All Sessions

```bash
GET /api/sessions
```

### Get Single Session

```bash
GET /api/sessions/:id
```

### Update Session (Admin Only)

```bash
PUT /api/sessions/:id
Authorization: Bearer ADMIN_TOKEN
Content-Type: application/json

{
  "status": "Completed"
}
```

### Delete Session (Admin Only)

```bash
DELETE /api/sessions/:id
Authorization: Bearer ADMIN_TOKEN
```

## 3. Students

### Register Student (Complete Profile)

```bash
POST /api/students/register
Content-Type: application/json

{
  "name": "Jane Smith",
  "email": "jane@example.com",
  "password": "password123",
  "school": "Tula High School",
  "gradeLevel": "Secondary",
  "grade": "Grade 8",
  "subjectInterests": ["Mathematics", "Science", "English"],
  "guardianName": "Mary Smith",
  "phone": "+251912345678"
}
```

### Get All Students (Admin Only)

```bash
GET /api/students
Authorization: Bearer ADMIN_TOKEN
```

### Get Single Student

```bash
GET /api/students/:id
Authorization: Bearer TOKEN
```

### Update Student Profile

```bash
PUT /api/students/:id
Authorization: Bearer TOKEN
Content-Type: application/json

{
  "phone": "+251987654321",
  "subjectInterests": ["Mathematics", "Physics", "Chemistry"]
}
```

## 4. Volunteers

### Register Volunteer

```bash
POST /api/volunteers/register
Content-Type: application/json

{
  "name": "Michael Johnson",
  "email": "michael@example.com",
  "password": "password123",
  "university": "Addis Ababa University",
  "department": "Computer Science",
  "subjects": ["Mathematics", "Computer Science"],
  "availability": "June-August 2024",
  "preferredLevel": "Secondary",
  "summerSession": "SESSION_ID_HERE"
}
```

### Get All Volunteers (Admin Only)

```bash
GET /api/volunteers
Authorization: Bearer ADMIN_TOKEN
```

### Get Single Volunteer

```bash
GET /api/volunteers/:id
Authorization: Bearer TOKEN
```

### Update Volunteer Profile

```bash
PUT /api/volunteers/:id
Authorization: Bearer TOKEN
Content-Type: application/json

{
  "subjects": ["Mathematics", "Physics", "Computer Science"],
  "availability": "Full summer"
}
```

### Approve Volunteer (Admin Only)

```bash
PUT /api/volunteers/:id/approve
Authorization: Bearer ADMIN_TOKEN
```

## 5. Activities

### Create Activity (Admin/Volunteer)

```bash
POST /api/activities
Authorization: Bearer TOKEN
Content-Type: application/json

{
  "title": "Grade 8 Mathematics Class",
  "category": "Teaching",
  "level": "Secondary",
  "subject": "Mathematics",
  "date": "2024-07-15",
  "duration": 2,
  "participants": 25,
  "description": "Algebra and geometry lessons",
  "summerSession": "SESSION_ID_HERE"
}
```

### Get All Activities

```bash
GET /api/activities

# With filters
GET /api/activities?category=Teaching
GET /api/activities?level=Secondary
GET /api/activities?session=SESSION_ID
```

### Get Single Activity

```bash
GET /api/activities/:id
```

### Get Activities by Session

```bash
GET /api/activities/session/:sessionId
```

### Update Activity (Admin Only)

```bash
PUT /api/activities/:id
Authorization: Bearer ADMIN_TOKEN
Content-Type: application/json

{
  "participants": 30,
  "description": "Updated description"
}
```

### Delete Activity (Admin Only)

```bash
DELETE /api/activities/:id
Authorization: Bearer ADMIN_TOKEN
```

## 6. Materials

### Upload Material (Admin/Volunteer)

```bash
POST /api/materials/upload
Authorization: Bearer TOKEN
Content-Type: multipart/form-data

Form Data:
- title: "Grade 8 Math Notes"
- subject: "Mathematics"
- level: "Secondary"
- grade: "Grade 8"
- fileType: "PDF"
- description: "Complete notes for algebra"
- summerSession: "SESSION_ID_HERE"
- file: [SELECT FILE]
```

### Get All Materials

```bash
GET /api/materials

# With filters
GET /api/materials?level=Secondary
GET /api/materials?subject=Mathematics
GET /api/materials?session=SESSION_ID
```

### Get Single Material

```bash
GET /api/materials/:id
```

### Get Materials by Level

```bash
GET /api/materials/level/Secondary
GET /api/materials/level/Elementary
GET /api/materials/level/Preparatory
```

### Increment Download Count

```bash
PUT /api/materials/:id/download
```

### Delete Material (Admin Only)

```bash
DELETE /api/materials/:id
Authorization: Bearer ADMIN_TOKEN
```

## 7. Donations

### Create Donation

```bash
POST /api/donations
Content-Type: application/json

{
  "donorName": "Sarah Williams",
  "email": "sarah@example.com",
  "phone": "+251911223344",
  "donationType": "Money",
  "amount": 1000,
  "purpose": "Learning Materials",
  "description": "For purchasing textbooks",
  "message": "Happy to support education",
  "isAnonymous": false,
  "summerSession": "SESSION_ID_HERE"
}
```

### Get All Donations (Admin Only)

```bash
GET /api/donations
Authorization: Bearer ADMIN_TOKEN

# With filters
GET /api/donations?type=Money
GET /api/donations?session=SESSION_ID
```

### Get Single Donation (Admin Only)

```bash
GET /api/donations/:id
Authorization: Bearer ADMIN_TOKEN
```

### Get Donations by Session (Admin Only)

```bash
GET /api/donations/session/:sessionId
Authorization: Bearer ADMIN_TOKEN
```

### Get Donation Statistics (Admin Only)

```bash
GET /api/donations/stats
Authorization: Bearer ADMIN_TOKEN

# With session filter
GET /api/donations/stats?session=SESSION_ID
```

### Update Donation (Admin Only)

```bash
PUT /api/donations/:id
Authorization: Bearer ADMIN_TOKEN
Content-Type: application/json

{
  "status": "Completed"
}
```

### Delete Donation (Admin Only)

```bash
DELETE /api/donations/:id
Authorization: Bearer ADMIN_TOKEN
```

## Testing with cURL

### Example: Complete Flow

1. **Register Admin**

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Admin","email":"admin@tula.com","password":"admin123","role":"admin"}'
```

2. **Login**

```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@tula.com","password":"admin123"}'
```

3. **Create Session (use token from login)**

```bash
curl -X POST http://localhost:5000/api/sessions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{"name":"Summer 2024","year":2024,"startDate":"2024-06-01","endDate":"2024-08-31","status":"Active"}'
```

4. **Get All Sessions**

```bash
curl http://localhost:5000/api/sessions
```

## Testing with Postman

1. Import collection
2. Set environment variable: `baseUrl = http://localhost:5000`
3. Set environment variable: `token = YOUR_JWT_TOKEN`
4. Use `{{baseUrl}}` and `{{token}}` in requests

## Common Response Codes

- `200` - Success
- `201` - Created
- `400` - Bad Request (validation error)
- `401` - Unauthorized (no token or invalid token)
- `403` - Forbidden (insufficient permissions)
- `404` - Not Found
- `500` - Server Error

## Error Response Format

```json
{
  "message": "Error description",
  "errors": [
    {
      "field": "email",
      "message": "Email is required"
    }
  ]
}
```

## Success Response Examples

### Login Success

```json
{
  "_id": "65abc123...",
  "name": "Admin User",
  "email": "admin@tula.com",
  "role": "admin",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Material Upload Success

```json
{
  "_id": "65abc456...",
  "title": "Grade 8 Math Notes",
  "subject": "Mathematics",
  "level": "Secondary",
  "fileUrl": "https://res.cloudinary.com/...",
  "publicId": "tula-students-materials/...",
  "uploadedBy": {
    "_id": "65abc123...",
    "name": "Admin User"
  },
  "summerSession": {
    "_id": "65abc789...",
    "name": "Summer 2024",
    "year": 2024
  },
  "downloads": 0,
  "createdAt": "2024-07-01T10:00:00.000Z"
}
```

## Tips

- Always include `Authorization: Bearer TOKEN` for protected routes
- Use `Content-Type: application/json` for JSON requests
- Use `Content-Type: multipart/form-data` for file uploads
- Save the token after login for subsequent requests
- Check response status codes for debugging
