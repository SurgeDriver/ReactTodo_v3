import globals from 'globals'
import js from '@eslint/js'
import pluginReact from 'eslint-plugin-react'
import pluginImport from 'eslint-plugin-import'
import pluginJsxA11y from 'eslint-plugin-jsx-a11y'
import pluginPrettierRecommended from 'eslint-plugin-prettier/recommended'

export default [
  {
    ignores: ['node_modules/', 'dist/', 'build/', '.husky/', 'vite.config.js'],
  },
  js.configs.recommended,
  {
    files: ['**/*.{js,jsx,mjs,cjs}'],
    plugins: {
      react: pluginReact,
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
          extensions: ['.js', '.jsx', '.mjs', '.cjs'],
          moduleDirectory: ['node_modules', 'src/'],
        },
      },
    },
    rules: {
      ...pluginReact.configs.recommended.rules,
      ...pluginReact.configs['jsx-runtime'].rules,
      'react/react-in-jsx-scope': 'off',
      'react/jsx-uses-react': 'off',
      'react/prop-types': 'off',
      'react/jsx-filename-extension': ['warn', { extensions: ['.js', '.jsx'] }],

      ...pluginImport.configs.recommended.rules,
      'import/no-unresolved': ['error', { caseSensitive: false }],
      'import/order': [
        'error',
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

      ...pluginJsxA11y.configs.recommended.rules,
      'jsx-a11y/no-autofocus': 'off',
      indent: ['error', 2],
      'linebreak-style': ['warn', 'unix'],
      quotes: ['error', 'single'],
      semi: ['error', 'never'],
    },
  },
  pluginPrettierRecommended,
]
