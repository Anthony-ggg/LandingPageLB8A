import { useCallback, useMemo, useState } from 'react';
import {
  Calendar as CalendarIcon,
  Clock,
  Globe as GlobeIcon,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
} from 'lucide-react';
import { MOCK_SLOTS, getSlotsForMadridDate } from '@/data/bookings';
import { MADRID_TZ, detectTimezone, getDateParts, formatTime, formatDateTime, sameCalendarDay } from '@/lib/timeUtils';
import { TIMEZONE_OPTIONS } from '@/types/index';
import { Button } from '@/components/ui/Button';
import { SectionContainer, SectionHeader } from '@/components/layout/SectionContainer';
import type { TimeSlot, DateParts } from '@/types/index';

const DAYS_VISIBLE = 7;

export interface CalendarProps {
  onSlotSelect: (slot: TimeSlot) => void;
  timezone: string;
  onTimezoneChange: (tz: string) => void;
}

export function Calendar({
  onSlotSelect,
  timezone,
  onTimezoneChange,
}: CalendarProps) {
  const [dayWindowStart, setDayWindowStart] = useState<DateParts>(() =>
    getDateParts(new Date(), MADRID_TZ)
  );
  const [selectedDate, setSelectedDate] = useState<DateParts>(() =>
    getDateParts(new Date(), MADRID_TZ)
  );
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);

  const tzOption = TIMEZONE_OPTIONS.find((tz) => tz.value === timezone);

  const visibleDays = useMemo(() => {
    let parts = dayWindowStart;
    const days: DateParts[] = [];
    for (let i = 0; i < DAYS_VISIBLE; i++) {
      days.push(parts);
      parts = {
        ...parts,
        day: parts.day + 1,
      };
      const tmp = new Date(
        Date.UTC(parts.year, parts.month - 1, parts.day, 12, 0, 0)
      );
      parts = getDateParts(tmp, MADRID_TZ);
    }
    return days;
  }, [dayWindowStart]);

  const slotsForSelectedDate = useMemo(() => {
    return getSlotsForMadridDate(MOCK_SLOTS, selectedDate).sort(
      (a, b) => new Date(a.start).getTime() - new Date(b.start).getTime()
    );
  }, [selectedDate]);

  const isToday = useCallback(
    (parts: DateParts) => {
      const today = getDateParts(new Date(), MADRID_TZ);
      return sameCalendarDay(parts, today);
    },
    []
  );

  const isSelectedDay = useCallback(
    (parts: DateParts) => sameCalendarDay(parts, selectedDate),
    [selectedDate]
  );

  const goToOffset = useCallback((offsetDays: number) => {
    setDayWindowStart((prev) => {
      const tmp = new Date(
        Date.UTC(prev.year, prev.month - 1, prev.day + offsetDays, 12, 0, 0)
      );
      return getDateParts(tmp, MADRID_TZ);
    });
  }, []);

  const selectDay = useCallback((parts: DateParts) => {
    setSelectedDate(parts);
    setSelectedSlot(null);
  }, []);

  const selectSlot = useCallback((slot: TimeSlot) => {
    setSelectedSlot(slot);
    onSlotSelect(slot);
  }, [onSlotSelect]);

  const handleContinue = useCallback(() => {
    if (!selectedSlot) return;
    onSlotSelect(selectedSlot);
  }, [selectedSlot, onSlotSelect]);

  const instant = selectedSlot ? new Date(selectedSlot.start) : null;
  const madridTime = instant ? formatTime(instant, MADRID_TZ) : '--:--';
  const localTime = instant ? formatTime(instant, timezone) : '--:--';
  const localDateStr = instant ? formatDateTime(instant, timezone) : '';
  const dateChanged = instant
    ? !sameCalendarDay(
        getDateParts(instant, MADRID_TZ),
        getDateParts(instant, timezone)
      )
    : false;

  return (
    <section id="horarios" className="bg-white">
      <SectionContainer>
        <SectionHeader
          title="Horarios disponibles"
          description={
            'Jossbell vive en España (Madrid). Los horarios se convierten automáticamente a tu zona horaria.'
          }
        />

        {/* Zona horaria */}
        <div className="flex flex-col md:flex-row gap-4 items-end mb-8">
          <div className="flex-1">
            <label className="block text-xs font-semibold text-[#8E6B73] uppercase tracking-wider mb-2">
              Tu zona horaria
            </label>
            <select
              value={timezone}
              onChange={(e) => onTimezoneChange(e.target.value as string)}
              className="w-full rounded-md border border-[#F0E2DE] bg-white px-3 py-2.5 text-sm text-[#4A2E35] focus:outline-none focus:ring-2 focus:ring-[#C5A059] focus:border-transparent"
            >
              {TIMEZONE_OPTIONS.map((tz: { value: string; label: string }) => (
                <option key={tz.value} value={tz.value}>
                  {tz.label}
                </option>
              ))}
            </select>
          </div>
          <button
            type="button"
            onClick={() => onTimezoneChange(detectTimezone())}
            className="px-4 py-2.5 rounded-md border border-[#F0E2DE] bg-white text-sm text-[#4A2E35] shadow-sm hover:bg-[#FDF2F0] transition-colors"
          >
            Usar mi zona actual
          </button>
        </div>

        {/* Navegación de días */}
        <div className="flex items-center justify-between mb-2">
          <button
            type="button"
            onClick={() => goToOffset(-7)}
            className="rounded-md p-2 text-[#8E6B73] hover:text-[#C5A059] hover:bg-[#FDF2F0] transition-colors"
            aria-label="Semana anterior"
          >
            <ChevronLeft size={18} />
          </button>
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {visibleDays.map((day) => {
              const isSel = isSelectedDay(day);
              const today = isToday(day);
              const daySlots = getSlotsForMadridDate(MOCK_SLOTS, day);
              const hasAvailable = daySlots.some((s) => s.status === 'available');
              return (
                <button
                  key={`${day.year}-${day.month}-${day.day}`}
                  type="button"
                  onClick={() => selectDay(day)}
                  className={`flex flex-col items-center gap-1 rounded-lg border px-3 py-3 text-sm transition-all ${
                    isSel
                      ? 'border-[#C5A059] bg-[#C5A059] text-white'
                      : today
                      ? 'border-[#F0E2DE] bg-[#FDF2F0] text-[#4A2E35] font-medium ring-1 ring-[#C5A059]'
                      : `border-[#F0E2DE] bg-white text-[#8E6B73] hover:border-[#C5A059] hover:bg-[#FDF2F0] ${
                          !hasAvailable ? 'opacity-50 cursor-not-allowed' : ''
                        }`
                  }`}
                  disabled={!hasAvailable}
                >
                  <span className={cnDay(today, isSel)}>{day.weekday.slice(0, 2)}</span>
                  <span className={cnNum(today, isSel)}>{day.day}</span>
                  <span className={cnSmall(today, isSel)}>{`${String(day.month).padStart(2,'0')}/${String(day.day).padStart(2,'0')}`}</span>
                </button>
              );
            })}
          </div>
          <button
            type="button"
            onClick={() => goToOffset(7)}
            className="rounded-md p-2 text-[#8E6B73] hover:text-[#C5A059] hover:bg-[#FDF2F0] transition-colors"
            aria-label="Semana siguiente"
          >
            <ChevronRight size={18} />
          </button>
        </div>

        {/* Horarios del día seleccionado */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
            <div>
              <p className="text-sm font-semibold text-[#4A2E35]">
                {selectedDate.weekday}, {String(selectedDate.day).padStart(2,'0')}/{String(selectedDate.month).padStart(2,'0')}
              </p>
              <p className="text-xs text-[#8E6B73]">Hora de Jossbell · Madrid</p>
            </div>
            <div className="flex gap-3">
              <div className="hidden md:flex flex-col items-end">
                <span className="text-xs font-semibold text-[#C5A059]">Madrid</span>
                <span className="text-sm text-[#4A2E35]">{madridTime}</span>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-xs font-semibold text-[#8E6B73]">
                  {tzOption?.city || timezone}
                </span>
                <span className="text-sm text-[#4A2E35]">{localTime}</span>
              </div>
            </div>
          </div>

          {slotsForSelectedDate.length === 0 ? (
            <div className="rounded-xl border border-dashed border-[#F0E2DE] bg-[#FDF2F0] p-10 text-center">
              <CalendarIcon size={32} className="mx-auto mb-3 text-[#C9B7BD]" />
              <p className="text-sm text-[#8E6B73]">
                No hay horarios disponibles para esta fecha. Prueba otro día.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {slotsForSelectedDate.map((slot) => {
                const start = new Date(slot.start);
                const startParts = getDateParts(start, MADRID_TZ);
                const isOccupied = slot.status === 'occupied';
                const isSel = selectedSlot?.id === slot.id;
                return (
                  <button
                    key={slot.id}
                    type="button"
                    disabled={isOccupied}
                    onClick={() => (isOccupied ? undefined : selectSlot(slot))}
                    className={`flex flex-col items-center justify-center gap-2 rounded-xl border px-4 py-4 text-sm transition-all ${
                      isSel
                        ? 'border-[#C5A059] bg-[#C5A059] text-white shadow-md'
                        : isOccupied
                        ? 'border-[#F0E2DE] bg-[#FDF2F0] text-[#C9B7BD] cursor-not-allowed'
                        : 'border-[#F0E2DE] bg-white text-[#4A2E35] hover:border-[#C5A059] hover:bg-[#FDF2F0] hover:text-[#C5A059] active:bg-[#F3E8D9]'
                    }`}
                  >
                    {isSel ? (
                      <CheckCircle2 size={16} className="mb-1" />
                    ) : (
                      <Clock size={16} className="mb-1" />
                    )}
                    <span className="font-medium">
                      {startParts.hour}:{String(startParts.minute).padStart(2, '0')}
                    </span>
                    {isOccupied && (
                      <span className="text-[10px] uppercase tracking-wider">Ocupado</span>
                    )}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Resumen del horario seleccionado */}
        {selectedSlot && instant && (
          <div className="rounded-xl border border-[#F0E2DE] bg-white p-6 shadow-sm mb-8">
            <div className="flex items-start gap-3 mb-4">
              <CheckCircle2 size={20} className="text-[#C5A059] flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-[#4A2E35]">Horario seleccionado</p>
                <p className="text-sm text-[#8E6B73]">
                  {formatDateTime(instant, MADRID_TZ)} (Madrid)
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <GlobeIcon size={20} className="text-[#8E6B73] flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-[#4A2E35]">Tu hora local</p>
                <p className="text-sm text-[#8E6B73]">
                  {localDateStr}{dateChanged ? ' (día local distinto)' : ''}
                </p>
              </div>
            </div>
            <p className="mt-4 text-xs text-[#C9B7BD]">
              Estos horarios son ficticios y solo forman parte del prototipo de demostración.
            </p>
          </div>
        )}

        <div className="flex justify-end">
          <Button
            type="button"
            variant="brand"
            disabled={!selectedSlot}
            onClick={handleContinue}
          >
            Continuar con la reserva
          </Button>
        </div>
      </SectionContainer>
    </section>
  );
}

function cnDay(today: boolean, sel: boolean): string {
  let base = 'text-xs font-medium';
  if (sel) base += ' text-white';
  else if (today) base += ' text-[#C5A059]';
  else base += ' text-[#8E6B73]';
  return base;
}

function cnNum(today: boolean, sel: boolean): string {
  let base = 'text-lg font-bold';
  if (sel) base += ' text-white';
  else if (today) base += ' text-[#C5A059]';
  else base += ' text-[#4A2E35]';
  return base;
}

function cnSmall(today: boolean, sel: boolean): string {
  let base = 'text-[10px] uppercase tracking-wider';
  if (sel) base += ' text-white/80';
  else if (today) base += ' text-[#C5A059]';
  else base += ' text-[#C9B7BD]';
  return base;
}
