const fs = require('fs');
const path = require('path');

/**
 * Paidar.ai QA Link and Asset Checker
 * 
 * This script crawls all HTML files in the project and identifies:
 * 1. Broken internal links (href)
 * 2. Broken image references (src)
 * 3. Broken style-based hero images (url('...'))
 * 4. Suspicious strings (debug flags, local paths, placeholders)
 */

const baseDir = process.cwd();
const files = [];

function getFiles(dir) {
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        const fullPath = path.join(dir, file);
        const stats = fs.statSync(fullPath);
        if (stats.isDirectory() && !fullPath.includes('node_modules') && !fullPath.includes('.git') && !fullPath.includes('.idea')) {
            getFiles(fullPath);
        } else if (stats.isFile() && file.endsWith('.html')) {
            files.push(fullPath);
        }
    });
}

getFiles(baseDir);

const results = {
    brokenLinks: [],
    brokenImages: [],
    suspiciousPaths: [],
};

const hrefRegex = /\shref\s*=\s*["']([^"']+)["']/gi;
const srcRegex = /\ssrc\s*=\s*["']([^"']+)["']/gi;
const styleUrlRegex = /url\(['"]?([^"'\)]+)['"]?\)/g;

files.forEach(file => {
    const content = fs.readFileSync(file, 'utf8');
    const relPath = path.relative(baseDir, file);
    const dirOfFile = path.dirname(file);

    let match;
    // Link check
    while ((match = hrefRegex.exec(content)) !== null) {
        const href = match[1];
        if (href.startsWith('http') || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) continue;
        
        let cleanHref = href.split('#')[0].split('?')[0];
        if (!cleanHref) continue;

        let targetPath = cleanHref.startsWith('/') ? path.join(baseDir, cleanHref) : path.join(dirOfFile, cleanHref);
        targetPath = path.resolve(targetPath);

        if (fs.existsSync(targetPath)) {
            const stats = fs.statSync(targetPath);
            if (stats.isDirectory() && !fs.existsSync(path.join(targetPath, 'index.html'))) {
                results.brokenLinks.push({ file: relPath, href, error: 'Directory missing index.html' });
            }
        } else {
            const parsed = path.parse(targetPath);
            if (!parsed.ext && fs.existsSync(targetPath + '.html')) {
                // OK - implicit .html
            } else {
                results.brokenLinks.push({ file: relPath, href, error: 'File does not exist' });
            }
        }
    }

    // Image check (src and style url)
    const checkAsset = (asset, type) => {
        if (!asset || asset.startsWith('http') || asset.startsWith('data:') || asset.startsWith('//') || asset.includes('${')) return;
        let targetPath = asset.startsWith('/') ? path.join(baseDir, asset) : path.join(dirOfFile, asset);
        targetPath = path.resolve(targetPath);
        if (!fs.existsSync(targetPath)) {
            results.brokenImages.push({ file: relPath, asset, type });
        }
    };

    while ((match = srcRegex.exec(content)) !== null) checkAsset(match[1], 'src');
    while ((match = styleUrlRegex.exec(content)) !== null) checkAsset(match[1], 'style-url');

    // Suspicious paths/strings
    const suspiciousPatterns = [/C:\\/i, /IdeaProjects/i, /localhost/i, /lorem ipsum/i, /TODO/i, /FIXME/i, /isdebug=true/i];
    suspiciousPatterns.forEach(pattern => {
        if (pattern.test(content)) {
            results.suspiciousPaths.push({ file: relPath, pattern: pattern.toString() });
        }
    });
});

if (results.brokenLinks.length > 0 || results.brokenImages.length > 0 || results.suspiciousPaths.length > 0) {
    console.error('QA Issues Found:');
    console.error(JSON.stringify(results, null, 2));
    process.exit(1);
} else {
    console.log(`QA Audit Passed: ${files.length} files scanned. No issues found.`);
}
