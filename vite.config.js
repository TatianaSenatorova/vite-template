import { defineConfig } from 'vite';
import { resolve } from 'path';
import fg from 'fast-glob';

const htmlInputs = fg.sync('src/**/*.html').reduce((entries, file) => {
  const name = file.replace(/^src\//, '').replace(/\.html$/, '');

  entries[name] = resolve(__dirname, file);
  return entries;
}, {});

export default defineConfig({
  root: 'src',
  publicDir: '../public',
  base: './',

  server: {
    watch: {
      ignored: ['**/node_modules/**', '**/.git/**'],
    },
  },

  build: {
    outDir: '../dist',
    emptyOutDir: true,
    sourcemap: false,
    rollupOptions: {
      input: htmlInputs,
    },
  },
});
