// VLQ (Variable Length Quantity) Decoder for Source Maps
// This will help understand the "mappings" field

const VLQ_BASE64_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
const VLQ_BASE = 32; // 2^5
const VLQ_CONTINUATION_BIT = 32; // 6th bit
const VLQ_SIGN_BIT = 1;

function decodeVLQ(str) {
  const values = [];
  let shift = 0;
  let value = 0;
  let index = 0;

  while (index < str.length) {
    const char = str[index];
    const digit = VLQ_BASE64_CHARS.indexOf(char);

    if (digit === -1) {
      throw new Error(`Invalid character: ${char}`);
    }

    const hasContinuation = (digit & VLQ_CONTINUATION_BIT) !== 0;
    const digitValue = digit & 31; // Last 5 bits

    value += digitValue << shift;
    shift += 5;

    if (!hasContinuation) {
      // We have a complete value
      const shouldNegate = value & VLQ_SIGN_BIT;
      value = value >> 1; // Remove sign bit
      values.push(shouldNegate ? -value : value);

      // Reset for next value
      value = 0;
      shift = 0;
    }

    index++;
  }

  return values;
}

function decodeSourceMap(mappings, names = [], sources = []) {
  const lines = mappings.split(';');
  const result = [];

  let generatedColumn = 0;
  let sourceIndex = 0;
  let sourceLine = 0;
  let sourceColumn = 0;
  let nameIndex = 0;

  lines.forEach((line, lineNumber) => {
    if (!line) return;

    generatedColumn = 0; // Reset for each line
    const segments = line.split(',');

    segments.forEach(segment => {
      if (!segment) return;

      const decoded = decodeVLQ(segment);

      // Values are relative (deltas), so we accumulate
      generatedColumn += decoded[0];

      const mapping = {
        generatedLine: lineNumber + 1,
        generatedColumn: generatedColumn,
      };

      if (decoded.length > 1) {
        sourceIndex += decoded[1];
        sourceLine += decoded[2];
        sourceColumn += decoded[3];

        mapping.source = sources[sourceIndex] || `source[${sourceIndex}]`;
        mapping.originalLine = sourceLine + 1; // +1 because lines are 0-indexed
        mapping.originalColumn = sourceColumn;
      }

      if (decoded.length > 4) {
        nameIndex += decoded[4];
        mapping.originalName = names[nameIndex] || `name[${nameIndex}]`;
      }

      result.push(mapping);
    });
  });

  return result;
}

// Test with your actual source map
const mappings = "8DACOA,EAAA,CAAAC,MAAM,+CAAX,OAAAC,IAAAC,EAEM,MAFNH,EAEM,IAAAI,EAAA,KAAAA,EAAA,GAAA,CADJC,EAA8B,UAA1B,yBAAqB";
const names = ["_hoisted_1", "class", "_openBlock", "_createElementBlock", "_cache", "_createElementVNode"];
const sources = ["../../src/views/AboutView.vue"];

console.log("=== DECODING INDIVIDUAL SEGMENTS ===\n");

// Decode first few segments to show the process
const segments = mappings.split(',');
console.log("First 10 segments decoded:\n");

segments.slice(0, 10).forEach((seg, i) => {
  const decoded = decodeVLQ(seg);
  console.log(`Segment ${i + 1}: "${seg}"`);
  console.log(`  Raw decoded values: [${decoded.join(', ')}]`);
  console.log(`  Meaning:`);
  console.log(`    [0] Generated column delta: ${decoded[0]}`);
  if (decoded.length > 1) {
    console.log(`    [1] Source file index delta: ${decoded[1]}`);
    console.log(`    [2] Original line delta: ${decoded[2]}`);
    console.log(`    [3] Original column delta: ${decoded[3]}`);
  }
  if (decoded.length > 4) {
    console.log(`    [4] Name index delta: ${decoded[4]}`);
  }
  console.log('');
});

console.log("\n=== COMPLETE MAPPING TABLE ===\n");
console.log("Minified Position → Original Position\n");

const completeMappings = decodeSourceMap(mappings, names, sources);

completeMappings.forEach((mapping, i) => {
  let line = `${i + 1}. Line ${mapping.generatedLine}:${mapping.generatedColumn}`;

  if (mapping.source) {
    line += ` → ${mapping.source} Line ${mapping.originalLine}:${mapping.originalColumn}`;
  }

  if (mapping.originalName) {
    line += ` [${mapping.originalName}]`;
  }

  console.log(line);
});

console.log("\n=== KEY INSIGHTS ===\n");
console.log("1. All mappings are on Line 1 (because minified file is single-line)");
console.log("2. Values are RELATIVE (deltas), not absolute positions");
console.log("3. Each segment builds on the previous segment's position");
console.log("4. This compression technique makes source maps much smaller!");
