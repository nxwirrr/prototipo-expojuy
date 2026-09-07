/** Antepone el `base` configurado en astro.config.mjs a una ruta interna. */
export function withBase(path: string): string {
  const base = import.meta.env.BASE_URL;
  const limpio = path.replace(/^\//, '');
  return base.endsWith('/') ? `${base}${limpio}` : `${base}/${limpio}`;
}
