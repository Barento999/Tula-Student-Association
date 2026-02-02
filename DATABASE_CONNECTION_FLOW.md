# Database Connection Flow

## 📍 Where Database Connects to Server

The database connection happens in **`backend/server.js`** at line 9:

```javascript
// backend/server.js

const connectDB = require("./config/db"); // Line 4: Import connection function

dotenv.config(); // Line 7: Load environment variables

connectDB(); // Line 9: 🔥 DATABASE CONNECTS HERE!
```

---

## 🔄 Connection Flow Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                    SERVER STARTUP FLOW                       │
└─────────────────────────────────────────────────────────────┘

1. npm run dev
   │
   ├─> nodemon starts
   │
   └─> node server.js
       │
       ├─> Load dependencies (express, dotenv, cors)
       │
       ├─> dotenv.config()  ← Loads .env file
       │   │
       │   └─> Reads MONGO_URI from .env
       │
       ├─> connectDB()  ← 🔥 DATABASE CONNECTION HAPPENS HERE
       │   │
       │   ├─> Calls backend/config/db.js
       │   │
       │   ├─> mongoose.connect(process.env.MONGO_URI)
       │   │   │
       │   │   ├─> Connects to MongoDB Atlas
       │   │   │   mongodb+srv://barentohashum11_db_user:***@cluster0.ha01uqj.mongodb.net/tula-students
       │   │   │
       │   │   ├─> Success ✅
       │   │   │   └─> Console: "MongoDB Connected: cluster0-shard-00-00.ha01uqj.mongodb.net"
       │   │   │
       │   │   └─> Error ❌
       │   │       └─> Console: "Error: [error message]"
       │   │       └─> process.exit(1)
       │   │
       │   └─> Returns to server.js
       │
       ├─> Initialize Express app
       │
       ├─> Setup middleware (body-parser, CORS)
       │
       ├─> Mount routes (/api/auth, /api/students, etc.)
       │
       └─> app.listen(5000)
           │
           └─> Console: "Server running in development mode on port 5000"
```

---

## 📂 File Structure

### 1. **backend/server.js** (Main Entry Point)

```javascript
const connectDB = require("./config/db"); // Import
dotenv.config(); // Load .env
connectDB(); // Connect to DB ← HERE!
```

### 2. **backend/config/db.js** (Connection Logic)

```javascript
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    // Connect using MONGO_URI from .env
    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1); // Exit if connection fails
  }
};

module.exports = connectDB;
```

### 3. **backend/.env** (Configuration)

```env
MONGO_URI=mongodb+srv://barentohashum11_db_user:EvaGRk6Uym8MkbIA@cluster0.ha01uqj.mongodb.net/tula-students?retryWrites=true&w=majority&appName=Cluster0
```

---

## 🎯 Execution Order

```
Step 1: npm run dev
   ↓
Step 2: nodemon server.js
   ↓
Step 3: require("dotenv").config()
   ↓
Step 4: Load MONGO_URI from .env
   ↓
Step 5: connectDB() function called  ← DATABASE CONNECTION
   ↓
Step 6: mongoose.connect(MONGO_URI)
   ↓
Step 7: Connect to MongoDB Atlas
   ↓
Step 8: Success → Continue server startup
   ↓
Step 9: Setup Express routes
   ↓
Step 10: app.listen(5000)
   ↓
Step 11: Server ready! ✅
```

---

## 🔍 Code Breakdown

### In `backend/server.js`:

```javascript
// Line 1-4: Import dependencies
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db"); // ← Import DB connection

// Line 7: Load environment variables from .env file
dotenv.config();

// Line 9: 🔥 CONNECT TO DATABASE
connectDB(); // ← This is where database connects!

// Line 11: Create Express app
const app = express();

// Lines 13-50: Setup middleware and routes
// ...

// Line 52-56: Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

---

## 📊 Connection Timeline

```
Time    Event
─────   ─────────────────────────────────────────────
0ms     npm run dev executed
10ms    nodemon starts
20ms    server.js loaded
30ms    dotenv.config() loads .env
40ms    connectDB() called
50ms    mongoose.connect() initiated
100ms   Connecting to MongoDB Atlas...
500ms   ✅ MongoDB Connected!
510ms   Express middleware setup
520ms   Routes mounted
530ms   Server listening on port 5000
```

---

## 🎬 What Happens When You Run `npm run dev`

1. **nodemon** starts and runs `server.js`
2. **dotenv** loads environment variables from `.env`
3. **connectDB()** is called (line 9 of server.js)
4. Inside `connectDB()`:
   - Mongoose attempts to connect to MongoDB Atlas
   - Uses `MONGO_URI` from `.env`
   - If successful: Logs "MongoDB Connected: [host]"
   - If failed: Logs error and exits
5. **Express app** is created
6. **Middleware** is configured (body-parser, CORS)
7. **Routes** are mounted (/api/auth, /api/students, etc.)
8. **Server** starts listening on port 5000

---

## 🔐 Connection String Breakdown

Your MongoDB URI:

```
mongodb+srv://barentohashum11_db_user:EvaGRk6Uym8MkbIA@cluster0.ha01uqj.mongodb.net/tula-students?retryWrites=true&w=majority&appName=Cluster0
```

Parts:

- **Protocol**: `mongodb+srv://` (MongoDB Atlas protocol)
- **Username**: `barentohashum11_db_user`
- **Password**: `EvaGRk6Uym8MkbIA`
- **Host**: `cluster0.ha01uqj.mongodb.net`
- **Database**: `tula-students`
- **Options**: `retryWrites=true&w=majority&appName=Cluster0`

---

## ✅ Successful Connection Output

When everything works, you'll see:

```bash
MongoDB Connected: cluster0-shard-00-00.ha01uqj.mongodb.net
Server running in development mode on port 5000
```

---

## ❌ Failed Connection Output

If connection fails:

```bash
Error: bad auth : authentication failed
[nodemon] app crashed - waiting for file changes before starting...
```

---

## 🔧 How to Verify Connection

### Method 1: Check Console Output

```bash
npm run dev
# Look for: "MongoDB Connected: cluster0-shard-00-00.ha01uqj.mongodb.net"
```

### Method 2: Test API Endpoint

```bash
curl http://localhost:5000
# Should return: {"message":"Tula Students Association API","version":"1.0.0"}
```

### Method 3: Create Test User

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@test.com","password":"test123","role":"student"}'
# If successful, user is saved to MongoDB
```

---

## 📝 Summary

**Where**: `backend/server.js` line 9  
**Function**: `connectDB()`  
**File**: `backend/config/db.js`  
**Method**: `mongoose.connect(process.env.MONGO_URI)`  
**Database**: MongoDB Atlas  
**Connection String**: From `backend/.env`

**The database connects to the server immediately when the server starts, before any routes are set up!**

---

## 🎯 Key Points

1. ✅ Database connection happens **before** server starts listening
2. ✅ If database connection fails, server **exits** (doesn't start)
3. ✅ Connection is **asynchronous** (uses async/await)
4. ✅ Connection string comes from **`.env`** file
5. ✅ Connection is established **once** at startup
6. ✅ All routes use the **same** database connection

---

**Now you know exactly where and how the database connects to your server!** 🎉
