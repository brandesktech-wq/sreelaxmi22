const KNOWN_APP_TOP_ROUTES = new Set([
  'about',
  'projects',
  'ongoing-projects',
  'upcoming-projects',
  'completed-projects',
  'portfolio',
  'blogs',
  'blog',
  'gallery',
  'contact',
  'contact-us',
  'assets',
]);

/**
 * Determines the active deployment base path (always starting and ending with `/`)
 * using Vite's `import.meta.env.BASE_URL` and automatic `*.github.io/<repo>/` detection.
 */
export function getEffectiveBaseUrl(): string {
  const rawBase =
    typeof import.meta !== 'undefined' &&
    import.meta.env &&
    typeof import.meta.env.BASE_URL === 'string'
      ? import.meta.env.BASE_URL
      : '/';

  if (rawBase && rawBase !== '/' && rawBase !== './') {
    const cleaned = rawBase.replace(/^\/+|\/+$/g, '');
    return cleaned ? `/${cleaned}/` : '/';
  }

  // Fallback runtime detection if deployed on https://<user>.github.io/<repo-name>/
  if (
    typeof window !== 'undefined' &&
    window.location &&
    window.location.hostname.endsWith('.github.io')
  ) {
    const segments = window.location.pathname.split('/').filter(Boolean);
    if (
      segments.length > 0 &&
      !KNOWN_APP_TOP_ROUTES.has(segments[0].toLowerCase())
    ) {
      return `/${segments[0]}/`;
    }
  }

  return '/';
}

/**
 * Resolves a public `/assets/...` path using Vite's `import.meta.env.BASE_URL`
 * so images, logos, floor plan SVGs, and PDF brochures resolve accurately on:
 * - GitHub Pages project repositories (`/<repo-name>/assets/...`)
 * - GitHub user/organization root repositories or custom domains (`/assets/...`)
 * - Hostinger shared hosting and local Vite development (`/assets/...`)
 */
export function withBaseUrl(assetPath: string): string {
  if (!assetPath || typeof assetPath !== 'string') {
    return assetPath;
  }

  // Leave external URLs, data URIs, mailto, tel, and hash anchors untouched
  if (/^(https?:|data:|blob:|mailto:|tel:|#)/i.test(assetPath)) {
    return assetPath;
  }

  const normalizedBase = getEffectiveBaseUrl();
  const cleanPath = assetPath.replace(/^\.?\//, '');

  if (normalizedBase !== '/' && assetPath.startsWith(normalizedBase)) {
    return assetPath;
  }

  return `${normalizedBase}${cleanPath}`;
}

/**
 * Recursively resolves `/assets/...` string fields inside project or blog data arrays/objects.
 */
export function mapAssetUrls<T>(value: T): T {
  if (typeof value === 'string') {
    if (value.startsWith('/assets/')) {
      return withBaseUrl(value) as unknown as T;
    }
    return value;
  }

  if (Array.isArray(value)) {
    return value.map((item) => mapAssetUrls(item)) as unknown as T;
  }

  if (value && typeof value === 'object') {
    const out: Record<string, unknown> = {};
    for (const [key, val] of Object.entries(value as Record<string, unknown>)) {
      out[key] = mapAssetUrls(val);
    }
    return out as T;
  }

  return value;
}

export default withBaseUrl;
