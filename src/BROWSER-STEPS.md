# Steps to Check the Application in a Real Browser

## 1. Build the project

From the `src` folder:

```bash
cd /Users/dhruvilacharya/Documents/Project/bot-detect-master/src
npm install
npm run build
```

This compiles TypeScript and creates:

- `dist/bot-detect.js` – script for the browser
- `dist/bundle.cjs` – for Node (e.g. `npm run run`)

## 2. Serve the folder over HTTP

Browsers need the demo page to be loaded over HTTP (not `file://`) so the script loads correctly.

**Option A – npx serve (recommended)**

```bash
cd /Users/dhruvilacharya/Documents/Project/bot-detect-master/src
npx serve .
```

Then open: **http://localhost:3000/demo.html**

**Option B – Python**

```bash
cd /Users/dhruvilacharya/Documents/Project/bot-detect-master/src
python3 -m http.server 8080
```

Then open: **http://localhost:8080/demo.html**

**Option C – Node `serve` package**

If you have `serve` installed globally:

```bash
cd /Users/dhruvilacharya/Documents/Project/bot-detect-master/src
serve
```

Then open the URL it prints (e.g. **http://localhost:3000/demo.html**).

## 3. Open the demo in the browser

1. In your browser, go to **http://localhost:3000/demo.html** (or the port from step 2).
2. Click **“Run detection”**.
3. Check the output:
   - **Collector results** – which checks fired (e.g. webdriver, hiddenScroll).
   - **Verdict** – `human` or `bot`.

## 4. Optional: test from DevTools console

On the same page (after it has loaded and run at least once), you can also run:

```javascript
BotDetect.collector.enableTraps();
BotDetect.collector.collect().then(results => console.log('Results:', results));
BotDetect.collector.collect().then(results => console.log('Verdict:', BotDetect.detector.detect(results)));
```

## 5. Test with automated browser (Playwright)

To confirm that an automated browser is flagged as **"bot"**, from the `src` folder:

```bash
npm install
npx playwright install chromium   # one-time: download Chromium
npm run build
npm run test:bot
```

This opens the demo in headless Chromium via Playwright, clicks "Run detection", and prints the verdict (you should see **"bot"**). Run these in a normal terminal.

## Quick reference

| Step | Command / action |
|------|-------------------|
| Install | `npm install` |
| Build | `npm run build` |
| Serve | `npx serve .` (from `src`) |
| Open | http://localhost:3000/demo.html |
| Test bot | `npx playwright install chromium` then `npm run test:bot` |
| Run | Click “Run detection” on the page |
