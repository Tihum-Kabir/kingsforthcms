import fs from 'fs';
import path from 'path';

const dirs = [
    './src/components/marketing',
    './src/components/services',
    './src/components/ui'
];

function processDir(dir) {
    if (!fs.existsSync(dir)) return;
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            processDir(fullPath);
        } else if (fullPath.endsWith('.tsx')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            let modified = false;

            // Replace light white transluscency with deep elegant dark transluscency universally
            content = content.replace(/bg-white\/10 dark:bg-black\/40/g, 'bg-black/40 dark:bg-black/40');
            content = content.replace(/bg-white\/10 dark:bg-\[\#030712\]/g, 'bg-[#030712]/60 dark:bg-[#030712]');
            content = content.replace(/bg-white\/5 dark:bg-black\/40/g, 'bg-black/40 dark:bg-black/40');
            content = content.replace(/bg-white\/5/g, 'bg-white/5'); // Leave extremely faint ones alone or change?
            content = content.replace(/border-white\/20 dark:border-white\/10/g, 'border-white/10 dark:border-white/10');
            
            // Fix text contrast
            content = content.replace(/text-gray-300 group-hover:text-white dark:text-gray-400/g, 'text-gray-300 group-hover:text-white dark:text-gray-400');

            if (content !== fs.readFileSync(fullPath, 'utf8')) {
                fs.writeFileSync(fullPath, content);
                console.log('Fixed contrast in: ' + fullPath);
            }
        }
    }
}

dirs.forEach(processDir);
console.log('UI Glass contrasts synced.');
