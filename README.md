# ExpoJuy 2026 — Propuesta de sitio web

Prototipo conceptual y visual para el Desafío Digital ExpoJuy 2026
(Ministerio de Desarrollo Económico y Producción de Jujuy · CamComex).

> Esto es una propuesta de arquitectura de información, diseño y
> factibilidad técnica — no el sitio de producción. No incluye backend,
> autenticación, pasarela de pago ni venta real de entradas. Los datos de
> expositores, sponsors, oradores y noticias son de demostración.

## Stack

- [Astro](https://astro.build) (salida estática)
- CSS propio con custom properties, sin framework de UI
- JavaScript vanilla mínimo (islas de Astro)
- Content Collections tipadas con Zod

## Requisitos

- Node.js 18.17 o superior
- npm 9 o superior

## Instalación

```bash
npm install
```

## Desarrollo

```bash
npm run dev
```

Abre `http://localhost:4321/`.

## Build de producción

```bash
npm run build
npm run preview
```

`npm run build` corre `astro check` (tipos) antes de compilar el sitio a
`dist/`.

## Despliegue en GitHub Pages

1. En `astro.config.mjs`, reemplazar los placeholders por los valores reales:

   ```js
   site: 'https://tu-usuario.github.io',
   base: '/tu-repo',
   ```

2. En `public/robots.txt`, actualizar la URL del `Sitemap` con el mismo
   usuario/repo.
3. Configurar un workflow de GitHub Actions (`.github/workflows/deploy.yml`)
   que corra `npm ci && npm run build` y publique `dist/` con
   `actions/deploy-pages`, o habilitar el build automático de Pages con
   Astro desde la configuración del repositorio.
4. En GitHub, **Settings → Pages → Source: GitHub Actions**.

## Estructura del proyecto

```
src/
  assets/images/   Logos e imágenes optimizadas por Astro (astro:assets)
  components/      Header, Footer, componentes de UI reutilizables
  content/         Content Collections (expositores, agenda, noticias, …)
  layouts/         Layout base compartido por todas las páginas
  pages/           Rutas del sitio (una página por archivo)
  styles/          Tokens de diseño, reset y estilos base globales
  utils/           Utilidades (construcción de URLs con `base`, etc.)
public/
  fonts/           Manrope autohospedada (ver DECISIONES.md)
  favicon.svg
  robots.txt
```

## Decisiones de diseño

Ver [`DECISIONES.md`](./DECISIONES.md) para el detalle y la justificación de
cada decisión (tipografía, color, accesibilidad, stack).
