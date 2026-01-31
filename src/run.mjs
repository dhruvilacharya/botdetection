/**
 * Run bot-detect in Node using JSDOM (browser-like environment).
 * Usage: npm run build && npm run run
 */
import { JSDOM } from 'jsdom';

const dom = new JSDOM('<!DOCTYPE html><html><body></body></html>', {
  url: 'http://localhost',
  pretendToBeVisual: true,
});

const { window } = dom;

// Expose JSDOM globals so bot-detect code can run (it uses Document, window, document, etc.)
globalThis.window = window;
globalThis.document = window.document;
globalThis.Document = window.Document;
globalThis.Element = window.Element;
globalThis.Node = window.Node;
globalThis.HTMLElement = window.HTMLElement;
globalThis.HTMLIFrameElement = window.HTMLIFrameElement;
globalThis.HTMLCanvasElement = window.HTMLCanvasElement;
globalThis.screen = window.screen;
globalThis.MutationObserver = window.MutationObserver;
globalThis.matchMedia = window.matchMedia || (() => ({ matches: false }));
globalThis.Notification = window.Notification || { permission: 'default' };
globalThis.screen = window.screen;
globalThis.postMessage = window.postMessage.bind(window);
globalThis.body = window.document.body;

// Stub canvas getContext so webGLDisabled etc. don't throw (JSDOM has limited support)
if (typeof window.HTMLCanvasElement !== 'undefined' && window.HTMLCanvasElement.prototype) {
  const orig = window.HTMLCanvasElement.prototype.getContext;
  window.HTMLCanvasElement.prototype.getContext = function (contextId) {
    if (contextId === 'webgl' || contextId === 'experimental-webgl') return null;
    return orig ? orig.apply(this, arguments) : null;
  };
}

async function main() {
  const { createRequire } = await import('module');
  const require = createRequire(import.meta.url);
  const BotDetect = require('./dist/bundle.cjs').default;

  console.log('Running bot-detect...\n');

  BotDetect.collector.enableTraps();
  const results = await BotDetect.collector.collect();
  const verdict = BotDetect.detector.detect(results);

  console.log('Collector results:', results.length ? results : '(none)');
  console.log('Verdict:', verdict);
  console.log('\nDone.');
}

main().catch((err) => {
  console.error('Run failed:', err);
  process.exit(1);
});
