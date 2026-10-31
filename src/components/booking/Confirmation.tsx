import { CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';

type IconProps = React.SVGProps<SVGSVGElement> & { size?: number | string };

interface ConfirmationProps {
  data: {
    fullName: string;
    email: string;
    serviceName: string;
    message: string;
    madridDateTime: string;
    localDateTime: string;
  };
  onBackToCalendar: () => void;
  onRestart: () => void;
}

export function Confirmation({
  data,
  onBackToCalendar,
  onRestart,
}: ConfirmationProps) {
  return (
    <div className="max-w-md mx-auto">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#F3E8D9] text-[#C5A059] mb-6 mx-auto">
        <CheckCircle2 size="28" />
      </div>
      <h2 className="text-2xl font-bold text-[#4A2E35] text-center mb-2">
        Solicitud recibida (demo)
      </h2>
      <p className="text-[#8E6B73] text-center mb-8">
        Hemos recibido tu solicitud de tutoría. Esta es una confirmación de
        demostración; no se genera una reserva real.
      </p>

      <div className="rounded-xl border border-[#F0E2DE] bg-white p-6 shadow-sm mb-8 space-y-4">
        <Row icon={<ClockAsIcon size="20" />} label="Estudiante" value={data.fullName} />
        <Row icon={<ClockAsIcon size="20" className="text-[#8E6B73]" />} label="Correo" value={data.email} />
        <Row icon={<GlobeAsIcon size="20" />} label="Tipo de tutoría" value={data.serviceName} />
        <Row icon={<CalendarAsIcon size="20" className="text-[#8E6B73]" />} label="Fecha y hora (Madrid)" value={data.madridDateTime} />
        <Row icon={<LocalAsIcon size="20" className="text-[#8E6B73]" />} label="Tu hora local" value={data.localDateTime} />
        {data.message && (
          <div>
            <p className="text-sm font-semibold text-[#4A2E35]">Mensaje</p>
            <p className="text-sm text-[#8E6B73]">{data.message}</p>
          </div>
        )}
      </div>

      <div className="flex items-start gap-2 text-xs text-[#C9B7BD] mb-8">
        <AlertAsIcon size="14" className="mt-1.5" />
        <p>
          Los datos solo se mantienen en la memoria del navegador durante esta
          sesión y no se envían a ningún servidor.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-3">
        <Button
          type="button"
          variant="outline"
          onClick={onBackToCalendar}
          className="w-full"
        >
          Consultar otros horarios
        </Button>
        <Button variant="brand" onClick={onRestart} className="w-full">
          Volver al inicio
        </Button>
      </div>
    </div>
  );
}

function Row({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-start gap-3">
      <div className="flex items-center mt-0.5">{icon}</div>
      <div>
        <p className="text-sm font-semibold text-[#4A2E35]">{label}</p>
        <p className="text-sm text-[#8E6B73]">{value}</p>
      </div>
    </div>
  );
}

function WithSize({ size = 20, ...props }: IconProps) {
  return <svg width={size} height={size} {...props} />;
}

function ClockAsIcon(props: IconProps) {
  return (
    <WithSize {...props}>
      <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
    </WithSize>
  );
}
function CalendarAsIcon(props: IconProps) {
  return (
    <WithSize {...props}>
      <rect width="18" height="18" x="3" y="3" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
    </WithSize>
  );
}
function GlobeAsIcon(props: IconProps) {
  return (
    <WithSize {...props}>
      <circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </WithSize>
  );
}
function LocalAsIcon(props: IconProps) {
  return (
    <WithSize {...props}>
      <circle cx="12" cy="12" r="10" /><line x1="12" y1="1" x2="12" y2="23" /><path d="M5 12a7 7 0 1 0 14 0 7 7 0 0 0-14 0z" />
    </WithSize>
  );
}
function AlertAsIcon(props: IconProps) {
  return (
    <WithSize size="14" {...props}>
      <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
    </WithSize>
  );
}
