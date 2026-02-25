# Quick Fixes Guide

## Material Upload/Download Issues

### Problem: Files upload but can't be downloaded (0 bytes or 401/404 errors)

**Quick Fix Option 1: Adjust Cloudinary Settings (Easiest)**

1. Go to https://cloudinary.com/console
2. Click **Settings** → **Security**
3. **Disable** "Strict Transformations"
4. **Disable** "Restricted media types"
5. Set delivery type to **"public"**
6. Click **Save**
7. Test upload/download again

**Quick Fix Option 2: Use Signed URLs (Already Implemented)**

No action needed! The application automatically uses signed URLs as a fallback. Just test your upload/download and it should work.

---

## Admin Dashboard Issues

### Problem: Can't see admin header

**Fix:**

- Make sure you're on the admin routes:
  - `/sys-auth-portal` (login)
  - `/sys-dashboard-mgmt` (dashboard)
- Clear browser cache (Ctrl+Shift+Delete)
- Hard refresh (Ctrl+F5)

### Problem: Logout button doesn't work

**Fix:**

- Check browser console for errors (F12)
- Make sure you're logged in as admin
- Try clearing sessionStorage and logging in again

---

## Backend Issues

### Problem: "Invalid cloud name" error

**Fix:**

1. Check `backend/.env` file
2. Verify `CLOUDINARY_CLOUD_NAME` is correct (usually lowercase)
3. No spaces or quotes around the value
4. Restart backend server: `npm start`

### Problem: "Invalid API credentials" error

**Fix:**

1. Go to Cloudinary Dashboard
2. Click "Reveal" next to API Secret
3. Copy exact values to `backend/.env`:
   ```env
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   ```
4. Restart backend server

---

## Testing Checklist

### Test Upload:

1. Login as admin at `/sys-auth-portal`
2. Go to Materials tab
3. Click "Upload Material"
4. Fill form and select a small PDF (under 1MB)
5. Click "Upload Material"
6. ✅ Material should appear in list

### Test Download:

1. Go to `/materials` page
2. Find uploaded material
3. Click "Download" button
4. ✅ File should download to your computer

---

## Emergency Restart

If nothing works:

```bash
# Stop all servers
# Then restart:

# Backend
cd backend
npm start

# Frontend (new terminal)
cd frontend
npm run dev
```

---

## Get Help

1. Check browser console (F12) for errors
2. Check backend terminal for error messages
3. Read `CLOUDINARY_SETUP.md` for detailed troubleshooting
4. Read `IMPLEMENTATION_SUMMARY.md` for technical details

---

## Quick Commands

```bash
# Restart backend
cd backend
npm start

# Restart frontend
cd frontend
npm run dev

# Check if backend is running
# Open: http://localhost:5000/api/materials

# Check if frontend is running
# Open: http://localhost:5173
```

---

## Environment Variables Checklist

Make sure `backend/.env` has:

```env
# MongoDB
MONGODB_URI=your_mongodb_connection_string

# JWT
JWT_SECRET=your_jwt_secret

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# CORS (for deployment)
FRONTEND_URL=http://localhost:5173
VERCEL_URL=https://your-app.vercel.app
```

**Remember:** Restart backend after changing `.env`!

---

## Common Mistakes

❌ **Don't:**

- Commit `.env` file to Git
- Use quotes around environment variables
- Forget to restart server after changing `.env`
- Use wrong case for cloud name (it's case-sensitive)

✅ **Do:**

- Keep `.env` in `.gitignore`
- Restart server after changes
- Use exact values from Cloudinary dashboard
- Test with small files first (under 1MB)

---

## Success Indicators

✅ **Upload Working:**

- Material appears in admin dashboard
- File shows in Cloudinary Media Library
- File size is not 0 bytes

✅ **Download Working:**

- File downloads to computer
- Correct filename and extension
- File opens correctly
- Download count increments

✅ **Admin Header Working:**

- Header visible at top
- Shows admin name and email
- Logout button works
- Header stays at top when scrolling

---

## Still Having Issues?

1. **Read the detailed guides:**
   - `CLOUDINARY_SETUP.md` - Cloudinary configuration
   - `IMPLEMENTATION_SUMMARY.md` - Technical details
   - `TROUBLESHOOTING.md` - Backend issues

2. **Check the logs:**
   - Browser console (F12)
   - Backend terminal output

3. **Test with minimal setup:**
   - Small PDF file (under 1MB)
   - Fresh browser session
   - Cleared cache

4. **Verify basics:**
   - Backend is running (port 5000)
   - Frontend is running (port 5173)
   - MongoDB is connected
   - Cloudinary credentials are correct
