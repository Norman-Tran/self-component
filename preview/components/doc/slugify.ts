/** Build a URL-safe section id from a display title (fallback when id is omitted). */
export function slugifySectionTitle(title: string) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}
