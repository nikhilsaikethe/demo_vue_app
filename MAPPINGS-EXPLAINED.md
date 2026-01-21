# Source Map Mappings: Complete Explanation

## Overview
This document explains how the **mappings** field in source maps actually works - the "magic" that lets browsers map minified code back to your original source.

## What We Added

We've enhanced **both visualizers** with a comprehensive "Step 4.5: How Mappings Actually Work" section:

### 1. ErrorDemo Visualizer (`/error-demo`)
- Shows real error-throwing code transformation
- Demonstrates mapping at the exact error line (line 25)
- Example uses `console.log` that throws the error
- **File:** `sourcemap-visualizer-errordemo.html`

### 2. AboutView Visualizer (`/` or `/enhanced`)
- Shows Vue template compilation with `_hoisted_1`, `_openBlock`, etc.
- Demonstrates how Vue compiler names are preserved
- Example uses simple `<div class="about">` transformation
- **File:** `sourcemap-visualizer-enhanced.html`

## What Each Section Explains

### 🎯 The Core Question
How does `"8DACOA,EAAA,CAAAC..."` tell the browser exactly where in your original code each character came from?

### 🔬 VLQ Decoding Example
Shows step-by-step decoding of a segment like `"EAAA"`:
- **Input:** `EAAA`
- **Decoded:** `[2, 0, 0, 0]`
- **Meaning:** Move 2 columns in minified code, same file, same line, same original column

### 📊 Decoded Mappings Table
Table showing first 7 mappings with:
- Segment strings (e.g., "8DACOA", "EAAA")
- Decoded delta values
- Minified column positions
- Original line:column positions
- Mapped variable names

### 🔄 How Browser Uses Mappings
6-step process showing:
1. Browser finds mapping covering error position
2. Decodes the VLQ segment
3. Applies deltas to get absolute positions
4. Maps to original file location
5. Fetches original content
6. Shows you the readable code!

### 📐 Delta vs Absolute Encoding
Side-by-side comparison showing:
- **Absolute values:** ~150 characters (inefficient)
- **Delta values:** ~45 characters (70% smaller!)

## Key Concepts Explained

### VLQ (Variable Length Quantity) Encoding
- Uses Base64 characters: `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/`
- Each character represents 5 bits of data
- Continuation bit indicates if more characters follow
- Sign bit indicates positive/negative values

### Delta Encoding
Instead of storing absolute positions:
```
Mapping 1: col=4, line=1, origCol=0
Mapping 2: col=6, line=1, origCol=0
```

Source maps store **changes** from previous mapping:
```
Mapping 1: +4, +1, +0  (from position 0)
Mapping 2: +2, +0, +0  (from previous mapping)
```

This is why most segments are short (small changes) → massive compression!

### Segment Structure
Each comma-separated segment has **4 or 5 values**:

**4-value segment:** `[minCol, fileIdx, origLine, origCol]`
- Example: `[2, 0, 0, 0]` = Move 2 columns, same file, same line, same column

**5-value segment:** `[minCol, fileIdx, origLine, origCol, nameIdx]`
- Example: `[4, 0, 1, 0, 7]` = Move 4 columns, file 0, line +1, col 0, name index 7
- The 5th value points to the `names` array

## Real Examples

### ErrorDemo (console.log at line 25)
```javascript
// Original: ErrorDemo.vue line 25
console.log(obj.nonExistent.property)

// Compiled by Vue:
_console.log(_obj.nonExistent.property)

// Minified:
console.log((void 0).nonExistent.property)

// Mapping at position 205: "KAGnBC" → [5,0,3,-7,1]
// Maps position 205 back to ErrorDemo.vue:25:29
```

### AboutView (<div> at line 2)
```vue
<!-- Original: AboutView.vue line 2 -->
<div class="about">

<!-- Compiled by Vue: -->
const _hoisted_1 = {class: "about"}

<!-- Minified: -->
const t={class:"about"}

<!-- Mapping at position 44: "+CAAX" → [+31,0,0,-5]
// Maps position 44 back to AboutView.vue:1:1
```

## How to Use the Visualizers

### Start the Server
```bash
node serve-visualizer.js
```

### Access the Pages
- **ErrorDemo (Recommended for learning):** http://localhost:3333/error-demo
- **AboutView:** http://localhost:3333/ or http://localhost:3333/enhanced
- **Simple View:** http://localhost:3333/simple

## Statistics

Both visualizers show:
- **~70% size reduction** from delta encoding
- **64 Base64 characters** in mappings string
- **6 name mappings** from Vue compiler names
- **Real decoded mappings** with actual values from your build

## Why This Matters

Without understanding mappings, source maps seem like "magic boxes". With this explanation, you can:

1. **Understand** how browsers map minified errors to original code
2. **Debug** source map issues when they occur
3. **Optimize** your build process knowing how source maps work
4. **Appreciate** the compression techniques (VLQ + deltas = 70% savings!)

## Additional Resources

- **VLQ Decoder:** Run `node decode-vlq.js` for command-line VLQ decoding
- **Mapping Explorer:** Run `node explore-mapping.cjs` for interactive exploration
- **Complete Guide:** See `COMPLETE-SOURCEMAP-GUIDE.md` for full documentation
- **VLQ Technical Details:** See `VLQ-EXPLAINED.md` for encoding/decoding algorithms

## Files Modified

1. `sourcemap-visualizer-errordemo.html` - Added Step 4.5 between Steps 4 and 5
2. `sourcemap-visualizer-enhanced.html` - Added Step 4.5 between Steps 4 and 5
3. Updated file name references to match current build output

Both visualizers now provide complete, end-to-end explanation of:
- What source maps are
- How code gets transformed (Vue → Compiled → Minified)
- **How mappings actually work (NEW!)**
- How browsers use source maps for debugging
