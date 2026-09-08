import type { CollectionEntry } from 'astro:content';

export interface RuedaDeNegocios {
  dia: Date;
  horarioInicio: string;
  horarioFin: string;
}

/**
 * Cruza la agenda con los rubros: para cada rubro que participa de una
 * actividad tipo 'rueda-de-negocios', arma la fecha/horario a mostrar en la
 * tarjeta y la ficha de sus expositores. No todos los rubros tienen una
 * rueda programada (ver DECISIONES.md) — esos quedan sin entrada en el mapa.
 */
export function mapearRuedasDeNegociosPorRubro(
  agenda: CollectionEntry<'agenda'>[]
): Record<string, RuedaDeNegocios> {
  const mapa: Record<string, RuedaDeNegocios> = {};

  for (const actividad of agenda) {
    if (actividad.data.tipo !== 'rueda-de-negocios') continue;
    for (const rubroId of actividad.data.rubros ?? []) {
      mapa[rubroId] = {
        dia: actividad.data.dia,
        horarioInicio: actividad.data.horarioInicio,
        horarioFin: actividad.data.horarioFin,
      };
    }
  }

  return mapa;
}
