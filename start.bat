@echo off
setlocal

set "ROOT_DIR=%~dp0"
set "BACKEND_DIR=%ROOT_DIR%Backend Spring"
set "FRONTEND_DIR=%ROOT_DIR%Frontent React"

echo Starting ProductManagement application...
echo.

if not exist "%BACKEND_DIR%\mvnw.cmd" (
    echo Backend Maven wrapper was not found at:
    echo %BACKEND_DIR%\mvnw.cmd
    pause
    exit /b 1
)

if not exist "%FRONTEND_DIR%\package.json" (
    echo Frontend package.json was not found at:
    echo %FRONTEND_DIR%\package.json
    pause
    exit /b 1
)

start "ProductManagement Backend" cmd /k "cd /d "%BACKEND_DIR%" && mvnw.cmd spring-boot:run"
start "ProductManagement Frontend" cmd /k "cd /d "%FRONTEND_DIR%" && npm install && npm run dev"

echo Backend is starting at http://localhost:8080
echo Frontend is starting at http://localhost:5173
echo.
echo Keep both opened terminal windows running while using the app.
pause
