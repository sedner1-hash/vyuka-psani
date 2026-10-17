@echo off
title Pis Vsemi Deseti - Priprava noveho PC
cd /d "%~dp0"

echo ========================================================
echo  Instalace zavislosti na novem PC...
echo ========================================================
echo.
echo Kontroluji Node.js...
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo [CHYBA] Na tomto PC neni nainstalovan Node.js!
    echo Prosim stahnete a nainstalujte Node.js z: https://nodejs.org
    pause
    exit /b
)

echo Instaluji potrebne knihovny (npm install)...
call npm install

echo.
echo ========================================================
echo  Hotovo! Nyni spoustim aplikaci...
echo ========================================================
start http://localhost:3000
call npm run dev

pause
