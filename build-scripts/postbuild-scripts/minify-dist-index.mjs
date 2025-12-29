import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { minify } from 'html-minifier-terser';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const csrPath = path.join(__dirname, '..', '..', 'dist', 'web', 'browser', 'index.csr.html');
const serverPath = path.join(__dirname, '..', '..', 'dist', 'web', 'server', 'index.server.html');

async function minifyDistIndex() {
    try {
        const files = [
            { path: csrPath, name: 'index.csr.html' },
            { path: serverPath, name: 'index.server.html' },
        ];

        for (const file of files) {
            if (!fs.existsSync(file.path)) {
                console.error(`Error: File not found: ${file.path}`);
                process.exit(1);
            }

            const html = fs.readFileSync(file.path, 'utf8');
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

            fs.writeFileSync(file.path, minified, 'utf8');
            console.log(`Minified ${file.name} at: ${file.path}`);
        }
    } catch (error) {
        console.error(`Error minifying dist index files: ${error.message}`);
        process.exit(1);
    }
}

minifyDistIndex();
