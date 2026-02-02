@echo off
echo ========================================
echo Tula Students Association - Backend Setup
echo ========================================
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Node.js is not installed. Please install Node.js first.
    exit /b 1
)

echo [OK] Node.js is installed
node -v
echo.

REM Install dependencies
echo [INFO] Installing dependencies...
call npm install

if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Failed to install dependencies
    exit /b 1
)

echo [OK] Dependencies installed successfully
echo.

REM Create .env file if it doesn't exist
if not exist .env (
    echo [INFO] Creating .env file...
    copy .env.example .env
    echo [OK] .env file created. Please update it with your credentials.
) else (
    echo [INFO] .env file already exists
)

echo.
echo ========================================
echo [OK] Setup complete!
echo.
echo Next steps:
echo 1. Edit .env file with your credentials
echo 2. Start MongoDB (if using local)
echo 3. Run: npm run dev
echo.
echo See SETUP_GUIDE.md for detailed instructions
echo ========================================
pause
