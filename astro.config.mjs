import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// El `base` sólo hace falta para el build de producción (GitHub Pages sirve
// el sitio bajo /prototipo-expojuy/). En `astro dev` se deja en "/" para poder
// previsualizar directamente en http://localhost:4321/ sin el subdirectorio.
const esDev = process.argv.includes('dev');

export default defineConfig({
  site: 'https://micaelalopez-dev.github.io',
  base: esDev ? '/' : '/prototipo-expojuy',
  trailingSlash: 'always',
  compressHTML: true,
  integrations: [sitemap()],
});
