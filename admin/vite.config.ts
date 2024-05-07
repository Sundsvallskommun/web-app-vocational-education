import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import postcssNesting from 'postcss-nesting';

// https://vitejs.dev/config/
export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  return defineConfig({
    plugins: [react()],
    define: {
      'process.env': process.env,
    },
    server: {
      host: true,
    },
    base: process.env.VITE_BASE_PATH,
    css: {
      postcss: {
        plugins: [postcssNesting()],
      },
    },
  });
};
