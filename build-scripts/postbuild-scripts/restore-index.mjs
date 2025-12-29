import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const indexPath = path.join(__dirname, '..', '..', 'projects', 'web', 'src', 'index.html');
const backupPath = path.join(__dirname, '..', '..', 'projects', 'web', 'src', 'index.html.bak');

function restoreIndex() {
    try {
        if (!fs.existsSync(backupPath)) {
            console.error(`Error: Backup file not found: ${backupPath}`);
            process.exit(1);
        }

        if (fs.existsSync(indexPath)) {
            fs.unlinkSync(indexPath);
        }

        fs.renameSync(backupPath, indexPath);
        console.log(`Restored index from backup to: ${indexPath}`);
    } catch (error) {
        console.error(`Error restoring index: ${error.message}`);
        process.exit(1);
    }
}

restoreIndex();
