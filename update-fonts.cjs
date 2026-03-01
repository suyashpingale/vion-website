const fs = require('fs');
const path = require('path');
const componentsDir = path.join('/Users/suyashpingale/Downloads/vion-digital-laboratory/components');
const files = fs.readdirSync(componentsDir).filter(f => f.endsWith('.tsx'));
files.push('../App.tsx');

let count = 0;
for (const file of files) {
    const filePath = path.join(componentsDir, file);
    if (!fs.existsSync(filePath)) continue;
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;

    // Remove existing leading-[xxx] or leading-relaxed classes from any text-body1 or text-body2
    content = content.replace(/\s+leading-\[[^\]]+\]/g, '');
    content = content.replace(/\s+leading-relaxed/g, '');

    // Add font-medium to text-body1 or text-body2 if it's not already font-medium or font-bold
    content = content.replace(/className=\"([^\"]*text-body[12][^\"]*)\"/g, (match, classes) => {
        let newClasses = classes;
        if (newClasses.includes('font-normal')) {
            newClasses = newClasses.replace(/font-normal\s*/g, 'font-medium ');
        } else if (!newClasses.includes('font-medium') && !newClasses.includes('font-semibold') && !newClasses.includes('font-bold')) {
            newClasses = newClasses + ' font-medium';
        }
        // ensure no double spaces
        newClasses = newClasses.replace(/\s+/g, ' ').trim();
        return `className="${newClasses}"`;
    });

    if (content !== original) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log('Updated ' + file);
        count++;
    }
}
console.log('Total files updated: ' + count);
