#!/usr/bin/env node
/*
 * Bundles the app for deployment: reads css/js load order from index.html (the single source of truth),
 * concatenates the files in that order and writes dist/index.html, dist/app.css and dist/app.js.
 * No dependencies. Usage: node scripts/build.js
 */
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const dist = path.join(root, 'dist');
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');

const styles = [...html.matchAll(/<link rel="stylesheet" href="(css\/[^"]+)">/g)].map(m => m[1]);
const scripts = [...html.matchAll(/<script src="(js\/[^"]+)"><\/script>/g)].map(m => m[1]);
if (!styles.length || !scripts.length) throw new Error('No css/js files found in index.html');

const read = f => fs.readFileSync(path.join(root, f), 'utf8');
const join = (files, banner) =>
  files.map(f => `${banner(f)}\n${read(f).replace(/\n$/, '')}\n`).join('\n');

fs.mkdirSync(dist, { recursive: true });
fs.writeFileSync(
  path.join(dist, 'app.css'),
  join(styles, f => `/* ${f} */`)
);
fs.writeFileSync(
  path.join(dist, 'app.js'),
  join(scripts, f => `/* ${f} */`)
);

const out = html
  .replace(/<!-- Styles[\s\S]*?(?=<\/head>)/, '<link rel="stylesheet" href="app.css">\n')
  .replace(/<!-- Scripts[\s\S]*?(?=<\/body>)/, '<script src="app.js"></script>\n');
fs.writeFileSync(path.join(dist, 'index.html'), out);

console.log(
  `Built dist/: ${styles.length} css files -> app.css, ${scripts.length} js files -> app.js`
);
