@echo off
echo 🚀 Deploying Mathematico Backend API to Vercel...

REM Check if vercel CLI is installed
where vercel >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Vercel CLI not found. Installing...
    npm install -g vercel
)

REM Install dependencies
echo 📦 Installing dependencies...
npm install

REM Deploy to Vercel
echo 🚀 Deploying to Vercel...
vercel --prod

echo ✅ Deployment complete!
echo 🌐 API will be available at: https://mathematico-backend-new.vercel.app/api/v1
echo 🔍 Test the API: curl https://mathematico-backend-new.vercel.app/api/v1/health
pause
