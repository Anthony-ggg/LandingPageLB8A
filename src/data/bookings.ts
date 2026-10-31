import type { DateParts, TimeSlot } from '../types/index';
import {
  createMadridInstant,
  generateMadridDays,
  getDateParts,
} from '../lib/timeUtils';

/**
 * Genera horarios ficticios distribuidos en varios días (hora de pared en Madrid).
 * Estos horarios son solo una demostración y no representan disponibilidad real.
 */
const MADRID_HOURS = [9, 11, 14, 16, 18];
const MINUTES = 0;

export function generateMockSlots(): TimeSlot[] {
  const days = generateMadridDays(10);
  const slots: TimeSlot[] = [];
  let id = 0;

  days.forEach((dayParts, dayIndex) => {
    // Un día "bloqueado" cada cierto intervalo para demostrar estados ocupados
    const blockedDay = dayIndex % 4 === 2;

    MADRID_HOURS.forEach((hour) => {
      const start = createMadridInstant(
        dayParts.year,
        dayParts.month,
        dayParts.day,
        hour,
        MINUTES
      );
      const end = new Date(start.getTime() + 60 * 60 * 1000);

      const occupied = blockedDay && hour === 14;

      slots.push({
        id: `slot-${++id}`,
        start: start.toISOString(),
        end: end.toISOString(),
        status: occupied ? 'occupied' : 'available',
        serviceId: 'refuerzo-escolar',
        title: 'Tutoría individual',
      });
    });
  });

  return slots;
}

export const MOCK_SLOTS = generateMockSlots();

/** Devuelve los slots cuyo instante cae en la fecha de Madrid indicada. */
export function getSlotsForMadridDate(
  slots: TimeSlot[],
  dateParts: DateParts
): TimeSlot[] {
  return slots.filter((slot) => {
    const instant = new Date(slot.start);
    const parts = getDateParts(instant, 'Europe/Madrid');
    return (
      parts.year === dateParts.year &&
      parts.month === dateParts.month &&
      parts.day === dateParts.day
    );
  });
}
