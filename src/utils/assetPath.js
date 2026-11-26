/**
 * Utility to resolve static public assets against Vite's BASE_URL
 * or dynamic browser runtime origin/subpath.
 * Works seamlessly in both local development (localhost) and production
 * (GitHub Pages subpaths or root domains).
 */
export function getAssetUrl(path) {
  if (!path) return '';
  // Return untouched if it's already an absolute URL or data URL
  if (/^(https?:)?\/\//i.test(path) || path.startsWith('data:')) {
    return path;
  }
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;

  // Browser runtime detection
  if (typeof window !== 'undefined') {
    const pathname = window.location.pathname || '';
    if (pathname.includes('/demo-NB')) {
      return `/demo-NB/${cleanPath}`;
    }
    if (
      window.location.hostname === 'localhost' ||
      window.location.hostname === '127.0.0.1' ||
      pathname === '/' ||
      !pathname.includes('/demo-NB')
    ) {
      return `/${cleanPath}`;
    }
  }

  const base = import.meta.env.BASE_URL || '/';
  const cleanBase = base.endsWith('/') ? base : `${base}/`;
  return `${cleanBase}${cleanPath}`;
}

/**
 * Auto-recovering image fallback handler.
 * If an image fails to load due to subpath / root base mismatches,
 * it switches between `/demo-NB/` and `/` paths automatically.
 * It tracks attempts to prevent infinite retry loops.
 */
export function handleImageFallback(e) {
  const img = e.currentTarget;
  if (!img || img.dataset.fallbackTried === 'true') return;
  img.dataset.fallbackTried = 'true';

  const currentSrc = img.src;
  if (!currentSrc) return;

  if (currentSrc.includes('/demo-NB/')) {
    img.src = currentSrc.replace('/demo-NB/', '/');
  } else {
    try {
      const u = new URL(currentSrc);
      img.src = `${u.origin}/demo-NB${u.pathname}${u.search}`;
    } catch {
      // ignore
    }
  }
}
