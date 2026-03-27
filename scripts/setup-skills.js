const fs = require('fs');
const path = require('path');
const os = require('os');

const src = 'opencode-plugin/skills';
const dest = path.join(os.homedir(), '.config/opencode/skills');

if (!fs.existsSync(src)) {
  console.error(`Source directory not found: ${src}`);
  process.exit(1);
}

fs.cpSync(src, dest, {
  recursive: true,
  force: false,
  filter: (src, dest) => !path.basename(src).endsWith('AGENTS.md')
});
console.log('Skills copied to ~/.config/opencode/skills');