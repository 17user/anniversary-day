#!/usr/bin/env node
const { spawnSync, spawn } = require('child_process');
const fs = require('fs');
const os = require('os');
const path = require('path');
const isWindows = os.platform() === 'win32';
const LOG_FILE = path.join(process.cwd(), '.vercel-tmp', 'login.log');
const ALLOWED_COMMANDS = new Set(['vercel']);
function log(msg) { console.error(msg); }
function commandExists(cmd) {
  if (!ALLOWED_COMMANDS.has(cmd)) throw new Error(`Command not in whitelist: ${cmd}`);
  try {
    if (isWindows) { const r = spawnSync('where', [cmd], { stdio: 'ignore' }); return r.status === 0; }
    else { const r = spawnSync('sh', ['-c', `command -v "$1"`, '--', cmd], { stdio: 'ignore' }); return r.status === 0; }
  } catch { return false; }
}
function getVercelBin() {
  const local = path.join(process.cwd(), 'node_modules', '.bin', 'vercel');
  if (fs.existsSync(local)) return local;
  return 'vercel';
}
function checkLoginStatus() {
  log('Checking login status...');
  try {
    const vercel = getVercelBin();
    const result = spawnSync(vercel, ['whoami'], { encoding: 'utf8', stdio: ['pipe', 'pipe', 'pipe'], shell: isWindows });
    const output = (result.stdout || '').trim();
    if (result.status === 0 && output && !output.includes('Error') && !output.includes('not logged in')) {
      log(`Logged in as: ${output}`);
      return true;
    }
  } catch {}
  return false;
}
function sleep(ms) { return new Promise(resolve => setTimeout(resolve, ms)); }
function startBackgroundLogin() {
  const vercel = getVercelBin();
  const logStream = fs.openSync(LOG_FILE, 'w');
  const child = spawn(vercel, ['login'], { detached: true, stdio: ['ignore', logStream, logStream], shell: isWindows });
  child.unref();
  log(`Background login process started (PID: ${child.pid})`);
  fs.writeFileSync(LOG_FILE + '.pid', String(child.pid));
  return child.pid;
}
function openBrowser(url) {
  const urlPattern = /^https:\/\/vercel\.com\/oauth\/device\?user_code=[A-Z0-9-]+$/;
  if (!urlPattern.test(url)) { log(`URL does not match expected pattern: ${url}`); return; }
  try {
    if (os.platform() === 'darwin') spawnSync('open', [url], { stdio: 'ignore' });
    else if (os.platform() === 'win32') spawnSync('powershell', ['-Command', `Start-Process '${url}'`], { stdio: 'ignore', windowsHide: true });
    else spawnSync('xdg-open', [url], { stdio: 'ignore' });
    log('Browser opened automatically');
  } catch (e) { log(`Failed to open browser: ${e.message}`); }
}
async function waitForAuthUrl() {
  for (let i = 0; i < 40; i++) {
    await sleep(500);
    try {
      if (fs.existsSync(LOG_FILE)) {
        const content = fs.readFileSync(LOG_FILE, 'utf8');
        const match = content.match(/https:\/\/vercel\.com\/oauth\/device\?user_code=[A-Z0-9-]+(?=\s|$)/);
        if (match) return match[0];
      }
    } catch (e) { if (e.code !== 'ENOENT') log(`Warning: ${e.code || e.message}`); }
  }
  return null;
}
async function main() {
  log('======================================== Vercel CLI Login ========================================');
  if (checkLoginStatus()) {
    console.log(JSON.stringify({ status: 'already_logged_in', message: 'Already logged in' }));
    process.exit(0);
  }
  log('Starting login authorization...');
  const loginPid = startBackgroundLogin();
  log('Waiting for authorization URL...');
  const authUrl = await waitForAuthUrl();
  if (authUrl) {
    log('Authorization URL extracted, opening browser...');
    openBrowser(authUrl);
    console.log(JSON.stringify({ status: 'needs_auth', auth_url: authUrl, log_file: LOG_FILE }));
  } else {
    log('Failed to get authorization URL');
    try { log('Log content: ' + fs.readFileSync(LOG_FILE, 'utf8')); } catch (e) {}
    process.exit(1);
  }
}
main();
