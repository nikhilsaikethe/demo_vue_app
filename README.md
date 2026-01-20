# vue-sourcemap-demo

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
