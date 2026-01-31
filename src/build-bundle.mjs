import * as esbuild from 'esbuild';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Node (CJS) bundle for npm run run
await esbuild.build({
  entryPoints: ['dist/index.js'],
  bundle: true,
  format: 'cjs',
  platform: 'browser',
  outfile: 'dist/bundle.cjs',
  external: [],
});

// Browser (IIFE) bundle for demo.html – exposes window.BotDetect
await esbuild.build({
  entryPoints: ['dist/index.js'],
  bundle: true,
  format: 'iife',
  globalName: 'BotDetect',
  platform: 'browser',
  outfile: 'dist/bot-detect.js',
  external: [],
});

console.log('Bundled to dist/bundle.cjs (Node) and dist/bot-detect.js (browser)');
