import fs from "node:fs"
import path from "node:path"

function addJsExtension(dir) {
  const files = fs.readdirSync(dir, { withFileTypes: true });

  files.forEach(file => {
    const fullPath = path.join(dir, file.name);
    if (file.isDirectory()) {
      addJsExtension(fullPath);
    } else if (file.isFile() && file.name.endsWith('.js')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      content = content.replace(/from\s+['"]([^'"]+)['"]/g, (match, p1) => {
        if (!p1.startsWith('.') || p1.endsWith('.js')) return match; // Skip if already has .js or is not a relative path
        return `from '${p1}.js'`;
      });
      fs.writeFileSync(fullPath, content, 'utf8');
    }
  });
}

addJsExtension('./dist');
