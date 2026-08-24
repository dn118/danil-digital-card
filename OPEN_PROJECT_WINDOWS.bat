@echo off
setlocal
cd /d "%~dp0"

where docker >nul 2>nul
if errorlevel 1 (
  echo Docker Desktop was not found.
  echo Install and start Docker Desktop, then run this file again.
  pause
  exit /b 1
)

echo Starting the application and CockroachDB...
start "Digital Card" cmd /c "timeout /t 20 /nobreak >nul && start http://localhost:3000"
docker compose up --build
