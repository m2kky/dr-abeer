import { execSync } from 'child_process';
import ffmpegPath from 'ffmpeg-static';
import { mkdirSync, existsSync, readdirSync } from 'fs';
import { resolve } from 'path';

const INPUT_VIDEO = resolve('public/hero vid (2).mp4');
const OUTPUT_DIR = resolve('public/hero-frames');
const FPS = 24;

// Clean and recreate output directory
if (existsSync(OUTPUT_DIR)) {
  // Remove existing frames
  const existing = readdirSync(OUTPUT_DIR);
  for (const f of existing) {
    const { unlinkSync } = await import('fs');
    unlinkSync(resolve(OUTPUT_DIR, f));
  }
} else {
  mkdirSync(OUTPUT_DIR, { recursive: true });
}

console.log('🎬 Extracting frames from hero video...');
console.log(`   Input: ${INPUT_VIDEO}`);
console.log(`   Output: ${OUTPUT_DIR}`);
console.log(`   FPS: ${FPS}`);

// Extract frames as WebP with compression level 4 (quality flag for webp is -quality)
const cmd = `"${ffmpegPath}" -i "${INPUT_VIDEO}" -vf "fps=${FPS}" -c:v libwebp -quality 75 -compression_level 4 "${OUTPUT_DIR}/frame_%04d.webp" -y`;
console.log('\n📦 Running ffmpeg...');
console.log(`   Command: ${cmd}\n`);

try {
  execSync(cmd, { stdio: 'inherit' });
  const count = readdirSync(OUTPUT_DIR).filter(f => f.endsWith('.webp')).length;
  console.log(`\n✅ Extracted ${count} frames successfully!`);
} catch (err) {
  console.error('❌ Error extracting frames:', err.message);
}
