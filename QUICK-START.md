# Quick Start Guide - Source Map Visualizer

## 🎯 Goal
Understand how source maps work in Vue applications through interactive visualizations.

## ⚡ Fastest Way to Start

### 1. Start the Server
```bash
cd /Users/kethesainikhil/demo_app/vue-sourcemap-demo
node serve-visualizer.js
```

### 2. Open in Browser
```
http://localhost:3333
```

### 3. Explore!
Scroll through the 5-step pipeline visualization:
1. Your Vue Template
2. Vue Compiler Output (where `_hoisted_1` comes from!)
3. Minification Process
4. Source Map Generation
5. Browser DevTools Magic

## 🎮 Interactive Features

### Click "Trace" Buttons
In Step 4, click any trace button to see the complete transformation:
- **Trace: _hoisted_1 → t** - See how `<div class="about">` becomes `t`
- **Trace: _openBlock → o** - See Vue runtime transformation
- **Trace: _createElementBlock → s** - See element creation

### Try Both Views
- **Main Page**: http://localhost:3333 (Complete Pipeline)
- **Simple View**: http://localhost:3333/simple (Mappings Only)

## 🛑 Stop Server
```bash
pkill -f "serve-visualizer.js"
```

## 📖 What You'll Learn

### Question: "Why do I see `_hoisted_1` in source maps when it's not in my Vue file?"
**Answer:** The visualization shows that Vue compiler **creates** these names during Step 2 (Vue Compilation). They don't exist in your template - they're generated!

### Question: "What exactly does the `names` array contain?"
**Answer:** Names from **Step 2** (Vue compiled JavaScript), not Step 1 (your Vue template). This is why you see compiler-generated names.

### Question: "How does the browser know where `t` came from?"
**Answer:** The visualization shows the complete mapping chain:
```
t (minified) → _hoisted_1 (compiled) → AboutView.vue Line 2 (original)
```

## 🎨 For Your Backend Teammate

Send them this:
1. Open http://localhost:3333
2. Scroll through all 5 steps
3. Click the "Trace" buttons to see transformations
4. Now they understand source maps! 🎉

## 📚 More Resources

- **[README.md](README.md)** - Full project documentation
- **[COMPLETE-SOURCEMAP-GUIDE.md](COMPLETE-SOURCEMAP-GUIDE.md)** - Detailed guide
- **[VLQ-EXPLAINED.md](VLQ-EXPLAINED.md)** - Deep dive into encoding

## 💡 Pro Tips

### Test It Yourself
```bash
# Build with source maps
npm run build

# Preview production build
npm run preview

# Open DevTools, trigger error, see original Vue files!
```

### Compare Builds
```bash
# Build WITHOUT source maps
# Edit vite.config.ts: sourcemap: false
npm run build
ls dist/assets/*.map  # No .map files!

# Build WITH source maps
# Edit vite.config.ts: sourcemap: true
npm run build
ls dist/assets/*.map  # .map files exist!
```

## 🤔 Common Questions

**Q: Do users download .map files?**
A: No! Only when DevTools is open.

**Q: Should I use source maps in production?**
A: Yes! They help debugging without affecting user performance.

**Q: What's the file size impact?**
A: .map files can be large (1.6MB for a 262KB bundle), but users never download them unless debugging.

**Q: What's VLQ encoding?**
A: A compression technique that makes source maps smaller. See the visualization for details!

## 🎉 You're Ready!

Now you understand:
- ✅ How Vue templates transform to JavaScript
- ✅ Why compiler-generated names appear in source maps
- ✅ How minification works
- ✅ How browsers use source maps for debugging
- ✅ The complete build pipeline

Happy debugging! 🐛🔍
