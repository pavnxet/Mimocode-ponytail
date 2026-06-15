@echo off
setlocal

if defined APPDATA (
  set "DEST=%APPDATA%\mimocode\compose\0.1.0\skills"
) else (
  set "DEST=%USERPROFILE%\.local\share\mimocode\compose\0.1.0\skills"
)

echo Installing ponytail skills to: %DEST%
mkdir "%DEST%" 2>nul

for /d %%i in (skills\*) do (
  echo   - %%~nxi
  xcopy /E /I /Y "%%i" "%DEST%\%%~nxi"
)

echo Done. Restart mimocode to use ponytail.
