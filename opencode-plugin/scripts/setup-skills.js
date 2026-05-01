const fs = require('fs');
const path = require('path');
const os = require('os');

function getSkillSourceDir() {
  // When installed via npm: __dirname = node_modules/synapse-code-team/scripts
  // When running locally: __dirname = opencode-plugin/scripts
  const possiblePaths = [
    path.join(__dirname, '..', 'skills'),           // from scripts/
    path.join(__dirname, '..', '..', 'skills'),     // fallback
  ];

  for (const p of possiblePaths) {
    if (fs.existsSync(p) && fs.statSync(p).isDirectory()) {
      return p;
    }
  }

  // Last resort: assume we're in the package root
  const rootSkills = path.join(__dirname, 'skills');
  if (fs.existsSync(rootSkills)) return rootSkills;

  throw new Error('Cannot locate skills directory. Please run from the correct location.');
}

const src = getSkillSourceDir();
const dest = path.join(os.homedir(), '.config', 'opencode', 'skills');

console.log(`Source skills: ${src}`);
console.log(`Target skills: ${dest}`);

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

let copied = 0;
let skipped = 0;

for (const skill of skills) {
  const srcSkillPath = path.join(src, skill);
  const destSkillPath = path.join(dest, skill);

  if (fs.existsSync(destSkillPath)) {
    console.log(`Skipped (already exists): ${skill}`);
    skipped++;
    continue;
  }

  // Copy the skill directory, excluding AGENTS.md
  fs.cpSync(srcSkillPath, destSkillPath, {
    recursive: true,
    filter: (srcPath) => !path.basename(srcPath).endsWith('AGENTS.md')
  });
  console.log(`Copied skill: ${skill}`);
  copied++;
}

console.log(`\nDone. Copied: ${copied}, Skipped: ${skipped}`);
console.log('Skills are ready in ~/.config/opencode/skills');
