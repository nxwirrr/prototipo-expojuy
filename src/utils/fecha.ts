// Las fechas de agenda/noticias se guardan como "YYYY-MM-DD" (sin hora) y
// Zod las parsea como medianoche UTC. Esa medianoche UTC, en el huso de
// Argentina (UTC-3), cae la noche anterior — si se formatea con el huso de
// Buenos Aires (o el del navegador de quien visita) el 9 de octubre se
// muestra como 8. Como el dato ya nació en UTC con el día correcto, se
// formatea también en UTC: así el calendario que se ve es siempre el que
// se escribió en el JSON/frontmatter, sin importar dónde esté quien mira
// el sitio ni la hora del server que hizo el build.
const HUSO_EVENTO = 'UTC';

const formateadorDia = new Intl.DateTimeFormat('es-AR', {
  weekday: 'long',
  day: 'numeric',
  month: 'long',
  timeZone: HUSO_EVENTO,
});

const formateadorDiaCorto = new Intl.DateTimeFormat('es-AR', {
  day: 'numeric',
  month: 'short',
  timeZone: HUSO_EVENTO,
});

export const formateadorFechaLarga = new Intl.DateTimeFormat('es-AR', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  timeZone: HUSO_EVENTO,
});

export function formatearDia(fecha: Date): string {
  const texto = formateadorDia.format(fecha);
  return texto.charAt(0).toUpperCase() + texto.slice(1);
}

export function formatearDiaCorto(fecha: Date): string {
  return formateadorDiaCorto.format(fecha).replace('.', '');
}

/** Clave YYYY-MM-DD estable para agrupar por día sin líos de huso horario. */
export function claveDia(fecha: Date): string {
  return fecha.toISOString().slice(0, 10);
}
