# Vue Compilation Steps

## Step 1: Your Original Vue File
```vue
<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
</template>
```

## Step 2: Vue Compiler Output (Intermediate JavaScript)

Run this to see what Vue compiler generates:

```bash
npx vue-template-explorer
```

Or see a simplified version:

```javascript
// Vue compiler transforms your template to:
import { openBlock as _openBlock, createElementBlock as _createElementBlock, createElementVNode as _createElementVNode } from "vue"

const _hoisted_1 = { class: "about" }

export function render(_ctx, _cache) {
  return (_openBlock(), _createElementBlock("div", _hoisted_1, [
    _createElementVNode("h1", null, "This is an about page", -1)
  ]))
}
```

**Key Points:**
- `_hoisted_1` is created by Vue compiler (optimization - hoisted constants)
- `_openBlock`, `_createElementBlock` are Vue runtime functions
- These are NOT in your original .vue file!

## Step 3: Bundler Combines Everything

```javascript
// Your compiled component + Vue runtime + other components
// All bundled into one file
```

## Step 4: Minification

```javascript
// Before minification:
const _hoisted_1 = { class: "about" }
return (_openBlock(), _createElementBlock("div", _hoisted_1, [
  _createElementVNode("h1", null, "This is an about page", -1)
]))

// After minification:
const t={class:"about"};
return o(),s("div",t,[n("h1",null,"This is an about page",-1)])
```

## Why Source Map Tracks These Names?

The source map needs to track the **entire transformation chain**:

```
Original Vue → Vue Compiled JS → Minified JS
```

The `names` array contains identifiers from the **Vue compiled JS** step, not your original Vue file.

This is why when debugging:
- You see `_hoisted_1` in stack traces (the compiled name)
- But the line number points to your Vue template (line 2: `<div class="about">`)

## What Gets Hoisted?

Vue compiler "hoists" static content for performance:

```vue
<!-- Static (never changes) -->
<div class="about">  ← Gets hoisted to _hoisted_1 = { class: "about" }
  <h1>This is an about page</h1>  ← Static content
</div>

<!-- Dynamic (can change) -->
<div :class="dynamicClass">  ← NOT hoisted (uses reactive data)
  {{ message }}  ← NOT hoisted (reactive)
</div>
```

Hoisted constants are created once and reused, improving performance!
