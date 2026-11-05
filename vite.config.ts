import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';
import {defineConfig, Plugin} from 'vite';

const rootDir = import.meta.dirname;
const GITHUB_PAGES_BASE = '/sreelaxmi22/';

/**
 * 1. In production build (`vite build`), generates `dist/404.html` (copy of `dist/index.html`)
 *    and `dist/.nojekyll` so refreshing any internal React Router route on GitHub Pages
 *    (`https://brandesktech-wq.github.io/sreelaxmi22/...`) loads the SPA without a 404 or blank page.
 * 2. In local preview (`vite`), allows root `/` requests in the preview iframe to resolve
 *    seamlessly alongside `/sreelaxmi22/`.
 */
function githubPagesSpaPlugin(): Plugin {
  return {
    name: 'github-pages-spa-plugin',
    configureServer(server) {
      server.middlewares.use((req, _res, next) => {
        if (
          req.url &&
          !req.url.startsWith(GITHUB_PAGES_BASE) &&
          !req.url.startsWith('/@') &&
          !req.url.startsWith('/src/') &&
          !req.url.startsWith('/node_modules/')
        ) {
          req.url = `${GITHUB_PAGES_BASE.replace(/\/$/, '')}${
            req.url.startsWith('/') ? '' : '/'
          }${req.url}`;
        }
        next();
      });
    },
    closeBundle() {
      const outDir = path.resolve(rootDir, 'dist');
      const indexHtmlPath = path.join(outDir, 'index.html');
      const notFoundHtmlPath = path.join(outDir, '404.html');
      const noJekyllPath = path.join(outDir, '.nojekyll');

      if (fs.existsSync(indexHtmlPath)) {
        fs.copyFileSync(indexHtmlPath, notFoundHtmlPath);
      }
      if (fs.existsSync(outDir)) {
        fs.writeFileSync(noJekyllPath, '', 'utf-8');
      }
    },
  };
}

export default defineConfig(() => {
  return {
    base: GITHUB_PAGES_BASE,
    plugins: [react(), tailwindcss(), githubPagesSpaPlugin()],
    resolve: {
      dedupe: ['react', 'react-dom'],
      alias: {
        '@': path.resolve(rootDir, '.'),
      },
    },
    build: {
      outDir: 'dist',
      assetsDir: 'assets',
      emptyOutDir: true,
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
