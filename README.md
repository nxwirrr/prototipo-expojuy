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

El sitio se publica en **https://micaelalopez-dev.github.io/prototipo-expojuy/**
mediante GitHub Actions.

1. El workflow [`.github/workflows/deploy.yml`](./.github/workflows/deploy.yml)
   corre `npm ci && npm run build` en cada push a `main` y publica `dist/`
   con `actions/deploy-pages`.
2. En GitHub, activar **Settings → Pages → Source: GitHub Actions** una
   única vez (si no está ya activado).
3. Cualquier push a `main` dispara un nuevo deploy automáticamente; también
   se puede disparar a mano desde la pestaña **Actions → Deploy a GitHub
   Pages → Run workflow**.

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
