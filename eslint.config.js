/**
 * *** ESLint Configuration for Angular Projects ***
 *
 * ℹ️ This configuration provides comprehensive linting for Angular applications, enforcing:
 *   - ✅ TypeScript best practices and stylistic conventions
 *   - ✅ Angular-specific patterns and component/directive standards
 *   - ✅ Custom rules for Angular decorator formatting (blank lines, sorted arrays)
 *   - ✅ Import ordering with @angular and rxjs prioritization
 *   - ✅ Restriction on relative imports (prevents ../../../ patterns)
 *   - ✅ Automatic removal of unused imports
 *   - ✅ Template accessibility and best practices for HTML files
 *   - ✅ Prettier compatibility to avoid formatting conflicts
 *
 * ℹ️ Includes two custom local rules:
 *   - ✅ 1. blank-line-before-angular-decorator: Enforces blank line before @Component/@Directive/@Injectable
 *   - ✅ 2. sort-decorator-arrays: Alphabetically sorts imports/declarations/providers/exports arrays
 *
 * 📃 Instalation of Lint and all related packages:
 *   > npm install --save-dev eslint eslint-import-resolver-typescript angular-eslint eslint-config-prettier eslint-plugin-import eslint-plugin-unused-imports typescript-eslint
 *   Note: eslint-import-resolver-typescript is used under the hood even if it does not appear in this file.
 *
 * 📃 Add scripts to package.json:
 *   "type": "module",
 *   "scripts": {
 *       "lint": "eslint .",
 *       "lint:fix": "eslint . --fix"
 *   },
 *
 * ▶️ To see the Lint errors and warnings without automatically fixing them:
 *   > npm run lint
 *
 * ▶️ To automatically fix the Lint errors and warnings:
 *   > npm run lint:fix
 */

import js from '@eslint/js';
import angular from 'angular-eslint';
import eslintConfigPrettier from 'eslint-config-prettier';
import importPlugin from 'eslint-plugin-import';
import unusedImports from 'eslint-plugin-unused-imports';
import tseslint from 'typescript-eslint';

// Local ESLint plugin with targeted rules for Angular development.
const localAngularRules = {
    rules: {
        'no-relative-imports': {
            meta: {
                type: 'problem',
                docs: {
                    description:
                        'Disallow relative imports that traverse up directories (../, ../../, ../../../, etc.).',
                    recommended: false,
                },
                schema: [],
                messages: {
                    noRelative:
                        'Avoid using relative imports that traverse up directories. For better maintainability, use "TypeScript\'s Path Aliases" imports or absolute paths.',
                },
            },
            create(context) {
                return {
                    ImportDeclaration(node) {
                        const importPath = node.source.value;
                        if (typeof importPath === 'string' && /^(\.\.\/){1,}/.test(importPath)) {
                            context.report({
                                node: node.source,
                                messageId: 'noRelative',
                            });
                        }
                    },
                };
            },
        },
        'blank-line-before-angular-decorator': {
            meta: {
                type: 'layout',
                docs: {
                    description:
                        'Require a blank line before @Component/@Directive/@Injectable decorated classes',
                    recommended: false,
                },
                fixable: 'whitespace',
                schema: [],
                messages: {
                    missingBlankLine:
                        'Add an empty line before an Angular decorator (@Component, @Directive or @Injectable).',
                },
            },
            create(context) {
                // ESLint v9 exposes sourceCode on the context; keep getSourceCode for compat.
                const sourceCode = context.sourceCode || context.getSourceCode();
                const ANGULAR_DECORATORS = new Set(['Component', 'Directive', 'Injectable']);

                function isAngularDecorator(dec) {
                    const expr = dec && dec.expression;
                    if (!expr) return false;
                    if (expr.type === 'CallExpression') {
                        const callee = expr.callee;
                        if (callee.type === 'Identifier') {
                            return ANGULAR_DECORATORS.has(callee.name);
                        }
                        if (callee.type === 'MemberExpression') {
                            const prop = callee.property;
                            return (
                                prop &&
                                prop.type === 'Identifier' &&
                                ANGULAR_DECORATORS.has(prop.name)
                            );
                        }
                    } else if (expr.type === 'Identifier') {
                        // Rare, but guard for non-call usage.
                        return ANGULAR_DECORATORS.has(expr.name);
                    }
                    return false;
                }

                return {
                    ClassDeclaration(node) {
                        const decorators = node.decorators || [];
                        if (decorators.length === 0) return;

                        const hasAngular = decorators.some(isAngularDecorator);
                        if (!hasAngular) return;

                        const firstDec = decorators[0];
                        const firstToken = sourceCode.getFirstToken(firstDec) || firstDec;
                        const tokenBefore = sourceCode.getTokenBefore(firstToken, {
                            includeComments: true,
                        });
                        if (!tokenBefore) return;

                        const beforeLine = tokenBefore.loc.end.line;
                        const startLine = firstToken.loc.start.line;

                        // Require at least one empty line between previous token line and decorator start line.
                        if (startLine - beforeLine < 2) {
                            context.report({
                                node: firstDec,
                                messageId: 'missingBlankLine',
                                fix(fixer) {
                                    // Insert a single newline before the first decorator; there is almost
                                    // always already one newline after the previous statement, so adding one
                                    // more creates the required blank line. This is safe and idempotent with ESLint.
                                    return fixer.insertTextBefore(firstDec, '\n');
                                },
                            });
                        }
                    },
                };
            },
        },
        'sort-decorator-arrays': {
            meta: {
                type: 'suggestion',
                docs: {
                    description:
                        'Enforce alphabetical sorting of arrays in Angular decorator metadata (imports, declarations, providers, exports)',
                    recommended: false,
                },
                fixable: 'code',
                schema: [],
                messages: {
                    unsortedArray:
                        'Array elements in decorator metadata should be sorted alphabetically.',
                },
            },
            create(context) {
                const sourceCode = context.sourceCode || context.getSourceCode();
                const DECORATOR_NAMES = new Set(['Component', 'NgModule', 'Directive']);
                const PROPERTIES_TO_SORT = new Set([
                    'imports',
                    'declarations',
                    'providers',
                    'exports',
                ]);

                function isAngularDecorator(dec) {
                    const expr = dec?.expression;
                    if (!expr || expr.type !== 'CallExpression') return false;
                    const callee = expr.callee;
                    if (callee.type === 'Identifier') {
                        return DECORATOR_NAMES.has(callee.name);
                    }
                    return false;
                }

                function getIdentifierName(element) {
                    if (element.type === 'Identifier') return element.name;
                    if (element.type === 'MemberExpression') {
                        return sourceCode.getText(element);
                    }
                    return null;
                }

                function checkArrayProperty(property) {
                    if (
                        property.type !== 'Property' ||
                        property.key.type !== 'Identifier' ||
                        !PROPERTIES_TO_SORT.has(property.key.name) ||
                        property.value.type !== 'ArrayExpression'
                    ) {
                        return;
                    }

                    const elements = property.value.elements.filter((el) => el !== null);
                    if (elements.length <= 1) return;

                    const names = elements.map((el) => getIdentifierName(el)).filter(Boolean);
                    if (names.length !== elements.length) return;

                    const sortedNames = [...names].sort((a, b) =>
                        a.localeCompare(b, 'en', { sensitivity: 'base' }),
                    );

                    const isSorted = names.every((name, i) => name === sortedNames[i]);
                    if (!isSorted) {
                        context.report({
                            node: property.value,
                            messageId: 'unsortedArray',
                            fix(fixer) {
                                const elementsWithNames = elements.map((el, i) => ({
                                    element: el,
                                    name: names[i],
                                    text: sourceCode.getText(el),
                                }));

                                elementsWithNames.sort((a, b) =>
                                    a.name.localeCompare(b.name, 'en', { sensitivity: 'base' }),
                                );

                                const sortedTexts = elementsWithNames.map((item) => item.text);
                                const newArrayContent = sortedTexts.join(', ');

                                return fixer.replaceTextRange(
                                    [elements[0].range[0], elements[elements.length - 1].range[1]],
                                    newArrayContent,
                                );
                            },
                        });
                    }
                }

                return {
                    ClassDeclaration(node) {
                        const decorators = node.decorators || [];
                        const angularDec = decorators.find(isAngularDecorator);
                        if (!angularDec) return;

                        const callExpr = angularDec.expression;
                        if (
                            !callExpr.arguments ||
                            callExpr.arguments.length === 0 ||
                            callExpr.arguments[0].type !== 'ObjectExpression'
                        ) {
                            return;
                        }

                        const configObj = callExpr.arguments[0];
                        configObj.properties.forEach((prop) => checkArrayProperty(prop));
                    },
                };
            },
        },
    },
};

export default tseslint.config(
    {
        ignores: ['**/.angular/**', '**/node_modules/**', '**/dist/**', '**/*.js'],
    },
    {
        files: ['**/*.ts'],
        extends: [
            js.configs.recommended,
            ...tseslint.configs.recommended,
            ...tseslint.configs.stylistic,
            ...angular.configs.tsRecommended,
            eslintConfigPrettier,
        ],
        processor: angular.processInlineTemplates,
        plugins: {
            'unused-imports': unusedImports,
            import: importPlugin,
            local: localAngularRules,
        },
        settings: {
            'import/resolver': {
                typescript: {
                    alwaysTryTypes: true,
                    project: './tsconfig.json',
                },
            },
            'import/internal-regex': '^@project',
        },
        rules: {
            // Enforce a blank line before Angular class decorators
            // like @Component, @Directive, and @Injectable.
            'local/blank-line-before-angular-decorator': 'error',
            // Enforce alphabetical sorting of arrays in Angular decorator metadata
            'local/sort-decorator-arrays': 'error',
            'import/order': [
                'error',
                {
                    groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
                    pathGroups: [
                        {
                            pattern: '@angular/**',
                            group: 'external',
                            position: 'before',
                        },
                        {
                            pattern: 'rxjs/**',
                            group: 'external',
                            position: 'after',
                        },
                        {
                            pattern: 'rxjs',
                            group: 'external',
                            position: 'after',
                        },
                        {
                            pattern: '@project*/**',
                            group: 'internal',
                        },
                    ],
                    pathGroupsExcludedImportTypes: ['builtin'],
                    'newlines-between': 'always',
                    alphabetize: {
                        order: 'asc',
                        caseInsensitive: true,
                    },
                },
            ],
            'local/no-relative-imports': 'warn',
            '@typescript-eslint/no-unused-vars': 'off',
            '@typescript-eslint/no-explicit-any': 'warn',
            '@typescript-eslint/no-empty-function': 'warn',
            'no-useless-escape': 'warn',
            '@angular-eslint/prefer-inject': 'warn',
            '@angular-eslint/prefer-standalone': 'warn',
            'unused-imports/no-unused-imports': 'error',
            'unused-imports/no-unused-vars': [
                'warn',
                {
                    vars: 'all',
                    args: 'after-used',
                    argsIgnorePattern: '^_',
                },
            ],
            '@angular-eslint/directive-selector': [
                'error',
                {
                    type: 'attribute',
                    prefix: 'app',
                    style: 'camelCase',
                },
            ],
            '@angular-eslint/component-selector': [
                'error',
                {
                    type: 'element',
                    prefix: 'app',
                    style: 'kebab-case',
                },
            ],
        },
    },
    {
        files: ['**/*.html'],
        extends: [...angular.configs.templateRecommended, ...angular.configs.templateAccessibility],
        rules: {},
    },
);
