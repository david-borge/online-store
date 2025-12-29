import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { minify } from 'html-minifier-terser';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const indexPath = path.join(__dirname, '..', '..', 'projects', 'web', 'src', 'index.html');

async function minifyIndex() {
    try {
        if (!fs.existsSync(indexPath)) {
            console.error(`Error: Source file not found: ${indexPath}`);
            process.exit(1);
        }

        const html = fs.readFileSync(indexPath, 'utf8');
        const minified = await minify(html, {
            collapseWhitespace: true,
            removeComments: true,
            removeRedundantAttributes: true,
            removeScriptTypeAttributes: true,
            removeStyleLinkTypeAttributes: true,
            useShortDoctype: true,
            minifyCSS: true,
            minifyJS: true,
        });

        fs.writeFileSync(indexPath, minified, 'utf8');
        console.log(`Minified index.html at: ${indexPath}`);
    } catch (error) {
        console.error(`Error minifying index.html: ${error.message}`);
        process.exit(1);
    }
}

minifyIndex();
