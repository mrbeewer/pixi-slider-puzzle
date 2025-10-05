import globals from 'globals';
import pluginJs from '@eslint/js';
import jsdoc from 'eslint-plugin-jsdoc';
import stylistic from '@stylistic/eslint-plugin';

export default [
  { files: ['**/*.js'], languageOptions: { sourceType: 'module' } },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  {
    files: ['**/*.js'],
    plugins: {
      jsdoc: jsdoc,
    },
  },
  stylistic.configs['recommended'],
  {
    files: ['**/*.js'],
    plugins: {
      '@stylistic': stylistic,
    },
    rules: {
      '@stylistic/brace-style': [
        'error',
        '1tbs',
      ],
      '@stylistic/operator-linebreak': [
        'warn',
        'after', {
          overrides: {
            '?': 'before',
            ':': 'before',
            '+': 'after',
          },
        },
      ],
      '@stylistic/semi': ['warn', 'always'],
      '@stylistic/space-before-function-paren': [
        'warn',
        {
          anonymous: 'never',
          named: 'never',
          asyncArrow: 'always',
        },
      ],
    },
  },
  {
    ignores: ['node_modules', 'dist', 'public'],
  },
  // ESLint
  {
    rules: {
      'no-unused-vars': ['warn', {
        vars: 'all',
        args: 'none',
        caughtErrors: 'all',
        ignoreRestSiblings: false,
        reportUsedIgnorePattern: false,
      }],
    },
  },
];
