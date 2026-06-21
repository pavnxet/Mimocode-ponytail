@echo off
setlocal

set "BASE=%USERPROFILE%\.codex\skills"
set "DEST=%BASE%"

if not exist "%DEST%" (
  mkdir "%DEST%"
)

echo Installing ponytail skills to: %DEST%

for /d %%i in (skills\*) do (
  echo   - %%~nxi
  xcopy /E /I /Y "%%i" "%DEST%\%%~nxi"
)

echo Done. Restart codex to use ponytail.
