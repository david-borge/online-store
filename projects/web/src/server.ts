import { join } from 'node:path';

import {
    AngularNodeAppEngine,
    createNodeRequestHandler,
    isMainModule,
    writeResponseToNodeResponse,
} from '@angular/ssr/node';

import chalk from 'chalk';
import express from 'express';

const browserDistFolder = join(import.meta.dirname, '../browser'); // 'dist/web/browser'
// import.meta.dirname is a Node.js feature. It is the path to the folder of the current ES module file
// Here, we are in in 'dist/web/server/server.mjs' (from the build), so import.meta.dirname is 'dist/web/server/' (from the build)

const app = express();
const angularApp = new AngularNodeAppEngine();

// - Global Middleware: executed for every Request made to the Express Server (because all route functions are after this)
// ⚠️ This will ONLY execute when the app is loaded for the first time (when the Express Server is used)
app.use((req, _res, next) => {
    console.log(chalk.red(`\nExpress Server Request recieved for path '${req.url}'!`));

    next();
});

/**
 * Example Express Rest API endpoints can be defined here.
 * Uncomment and define endpoints as necessary.
 *
 * Example:
 * ```ts
 * app.get('/api/{*splat}', (req, res) => {
 *   // Handle API request
 * });
 * ```
 */

/**
 * Serve static files from /browser
 * Note: to be precise, from 'dist/web/browser'
 */
// ⚠️ This will ONLY execute when the app is loaded for the first time (when the Express Server is used)
// AND we are in SSR mode (with npm run serve:ssr:web but not npm run start or ng serve)
// ✅ Angular will ONLY serve static files when loading the app for the first time
// When navigating between routes, Angular will, of course, serve the new pages dinamically itself (it' a SPA), not the Node Express Server,
// so this express.static() and console.log() will NOT be executed
app.use(
    express.static(
        browserDistFolder, // 'dist/web/browser'
        {
            maxAge: '1y',
            index: false,
            redirect: false,
            setHeaders: (_res, path, _stat) => {
                console.log(chalk.yellow(`Serving static file: ${path}`));
            },
        },
    ),
);

/**
 * Handle all other requests by rendering the Angular application.
 */
// ⚠️ This will ONLY execute when the app is loaded for the first time (when the Express Server is used)
app.use((req, res, next) => {
    console.log(chalk.green(`\nServing Angular request for path: ${req.path}`));

    angularApp
        .handle(req)
        .then((response) => (response ? writeResponseToNodeResponse(response, res) : next()))
        .catch(next);
});

/**
 * Start the server if this module is the main entry point, or it is ran via PM2.
 * The server listens on the port defined by the `PORT` environment variable, or defaults to 4000.
 */
// ⚠️ This will ONLY execute when the app is loaded for the first time (when the Express Server is used)
if (isMainModule(import.meta.url) || process.env['pm_id']) {
    const port = process.env['PORT'] || 4000;
    app.listen(port, (error) => {
        if (error) {
            throw error;
        }

        console.log(chalk.green(`Node Express server listening on http://localhost:${port}`));
    });
}

/**
 * Request handler used by the Angular CLI (for dev-server and during build) or Firebase Cloud Functions.
 */
export const reqHandler = createNodeRequestHandler(app);
