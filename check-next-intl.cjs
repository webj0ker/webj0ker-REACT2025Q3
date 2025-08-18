const path = require('path');
const fs = require('fs');

const cwd = process.cwd();
console.log('cwd:', cwd);

const pkgPath = path.join(cwd, 'package.json');
console.log('package.json exists:', fs.existsSync(pkgPath));
if (fs.existsSync(pkgPath)) {
  try {
    const pkg = require(pkgPath);
    console.log('next version:', pkg.dependencies?.next || pkg.devDependencies?.next);
    console.log('next-intl version:', pkg.dependencies?.['next-intl'] || pkg.devDependencies?.['next-intl']);
  } catch (e) {
    console.error('read package.json error:', e && e.message);
  }
}

const cfgPath = path.join(cwd, 'next-intl.config.js');
console.log('next-intl.config.js exists:', fs.existsSync(cfgPath));
if (fs.existsSync(cfgPath)) {
  try {
    const cfg = require(cfgPath);
    console.log('config export:', cfg);
  } catch (e) {
    console.error('require config error:', e && e.message);
  }
} else {
  console.error('Config file not found at', cfgPath);
}

const middlewarePath = path.join(cwd, 'middleware.ts');
console.log('middleware.ts exists at root:', fs.existsSync(middlewarePath));

const messagesRoot = path.join(cwd, 'messages');
console.log('messages folder exists at root:', fs.existsSync(messagesRoot));
if (fs.existsSync(messagesRoot)) {
  try {
    const files = fs.readdirSync(messagesRoot);
    console.log('messages files:', files);
  } catch (e) {
    console.error('read messages error:', e && e.message);
  }
}

const nextDir = path.join(cwd, '.next');
console.log('.next folder exists:', fs.existsSync(nextDir));