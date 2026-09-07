# Decisiones de diseño y técnicas

Registro de decisiones tomadas durante el desarrollo del prototipo para el
Desafío Digital ExpoJuy 2026, con su justificación. Es el insumo para la
memoria descriptiva final.

## Concepto y alcance

- **Qué se entrega:** una propuesta conceptual y visual del sitio de ExpoJuy
  2026 —arquitectura de información, sistema de diseño y factibilidad
  técnica—, no el sitio de producción. No hay backend, autenticación,
  pasarela de pago ni venta real de entradas.
- **Contenido de demostración:** expositores, sponsors, oradores y noticias
  son ficticios y están identificados como tales con un aviso permanente y
  no descartable en el header de todas las páginas (`DemoNotice.astro`), más
  el pie de página. Se evitó cualquier nombre que pudiera confundirse con una
  empresa real del sector.
- **Ubicación del proyecto:** se creó en un repositorio nuevo e independiente
  (`ExpoJuy2026-Sitio`), separado del portfolio personal del equipo, porque
  es una entrega de un concurso distinto con su propio ciclo de vida.

## Stack

- **Astro (SSG) sin framework de UI.** Se eligió específicamente porque el
  sitio oficial actual de ExpoJuy es una SPA que renderiza del lado del
  cliente: no entrega contenido en el HTML inicial, lo que perjudica el SEO y
  dejа el sitio vacío para lectores de pantalla y buscadores hasta que carga
  el JS. Astro genera HTML completo en build time por defecto.
- **CSS propio con custom properties**, sin framework (Tailwind, Bootstrap,
  etc.): el sistema visual modular (bloques + un único corte curvo) es
  específico de esta identidad y no se beneficia de utilidades genéricas;
  además evita una dependencia y un bundle de CSS no utilizado.
- **JavaScript vanilla, mínimo e insular** (islas de Astro): sólo donde hay
  interacción real (menú del header, buscador de expositores, mapa del
  predio). Cada componente interactivo se diseñó primero para funcionar sin
  JS y luego se mejora progresivamente (ver más abajo).
- **Content Collections (Zod)** para expositores, rubros, agenda, noticias,
  sponsors, FAQ y audiencias: datos tipados, versionados en el repo, editables
  por un tercero sin depender de un CMS externo.
- **`@astrojs/sitemap`** (integración oficial): único paquete de terceros
  agregado más allá de Astro y TypeScript. Genera `sitemap-index.xml`
  automáticamente a partir de las páginas estáticas; se justifica porque el
  pliego pide `sitemap.xml` y reimplementarlo a mano es trabajo redundante
  para algo que la propia herramienta resuelve sin fricción.

## Tipografía

- La tipografía oficial del isologo es **Ambit** (Light/Regular/SemiBold/Bold),
  que es comercial y no está disponible con licencia de uso como webfont en
  Google Fonts ni Adobe Fonts.
- Se reemplazó por **Manrope** (SIL Open Font License 1.1), una grotesca
  geométrica de terminales rectas con los mismos cuatro pesos, que se
  autohospeda en `public/fonts/` (no se carga desde Google Fonts en tiempo de
  ejecución, para no depender de un servicio externo y evitar una conexión
  adicional en el arranque).
- La familia está centralizada en una sola custom property
  (`--fuente-base` en `src/styles/tokens.css`) para poder reemplazarla por
  Ambit en un único lugar si el organismo llega a licenciarla.

## Color y contraste

- Los cinco colores institucionales (turquesa, violeta, púrpura, lila, gris
  texto) se cargaron como tokens en `src/styles/tokens.css`, con roles
  semánticos separados de los valores crudos (`--color-enlace`,
  `--color-boton-fondo`, etc.) para poder ajustar el mapeo sin tocar cada
  componente.
- **Turquesa y lila nunca se usan como texto sobre fondo claro** (2.19:1 y
  2.53:1, no llegan a AA): se reservan como fondo de bloque con texto oscuro
  encima, o como texto/gráfico sobre superficies oscuras, donde sí cumplen
  (7.93:1 y 6.89:1).
- **Púrpura** es el color de enlaces y texto de énfasis sobre fondo claro
  (7.21:1). **Violeta** se usa como fondo de botón primario con texto blanco
  (5.05:1). El **gris de texto** es el cuerpo de texto sobre fondo claro
  (8.70:1); no se usa sobre fondo oscuro (2.00:1, falla), así que las
  superficies oscuras (header, hero, footer) usan texto blanco.
- Esta lectura llevó a una decisión de layout: la franja superior de
  audiencias y el footer son superficies oscuras (`.superficie-oscura`,
  fondo `#1A1A1A`), lo que además habilita usar turquesa y lila como acento de
  texto/ícono ahí, en vez de dejarlos sólo como color decorativo.
- El rojo de CamComex (`#C1001F`) sólo aparece en la franja institucional del
  footer, sobre una placa blanca, nunca en el header ni mezclado con la
  paleta violeta.

## Sistema visual

- El isologo está construido con bloques rectangulares y un semicírculo (la
  J/U del nombre). Ese lenguaje geométrico es el recurso gráfico del sitio:
  grillas de bloques y cortes rectos en general, con un único elemento curvo
  por pantalla como contrapunto (se aplicará puntualmente en la home y el
  mapa del predio, no en todos lados).
- Se evitan deliberadamente: tarjetas idénticas con sombra suave genérica,
  degradados decorativos, animaciones de entrada por sección, texto en
  mayúsculas sostenidas como etiqueta, y flechas "→" pegadas a botones.
- El favicon (`public/favicon.svg`) es una recreación propia, en SVG, del
  isologo (bloques + semicírculo), para no depender de un ícono externo.

## Accesibilidad y progressive enhancement

- El menú principal del header está pensado "mobile-first sin JS": sin
  JavaScript, la navegación se muestra apilada y totalmente utilizable bajo
  el header (nada queda oculto ni inalcanzable). Un script inline mínimo en
  `BaseLayout` agrega la clase `js` a `<html>`; sólo cuando esa clase está
  presente el menú se convierte en un cajón deslizable con botón de
  hamburguesa. Es el mismo criterio que se va a aplicar en el buscador de
  expositores (lista completa en HTML, mejorada con filtros por JS).
- Enlace "saltar al contenido" como primer elemento focoable de la página.
- El foco de teclado (`:focus-visible`) usa el color púrpura sobre fondo
  claro y turquesa sobre fondo oscuro, ambos verificados contra la tabla de
  contraste.
- El aviso de contenido de demostración no tiene botón de cierre a propósito:
  tiene que seguir visible en toda la navegación, no es descartable como un
  banner de cookies.

## Assets

- Los logos oficiales (`EXPOJUY_Logo2026`) se recibieron sólo en PNG/JPG/PDF/EPS/CDR,
  sin fuente vectorial editable en SVG. Se usan las versiones PNG (RGB) para
  el logo de marca en header/footer, importadas desde `src/assets/images/`
  para que Astro (`astro:assets`) las optimice y sirva con dimensiones
  declaradas en el build (evita saltos de layout).
- El logo de CamComex, al ser un archivo con fondo transparente y tinta
  roja, se muestra sobre una placa blanca en el footer para no perder
  contraste ni chocar con el fondo oscuro de esa sección.

## Pendiente / a confirmar antes de la entrega

- `astro.config.mjs` tiene `site`/`base` con placeholders (`<usuario>/<repo>`):
  hay que completarlos con el repositorio real de GitHub Pages antes del
  deploy (ver README).
- Los enlaces de redes sociales en el footer se muestran como diseño (íconos
  + nombre) sin URL real, porque no hay cuentas oficiales confirmadas: no se
  quiso inventar enlaces que aparenten ser reales.
