@echo off
setlocal

set "SKILL_DEST=%USERPROFILE%\.config\mimocode\skills"
set "CMD_DEST=%USERPROFILE%\.config\mimocode\commands"

if not exist "%SKILL_DEST%" mkdir "%SKILL_DEST%"
if not exist "%CMD_DEST%" mkdir "%CMD_DEST%"

echo Installing ponytail skills to: %SKILL_DEST%
for /d %%d in (skills\*) do (
  echo   -^> %%~nxd
  xcopy /E /I /Y "%%d" "%SKILL_DEST%\%%~nxd" >nul
)

echo Installing ponytail commands to: %CMD_DEST%
copy /Y ".mimocode\commands\*.md" "%CMD_DEST%" >nul

echo Done. Restart MiMo Code to use ponytail.
endlocal
