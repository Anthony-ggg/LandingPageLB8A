import { type DateParts, type TimezoneOption } from '../types/index';
import { TIMEZONE_OPTIONS } from '../types/index';

/** Zona horaria principal de Jossbell (España). */
export const MADRID_TZ = 'Europe/Madrid';

/** Detecta la zona horaria del navegador. */
export function detectTimezone(): string {
  return typeof Intl !== 'undefined'
    ? Intl.DateTimeFormat().resolvedOptions().timeZone
    : MADRID_TZ;
}

/** Devuelve las partes de fecha/hora de un instante expresado en una zona horaria. */
export function getDateParts(date: Date, timeZone: string): DateParts {
  const fmt = new Intl.DateTimeFormat('es-ES', {
    timeZone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    weekday: 'long',
    hour12: false,
  });

  const parts = fmt.formatToParts(date);
  const get = (name: string): string => parts.find((p) => p.type === name)?.value ?? '';

  return {
    year: parseInt(get('year'), 10),
    month: parseInt(get('month'), 10),
    day: parseInt(get('day'), 10),
    hour: parseInt(get('hour'), 10),
    minute: parseInt(get('minute'), 10),
    weekday: get('weekday'),
    monthName: get('month'),
  };
}

/** Formatea solo la hora en una zona horaria dada. */
export function formatTime(date: Date, timeZone: string): string {
  return new Intl.DateTimeFormat('es-ES', {
    timeZone,
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).format(date);
}

/** Formatea fecha y hora completa en una zona horaria dada. */
export function formatDateTime(date: Date, timeZone: string): string {
  return new Intl.DateTimeFormat('es-ES', {
    timeZone,
    weekday: 'long',
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).format(date);
}

/** Compara si dos DateParts representan el mismo día calendario. */
export function sameCalendarDay(a: DateParts, b: DateParts): boolean {
  return a.year === b.year && a.month === b.month && a.day === b.day;
}

/**
 * Construye un instante (Date) cuya hora de pared en Europa/Madrid coincida
 * con la fecha y hora indicadas. Usa mediodía UTC como referencia para evitar
 * problemas de cambio de hora (verano/invierno), ya que mediodía UTC pertenece
 * siempre al mismo día calendario en Madrid.
 */
export function createMadridInstant(
  year: number,
  month: number,
  day: number,
  hour: number,
  minute = 0
): Date {
  const ref = new Date(Date.UTC(year, month - 1, day, 12, 0, 0));
  const refParts = getDateParts(ref, MADRID_TZ);
  const diffMinutes = hour * 60 + minute - (refParts.hour * 60 + refParts.minute);
  return new Date(ref.getTime() + diffMinutes * 60000);
}

/** Partes de fecha "hoy" en la zona horaria de Madrid. */
export function getMadridToday(): DateParts {
  return getDateParts(new Date(), MADRID_TZ);
}

/** Desplaza N días una fecha de Madrid (partes) manteniendo el calendario de Madrid. */
export function madridDateOffset(base: DateParts, offsetDays: number): DateParts {
  const utcNoon = Date.UTC(base.year, base.month - 1, base.day, 12, 0, 0);
  const shifted = new Date(utcNoon + offsetDays * 86400000);
  return getDateParts(shifted, MADRID_TZ);
}

/** Genera una lista de días a partir de hoy en Madrid. */
export function generateMadridDays(count: number): DateParts[] {
  const today = getMadridToday();
  return Array.from({ length: count }, (_, i) => madridDateOffset(today, i));
}

export function findTimezoneOption(value: string): TimezoneOption | undefined {
  return TIMEZONE_OPTIONS.find((tz) => tz.value === value);
}

export default {
  detectTimezone,
  getDateParts,
  formatTime,
  formatDateTime,
  sameCalendarDay,
  createMadridInstant,
  getMadridToday,
  madridDateOffset,
  generateMadridDays,
  findTimezoneOption,
  TIMEZONE_OPTIONS,
  MADRID_TZ,
};
