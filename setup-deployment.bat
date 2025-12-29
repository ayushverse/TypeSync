@echo off
echo ================================
echo TypeSync Deployment Setup
echo ================================
echo.

echo [1/3] Creating local environment files...
echo.

REM Frontend .env
if not exist "frontend\.env" (
    echo Creating frontend\.env from template...
    copy "frontend\.env.example" "frontend\.env" >nul
    echo DONE: frontend\.env created
) else (
    echo SKIP: frontend\.env already exists
)

echo.

REM Backend .env  
if not exist "backend\.env" (
    echo Creating backend\.env from template...
    copy "backend\.env.example" "backend\.env" >nul
    echo DONE: backend\.env created
) else (
    echo SKIP: backend\.env already exists
)

echo.
echo [2/3] Checking Git status...
echo.

git status

echo.
echo [3/3] Next steps:
echo.
echo 1. Edit frontend\.env and backend\.env with your settings
echo 2. Test locally:
echo    - Terminal 1: cd backend ^&^& npm start
echo    - Terminal 2: cd frontend ^&^& npm run dev
echo 3. Follow DEPLOYMENT.md or DEPLOYMENT_CHECKLIST.md for deployment
echo.
echo ================================
echo Setup Complete!
echo ================================
echo.

pause
