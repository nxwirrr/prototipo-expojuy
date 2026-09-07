import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// IMPORTANTE: antes de desplegar en GitHub Pages, reemplazar <usuario> y <repo>
// por los valores reales del repositorio (ver README.md, sección Despliegue).
export default defineConfig({
  site: 'https://<usuario>.github.io',
  base: '/<repo>',
  trailingSlash: 'always',
  compressHTML: true,
  integrations: [sitemap()],
});
