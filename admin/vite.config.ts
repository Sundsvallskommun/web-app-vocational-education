import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import postcssNesting from 'postcss-nesting';

// https://vitejs.dev/config/
export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  return defineConfig({
    plugins: [react()],
    // NOTE: `define: { 'process.env': process.env }` used to be set here, which inlined
    // the whole build environment into the client bundle. The app reads configuration
    // through `import.meta.env.VITE_*`, which Vite exposes on its own.
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
