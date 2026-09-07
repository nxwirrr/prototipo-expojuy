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

## Content Collections (Bloque 2)

- **Astro 7 usa `src/content.config.ts`** (Content Layer API), no la carpeta
  `src/content/config.ts` de versiones viejas de Astro. Los datos
  estructurados (rubros, expositores, agenda, sponsors, FAQ, audiencias)
  viven en `src/data/*.json` y se cargan con el loader `file()`; las
  noticias son la única colección en Markdown (`src/content/noticias/*.md`),
  porque son el único contenido con cuerpo de texto largo — el campo
  `cuerpo` del pliego se resuelve como el body del Markdown (`render()`),
  no como un campo de esquema más.
- El loader `file()` de Astro exige un campo `id` único por entrada (no
  existe una opción `idColumn` en esta versión). En `audiencias.json` se
  agregó `id` con el mismo valor que `slug` para no perder el nombre de
  campo que pide el pliego.
- **Colores de rubro:** los 8 rubros ciclan entre los cuatro colores
  institucionales que sí pueden llevar texto/ícono encima sin romper
  contraste (turquesa, violeta, púrpura, lila — ver la sección de color más
  arriba), en vez de inventar una paleta secundaria. Prioriza la identidad
  institucional por sobre tener 8 colores distintos; cada rubro además tiene
  ícono y nombre propios para diferenciarse.
- **Sectores del predio = letra de rubro:** cada uno de los 8 rubros tiene
  asignada una letra (A a H, en el orden de `rubros.json`) y el campo
  `sector` de cada expositor combina esa letra con un número
  (`A-01`, `A-02`, …). Es a propósito: así el mapa interactivo del predio
  (Bloque 5) puede cruzar sector → rubro → expositores con una sola regla,
  sin tabla de mapeo adicional.
- **Sin logos ni fotos de expositores/sponsors/noticias.** El pliego prohíbe
  hacer pasar contenido de demostración por real; una foto o isologo
  genérico bajado de un banco de imágenes podría leerse como el logo real de
  alguna empresa existente. En cambio, expositores y sponsors muestran una
  placa con sus iniciales en el color de su rubro/nivel (mismo lenguaje de
  bloques del isologo), y las noticias muestran un gráfico abstracto
  generado en vez de una foto de stock. El campo `logo`/`imagen` queda en el
  esquema como opcional, previsto para cuando haya assets reales.
- **Agenda en 3 de las 4 jornadas (9, 10 y 12 de octubre):** el pliego pide
  "12 actividades en 3 días". Para que el acto de apertura y el de cierre
  sigan cayendo en el primer y el último día real del evento, se dejó el 11
  de octubre como jornada de piso de exposición sin actividades programadas
  en la agenda central, en vez de comprimir apertura/cierre en 3 días
  consecutivos que no incluyen el cierre real del evento.
- Nombres ficticios siguiendo el patrón pedido: `Empresa Demo 01`–`24`,
  `Sponsor Demo 01`–`10`, `Orador Demo 01`–`08`. Los rubros, países, agenda y
  FAQ usan contenido genérico verosímil (sin nombres propios reales) para
  que el jurado los identifique de un vistazo como datos de muestra.

## Home (Bloque 3)

- **Once secciones, cada una con un tratamiento visual distinto** (hero,
  franja numérica, tira de tarjetas de color, timeline de agenda, grilla de
  rubros, banner del mapa, lista editorial de noticias, filas de sponsors
  por tamaño, acordeón de FAQ) para no caer en "tarjetas idénticas con
  sombra" en una página tan larga.
- **El único elemento curvo de la home** es el semicírculo del gráfico del
  hero (`Hero.astro`), construido con los mismos bloques + semicírculo del
  isologo. El resto de la página es completamente recta a propósito.
- **Cuenta regresiva:** se calcula un valor en el build (días restantes) que
  queda como contenido real sin JavaScript, y un script la mejora a
  días/horas/minutos/segundos en vivo. Sin JS el visitante igual ve un
  número de días correcto (o cercano, según cuándo se generó el build), no
  un cero ni un hueco vacío.
- **Buscador de expositores en la home = teaser, no el buscador completo.**
  Es un `<form method="get" action="/expositores">` con un input de texto y
  la grilla de los 8 rubros como enlaces (`?rubro=id`). Funciona sin JS
  (navegación normal), y el buscador completo con filtros combinables vive
  en `/expositores` (Bloque 4), que va a leer esos parámetros de la URL.
- **Mapa del predio en la home = banner con enlace**, no el mapa interactivo
  real (ese vive solo en `/predio`, Bloque 5). Repetir la interactividad
  completa en la home hubiera duplicado peso y lógica sin agregar valor.

### Dos bugs reales encontrados al revisar en el navegador

- **`.boton--secundario` era invisible sobre fondo oscuro.** Había una regla
  `body:not(.superficie-oscura) .boton--secundario { color: var(--color-titulo) }`
  pensada para "si NO estoy en una superficie oscura, uso texto oscuro". El
  problema: `.superficie-oscura` nunca se aplica a `<body>`, se aplica a
  secciones sueltas (header, hero, footer) — así que la condición
  `body:not(.superficie-oscura)` es siempre verdadera, sin importar en qué
  sección esté el botón. Resultado: el botón "Ser expositor" del hero
  mostraba texto casi negro sobre fondo casi negro. Se sacó esa regla y se
  dejó que `color: inherit` haga el trabajo (hereda blanco dentro de
  `.superficie-oscura`, gris de texto fuera de ella).
- **`getCollection()` con el loader `file()` no conserva el orden del JSON:**
  lo devuelve ordenado alfabéticamente por `id`. Esto reordenaba las cuatro
  audiencias de la home (Empresas, Expositores, Prensa, Visitantes en vez de
  Visitantes, Expositores, Empresas, Prensa) y hubiera hecho lo mismo con
  cualquier lista que dependa de una secuencia específica. Se corrigió
  reordenando a mano en `AccesoAudiencias.astro`, y se dejó
  `src/utils/rubros.ts` con la tabla explícita de letra de sector por rubro
  para que el mapa del predio (Bloque 5) no repita el mismo error asumiendo
  que la posición en el array define la letra.
- **Corrimiento de un día en las fechas.** `dia`/`fecha` se guardan como
  `"YYYY-MM-DD"` y Zod las parsea como medianoche UTC. Formatearlas con
  `Intl.DateTimeFormat` sin fijar `timeZone` usa la hora local de quien
  compila o visita el sitio; en cualquier huso detrás de UTC (incluido
  Argentina) esa medianoche cae la noche anterior, así que el 9 de octubre
  se mostraba como "8 Oct". `src/utils/fecha.ts` fuerza `timeZone: 'UTC'` en
  todos los formateadores de fecha para que el calendario mostrado sea
  siempre el que se escribió en los datos, sin importar dónde se mire el
  sitio.
- **Íconos de rubro:** son un set propio de line-icons simples (trazo 2px),
  no el motivo de bloques de la marca. A propósito: tienen que ser
  reconocibles de un vistazo para filtrar rápido, y el pliego pide reservar
  el motivo modular para un solo protagonismo por pantalla en vez de
  aplicarlo a todo.

## Pendiente / a confirmar antes de la entrega

- `astro.config.mjs` tiene `site`/`base` con placeholders (`<usuario>/<repo>`):
  hay que completarlos con el repositorio real de GitHub Pages antes del
  deploy (ver README).
- Los enlaces de redes sociales en el footer se muestran como diseño (íconos
  + nombre) sin URL real, porque no hay cuentas oficiales confirmadas: no se
  quiso inventar enlaces que aparenten ser reales.
