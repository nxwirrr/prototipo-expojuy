/**
 * Antepone el `base` configurado en astro.config.mjs a una ruta interna y
 * asegura la barra final. `astro.config.mjs` tiene `trailingSlash: 'always'`
 * (cada página se genera como carpeta + index.html); un enlace sin barra
 * final da 404 en el server de desarrollo y es inconsistente en producción,
 * así que esta función es el único lugar donde hay que garantizarla.
 */
export function withBase(path: string): string {
  const base = import.meta.env.BASE_URL;
  const limpio = path.replace(/^\//, '');
  const unido = base.endsWith('/') ? `${base}${limpio}` : `${base}/${limpio}`;
  return unido.endsWith('/') ? unido : `${unido}/`;
}
