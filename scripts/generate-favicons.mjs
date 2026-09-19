import sharp from 'sharp';
import fs from 'fs';

// Helper to create valid multi-resolution ICO file from PNG buffers
function createIco(pngBuffers) {
  const count = pngBuffers.length;
  const headerSize = 6 + count * 16;
  let offset = headerSize;
  const entries = [];
  
  for (const item of pngBuffers) {
    const { buffer, width, height } = item;
    entries.push({
      width: width >= 256 ? 0 : width,
      height: height >= 256 ? 0 : height,
      colors: 0,
      reserved: 0,
      planes: 1,
      bpp: 32,
      size: buffer.length,
      offset: offset
    });
    offset += buffer.length;
  }
  
  const totalSize = offset;
  const icoBuf = Buffer.alloc(totalSize);
  
  // Header
  icoBuf.writeUInt16LE(0, 0); // reserved
  icoBuf.writeUInt16LE(1, 2); // ICO type
  icoBuf.writeUInt16LE(count, 4); // count
  
  // Entries
  let entryOffset = 6;
  for (const entry of entries) {
    icoBuf.writeUInt8(entry.width, entryOffset);
    icoBuf.writeUInt8(entry.height, entryOffset + 1);
    icoBuf.writeUInt8(entry.colors, entryOffset + 2);
    icoBuf.writeUInt8(entry.reserved, entryOffset + 3);
    icoBuf.writeUInt16LE(entry.planes, entryOffset + 4);
    icoBuf.writeUInt16LE(entry.bpp, entryOffset + 6);
    icoBuf.writeUInt32LE(entry.size, entryOffset + 8);
    icoBuf.writeUInt32LE(entry.offset, entryOffset + 12);
    entryOffset += 16;
  }
  
  // PNG payload
  for (let i = 0; i < pngBuffers.length; i++) {
    pngBuffers[i].buffer.copy(icoBuf, entries[i].offset);
  }
  
  return icoBuf;
}

async function main() {
  const emblemPath = 'public/images/thanprat/logo-emblem.png';
  
  // Trim transparent padding from source emblem
  const trimmedBuf = await sharp(emblemPath)
    .trim()
    .toBuffer();
  
  // 1. Generate master 512x512 with clean comfortable margin
  const masterSize = 512;
  const innerSize = 460; // 90% of canvas, leaving 26px padding
  
  const innerResized = await sharp(trimmedBuf)
    .resize(innerSize, innerSize, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .toBuffer();

  const master512Buf = await sharp({
    create: {
      width: masterSize,
      height: masterSize,
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 0 }
    }
  })
  .composite([{ input: innerResized, gravity: 'center' }])
  .png()
  .toBuffer();

  // Save clean master emblem (512x512)
  fs.writeFileSync('public/images/thanprat/logo-emblem.png', master512Buf);
  console.log('Updated public/images/thanprat/logo-emblem.png to clean square 512x512');

  // 2. Favicon 16x16, 32x32, 48x48, 192x192, 512x512
  const buf16 = await sharp(master512Buf).resize(16, 16).sharpen().png().toBuffer();
  const buf32 = await sharp(master512Buf).resize(32, 32).sharpen().png().toBuffer();
  const buf48 = await sharp(master512Buf).resize(48, 48).sharpen().png().toBuffer();
  const buf180 = await sharp(master512Buf).resize(180, 180).png().toBuffer();
  const buf192 = await sharp(master512Buf).resize(192, 192).png().toBuffer();

  fs.writeFileSync('public/favicon-16x16.png', buf16);
  fs.writeFileSync('public/favicon-32x32.png', buf32);
  fs.writeFileSync('public/apple-touch-icon.png', buf180);
  fs.writeFileSync('public/android-chrome-192x192.png', buf192);
  fs.writeFileSync('public/android-chrome-512x512.png', master512Buf);

  // 3. Multi-resolution favicon.ico (16, 32, 48)
  const icoData = createIco([
    { buffer: buf16, width: 16, height: 16 },
    { buffer: buf32, width: 32, height: 32 },
    { buffer: buf48, width: 48, height: 48 }
  ]);
  fs.writeFileSync('public/favicon.ico', icoData);
  console.log('Generated public/favicon.ico');

  // 4. SVG favicon
  // Modern browsers support SVG favicons. To preserve full gold texture and fidelity:
  const base64Png = master512Buf.toString('base64');
  const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="100%" height="100%">
  <image href="data:image/png;base64,${base64Png}" width="512" height="512" />
</svg>
`;
  fs.writeFileSync('public/favicon.svg', svgContent, 'utf-8');
  console.log('Generated public/favicon.svg');

  // Clean up temporary test files
  const tempFiles = ['test-tab-dark.png', 'test-tab-light.png', 'test-32.png', 'test-embed.svg', 'test-browser-svg.png'];
  for (const f of tempFiles) {
    if (fs.existsSync(f)) {
      fs.unlinkSync(f);
    }
  }
  console.log('Favicons generated successfully!');
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
