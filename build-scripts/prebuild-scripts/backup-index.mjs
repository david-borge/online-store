import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const sourceFile = path.join(__dirname, '../../projects/web/src/index.html');
const backupDir = path.join(__dirname, '../../projects/web/src');

function createBackup() {
    try {
        // Check if source file exists
        if (!fs.existsSync(sourceFile)) {
            console.error(`Error: Source file not found: ${sourceFile}`);
            process.exit(1);
        }

        // Create backup file path
        const backupFile = path.join(backupDir, 'index.html.bak');

        // Prevent overwriting an existing backup (protects original when a prior run failed before restore)
        if (fs.existsSync(backupFile)) {
            console.error(`Error: Backup already exists, refusing to overwrite: ${backupFile}`);
            process.exit(1);
        }

        fs.copyFileSync(sourceFile, backupFile);
        console.log(`Backup created successfully: ${backupFile}`);
    } catch (error) {
        console.error(`Error creating backup: ${error.message}`);
        process.exit(1);
    }
}

createBackup();
