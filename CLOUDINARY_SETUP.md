# Cloudinary Setup Guide

## Step 1: Create a Cloudinary Account

1. Go to [https://cloudinary.com/](https://cloudinary.com/)
2. Click "Sign Up for Free"
3. Create your account

## Step 2: Get Your Credentials

1. After logging in, go to your Dashboard
2. You'll see your credentials:
   - **Cloud Name** (e.g., `dxyz123abc`)
   - **API Key** (e.g., `123456789012345`)
   - **API Secret** (click "Reveal" to see it)

## Step 3: Update Your .env File

Open `backend/.env` and update these lines:

```env
CLOUDINARY_CLOUD_NAME=your_cloud_name_here
CLOUDINARY_API_KEY=your_api_key_here
CLOUDINARY_API_SECRET=your_api_secret_here
```

Replace with your actual credentials from the Cloudinary dashboard.

## Step 4: Restart Your Backend Server

```bash
cd backend
npm start
```

## Step 5: Test File Upload

1. Login as admin
2. Go to Admin Dashboard
3. Click "Upload Material"
4. Fill in the form and select a file
5. Click "Upload Material"

The file will be uploaded to Cloudinary and the URL will be saved in your database.

## Folder Structure

Files will be stored in Cloudinary under the folder: `tula-students-materials`

## Supported File Types

- PDF
- DOC/DOCX
- PPT/PPTX
- JPG/PNG

## File Size Limit

Maximum 10MB per file

## Troubleshooting

### Error: "Invalid cloud_name"

- Make sure your cloud name is correct (no spaces, exact match from dashboard)
- Restart your backend server after updating .env

### Error: "Upload failed"

- Check your API key and secret are correct
- Make sure you have space in your Cloudinary account (free tier: 25GB)

### Files not showing

- Check the browser console for errors
- Verify the backend server is running
- Check MongoDB connection is working
