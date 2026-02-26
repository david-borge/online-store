// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default function (config) {
    config.set({
        basePath: '',
        frameworks: ['jasmine'],
        plugins: [
            'karma-jasmine',
            'karma-chrome-launcher',
            'karma-jasmine-html-reporter',
            'karma-coverage',
        ],
        client: {
            jasmine: {
                // you can add configuration options for Jasmine here
                // the possible options are listed at https://jasmine.github.io/api/edge/Configuration.html
                // for example, you can disable the random execution with `random: false`
                // or set a specific seed with `seed: 4321`
            },
        },
        jasmineHtmlReporter: {
            suppressAll: true, // removes the duplicated traces
        },
        coverageReporter: {
            dir: path.join(__dirname, '../../coverage/web'),
            subdir: '.',
            reporters: [{ type: 'html' }, { type: 'text-summary' }],
        },
        reporters: ['progress', 'kjhtml'],
        browsers: ['Chrome'],
        restartOnFileChange: true,
    });
}
