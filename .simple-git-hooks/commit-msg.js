import { execSync } from 'child_process';

const commitMsgFile = process.argv[2];

if (!commitMsgFile) {
    console.error('\n\nError: No commit message file provided');
    process.exit(1);
}

try {
    execSync(`npx --no -- commitlint --edit "${commitMsgFile}"`, { stdio: 'inherit' });
} catch (error) {
    process.exit(1);
}
