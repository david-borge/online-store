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
                'style', // Changes that don't affect code (formatting, semicolons, etc)
                'refactor', // Code refactoring (no feature or bug change)
                'perf', // Performance improvements
                'test', // Adding or updating tests
                'chore', // Changes to build process, dependencies, tooling (git hooks...), deployment
                'ci', // Changes to CI configuration files. Note: Common CI tools: GitHub Actions, Jenkins, GitLab CI, Travis CI, CircleCI, Azure DevOps
            ],
        ],
    },
};
