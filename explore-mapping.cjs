#!/usr/bin/env node
// Interactive Source Map Explorer
// Shows exactly how each character in minified code maps to original source

const fs = require('fs');
const path = require('path');

// Read the actual files
const minifiedPath = './dist/assets/AboutView-Dzqdte5y.js';
const sourceMapPath = './dist/assets/AboutView-Dzqdte5y.js.map';

if (!fs.existsSync(minifiedPath) || !fs.existsSync(sourceMapPath)) {
  console.log('❌ Files not found! Please run: npm run build');
  console.log('   Make sure sourcemap is enabled in vite.config.ts\n');
  process.exit(1);
}

const minified = fs.readFileSync(minifiedPath, 'utf8');
const sourceMap = JSON.parse(fs.readFileSync(sourceMapPath, 'utf8'));

console.log('╔═══════════════════════════════════════════════════════════╗');
console.log('║       SOURCE MAP EXPLORER - Interactive Demo             ║');
console.log('╚═══════════════════════════════════════════════════════════╝\n');

// Show file info
console.log('📄 Files loaded:');
console.log(`   Minified: ${minifiedPath} (${minified.length} chars)`);
console.log(`   Map: ${sourceMapPath}`);
console.log(`   Original: ${sourceMap.sources[0]}\n`);

// Show the names array
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('📋 NAMES ARRAY (Original Identifiers)');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

sourceMap.names.forEach((name, i) => {
  console.log(`   [${i}] → "${name}"`);
});

// Show original source
console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('📝 ORIGINAL SOURCE CODE');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

const originalLines = sourceMap.sourcesContent[0].split('\n');
originalLines.forEach((line, i) => {
  console.log(`   ${(i + 1).toString().padStart(2, '0')} │ ${line}`);
});

// Show minified code with markers
console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('🔍 MINIFIED CODE (First 200 chars)');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

// Show with column numbers
const preview = minified.substring(0, 200);
console.log('   ' + preview + '...\n');

// Add column ruler
let ruler = '   ';
for (let i = 0; i < 200; i += 10) {
  ruler += i.toString().padEnd(10, ' ');
}
console.log(ruler);

ruler = '   ';
for (let i = 0; i < 200; i++) {
  ruler += (i % 10).toString();
}
console.log(ruler + '\n');

// Decode mappings
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('🗺️  DECODED MAPPINGS (First 10)');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

const VLQ_BASE64_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

function decodeVLQ(str) {
  const values = [];
  let shift = 0;
  let value = 0;
  let index = 0;

  while (index < str.length) {
    const digit = VLQ_BASE64_CHARS.indexOf(str[index]);
    if (digit === -1) throw new Error(`Invalid character: ${str[index]}`);

    const hasContinuation = (digit & 32) !== 0;
    const digitValue = digit & 31;

    value += digitValue << shift;
    shift += 5;

    if (!hasContinuation) {
      const shouldNegate = value & 1;
      value = value >> 1;
      values.push(shouldNegate ? -value : value);
      value = 0;
      shift = 0;
    }
    index++;
  }

  return values;
}

const segments = sourceMap.mappings.split(',');
let genCol = 0, sourceIndex = 0, sourceLine = 0, sourceCol = 0, nameIndex = 0;

segments.slice(0, 10).forEach((segment, i) => {
  if (!segment) return;

  const decoded = decodeVLQ(segment);
  genCol += decoded[0];

  if (decoded.length > 1) {
    sourceIndex += decoded[1];
    sourceLine += decoded[2];
    sourceCol += decoded[3];
  }

  if (decoded.length > 4) {
    nameIndex += decoded[4];
  }

  console.log(`${(i + 1).toString().padStart(2, '0')}. Segment: "${segment}"`);
  console.log(`    Decoded: [${decoded.join(', ')}]`);
  console.log(`    ┌─ Minified position: Line 1, Column ${genCol}`);

  if (decoded.length > 1) {
    console.log(`    ├─ Original position: ${sourceMap.sources[sourceIndex]}`);
    console.log(`    │  Line ${sourceLine + 1}, Column ${sourceCol}`);
  }

  if (decoded.length > 4) {
    console.log(`    └─ Original name: "${sourceMap.names[nameIndex]}"`);
  }

  // Show the actual character at that position
  if (genCol < minified.length) {
    const char = minified[genCol];
    const context = minified.substring(Math.max(0, genCol - 5), genCol + 20);
    console.log(`    📍 At column ${genCol}: "${char}" in context: "${context}"`);
  }

  console.log('');
});

// Interactive lookup feature
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('🔎 SPECIFIC POSITION LOOKUP');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

// Look up specific interesting positions
const interestingPositions = [62, 65, 71, 118, 125, 129];

interestingPositions.forEach(targetCol => {
  genCol = 0;
  sourceIndex = 0;
  sourceLine = 0;
  sourceCol = 0;
  nameIndex = 0;

  let found = false;

  segments.forEach(segment => {
    if (!segment) return;
    const decoded = decodeVLQ(segment);
    genCol += decoded[0];

    if (genCol === targetCol) {
      found = true;

      if (decoded.length > 1) {
        sourceIndex += decoded[1];
        sourceLine += decoded[2];
        sourceCol += decoded[3];
      }

      if (decoded.length > 4) {
        nameIndex += decoded[4];
      }

      const char = minified[targetCol] || '';
      const context = minified.substring(Math.max(0, targetCol - 10), targetCol + 20);

      console.log(`Column ${targetCol}: "${char}"`);
      console.log(`   Context: "...${context}..."`);
      console.log(`   Original: ${sourceMap.sources[0]} Line ${sourceLine + 1}:${sourceCol}`);

      if (decoded.length > 4) {
        console.log(`   Name: "${sourceMap.names[nameIndex]}"`);
      }

      // Show original source line
      const origLine = originalLines[sourceLine];
      if (origLine) {
        console.log(`   Source: ${origLine.trim()}`);
        console.log(`           ${' '.repeat(sourceCol)}^`);
      }
      console.log('');
    }

    if (!found && genCol < targetCol) {
      // Accumulate for next segment
      if (decoded.length > 1) {
        sourceIndex += decoded[1];
        sourceLine += decoded[2];
        sourceCol += decoded[3];
      }
      if (decoded.length > 4) {
        nameIndex += decoded[4];
      }
    }
  });
});

console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('💡 TIP: You can see this mapping in action!');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
console.log('1. Run: npm run preview');
console.log('2. Open browser DevTools (F12)');
console.log('3. Go to Sources tab');
console.log('4. Find AboutView-Dzqdte5y.js (minified)');
console.log('5. Notice it ALSO shows AboutView.vue (original)');
console.log('6. Set a breakpoint in AboutView.vue');
console.log('7. See how it maps to minified code!\n');

console.log('✨ Source maps make this magic happen!\n');
