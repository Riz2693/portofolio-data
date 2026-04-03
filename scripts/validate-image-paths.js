const fs = require("fs");
const path = require("path");

const data = fs.readFileSync(path.join(process.cwd(), "src", "data.js"), "utf8");
const matches = [...data.matchAll(/image:\s*"([^"]+)"/g)].map((m) => m[1]).filter(Boolean);
const missing = [];

for (const ref of matches) {
    const target = path.join(process.cwd(), "public", ref.replace(/^\//, ""));
    if (!fs.existsSync(target)) missing.push(ref);
}

console.log(`total refs: ${matches.length}`);
console.log(`missing: ${missing.length}`);
if (missing.length) {
    for (const item of missing) console.log(item);
}
