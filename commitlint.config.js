export default {
    extends: ['@commitlint/config-conventional'],
    rules: {
        'type-enum': [
            2,
            'always',
            [
                'feat', // A new feature
                'fix', // A bug fix
                'docs', // Documentation only
                'style', // Changes that don't affect code (formatting, missing semicolons, etc)
                'refactor', // Code change that neither fixes a bug nor adds a feature
                'perf', // Code change that improves performance
                'test', // Adding missing tests
                'chore', // Changes to build process, dependencies, tooling
                'ci', // Changes to CI configuration files
            ],
        ],
    },
};
