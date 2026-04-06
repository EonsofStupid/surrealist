const fs = require('fs');
const path = require('path');

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(function(file) {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) { 
            results = results.concat(walk(file));
        } else if (file.endsWith('.ts') || file.endsWith('.tsx')) {
            results.push(file);
        }
    });
    return results;
}

const files = walk('d:\\localdev\\cortex\\surrealist\\src');
let changed = 0;
files.forEach(f => {
    let code = fs.readFileSync(f, 'utf8');
    if (code.includes('getSurrealQL') || code.includes('SurrealQL') || code.includes('createSurrealQL') || code.includes('surrealql')) {
        // Warning: be careful not to break strings like language="surrealql" unless we want "rroql"
        // But the task is for classes and identifiers... Let's just do exact keyword matches.
        // wait, we only want to refactor classes and interfaces and getSurrealQL.
        const originalCode = code;
        code = code.replace(/getSurrealQL/g, 'getRroQL')
                   .replace(/SurrealQLV2/g, 'RroQLV2')
                   .replace(/SurrealQLV3/g, 'RroQLV3')
                   .replace(/SurrealQL/g, 'rroQL')
                   .replace(/createSurrealQL/g, 'createrroQL');
        if (code !== originalCode) {
            fs.writeFileSync(f, code);
            changed++;
            console.log("Updated", f);
        }
    }
});
console.log("Done updating", changed, "files.");
