@echo off
title Pis Vsemi Deseti - Start
cd /d "%~dp0"

echo ========================================================
echo  Spoustim webovou aplikaci Pis Vsemi Deseti...
echo ========================================================
echo.

:: Otevreni prohlizece po kratke chvilce
start http://localhost:3000

:: Spusteni Next.js vyvojoveho serveru
call npm.cmd run dev

pause
