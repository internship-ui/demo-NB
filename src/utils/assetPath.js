/**
 * Utility to resolve static public assets against Vite's BASE_URL.
 * This guarantees assets load seamlessly in both local development
 * and subpath hosting environments like GitHub Pages (/NBT1/).
 */
export function getAssetUrl(path) {
  if (!path) return '';
  // Return untouched if it's already an absolute URL or data URL
  if (/^(https?:)?\/\//i.test(path) || path.startsWith('data:')) {
    return path;
  }
  const base = import.meta.env.BASE_URL || '/';
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  const cleanBase = base.endsWith('/') ? base : `${base}/`;
  return `${cleanBase}${cleanPath}`;
}
