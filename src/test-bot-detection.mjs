/**
 * Test bot detection: run demo in Playwright (automation) and check verdict is "bot".
 * Run: npm install && npx playwright install chromium && npm run test:bot
 */
import { createServer } from 'http';
import { readFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PORT = 37542;

function serveDemo(req, res) {
  const url = req.url === '/' ? '/demo.html' : req.url;
  const file = join(__dirname, url === '/demo.html' ? 'demo.html' : url.replace(/^\//, ''));
  if (!existsSync(file) || url.startsWith('..')) {
    res.writeHead(404);
    res.end('Not found');
    return;
  }
  const ext = file.split('.').pop();
  const types = { html: 'text/html', js: 'application/javascript' };
  res.setHeader('Content-Type', types[ext] || 'application/octet-stream');
  res.end(readFileSync(file));
}

async function main() {
  let playwright;
  try {
    playwright = await import('playwright');
  } catch {
    console.error('Playwright not installed. Run: npm install playwright');
    console.error('Then install browser: npx playwright install chromium');
    process.exit(1);
  }

  const server = createServer(serveDemo);
  server.listen(PORT, '127.0.0.1');
  await new Promise((r) => server.on('listening', r));

  let browser;
  try {
    browser = await playwright.chromium.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto(`http://127.0.0.1:${PORT}/demo.html`, { waitUntil: 'networkidle' });
    await page.click('button#run');
    await page.waitForFunction(
      () => {
        const el = document.getElementById('results');
        return el && !el.textContent.includes('Running') && !el.textContent.startsWith('(Click');
      },
      { timeout: 5000 }
    );
    const text = await page.locator('#results').innerText();
    const verdictMatch = text.match(/Verdict:\s*(\w+)/);
    const verdict = verdictMatch ? verdictMatch[1] : '';
    const resultsMatch = text.match(/Collector results:\s*([^\n]+)/);
    const results = resultsMatch ? resultsMatch[1].trim() : '';

    console.log('Collector results:', results);
    console.log('Verdict:', verdict);

    if (verdict === 'bot') {
      console.log('\n✓ Bot detection is working: automated browser was correctly flagged as "bot".');
    } else {
      console.log('\n✗ Expected verdict "bot" when run in Playwright; got "' + verdict + '".');
      console.log('  (Some automation environments may not trigger all detectors.)');
    }
  } finally {
    if (browser) await browser.close();
    server.close();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
