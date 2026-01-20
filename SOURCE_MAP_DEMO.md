# Vue Source Map Error Demo

This demo project shows the difference between errors with and without source maps in a Vue application.

## What This Demo Does

The app includes a component (`ErrorDemo.vue`) with buttons that intentionally trigger JavaScript errors. You'll see how these errors appear in the browser console:

1. **Without source maps**: Error traces show minified file names and line numbers
2. **With source maps**: Error traces show the original Vue component files and actual line numbers

## Step-by-Step Instructions

### Step 1: Development Mode (Source Maps Enabled by Default)

```bash
npm run dev
```

Open the app in your browser (usually http://localhost:5173)

- Open browser DevTools (F12)
- Click any of the error buttons
- Notice the error shows the **original Vue file** and line numbers (e.g., `ErrorDemo.vue:30`)

### Step 2: Build WITHOUT Source Maps (Minified Errors)

1. Ensure `vite.config.ts` has `sourcemap: false`:

```typescript
build: {
  sourcemap: false,
  minify: 'terser',
}
```

2. Build the project:

```bash
npm run build
```

3. Preview the production build:

```bash
npm run preview
```

4. Open the app in your browser (usually http://localhost:4173)
   - Open browser DevTools (F12)
   - Click any of the error buttons
   - Notice the error shows **minified file names** like `index-abc123.js:1:1234`
   - The stack trace is hard to read and doesn't reference your Vue components

### Step 3: Build WITH Source Maps (Readable Errors)

1. Update `vite.config.ts` to have `sourcemap: true`:

```typescript
build: {
  sourcemap: true,
  minify: 'terser',
}
```

2. Build the project again:

```bash
npm run build
```

3. Preview the production build:

```bash
npm run preview
```

4. Open the app in your browser
   - Open browser DevTools (F12)
   - Click any of the error buttons
   - Notice the error now shows the **original Vue file** even in production (e.g., `ErrorDemo.vue:30`)
   - You can click on the file reference to see the original source code
   - Check the `dist/assets` folder - you'll see `.map` files generated

## What to Observe

### Without Source Maps:
```
Uncaught TypeError: Cannot read property 'property' of undefined
    at index-a1b2c3d4.js:1:12345
    at index-a1b2c3d4.js:1:67890
```

### With Source Maps:
```
Uncaught TypeError: Cannot read property 'property' of undefined
    at triggerUndefinedError (ErrorDemo.vue:30:15)
    at callWithErrorHandling (runtime-core.esm-bundler.js:155:22)
```

## Files to Check

- **vite.config.ts**: Controls source map generation
- **src/components/ErrorDemo.vue**: Contains the intentional errors
- **dist/assets/**: After building, check for `.map` files

## Key Takeaways

- **Development**: Always has source maps for debugging
- **Production without source maps**: Smaller bundle size but hard to debug
- **Production with source maps**: Larger bundle size but errors are readable
- Source maps help you identify the exact Vue component and line where errors occur
- `.map` files can be excluded from deployment if you only need them locally

## Source Map Options

You can use different source map formats in `vite.config.ts`:

```typescript
build: {
  sourcemap: true,        // Full source maps
  // sourcemap: 'inline',  // Inline source maps (larger bundle)
  // sourcemap: 'hidden',  // Generate maps but don't reference them (for error tracking services)
}
```

## Next Steps

Try triggering each type of error and compare the stack traces:
1. Undefined Error
2. Type Error
3. Reference Error

Experiment with different source map settings to understand the tradeoffs!
