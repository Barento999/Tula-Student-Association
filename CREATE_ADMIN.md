# Create Admin Account

## Quick Method (Using Postman or Browser)

### Option 1: Using Browser Console

1. Open http://localhost:5173 in your browser
2. Open Developer Tools (F12)
3. Go to Console tab
4. Paste this code:

```javascript
fetch("http://localhost:5000/api/auth/register", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    name: "Admin User",
    email: "admin@tula.org",
    password: "admin123",
    role: "admin",
  }),
})
  .then((res) => res.json())
  .then((data) => console.log("Admin created:", data))
  .catch((err) => console.error("Error:", err));
```

5. Press Enter
6. You should see: `Admin created: { _id: ..., name: "Admin User", ... }`

### Option 2: Using PowerShell

Open PowerShell and run:

```powershell
$body = @{
    name = "Admin User"
    email = "admin@tula.org"
    password = "admin123"
    role = "admin"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:5000/api/auth/register" -Method Post -Body $body -ContentType "application/json"
```

### Option 3: Using curl (if installed)

```bash
curl -X POST http://localhost:5000/api/auth/register ^
  -H "Content-Type: application/json" ^
  -d "{\"name\":\"Admin User\",\"email\":\"admin@tula.org\",\"password\":\"admin123\",\"role\":\"admin\"}"
```

## Then Login

1. Go to http://localhost:5173/admin/login
2. Email: `admin@tula.org`
3. Password: `admin123`
4. Click Login

You'll be redirected to the admin dashboard!

## Create Multiple Admins

Just change the email:

```javascript
fetch("http://localhost:5000/api/auth/register", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    name: "Another Admin",
    email: "admin2@tula.org",
    password: "admin123",
    role: "admin",
  }),
})
  .then((res) => res.json())
  .then((data) => console.log(data));
```

## Verify in MongoDB Atlas

1. Go to https://cloud.mongodb.com
2. Login to your account
3. Click "Browse Collections"
4. Select `tula-students` database
5. Click `users` collection
6. You should see your admin user with `role: "admin"`

## Troubleshooting

### "User already exists"

- The email is already registered
- Try a different email
- Or delete the user from MongoDB

### "Cannot connect to server"

- Make sure backend is running: `cd backend && npm start`
- Check if port 5000 is accessible

### "Invalid credentials" when logging in

- Make sure you're using the correct email and password
- Email: `admin@tula.org`
- Password: `admin123`

---

**Once created, you can login and access the full admin dashboard!**
