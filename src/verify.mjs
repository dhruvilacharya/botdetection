/**
 * Verify bot detection logic: detector returns "bot" for known bot signals,
 * "human" when no bot signals. No Puppeteer required.
 */
import { JSDOM } from 'jsdom';

const dom = new JSDOM('<!DOCTYPE html><html><body></body></html>');
const { window } = dom;
globalThis.window = window;
globalThis.document = window.document;
globalThis.Document = window.Document;

const { createRequire } = await import('module');
const require = createRequire(import.meta.url);
const BotDetect = require('./dist/bundle.cjs').default;

const detector = BotDetect.detector;

// When collector finds "webdriver", verdict should be "bot"
const verdictBot = detector.detect(['webdriver']);
if (verdictBot !== 'bot') {
  console.error('FAIL: detect(["webdriver"]) should return "bot", got:', verdictBot);
  process.exit(1);
}
console.log('✓ detect(["webdriver"]) → "bot"');

// When no bot signals, verdict should be "human"
const verdictHuman = detector.detect([]);
if (verdictHuman !== 'human') {
  console.error('FAIL: detect([]) should return "human", got:', verdictHuman);
  process.exit(1);
}
console.log('✓ detect([]) → "human"');

// Combined rule: all of ['firefoxDevTools', 'webGLDisabled'] → "bot"
const verdictCombo = detector.detect(['firefoxDevTools', 'webGLDisabled']);
if (verdictCombo !== 'bot') {
  console.error('FAIL: detect(["firefoxDevTools","webGLDisabled"]) should return "bot", got:', verdictCombo);
  process.exit(1);
}
console.log('✓ detect(["firefoxDevTools","webGLDisabled"]) → "bot"');

console.log('\nBot detection logic is working correctly.');
