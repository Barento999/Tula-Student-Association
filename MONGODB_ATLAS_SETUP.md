# MongoDB Atlas Setup Guide

## 🔧 How to Get Your MongoDB Atlas Connection String

### Step 1: Go to MongoDB Atlas

1. Visit: https://cloud.mongodb.com/
2. Login to your account

### Step 2: Get Connection String

1. Click on **"Connect"** button on your cluster
2. Choose **"Connect your application"**
3. Select **Driver**: Node.js
4. Select **Version**: 4.1 or later
5. Copy the connection string

### Step 3: Update Connection String

Your connection string looks like this:

```
mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
```

**Important Changes:**

1. Replace `<username>` with your database username
2. Replace `<password>` with your database password
3. Add database name after `.net/`: `tula-students`

**Final format:**

```
mongodb+srv://myuser:mypassword@cluster0.xxxxx.mongodb.net/tula-students?retryWrites=true&w=majority
```

### Step 4: Update .env File

Edit `backend/.env`:

```env
MONGO_URI=mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@YOUR_CLUSTER.mongodb.net/tula-students?retryWrites=true&w=majority
```

**Example:**

```env
MONGO_URI=mongodb+srv://tulaadmin:MySecurePass123@cluster0.abc123.mongodb.net/tula-students?retryWrites=true&w=majority
```

---

## ⚠️ Common Issues

### Issue 1: Authentication Failed

**Error:** `bad auth : authentication failed`

**Solutions:**

1. **Check username and password** - Make sure they're correct
2. **URL encode special characters** in password:
   - `@` → `%40`
   - `#` → `%23`
   - `$` → `%24`
   - `%` → `%25`
   - `&` → `%26`

**Example:**
If password is `Pass@123`, use `Pass%40123`

### Issue 2: IP Not Whitelisted

**Error:** `connection timed out`

**Solution:**

1. Go to MongoDB Atlas Dashboard
2. Click **"Network Access"** (left sidebar)
3. Click **"Add IP Address"**
4. Choose **"Allow Access from Anywhere"** (0.0.0.0/0)
5. Or add your specific IP address
6. Click **"Confirm"**

### Issue 3: Database User Not Created

**Error:** `Authentication failed`

**Solution:**

1. Go to MongoDB Atlas Dashboard
2. Click **"Database Access"** (left sidebar)
3. Click **"Add New Database User"**
4. Choose **"Password"** authentication
5. Enter username and password
6. Set privileges to **"Read and write to any database"**
7. Click **"Add User"**

---

## 📝 Step-by-Step Setup

### 1. Create Database User

1. Go to **Database Access** in Atlas
2. Click **"Add New Database User"**
3. Fill in:
   - **Username**: `tulaadmin` (or your choice)
   - **Password**: Create a strong password
   - **Database User Privileges**: `Atlas admin` or `Read and write to any database`
4. Click **"Add User"**

### 2. Whitelist IP Address

1. Go to **Network Access** in Atlas
2. Click **"Add IP Address"**
3. Options:
   - **Development**: Click "Allow Access from Anywhere" (0.0.0.0/0)
   - **Production**: Add your specific IP
4. Click **"Confirm"**

### 3. Get Connection String

1. Go to **Database** (Clusters)
2. Click **"Connect"** on your cluster
3. Choose **"Connect your application"**
4. Copy the connection string
5. Replace `<password>` with your actual password
6. Add `/tula-students` after `.net`

### 4. Update .env

```env
MONGO_URI=mongodb+srv://tulaadmin:YourPassword123@cluster0.xxxxx.mongodb.net/tula-students?retryWrites=true&w=majority
```

### 5. Restart Server

```bash
# Stop the server (Ctrl+C)
# Start again
npm run dev
```

---

## ✅ Verification

If successful, you should see:

```
MongoDB Connected: cluster0-shard-00-00.xxxxx.mongodb.net
Server running in development mode on port 5000
```

---

## 🔐 Security Tips

1. **Never commit .env file** to Git (already in .gitignore)
2. **Use strong passwords** for database users
3. **Restrict IP access** in production
4. **Rotate credentials** regularly
5. **Use environment-specific databases**:
   - Development: `tula-students-dev`
   - Production: `tula-students-prod`

---

## 🆘 Still Having Issues?

### Check Connection String Format

**Correct:**

```
mongodb+srv://username:password@cluster.mongodb.net/database?retryWrites=true&w=majority
```

**Common Mistakes:**

- ❌ Missing database name: `...mongodb.net/?retryWrites...`
- ❌ Wrong protocol: `mongodb://` instead of `mongodb+srv://`
- ❌ Special characters not encoded in password
- ❌ Extra spaces in connection string
- ❌ Wrong cluster URL

### Test Connection

Create a test file `backend/test-connection.js`:

```javascript
require("dotenv").config();
const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Connected Successfully!");
    process.exit(0);
  })
  .catch((err) => {
    console.error("❌ Connection Failed:", err.message);
    process.exit(1);
  });
```

Run:

```bash
node backend/test-connection.js
```

---

## 📞 Need More Help?

1. Check MongoDB Atlas documentation: https://docs.atlas.mongodb.com/
2. Verify your cluster is active (not paused)
3. Check MongoDB Atlas status: https://status.mongodb.com/
4. Review error messages carefully

---

## 🎯 Quick Checklist

- [ ] Database user created with correct privileges
- [ ] IP address whitelisted (0.0.0.0/0 for development)
- [ ] Connection string copied from Atlas
- [ ] Password replaced in connection string
- [ ] Special characters in password URL-encoded
- [ ] Database name added to connection string
- [ ] .env file updated with correct MONGO_URI
- [ ] Server restarted

---

**Once connected, you're ready to go!** 🚀
