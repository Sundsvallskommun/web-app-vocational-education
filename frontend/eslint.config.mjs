import js from '@eslint/js';
import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';
import globals from 'globals';
import reactRefresh from 'eslint-plugin-react-refresh';

export default defineConfig([
  js.configs.recommended,
  ...nextVitals,
  ...nextTs,
  {
    plugins: {
      'react-refresh': reactRefresh,
    },
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.browser,
        ...globals.jest,
      },
    },
    rules: {
      'react-refresh/only-export-components': [
        'error',
        { allowExportNames: ['generateMetadata', 'generateStaticParams', 'dynamic'] },
      ],
      '@typescript-eslint/no-explicit-any': 'error',
      // eslint-plugin-react-hooks v7 (pulled in by eslint-config-next 16) adds the
      // React Compiler rules below as errors. The existing code predates them, so
      // they are kept as warnings until the flagged components have been reworked.
      'react-hooks/set-state-in-effect': 'warn',
      'react-hooks/immutability': 'warn',
      'react-hooks/incompatible-library': 'warn',
    },
  },
  {
    // CommonJS tooling files (jest transformers, postcss/tailwind/next config).
    files: ['*.js', '.jest/**/*.js'],
    rules: {
      '@typescript-eslint/no-require-imports': 'off',
    },
  },
  globalIgnores(['.next/**', 'out/**', 'build/**', 'coverage/**', '.nyc_output/**', 'next-env.d.ts']),
]);
