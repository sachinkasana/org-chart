#!/bin/bash

# POC Deployment and Sharing Script
# This script helps build and prepare the org chart POC for sharing

echo "🚀 Building Organization Chart POC..."

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

# Build the production version
echo "🔨 Building production version..."
npm run build

# Create a deployment package
echo "📦 Creating POC package..."
POC_DIR="org-chart-poc-$(date +%Y%m%d)"
mkdir -p "$POC_DIR"

# Copy essential files
cp -r build/ "$POC_DIR/build/"
cp POC-README.md "$POC_DIR/README.md"
cp package.json "$POC_DIR/"

# Create a simple serving script
cat > "$POC_DIR/serve.sh" << 'EOF'
#!/bin/bash
echo "🌐 Starting Organization Chart POC..."
echo "📍 Navigate to: http://localhost:3000"
echo "🛑 Press Ctrl+C to stop"

if command -v python3 &> /dev/null; then
    cd build && python3 -m http.server 3000
elif command -v python &> /dev/null; then
    cd build && python -m SimpleHTTPServer 3000
elif command -v node &> /dev/null; then
    npx serve build -p 3000
else
    echo "❌ No suitable web server found. Install Python or Node.js to serve the POC."
    echo "📁 Built files are in the 'build' directory"
fi
EOF

chmod +x "$POC_DIR/serve.sh"

# Create instructions file
cat > "$POC_DIR/INSTRUCTIONS.md" << 'EOF'
# Organization Chart POC - Quick Start

## What's Included
- **Built Application**: Ready-to-serve web application in `build/` directory
- **Dataset**: 180+ employees across realistic organizational structure
- **Features**: Search, export, matrix organization, color-coded employee types

## Quick Start Options

### Option 1: Simple Web Server
```bash
./serve.sh
```
Then open http://localhost:3000

### Option 2: Manual Serving
If you have Python:
```bash
cd build
python3 -m http.server 3000
```

If you have Node.js:
```bash
npx serve build -p 3000
```

### Option 3: Development Mode
If you have the source code:
```bash
npm install
npm start
```

## POC Features to Demonstrate
1. **Scale**: 180+ employees in realistic hierarchy
2. **Employee Types**: 10+ different employee classifications with color coding
3. **Search**: Find employees by name, role, department, location
4. **Export**: Generate PNG/SVG for presentations
5. **Matrix Organization**: Dual reporting relationships
6. **Professional UI**: Enterprise-ready interface with legend

## Dataset Highlights
- CTO + 4 VPs + Complete org structure
- All employee types represented
- Multi-location workforce
- Initiative-based project teams
- Matrix reporting relationships
- Realistic mix of FTE, contractors, new hires

Open the application and explore the comprehensive organizational structure!
EOF

# Create archive
echo "📁 Creating archive..."
tar -czf "${POC_DIR}.tar.gz" "$POC_DIR"

echo "✅ POC package created successfully!"
echo "📦 Package: ${POC_DIR}.tar.gz"
echo "📁 Directory: ${POC_DIR}/"
echo ""
echo "🚀 To serve immediately:"
echo "   cd ${POC_DIR} && ./serve.sh"
echo ""
echo "📤 To share:"
echo "   Send the ${POC_DIR}.tar.gz file"
echo "   Recipients can extract and run ./serve.sh"
