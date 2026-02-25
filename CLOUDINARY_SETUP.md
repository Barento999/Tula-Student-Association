# Cloudinary Setup Guide

This guide will help you set up Cloudinary for file uploads in the Tula Student Association application.

## Quick Setup

### 1. Create a Cloudinary Account

1. Go to [Cloudinary](https://cloudinary.com/)
2. Sign up for a free account
3. Verify your email address

### 2. Get Your Credentials

After logging in:

1. Go to your Dashboard
2. You'll see your credentials:
   - **Cloud Name**: Your unique cloud name (usually lowercase)
   - **API Key**: Your API key
   - **API Secret**: Your API secret (click "Reveal" to see it)

### 3. Configure Backend Environment

Add these credentials to your `backend/.env` file:

```env
CLOUDINARY_CLOUD_NAME=your_cloud_name_here
CLOUDINARY_API_KEY=your_api_key_here
CLOUDINARY_API_SECRET=your_api_secret_here
```

**Important Notes:**

- Cloud names are case-sensitive and usually lowercase
- Never commit your `.env` file to version control
- Restart your backend server after updating `.env`

## File Upload & Download Solutions

This application implements **two solutions** for file access to handle different Cloudinary security configurations:

### Solution 1: Public Access (Recommended for Development)

**Best for:** Development, testing, and accounts without strict security

**Setup:**

1. Go to Cloudinary Dashboard → Settings → Security
2. **Disable** "Strict Transformations"
3. **Disable** "Restricted media types"
4. Set delivery type to **"public"**
5. Save changes

**How it works:**

- Files are uploaded with public URLs
- Anyone with the URL can access the file
- Faster and simpler implementation
- No additional authentication needed

### Solution 2: Signed URLs (Automatic Fallback)

**Best for:** Production environments with strict security requirements

**How it works:**

- Files are uploaded to Cloudinary normally
- When downloading, the backend generates a temporary signed URL
- Signed URLs expire after 1 hour for security
- Automatically used if public access fails

**No additional setup required** - this is already implemented as a fallback!

## How the Application Handles Downloads

The application uses a smart download strategy:

1. **First attempt:** Try to get a signed URL from the backend
   - If successful, use the signed URL (secure, temporary access)
   - If fails, fall back to direct URL

2. **Second attempt:** Use the direct Cloudinary URL
   - Works if your account allows public access
   - Simpler and faster

3. **Error handling:** If both fail, show a helpful error message

## Troubleshooting

### Problem: Files upload but show 0 bytes or can't be downloaded

**Cause:** Cloudinary security settings are blocking public access

**Solutions:**

**Option A: Adjust Cloudinary Settings (Easiest)**

1. Go to Settings → Security in Cloudinary Dashboard
2. Disable "Strict Transformations"
3. Ensure delivery type is "public"
4. Test file upload/download again

**Option B: Use Signed URLs (Already Implemented)**

- The application automatically tries signed URLs
- No code changes needed
- Works with strict security settings
- Files are accessible for 1 hour after generating the signed URL

### Problem: "Invalid cloud name" error

**Cause:** Cloud name is incorrect or has wrong case

**Solution:**

1. Check your Cloudinary Dashboard for the exact cloud name
2. Cloud names are usually lowercase
3. Update `CLOUDINARY_CLOUD_NAME` in `backend/.env`
4. Restart backend server

### Problem: "Invalid API credentials" error

**Cause:** API Key or Secret is incorrect

**Solution:**

1. Go to Cloudinary Dashboard
2. Click "Reveal" next to API Secret to see the full value
3. Copy the exact values (no extra spaces)
4. Update `backend/.env`
5. Restart backend server

### Problem: Files upload successfully but return 401/404 when accessed

**Cause:** Cloudinary account has authentication enabled

**Solution:**

- The application now automatically uses signed URLs as a fallback
- Signed URLs provide temporary authenticated access
- No additional configuration needed
- If you want permanent public access, adjust Security settings (Option A above)

## Testing Your Setup

### Test File Upload (Admin Dashboard)

1. Login as admin at `/sys-auth-portal`
2. Go to Materials tab
3. Click "Upload Material"
4. Fill in the form and select a file
5. Click "Upload Material"
6. Check if the material appears in the list

### Test File Download (Materials Page)

1. Go to `/materials` page
2. Find an uploaded material
3. Click "Download" button
4. File should download to your computer

### Check Upload in Cloudinary

1. Go to Cloudinary Dashboard
2. Click "Media Library" in the left sidebar
3. Look for the "tula-students-materials" folder
4. Your uploaded files should be there

## File Size Limits

- **Free Cloudinary Account:** 10MB per file, 25GB total storage
- **Supported Formats:** PDF, DOC, DOCX, PPT, PPTX, JPG, PNG
- **Recommended:** Keep files under 5MB for faster uploads/downloads

## Security Best Practices

### For Development:

- Use public access for easier testing
- Keep credentials in `.env` file
- Don't commit `.env` to Git

### For Production:

- Enable signed URLs (already implemented)
- Use environment variables on your hosting platform
- Consider upgrading Cloudinary plan for more storage
- Enable "Strict Transformations" for better security
- Regularly rotate API credentials

## Advanced Configuration

### Custom Upload Folder

To change the upload folder, edit `backend/config/cloudinary.js`:

```javascript
params: {
  folder: "your-custom-folder-name", // Change this
  resource_type: "auto",
  // ... other settings
}
```

### Adjust Signed URL Expiration

To change how long signed URLs are valid, edit `backend/controllers/materialController.js`:

```javascript
expires_at: Math.floor(Date.now() / 1000) + 3600, // 3600 = 1 hour
// Change 3600 to desired seconds (e.g., 7200 = 2 hours)
```

## Support

If you continue to have issues:

1. Check the browser console for error messages
2. Check backend server logs for detailed errors
3. Verify all environment variables are set correctly
4. Ensure backend server was restarted after changing `.env`
5. Test with a small PDF file first (under 1MB)

## Summary

✅ **Implemented Features:**

- Automatic file upload to Cloudinary
- Smart download with signed URL fallback
- Support for both public and authenticated access
- Comprehensive error handling
- File size tracking
- Download count tracking

✅ **No Additional Setup Required:**

- Signed URLs work automatically
- Fallback to direct URLs if available
- Works with any Cloudinary security configuration

Just configure your credentials and you're ready to go!
