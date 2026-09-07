import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// IMPORTANTE: antes de desplegar en GitHub Pages, reemplazar REEMPLAZAR-USUARIO
// y REEMPLAZAR-REPO por los valores reales del repositorio (ver README.md,
// sección Despliegue). Se usan valores válidos como URL (sin < >) para que
// `astro build` no falle mientras tanto.
export default defineConfig({
  site: 'https://REEMPLAZAR-USUARIO.github.io',
  base: '/REEMPLAZAR-REPO',
  trailingSlash: 'always',
  compressHTML: true,
  integrations: [sitemap()],
});
