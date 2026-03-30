const fs = require('fs');
const path = require('path');
const os = require('os');

const src = 'opencode-plugin/skills';
const dest = path.join(os.homedir(), '.config/opencode/skills');

if (!fs.existsSync(src)) {
  console.error(`Source directory not found: ${src}`);
  process.exit(1);
}

// Ensure destination directory exists
if (!fs.existsSync(dest)) {
  fs.mkdirSync(dest, { recursive: true });
}

// Get list of skill directories
const skills = fs.readdirSync(src).filter(item => {
  const itemPath = path.join(src, item);
  return fs.statSync(itemPath).isDirectory();
});

for (const skill of skills) {
  const srcSkillPath = path.join(src, skill);
  const destSkillPath = path.join(dest, skill);

  // Remove existing skill directory if it exists
  if (fs.existsSync(destSkillPath)) {
    fs.rmSync(destSkillPath, { recursive: true, force: true });
    console.log(`Removed existing skill: ${skill}`);
  }

  // Copy the skill directory, excluding AGENTS.md
  fs.cpSync(srcSkillPath, destSkillPath, {
    recursive: true,
    filter: (src, dest) => !path.basename(src).endsWith('AGENTS.md')
  });
  console.log(`Copied skill: ${skill}`);
}

console.log('All skills updated in ~/.config/opencode/skills');