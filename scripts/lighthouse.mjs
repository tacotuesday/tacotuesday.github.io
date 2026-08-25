import { spawn } from 'node:child_process';
import { mkdirSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import * as chromeLauncher from 'chrome-launcher';
import lighthouse from 'lighthouse';

const port = 4323;
const origin = `http://127.0.0.1:${port}`;
const routes = ['/', '/about/', '/work/', '/archive/'];
const threshold = 0.95;
const resultsDir = resolve('lighthouse-results');
mkdirSync(resultsDir, { recursive: true });

const server = spawn(
  'npm',
  ['run', 'preview', '--', '--host', '127.0.0.1', '--port', String(port)],
  {
    stdio: ['ignore', 'pipe', 'pipe'],
    env: { ...process.env, PUBLIC_ENABLE_ANALYTICS: 'false' },
  },
);

async function waitForServer() {
  for (let attempt = 0; attempt < 60; attempt += 1) {
    try {
      const response = await fetch(origin);
      if (response.ok) return;
    } catch {
      // Preview is still starting.
    }
    await new Promise((resolveDelay) => setTimeout(resolveDelay, 250));
  }
  throw new Error('Preview server did not start in time.');
}

function resultName(route) {
  const name = route === '/' ? 'home' : route.replaceAll('/', '');
  return resolve(resultsDir, `${name}.json`);
}

let chrome;
try {
  await waitForServer();
  chrome = await chromeLauncher.launch({
    chromeFlags: ['--headless', '--no-sandbox', '--disable-gpu', '--disable-dev-shm-usage'],
    logLevel: 'silent',
  });

  let failed = false;
  for (const route of routes) {
    const run = await lighthouse(`${origin}${route}`, {
      logLevel: 'error',
      output: 'json',
      onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
      port: chrome.port,
    });
    if (!run) throw new Error(`Lighthouse returned no result for ${route}`);
    writeFileSync(resultName(route), run.report);
    const scores = Object.fromEntries(
      Object.entries(run.lhr.categories).map(([key, category]) => [key, category.score ?? 0]),
    );
    console.log(
      `${route} ${Object.entries(scores)
        .map(([key, score]) => `${key}=${Math.round(score * 100)}`)
        .join(' ')}`,
    );
    if (Object.values(scores).some((score) => score < threshold)) failed = true;
  }
  if (failed) throw new Error('One or more Lighthouse category scores were below 95.');
} finally {
  if (chrome) chrome.kill();
  server.kill('SIGTERM');
}
