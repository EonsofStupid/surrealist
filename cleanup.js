const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');

// Task 8: Rename the surrealdb spoke to connectomedb
const oldSpokePath = path.join(srcDir, 'spokes', 'surrealdb');
const newSpokePath = path.join(srcDir, 'spokes', 'connectomedb');

if (fs.existsSync(oldSpokePath)) {
    console.log(`Renaming ${oldSpokePath} to ${newSpokePath}`);
    fs.renameSync(oldSpokePath, newSpokePath);
}

// Fix casing issues: screens/Connectome -> screens/connectome
function replaceInFiles(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
            replaceInFiles(fullPath);
        } else if (fullPath.endsWith('.ts') || fullPath.endsWith('.tsx') || fullPath.endsWith('.js') || fullPath.endsWith('.jsx')) {
            const content = fs.readFileSync(fullPath, 'utf8');
            if (content.includes('screens/Connectome')) {
                const newContent = content.replace(/screens\/Connectome/g, 'screens/connectome');
                fs.writeFileSync(fullPath, newContent, 'utf8');
                console.log(`Fixed casing in ${fullPath}`);
            }
        }
    }
}

console.log('Fixing casing issues in src...');
replaceInFiles(srcDir);
console.log('Cleanup complete!');
