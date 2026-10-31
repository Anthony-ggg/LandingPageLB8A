import { useState, useCallback } from 'react';
import { Clock as ClockIcon, Globe as GlobeIcon, AlertCircle } from 'lucide-react';
import { SERVICES } from '@/data/services';
import {
  formatDateTime,
  getDateParts,
  sameCalendarDay,
} from '@/lib/timeUtils';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Modal } from '@/components/ui/Modal';
import type { TimeSlot } from '@/types/index';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  slot: TimeSlot | null;
  timezone: string;
  onConfirm: (data: {
    fullName: string;
    email: string;
    serviceId: string;
    serviceName: string;
    message: string;
    slot: TimeSlot;
    madridDateTime: string;
    localDateTime: string;
  }) => void;
}

export function BookingModal({
  isOpen,
  onClose,
  slot,
  timezone,
  onConfirm,
}: BookingModalProps) {
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    serviceId: slot?.serviceId || '',
    message: '',
  });
  const [errors, setErrors] = useState<{ fullName?: string; email?: string }>({});
  const [submitting, setSubmitting] = useState(false);

  const service = SERVICES.find((s) => s.id === form.serviceId) || SERVICES[0];

  const validate = useCallback((): boolean => {
    const next: { fullName?: string; email?: string } = {};
    if (!form.fullName.trim()) next.fullName = 'El nombre completo es obligatorio.';
    if (!form.email.trim()) next.email = 'El correo electrónico es obligatorio.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      next.email = 'El formato del correo no es válido.';
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  }, [form]);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (!slot) return;
      if (!validate()) return;
      setSubmitting(true);
      setTimeout(() => {
        setSubmitting(false);
        const instant = new Date(slot.start);
        const madrid = formatDateTime(instant, 'Europe/Madrid');
        const local = formatDateTime(instant, timezone);
        onConfirm({
          fullName: form.fullName.trim(),
          email: form.email.trim(),
          serviceId: form.serviceId,
          serviceName: service.name,
          message: form.message.trim(),
          slot,
          madridDateTime: madrid,
          localDateTime: local,
        });
      }, 800);
    },
    [slot, timezone, form, service, validate, onConfirm]
  );

  const handleChange = useCallback(
    (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      setForm((prev) => ({ ...prev, [k]: e.target.value }));
      if (errors[k as keyof typeof errors]) {
        setErrors((prev) => ({ ...prev, [k]: undefined }));
      }
    },
    [errors]
  );

  if (!slot) return null;

  const instant = new Date(slot.start);
  const dateChanged = !sameCalendarDay(
    getDateParts(instant, 'Europe/Madrid'),
    getDateParts(instant, timezone)
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Reservar tutoría">
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid md:grid-cols-2 gap-4">
          <Input
            label="Nombre completo"
            id="fullName"
            value={form.fullName}
            onChange={handleChange('fullName')}
            error={errors.fullName}
            placeholder="Juan Pérez"
            required
          />
          <Input
            label="Correo electrónico"
            id="email"
            type="email"
            value={form.email}
            onChange={handleChange('email')}
            error={errors.email}
            placeholder="correo@ejemplo.com"
            required
          />
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <select
            id="serviceId"
            value={form.serviceId}
            onChange={handleChange('serviceId')}
            className="flex h-10 w-full rounded-md border border-[#F0E2DE] bg-white px-3 py-2 text-sm text-[#4A2E35] focus:outline-none focus:ring-2 focus:ring-[#C5A059] focus:border-transparent disabled:opacity-50"
          >
            {SERVICES.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>
          <Input
            label="Duración"
            id="duration"
            value={service.duration}
            readOnly
          />
        </div>

        <div className="w-full">
          <label htmlFor="message" className="block text-sm font-medium text-[#4A2E35] mb-1.5">
            Mensaje opcional
          </label>
          <textarea
            id="message"
            className="flex h-20 w-full rounded-md border border-[#F0E2DE] bg-white px-3 py-2 text-sm text-[#4A2E35] focus:outline-none focus:ring-2 focus:ring-[#C5A059] focus:border-transparent"
            value={form.message}
            onChange={handleChange('message')}
            rows={3}
            placeholder="Cuéntame qué necesitas repasar..."
          />
        </div>

        <div className="pt-4 rounded-xl border border-[#F0E2DE] bg-[#FDF2F0] p-5">
          <div className="flex items-start gap-3">
            <ClockIcon size={18} className="text-[#C5A059] mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-[#4A2E35]">Fecha y hora (Madrid)</p>
              <p className="text-sm text-[#8E6B73]">{slot.title}</p>
              <p className="text-sm text-[#8E6B73]">{formatDateTime(instant, 'Europe/Madrid')}</p>
            </div>
          </div>
          <div className="flex items-start gap-3 mt-3">
            <GlobeIcon size={18} className="text-[#8E6B73] mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-[#4A2E35]">Tu hora local</p>
              <p className="text-sm text-[#8E6B73]">
                {formatDateTime(instant, timezone)}
                {dateChanged ? ' (fecha local distinta)' : ''}
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-start gap-2 text-xs text-[#C9B7BD] mt-4">
          <AlertCircle size={14} className="mt-1.5" />
          <p>
            Este es un prototipo de demostración. Al enviar, la solicitud no
            genera una reserva real ni se almacenan datos en un servidor.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-6">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 px-4 py-2.5 rounded-md border border-[#F0E2DE] bg-white text-[#4A2E35] text-sm font-medium hover:bg-[#FDF2F0] transition-colors"
          >
            Volver al calendario
          </button>
          <Button type="submit" variant="brand" disabled={submitting}>
            {submitting ? 'Procesando...' : 'Solicitar tutoría'}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
