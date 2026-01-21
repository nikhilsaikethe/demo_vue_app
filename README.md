# vue-sourcemap-demo

This project demonstrates how source maps work in Vue 3 applications built with Vite. It includes interactive visualizations and tools to understand the complete build pipeline from Vue templates to minified production code.

## 📑 Table of Contents

- [Quick Start - Source Map Visualizer](#-quick-start---source-map-visualizer)
- [Source Map Visualization Tools](#️-source-map-visualization-tools)
- [Understanding Source Maps](#-understanding-source-maps)
- [Recommended IDE Setup](#recommended-ide-setup)
- [Project Setup](#project-setup)
- [OpenObserve Integration](#openobserve-integration)
- [Additional Resources](#-additional-resources)

## 🚀 Quick Start - Source Map Visualizer

Want to understand source maps visually? Start here:

```sh
# 1. Start the visualizer server
node serve-visualizer.js

# 2. Open in your browser
# http://localhost:3333
```

That's it! You'll see an interactive visualization showing:
- How Vue templates transform into JavaScript
- Why mysterious names like `_hoisted_1` appear in source maps
- How minification works step-by-step
- How browsers use source maps for debugging

## 🗺️ Source Map Visualization Tools

This project includes comprehensive tools to understand how source maps work:

### Interactive Web Visualizer

**Start the visualizer server:**
```sh
node serve-visualizer.js
```

Then open in your browser:
- **Complete Pipeline (Recommended)**: http://localhost:3333
  - Shows all transformation steps: Vue Template → Compiled JS → Minified Code
  - Explains why `_hoisted_1`, `_openBlock` appear in source maps
  - Interactive variable tracing through the build pipeline
  - Visual comparisons at each build step

- **Simple Mappings View**: http://localhost:3333/simple
  - Side-by-side code comparison
  - Decoded mappings table
  - Interactive position lookup

### Command-Line Tools

```sh
# Decode VLQ mappings and show transformation details
node decode-vlq.js

# Visual mapping examples with explanations
node visual-mapping.js

# Interactive explorer showing character-by-character mappings
node explore-mapping.cjs
```

### Documentation

- **[COMPLETE-SOURCEMAP-GUIDE.md](COMPLETE-SOURCEMAP-GUIDE.md)** - Comprehensive guide with examples
- **[VLQ-EXPLAINED.md](VLQ-EXPLAINED.md)** - Deep dive into VLQ encoding
- **[SOURCE_MAP_DEMO.md](SOURCE_MAP_DEMO.md)** - Original demo documentation

## 🎯 Understanding Source Maps

Source maps are JSON files that map minified production code back to your original source code. They enable:
- Debugging minified code as if it were unminified
- Seeing original variable names in stack traces
- Setting breakpoints in your original source files
- Understanding exactly where errors occur

### Build with Source Maps

Source maps are controlled in `vite.config.ts`:

```typescript
build: {
  sourcemap: true,  // Generate .map files (recommended for production)
  // sourcemap: 'inline',  // Embed maps in JS (larger files)
  // sourcemap: 'hidden',  // Generate maps without referencing them
  // sourcemap: false,  // No source maps (hard to debug)
}
```

### Test Source Maps

1. Build the project with source maps:
   ```sh
   npm run build
   ```

2. Preview the production build:
   ```sh
   npm run preview
   ```

3. Open browser DevTools (F12) and trigger an error
4. See the error reference your original Vue files instead of minified code!

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VS Code](https://code.visualstudio.com/) + [Vue (Official)](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Recommended Browser Setup

- Chromium-based browsers (Chrome, Edge, Brave, etc.):
  - [Vue.js devtools](https://chromewebstore.google.com/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)
  - [Turn on Custom Object Formatter in Chrome DevTools](http://bit.ly/object-formatters)
- Firefox:
  - [Vue.js devtools](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/)
  - [Turn on Custom Object Formatter in Firefox DevTools](https://fxdx.dev/firefox-devtools-custom-object-formatters/)

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
```

### Environment Configuration

This project uses OpenObserve for Real User Monitoring (RUM) and logging. To set up:

1. Copy the example environment file:
   ```sh
   cp .env.example .env
   ```

2. Update the `.env` file with your OpenObserve credentials:
   - `VITE_OPENOBSERVE_CLIENT_TOKEN`: Your OpenObserve client token
   - `VITE_OPENOBSERVE_APPLICATION_ID`: Your application identifier
   - `VITE_OPENOBSERVE_SITE`: OpenObserve server URL (e.g., `localhost:5080`)
   - Other configuration options as needed

3. Ensure your OpenObserve server is running and accessible

**Note:** The `.env` file is excluded from Git to protect your credentials. Never commit sensitive tokens to version control.

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Run End-to-End Tests with [Playwright](https://playwright.dev)

```sh
# Install browsers for the first run
npx playwright install

# When testing on CI, must build the project first
npm run build

# Runs the end-to-end tests
npm run test:e2e
# Runs the tests only on Chromium
npm run test:e2e -- --project=chromium
# Runs the tests of a specific file
npm run test:e2e -- tests/example.spec.ts
# Runs the tests in debug mode
npm run test:e2e -- --debug
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

## OpenObserve Integration

This project includes OpenObserve for monitoring and observability:

- **Real User Monitoring (RUM)**: Tracks user interactions, page loads, and performance metrics
- **Error Logging**: Automatically forwards errors to OpenObserve with full context
- **Session Replay**: Records user sessions for debugging
- **Resource Tracking**: Monitors network requests and asset loading
- **Performance Tracking**: Identifies long tasks and performance bottlenecks

### Features Enabled

- User interaction tracking
- Resource monitoring
- Long task detection
- Session replay recording
- Automatic error forwarding to logs

### Configuration

All OpenObserve settings are configured via environment variables in the `.env` file. See the Environment Configuration section above for setup instructions.

The integration is implemented in [src/config/openobserve.ts](src/config/openobserve.ts) and initialized in [src/main.ts](src/main.ts).

## 📚 Additional Resources

### Understanding the Build Pipeline

The visualization tools show the complete transformation:

1. **Original Vue Template** (What you write)
   ```vue
   <div class="about">
   ```

2. **Vue Compiler Output** (Generated by Vue)
   ```javascript
   const _hoisted_1 = { class: "about" }
   _openBlock(), _createElementBlock("div", _hoisted_1, [...])
   ```

3. **Minified Code** (Production)
   ```javascript
   const t={class:"about"};o(),s("div",t,[...])
   ```

4. **Source Map** (The Bridge)
   - Maps `t` → `_hoisted_1` → `AboutView.vue:2:7`
   - Enables debugging with original source code

### Key Insights

- The `names` array in source maps contains identifiers from **Step 2** (Vue compiled code)
- Names like `_hoisted_1`, `_openBlock` are **created by Vue compiler**, not in your original code
- Source maps track **two transformations**: Vue compilation AND minification
- `.map` files only download when DevTools is open (no impact on users)

### Stop the Visualizer Server

```sh
pkill -f "serve-visualizer.js"
```
