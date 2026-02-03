# Fix: "api is not defined" Error

## Error

```
Error updating profile: ReferenceError: api is not defined
at handleProfileSubmit (AdminDashboard.jsx:199:27)
```

## Cause

The browser has cached the old version of the file before the `api` import was added.

## Solution

### Step 1: Restart Servers

The code has been updated but servers need to be restarted to load the changes.

**Option A - Use the batch file:**

```bash
start-dev.bat
```

**Option B - Manual start:**

```bash
# Terminal 1 - Backend
cd backend
npm start

# Terminal 2 - Frontend
cd frontend
npm run dev
```

### Step 2: Clear Browser Cache

After servers restart, do a **hard refresh** in your browser:

- **Windows**: `Ctrl + Shift + R` or `Ctrl + F5`
- **Mac**: `Cmd + Shift + R`

Or manually clear cache:

1. Open DevTools (F12)
2. Right-click the refresh button
3. Select "Empty Cache and Hard Reload"

### Step 3: Test Again

1. Login as admin
2. Go to Profile tab
3. Click "Edit Profile"
4. Make changes
5. Click "Save Changes"
6. Should work without errors ✅

## Verification

The import is correctly added at the top of `AdminDashboard.jsx`:

```javascript
import api from "../services/api";
```

The function correctly uses it:

```javascript
const updatedUser = await api.auth.updateProfile({
  name: profileForm.fullName,
  email: profileForm.email,
});
```

## If Still Not Working

1. Check browser console for any other errors
2. Verify both backend and frontend servers are running
3. Check that backend is running on port 5000
4. Check that frontend is running on port 5173
5. Try opening in incognito/private window

## Status

✅ Code is correct - just needs server restart and browser cache clear
