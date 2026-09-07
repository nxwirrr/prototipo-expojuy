import { defineCollection, z } from 'astro:content';
import { file, glob } from 'astro/loaders';

// Los 4 colores institucionales que sí pueden llevar texto/ícono encima sin
// romper contraste (ver src/styles/tokens.css). Se ciclan entre los 8
// rubros para no salirse de la paleta de marca.
const colorRubro = z.enum(['turquesa', 'violeta', 'purpura', 'lila']);

const rubros = defineCollection({
  loader: file('src/data/rubros.json'),
  schema: z.object({
    id: z.string(),
    nombre: z.string(),
    icono: z.string(),
    color: colorRubro,
  }),
});

const expositores = defineCollection({
  loader: file('src/data/expositores.json'),
  schema: z.object({
    id: z.string(),
    nombre: z.string(),
    rubro: z.string(),
    pais: z.string(),
    sector: z.string(),
    descripcionBreve: z.string(),
    web: z.url().optional(),
    logo: z.string().optional(),
  }),
});

const agenda = defineCollection({
  loader: file('src/data/agenda.json'),
  schema: z.object({
    id: z.string(),
    titulo: z.string(),
    dia: z.coerce.date(),
    horarioInicio: z.string(),
    horarioFin: z.string(),
    espacio: z.string(),
    tipo: z.enum(['apertura', 'panel', 'charla', 'taller', 'rueda-de-negocios', 'networking', 'cierre']),
    orador: z.string().optional(),
  }),
});

const sponsors = defineCollection({
  loader: file('src/data/sponsors.json'),
  schema: z.object({
    id: z.string(),
    nombre: z.string(),
    nivel: z.enum(['Platino', 'Oro', 'Plata', 'Bronce']),
    web: z.url().optional(),
  }),
});

const faq = defineCollection({
  loader: file('src/data/faq.json'),
  schema: z.object({
    id: z.string(),
    pregunta: z.string(),
    respuesta: z.string(),
  }),
});

const audiencias = defineCollection({
  // El loader `file()` requiere un campo `id` único por entrada; se usa el
  // mismo valor que `slug` (ver src/data/audiencias.json).
  loader: file('src/data/audiencias.json'),
  schema: z.object({
    id: z.string(),
    slug: z.string(),
    titular: z.string(),
    bajada: z.string(),
    accesos: z.array(
      z.object({
        titulo: z.string(),
        descripcion: z.string(),
        href: z.string(),
      })
    ),
    cta: z.object({
      texto: z.string(),
      href: z.string(),
    }),
  }),
});

const noticias = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/noticias' }),
  schema: z.object({
    titulo: z.string(),
    fecha: z.coerce.date(),
    bajada: z.string(),
    imagen: z.string().optional(),
  }),
});

export const collections = {
  rubros,
  expositores,
  agenda,
  sponsors,
  faq,
  audiencias,
  noticias,
};
