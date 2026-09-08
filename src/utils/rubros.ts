/**
 * Letra de sector del predio para cada rubro (ver DECISIONES.md, Bloque 2).
 * Fijo a propósito, NO derivado de getCollection('rubros'): ese loader no
 * conserva el orden del JSON (lo devuelve ordenado por id), así que asumir
 * "la letra es la posición en el array" da resultados incorrectos. El mapa
 * del predio (Bloque 5) tiene que usar esta tabla, no el índice del array.
 */
export const LETRA_SECTOR_POR_RUBRO: Record<string, string> = {
  mineria: 'A',
  agroindustria: 'B',
  energia: 'C',
  tecnologia: 'D',
  turismo: 'E',
  textil: 'F',
  logistica: 'G',
  servicios: 'H',
};

/** Orden fijo A→H de rubros, derivado de la tabla de arriba (no del array de la colección). */
export const ORDEN_RUBROS_POR_SECTOR = Object.entries(LETRA_SECTOR_POR_RUBRO)
  .sort((a, b) => a[1].localeCompare(b[1]))
  .map(([rubroId]) => rubroId);

export const RUBRO_POR_LETRA_SECTOR: Record<string, string> = Object.fromEntries(
  Object.entries(LETRA_SECTOR_POR_RUBRO).map(([rubroId, letra]) => [letra, rubroId])
);
