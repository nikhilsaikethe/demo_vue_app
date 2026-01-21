// Visual Mapping: See exactly how minified code maps to original source

const minifiedCode = `import{_ as a,c as s,a as n,o}from"./index-Blw2-PgA.js";const t={class:"about"};const e=a({},[["render",function(a,e){return o(),s("div",t,[...e[0]||(e[0]=[n("h1",null,"This is an about page",-1)])])}]]);export{e as default};`;

const originalSource = `<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
</template>`;

console.log("=== VISUAL SOURCE MAP EXPLANATION ===\n");
console.log("Let's trace specific parts of the code:\n");

// Example 1: The word "class"
console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
console.log("EXAMPLE 1: Mapping 'class' attribute");
console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");

console.log("MINIFIED CODE (Line 1, Column 65):");
console.log("const t={class:\"about\"};");
console.log("         ^^^^^");
console.log("         Column 65\n");

console.log("ORIGINAL SOURCE (AboutView.vue Line 2, Column 7):");
console.log("  <div class=\"about\">");
console.log("       ^^^^^");
console.log("       Column 7\n");

console.log("MAPPING SEGMENT: 'CAAAC'");
console.log("Decoded: [1, 0, 0, 0, 1]");
console.log("  [0] = 1  → Move 1 column right in minified (from 64 to 65)");
console.log("  [1] = 0  → Same source file (index 0)");
console.log("  [2] = 0  → Same line in source");
console.log("  [3] = 0  → Same column in source");
console.log("  [4] = 1  → Name index 1 = 'class' from names array\n");

console.log("This tells the browser:");
console.log("  'class' at column 65 in minified code");
console.log("  ↓");
console.log("  comes from 'class' at Line 2, Column 7 in AboutView.vue\n");

// Example 2: _hoisted_1 variable
console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
console.log("EXAMPLE 2: Mapping minified variable 't' to '_hoisted_1'");
console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");

console.log("MINIFIED CODE (Line 1, Column 62):");
console.log("const t={class:\"about\"};");
console.log("      ^");
console.log("      't' at Column 62\n");

console.log("ORIGINAL SOURCE (AboutView.vue Line 2, Column 7):");
console.log("  <div class=\"about\">");
console.log("       ^");
console.log("       This div element gets hoisted\n");

console.log("MAPPING SEGMENT: '8DACOA'");
console.log("Decoded: [62, 0, 1, 7, 0]");
console.log("  [0] = 62 → Jump to column 62 in minified (first segment, so absolute)");
console.log("  [1] = 0  → Source file index 0 (AboutView.vue)");
console.log("  [2] = 1  → Original line 2 (0-indexed, so 1 = line 2)");
console.log("  [3] = 7  → Original column 7");
console.log("  [4] = 0  → Name index 0 = '_hoisted_1' from names array\n");

console.log("This tells the browser:");
console.log("  Variable 't' at column 62 in minified code");
console.log("  ↓");
console.log("  was originally '_hoisted_1' from AboutView.vue Line 2, Column 7\n");

// Example 3: Function name mapping
console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
console.log("EXAMPLE 3: Mapping 's()' to '_createElementBlock()'");
console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");

console.log("MINIFIED CODE (Line 1, Column 129):");
console.log("return o(),s(\"div\",t,[...])");
console.log("           ^");
console.log("           's' at Column 129\n");

console.log("MAPPING SEGMENT: 'IAAAC'");
console.log("Decoded: [4, 0, 0, 0, 1]");
console.log("  [0] = 4  → Move 4 columns right (125 + 4 = 129)");
console.log("  [1] = 0  → Same source file");
console.log("  [2] = 0  → Same line in source");
console.log("  [3] = 0  → Same column in source");
console.log("  [4] = 1  → Name index delta +1 = index 3 = '_createElementBlock'\n");

console.log("This tells the browser:");
console.log("  Function 's' at column 129");
console.log("  ↓");
console.log("  was originally '_createElementBlock' (Vue internal function)\n");

// Explain the delta/relative system
console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
console.log("WHY USE DELTAS (RELATIVE VALUES)?");
console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");

console.log("Compare storage sizes:\n");

console.log("ABSOLUTE positions (not used):");
console.log("  Segment 1: column=62,  source=0, line=2, col=7,  name=0");
console.log("  Segment 2: column=64,  source=0, line=2, col=7,  name=0");
console.log("  Segment 3: column=65,  source=0, line=2, col=7,  name=1");
console.log("  Each number could be 2-4 digits → LARGE\n");

console.log("RELATIVE positions (actually used):");
console.log("  Segment 1: [62,  0,  1,  7,  0]  → '8DACOA'  (6 chars)");
console.log("  Segment 2: [2,   0,  0,  0]     → 'EAAA'    (4 chars)");
console.log("  Segment 3: [1,   0,  0,  0,  1] → 'CAAAC'   (5 chars)");
console.log("  Small deltas encode to fewer characters → SMALL\n");

console.log("Savings: ~70% smaller by using relative positions!\n");

console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
console.log("HOW BROWSER USES THIS");
console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");

console.log("1. Error occurs at: AboutView-Dzqdte5y.js:1:137\n");

console.log("2. Browser reads source map comment:\n");
console.log("   //# sourceMappingURL=AboutView-Dzqdte5y.js.map\n");

console.log("3. Browser fetches and parses the .map file\n");

console.log("4. Browser decodes mappings string:\n");
console.log("   '8DACOA,EAAA,CAAAC,...' → array of mappings\n");

console.log("5. Browser finds mapping for column 137:\n");
console.log("   Mapping #9: Line 1:137 → AboutView.vue Line 2:2 [_hoisted_1]\n");

console.log("6. Browser displays in DevTools:\n");
console.log("   'Error at AboutView.vue:2:2 (_hoisted_1)'\n");
console.log("   Instead of: 'Error at AboutView-Dzqdte5y.js:1:137 (t)'\n");

console.log("7. When you click the error, browser shows ORIGINAL source:");
console.log("   <div class=\"about\">");
console.log("   ^--- You see THIS, not: const t={class:\"about\"}\n");
