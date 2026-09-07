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
