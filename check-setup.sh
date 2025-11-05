#!/bin/bash

echo "🔍 Checking À Deux setup..."
echo ""

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
  echo "❌ node_modules not found. Run: npm install"
  exit 1
fi

# Check if .env.local exists
if [ ! -f ".env.local" ]; then
  echo "❌ .env.local not found"
  exit 1
fi

# Check required files
FILES=(
  "convex/schema.ts"
  "convex/auth.ts"
  "app/today/page.tsx"
  "app/lists/page.tsx"
  "app/tasks/page.tsx"
  "app/notes/page.tsx"
  "app/profile/page.tsx"
  "public/manifest.json"
  "public/sw.js"
  "middleware.ts"
)

ALL_GOOD=true
for file in "${FILES[@]}"; do
  if [ ! -f "$file" ]; then
    echo "❌ Missing: $file"
    ALL_GOOD=false
  fi
done

if [ "$ALL_GOOD" = true ]; then
  echo "✅ All core files present"
  echo ""
  echo "🚀 Ready to start!"
  echo ""
  echo "Run: npm run dev"
  echo ""
  echo "Then navigate to:"
  echo "  - http://localhost:3000 (sign in)"
  echo "  - http://localhost:3000/today (main view)"
else
  echo ""
  echo "❌ Some files are missing"
  exit 1
fi
