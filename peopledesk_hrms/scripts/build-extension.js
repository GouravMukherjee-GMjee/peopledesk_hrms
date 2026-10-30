#!/usr/bin/env node
/*
 * Prepares extension/ for loading or zipping: copies the shared logic and popup styles from the app
 * (one source of truth) and draws the PNG icons. No dependencies. Usage: node scripts/build-extension.js
 */
const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

const root = path.resolve(__dirname, '..');
const ext = path.join(root, 'extension');
const copy = (from, to) => fs.copyFileSync(path.join(root, from), path.join(ext, to));
copy('js/services/ext-core.js', 'shared/ext-core.js');
copy('css/components/ext-popup.css', 'popup/ext-popup.css');

/* icon: brand-blue rounded square with a white clock, 4x4 supersampled for smooth edges */
function crc32(buf) {
  let c,
    crc = ~0;
  for (let n = 0; n < buf.length; n++) {
    c = (crc ^ buf[n]) & 0xff;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    crc = (crc >>> 8) ^ c;
  }
  return ~crc >>> 0;
}
const chunk = (type, data) => {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length);
  const td = Buffer.concat([Buffer.from(type), data]),
    crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(td));
  return Buffer.concat([len, td, crc]);
};
function png(size) {
  const SS = 4,
    raw = Buffer.alloc(size * (size * 4 + 1)),
    R = size * 0.22,
    cx = size / 2,
    segDist = (px, py, ax, ay, bx, by) => {
      const dx = bx - ax,
        dy = by - ay,
        t = Math.max(0, Math.min(1, ((px - ax) * dx + (py - ay) * dy) / (dx * dx + dy * dy)));
      return Math.hypot(px - ax - t * dx, py - ay - t * dy);
    };
  const inBox = (x, y) => {
    const qx = Math.abs(x - cx) - (cx - R),
      qy = Math.abs(y - cx) - (cx - R);
    return Math.hypot(Math.max(qx, 0), Math.max(qy, 0)) + Math.min(Math.max(qx, qy), 0) <= R;
  };
  for (let y = 0; y < size; y++) {
    raw[y * (size * 4 + 1)] = 0;
    for (let x = 0; x < size; x++) {
      let a = 0,
        w = 0;
      for (let j = 0; j < SS; j++)
        for (let i = 0; i < SS; i++) {
          const px = x + (i + 0.5) / SS,
            py = y + (j + 0.5) / SS;
          if (!inBox(px, py)) continue;
          a++;
          const ring = Math.abs(Math.hypot(px - cx, py - cx) - size * 0.28) <= size * 0.045,
            hand =
              segDist(px, py, cx, size * 0.36, cx, cx) <= size * 0.045 ||
              segDist(px, py, cx, cx, size * 0.6, size * 0.56) <= size * 0.045;
          if (ring || hand) w++;
        }
      const o = y * (size * 4 + 1) + 1 + x * 4,
        k = a ? w / a : 0;
      raw[o] = Math.round(0x39 + (255 - 0x39) * k);
      raw[o + 1] = Math.round(0x69 + (255 - 0x69) * k);
      raw[o + 2] = Math.round(0xd0 + (255 - 0xd0) * k);
      raw[o + 3] = Math.round((a / (SS * SS)) * 255);
    }
  }
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(size, 0);
  ihdr.writeUInt32BE(size, 4);
  ihdr[8] = 8;
  ihdr[9] = 6;
  return Buffer.concat([
    Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]),
    chunk('IHDR', ihdr),
    chunk('IDAT', zlib.deflateSync(raw)),
    chunk('IEND', Buffer.alloc(0))
  ]);
}
fs.mkdirSync(path.join(ext, 'icons'), { recursive: true });
[16, 32, 48, 128].forEach(s => fs.writeFileSync(path.join(ext, 'icons', `icon-${s}.png`), png(s)));
console.log('Built extension/: shared logic, popup styles and icons are up to date');
