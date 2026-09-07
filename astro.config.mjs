import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// IMPORTANTE: antes de desplegar en GitHub Pages, reemplazar REEMPLAZAR-USUARIO
// y REEMPLAZAR-REPO por los valores reales del repositorio (ver README.md,
// sección Despliegue). Se usan valores válidos como URL (sin < >) para que
// `astro build` no falle mientras tanto.
//
// El `base` sólo hace falta para el build de producción (GitHub Pages sirve
// el sitio bajo /REEMPLAZAR-REPO/). En `astro dev` se deja en "/" para poder
// previsualizar directamente en http://localhost:4321/ sin el subdirectorio.
const esDev = process.argv.includes('dev');

export default defineConfig({
  site: 'https://REEMPLAZAR-USUARIO.github.io',
  base: esDev ? '/' : '/REEMPLAZAR-REPO',
  trailingSlash: 'always',
  compressHTML: true,
  integrations: [sitemap()],
});
