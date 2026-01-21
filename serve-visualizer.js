#!/usr/bin/env node
// Simple HTTP server to serve the source map visualizer

import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = 3333;

const server = http.createServer((req, res) => {
  let filePath;

  // Route handling
  if (req.url === '/' || req.url === '/enhanced') {
    filePath = path.join(__dirname, 'sourcemap-visualizer-enhanced.html');
  } else if (req.url === '/simple') {
    filePath = path.join(__dirname, 'sourcemap-visualizer.html');
  } else if (req.url === '/error-demo') {
    filePath = path.join(__dirname, 'sourcemap-visualizer-errordemo.html');
  } else {
    res.writeHead(404);
    res.end('Page not found');
    return;
  }

  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(500);
      res.end('Error loading file');
      return;
    }

    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(content);
  });
});

server.listen(PORT, () => {
  console.log('\n╔═══════════════════════════════════════════════════════════╗');
  console.log('║       Source Map Visualizer - Server Running             ║');
  console.log('╚═══════════════════════════════════════════════════════════╝\n');
  console.log(`🚀 Server is running!\n`);
  console.log('📖 Available Pages:\n');
  console.log(`   🐛 ErrorDemo Pipeline (BEST FOR LEARNING!):`);
  console.log(`      \x1b[36mhttp://localhost:${PORT}/error-demo\x1b[0m`);
  console.log(`      → Shows real error code transformation\n`);
  console.log(`   🔄 AboutView Pipeline:`);
  console.log(`      \x1b[36mhttp://localhost:${PORT}\x1b[0m`);
  console.log(`      → Shows basic template transformation\n`);
  console.log(`   📊 Simple Mappings View:`);
  console.log(`      \x1b[36mhttp://localhost:${PORT}/simple\x1b[0m\n`);
  console.log('💡 The ErrorDemo page shows:');
  console.log('   • Real error-throwing code (line 25)');
  console.log('   • Step-by-step transformation');
  console.log('   • How browser maps minified error back to original');
  console.log('   • Variable name mappings (triggerError → d)\n');
  console.log('Press Ctrl+C to stop the server\n');
});
