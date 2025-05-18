import globals from 'globals'
import js from '@eslint/js'
import pluginReact from 'eslint-plugin-react'
import pluginReactHooks from 'eslint-plugin-react-hooks'
import pluginImport from 'eslint-plugin-import'
import pluginJsxA11y from 'eslint-plugin-jsx-a11y'
import pluginPrettierRecommended from 'eslint-plugin-prettier/recommended'

export default [
  {
    ignores: [
      'node_modules/',
      'dist/',
      'build/',
      '.husky/',
      'vite.config.js',
      'eslint.config.js',
    ],
  },
  js.configs.recommended,
  {
    files: ['**/*.{js,jsx}'],
    plugins: {
      react: pluginReact,
      'react-hooks': pluginReactHooks,
      import: pluginImport,
      'jsx-a11y': pluginJsxA11y,
    },
    languageOptions: {
      parserOptions: {
        ecmaFeatures: { jsx: true },
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
      globals: {
        ...globals.browser,
        ...globals.es2021,
      },
    },
    settings: {
      react: {
        version: 'detect',
      },
      'import/resolver': {
        node: {
          extensions: ['.js', '.jsx'],
          moduleDirectory: ['node_modules', 'src/'],
        },
      },
    },
    rules: {
      ...(pluginReact.configs && pluginReact.configs.recommended
        ? pluginReact.configs.recommended.rules
        : {}),
      'react/react-in-jsx-scope': 'off',
      'react/jsx-uses-react': 'off',
      ...(pluginReactHooks.configs && pluginReactHooks.configs.recommended
        ? pluginReactHooks.configs.recommended.rules
        : {}),
      ...(pluginImport.configs && pluginImport.configs.errors
        ? pluginImport.configs.errors.rules
        : {}),
      ...(pluginImport.configs && pluginImport.configs.warnings
        ? pluginImport.configs.warnings.rules
        : {}),
      'import/no-unresolved': [2, { caseSensitive: false }],
      'import/order': [
        2,
        {
          groups: [
            'builtin',
            'external',
            'internal',
            'parent',
            'sibling',
            'index',
          ],
          'newlines-between': 'always',
        },
      ],

      ...(pluginJsxA11y.configs && pluginJsxA11y.configs.recommended
        ? pluginJsxA11y.configs.recommended.rules
        : {}),

      'jsx-a11y/no-autofocus': 'off',
      indent: ['error', 2],
      'linebreak-style': ['warn', 'unix'],
      quotes: ['error', 'single'],
      semi: ['error', 'never'],
      'react/prop-types': 0,
      'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    },
  },

  pluginPrettierRecommended,
]
