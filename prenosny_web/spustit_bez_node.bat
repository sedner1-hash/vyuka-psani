@echo off
title Pis Vsemi Deseti - Prenosna Verze
cd /d "%~dp0"

echo ========================================================
echo  Spoustim aplikaci bez instalace Node.js...
echo ========================================================

start powershell -WindowStyle Hidden -Command "$p=3000; $l=New-Object System.Net.HttpListener; $l.Prefixes.Add(\"http://localhost:$p/\"); $l.Start(); Start-Process \"http://localhost:$p/\"; while($l.IsListening){ $c=$l.GetContext(); $r=$c.Request; $s=$c.Response; $url=$r.RawUrl.Split('?')[0]; if($url -eq '/'){ $url='/index.html' }; $f=Join-Path (Get-Location) $url.TrimStart('/'); if(Test-Path $f -PathType Leaf){ $bytes=[System.IO.File]::ReadAllBytes($f); $ext=[System.IO.Path]::GetExtension($f).ToLower(); switch($ext){ '.html'{$s.ContentType='text/html; charset=utf-8'} '.js'{$s.ContentType='application/javascript'} '.css'{$s.ContentType='text/css'} '.svg'{$s.ContentType='image/svg+xml'} '.ico'{$s.ContentType='image/x-icon'} default{$s.ContentType='application/octet-stream'} }; $s.ContentLength64=$bytes.Length; $s.OutputStream.Write($bytes,0,$bytes.Length) } else { $s.StatusCode=404 }; $s.OutputStream.Close() }"

echo Web bezi na: http://localhost:3000
echo Pro ukonceni muzete toto cerne okno zavrit.
pause
