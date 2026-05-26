#!/usr/bin/env node
const { spawnSync } = require('child_process');
const fs = require('fs');
const os = require('os');
const path = require('path');
const isWindows = os.platform() === 'win32';
function log(msg) { console.error(msg); }
function getVercelBin() {
  const local = path.join(process.cwd(), 'node_modules', '.bin', 'vercel');
  if (fs.existsSync(local)) return local;
  return 'vercel';
}
function checkLoginStatus() {
  try {
    const vercel = getVercelBin();
    const result = spawnSync(vercel, ['whoami'], { encoding: 'utf8', stdio: ['pipe', 'pipe', 'pipe'], shell: isWindows });
    const output = (result.stdout || '').trim();
    if (result.status === 0 && output && !output.includes('Error')) { log(`Logged in as: ${output}`); return true; }
  } catch {}
  return false;
}
function doDeploy(projectPath) {
  log(''); log('Starting deployment...'); log('');
  const vercel = getVercelBin();
  const result = spawnSync(vercel, ['--yes', '--prod'], {
    cwd: projectPath, encoding: 'utf8',
    stdio: ['inherit', 'pipe', 'pipe'],
    timeout: 300000, shell: isWindows
  });
  const output = (result.stdout || '') + (result.stderr || '');
  log(output);
  if (result.status !== 0) { log('Deployment failed'); process.exit(1); }
  const aliasedMatch = output.match(/Aliased:\s*(https:\/\/[a-zA-Z0-9.-]+\.vercel\.app)/i);
  const productionMatch = output.match(/Production:\s*(https:\/\/[a-zA-Z0-9.-]+\.vercel\.app)/i);
  const finalUrl = (aliasedMatch && aliasedMatch[1]) || (productionMatch && productionMatch[1]);
  log(''); log('======================================== Deployment successful! ========================================'); log('');
  if (finalUrl) { log(`Your site is live: ${finalUrl}`); console.log(JSON.stringify({ status: 'success', url: finalUrl })); }
  else { console.log(JSON.stringify({ status: 'success', message: 'Deployment successful' })); }
}
function main() {
  log('======================================== Vercel Deployment ========================================'); log('');
  if (!checkLoginStatus()) { log('Error: Not logged in'); process.exit(1); }
  doDeploy(process.cwd());
}
main();
