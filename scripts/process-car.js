const sharp = require('sharp');
const path = require('path');

async function processCarFloodFill() {
  const inputPath = 'C:\\Users\\PIYUSH MAURYA\\.gemini\\antigravity-ide\\brain\\f5644110-f4f9-41c3-baa6-77b63d6f66c6\\supercar_top_view_1791955344456.jpg';
  const outPath = path.join(__dirname, '..', 'public', 'supercar.png');

  const { data, info } = await sharp(inputPath).raw().toBuffer({ resolveWithObject: true });
  const { width, height, channels } = info;

  // Let's perform a flood fill BFS from all border pixels
  const isBackground = new Uint8Array(width * height); // 1 = background, 0 = car / foreground
  const visited = new Uint8Array(width * height);

  // A queue for BFS
  const queue = new Int32Array(width * height);
  let head = 0;
  let tail = 0;

  // Push all border pixels that are dark (background)
  function isDark(x, y) {
    const idx = (y * width + x) * channels;
    const r = data[idx];
    const g = data[idx + 1];
    const b = data[idx + 2];
    // Background in studio shot is near pure black (max channel < 22)
    return Math.max(r, g, b) < 22;
  }

  // Push border pixels
  for (let x = 0; x < width; x++) {
    if (isDark(x, 0)) {
      const idx = x;
      visited[idx] = 1;
      isBackground[idx] = 1;
      queue[tail++] = idx;
    }
    if (isDark(x, height - 1)) {
      const idx = (height - 1) * width + x;
      visited[idx] = 1;
      isBackground[idx] = 1;
      queue[tail++] = idx;
    }
  }

  for (let y = 0; y < height; y++) {
    if (isDark(0, y)) {
      const idx = y * width;
      if (!visited[idx]) {
        visited[idx] = 1;
        isBackground[idx] = 1;
        queue[tail++] = idx;
      }
    }
    if (isDark(width - 1, y)) {
      const idx = y * width + (width - 1);
      if (!visited[idx]) {
        visited[idx] = 1;
        isBackground[idx] = 1;
        queue[tail++] = idx;
      }
    }
  }

  // BFS
  while (head < tail) {
    const curr = queue[head++];
    const cx = curr % width;
    const cy = Math.floor(curr / width);

    // Check 4 neighbours
    const neighbors = [
      cx > 0 ? curr - 1 : -1,
      cx < width - 1 ? curr + 1 : -1,
      cy > 0 ? curr - width : -1,
      cy < height - 1 ? curr + width : -1
    ];

    for (const n of neighbors) {
      if (n !== -1 && !visited[n]) {
        visited[n] = 1;
        const nx = n % width;
        const ny = Math.floor(n / width);
        if (isDark(nx, ny)) {
          isBackground[n] = 1;
          queue[tail++] = n;
        }
      }
    }
  }

  // Build RGBA buffer
  const rgba = Buffer.alloc(width * height * 4);

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = y * width + x;
      const srcIdx = idx * channels;
      const dstIdx = idx * 4;

      const r = data[srcIdx];
      const g = data[srcIdx + 1];
      const b = data[srcIdx + 2];
      const brightness = Math.max(r, g, b);

      rgba[dstIdx] = r;
      rgba[dstIdx + 1] = g;
      rgba[dstIdx + 2] = b;

      if (isBackground[idx]) {
        // Soft anti-aliasing near border
        if (brightness < 6) {
          rgba[dstIdx + 3] = 0;
        } else {
          rgba[dstIdx + 3] = Math.min(255, Math.round(((brightness - 5) / 16) * 120));
        }
      } else {
        // Foreground (car body, tires, interior) - fully solid!
        rgba[dstIdx + 3] = 255;
      }
    }
  }

  // Bounding box of the car
  let minX = width, maxX = 0, minY = height, maxY = 0;
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const alpha = rgba[(y * width + x) * 4 + 3];
      if (alpha > 50) {
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
  }

  // Add 10px padding around car
  minX = Math.max(0, minX - 10);
  maxX = Math.min(width - 1, maxX + 10);
  minY = Math.max(0, minY - 10);
  maxY = Math.min(height - 1, maxY + 10);

  const croppedW = maxX - minX + 1;
  const croppedH = maxY - minY + 1;

  console.log('Cropped dimensions:', croppedW, 'x', croppedH, 'Aspect:', (croppedH / croppedW).toFixed(4));

  const croppedRgba = Buffer.alloc(croppedW * croppedH * 4);
  for (let y = 0; y < croppedH; y++) {
    for (let x = 0; x < croppedW; x++) {
      const srcIdx = ((y + minY) * width + (x + minX)) * 4;
      const dstIdx = (y * croppedW + x) * 4;
      croppedRgba[dstIdx] = rgba[srcIdx];
      croppedRgba[dstIdx + 1] = rgba[srcIdx + 1];
      croppedRgba[dstIdx + 2] = rgba[srcIdx + 2];
      croppedRgba[dstIdx + 3] = rgba[srcIdx + 3];
    }
  }

  await sharp(croppedRgba, {
    raw: {
      width: croppedW,
      height: croppedH,
      channels: 4
    }
  })
  .png({ quality: 100, compressionLevel: 9 })
  .toFile(outPath);

  console.log('Saved perfect transparent supercar to:', outPath);
}

processCarFloodFill().catch(console.error);
