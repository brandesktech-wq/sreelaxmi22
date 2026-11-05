import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';
import {defineConfig, Plugin} from 'vite';

const rootDir = import.meta.dirname;

/**
 * Resolves the production base path for GitHub Pages or root domain deployment:
 * 1. Explicit `VITE_BASE_PATH` environment variable (set by `.github/workflows/deploy.yml`
 *    via `actions/configure-pages` or manual override, e.g. `/sree-laxmi-developers/`).
 * 2. If a custom domain `CNAME` file is present, uses `/`.
 * 3. In GitHub Actions (`GITHUB_REPOSITORY="owner/repo"`), extracts the exact repository
 *    name (`/<repo>/`), or `/` for `<username>.github.io` root repositories.
 * 4. When `GITHUB_PAGES=true` is passed locally, inspects `.git/config` remote origin URL.
 * 5. Defaults to `/` for local development, AI Studio preview, and root domain hosting.
 */
function resolveProductionBasePath(): string {
  if (process.env.VITE_BASE_PATH) {
    const raw = process.env.VITE_BASE_PATH.trim();
    if (raw === '/' || raw === './') {
      return raw;
    }
    return `/${raw.replace(/^\/+|\/+$/g, '')}/`;
  }

  if (
    fs.existsSync(path.resolve(rootDir, 'public/CNAME')) ||
    fs.existsSync(path.resolve(rootDir, 'CNAME'))
  ) {
    return '/';
  }

  if (process.env.GITHUB_REPOSITORY) {
    const parts = process.env.GITHUB_REPOSITORY.split('/');
    const repoName = parts[1]?.trim();
    if (repoName) {
      if (repoName.toLowerCase().endsWith('.github.io')) {
        return '/';
      }
      return `/${repoName}/`;
    }
  }

  const gitConfigPath = path.resolve(rootDir, '.git/config');
  if (process.env.GITHUB_PAGES === 'true' && fs.existsSync(gitConfigPath)) {
    const gitConfig = fs.readFileSync(gitConfigPath, 'utf-8');
    const match = gitConfig.match(/github\.com[:/][^/]+\/([^\s/.]+)(?:\.git)?/i);
    const repoName = match?.[1]?.trim();
    if (repoName && !repoName.toLowerCase().endsWith('.github.io')) {
      return `/${repoName}/`;
    }
  }

  return '/';
}

/**
 * Generates `dist/404.html` (identical to compiled `dist/index.html`) and `dist/.nojekyll`
 * so refreshing any internal React Router route on GitHub Pages (`/about`, `/projects`,
 * `/projects/sree-laxmi-gardenia`, `/blogs`, `/gallery`, `/contact`) loads the SPA cleanly
 * without a 404 page or blank white screen.
 */
function githubPagesSpaFallbackPlugin(): Plugin {
  return {
    name: 'github-pages-spa-fallback',
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
  const base = resolveProductionBasePath();

  return {
    base,
    plugins: [react(), tailwindcss(), githubPagesSpaFallbackPlugin()],
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
