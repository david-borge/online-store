import { readFile, writeFile } from 'fs/promises';
import { minify } from 'html-minifier-terser';

/**
 * Postbuild script to minify index.html files in the dist folder.
 *
 * What it does:
 * - Processes dist/web/browser/index.csr.html and dist/web/server/index.server.html
 * - Minifies HTML (whitespace, comments, redundant attrs, inline CSS/JS)
 * - Logs success and skips missing files without failing the build
 */
async function minifyIndexHtml() {
    const indexPaths = ['dist/web/browser/index.csr.html', 'dist/web/server/index.server.html'];

    for (const indexPath of indexPaths) {
        try {
            console.log(`[html-minifier] Processing ${indexPath}...`);

            // Read the index.html file
            const html = await readFile(indexPath, 'utf-8');

            // Minify HTML using html-minifier-terser
            const minifiedHtml = await minify(html, {
                collapseWhitespace: true,
                removeComments: true,
                removeRedundantAttributes: true,
                removeScriptTypeAttributes: true,
                removeStyleLinkTypeAttributes: true,
                useShortDoctype: true,
                minifyCSS: true,
                minifyJS: true,
                removeEmptyAttributes: true,
                removeOptionalTags: false,
                sortAttributes: true,
                sortClassName: true,
            });

            // Write back the minified HTML
            await writeFile(indexPath, minifiedHtml, 'utf-8');

            console.log(`[html-minifier] ✓ Successfully minified ${indexPath}`);
        } catch (error) {
            if (error.code === 'ENOENT') {
                console.log(`[html-minifier] ⓘ ${indexPath} not found, skipping...`);
            } else {
                console.error(`[html-minifier] ✗ Error processing ${indexPath}:`, error.message);
            }
        }
    }
}

minifyIndexHtml().catch(console.error);
