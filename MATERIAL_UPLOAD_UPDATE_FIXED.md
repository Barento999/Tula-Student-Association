# Material Upload & Update Fixed

## Issues Fixed

1. Material upload was failing with error: "Cast to ObjectId failed for value 'Summer 2026'"
2. Material update functionality was not working (missing backend route and controller)

## Root Causes

1. Frontend was using `session.id` instead of `session._id` (MongoDB uses `_id` as ObjectId)
2. Backend had no update route or controller function for materials
3. Frontend was using `editingItem.id` instead of `editingItem._id` when updating

## Changes Made

### Backend Changes

#### 1. Added Material Update Controller

**File**: `backend/controllers/materialController.js`

Added new `updateMaterial` function:

- Updates material fields (title, subject, level, grade, etc.)
- Handles file replacement (deletes old file from Cloudinary if new file uploaded)
- Returns populated material with user and session info

#### 2. Added Material Update Route

**File**: `backend/routes/materialRoutes.js`

Added PUT route:

```javascript
router.put(
  "/:id",
  protect,
  authorize("admin", "volunteer"),
  upload.single("file"),
  updateMaterial,
);
```

### Frontend Changes

#### 1. Fixed Session Dropdown

**File**: `frontend/src/pages/AdminDashboard.jsx`

Changed to use `session._id`:

```jsx
{
  sessions.map((session) => (
    <option key={session._id || session.id} value={session._id || session.id}>
      {session.name}
    </option>
  ));
}
```

#### 2. Fixed Material Edit Form

When editing, now correctly extracts session ID from populated field:

```jsx
sessionId: material.summerSession?._id ||
  material.summerSession ||
  material.sessionId ||
  "";
```

#### 3. Fixed Update Calls

Both material and session updates now use `_id`:

```jsx
await updateMaterial(editingItem._id || editingItem.id, formData);
updateSession(editingItem._id || editingItem.id, sessionForm);
```

#### 4. Fixed All ID References

Changed all instances of `.id` to `._id || .id` for:

- Material keys and delete buttons
- Session keys and delete buttons
- Update function calls

## How to Test

### 1. Start Servers

```bash
start-dev.bat
```

### 2. Create a Session

- Login as admin
- Go to "Sessions" tab
- Click "Create Session"
- Fill in details and save

### 3. Upload Material

- Go to "Materials" tab
- Click "Upload Material"
- Fill in all fields and select a session
- Upload a file
- Click "Upload Material"

### 4. Update Material

- Click "Edit" on any material
- Modify fields (title, subject, etc.)
- Optionally upload a new file
- Click "Update Material"
- Old file will be deleted from Cloudinary if new file uploaded

## Important Notes

- Backend must be restarted after changing `.env` file
- Sessions are required for materials
- MongoDB uses `_id` (ObjectId) not `id`
- When updating with new file, old file is automatically deleted from Cloudinary
- Update route requires authentication (admin or volunteer)

## Related Files

- `backend/controllers/materialController.js` - Added updateMaterial function
- `backend/routes/materialRoutes.js` - Added PUT route
- `frontend/src/pages/AdminDashboard.jsx` - Fixed all ID references
- `frontend/src/services/api.js` - Update method already existed

## Status

✅ **FIXED** - Material upload and update now work correctly
