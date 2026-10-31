export type TimezoneOption = {
  label: string;
  value: string; // identificador IANA
  country: string;
  city: string;
};

export const TIMEZONE_OPTIONS: TimezoneOption[] = [
  { label: 'Ecuador — Quito', value: 'America/Guayaquil', country: 'Ecuador', city: 'Quito' },
  { label: 'España — Madrid', value: 'Europe/Madrid', country: 'España', city: 'Madrid' },
  { label: 'Colombia — Bogotá', value: 'America/Bogota', country: 'Colombia', city: 'Bogotá' },
  { label: 'México — Ciudad de México', value: 'America/Mexico_City', country: 'México', city: 'Ciudad de México' },
  { label: 'Argentina — Buenos Aires', value: 'America/Argentina/Buenos_Aires', country: 'Argentina', city: 'Buenos Aires' },
  { label: 'Nueva York — Estados Unidos', value: 'America/New_York', country: 'Estados Unidos', city: 'Nueva York' },
];

export type SlotStatus = 'available' | 'occupied';

export type TimeSlot = {
  id: string;
  start: string; // instante ISO 8601 (UTC)
  end: string;
  status: SlotStatus;
  serviceId: string;
  title: string;
};

export type Service = {
  id: string;
  name: string;
  description: string;
  modality: string;
  icon: string; // nombre del icono de Lucide
  duration: string;
};

export type Testimonial = {
  id: string;
  name: string; // nombre o iniciales ficticios
  comment: string;
  rating: number; // 1-5
  demo: true;
};

export type FAQ = {
  id: string;
  question: string;
  answer: string;
};

export type ContactInfo = {
  email: string;
  whatsapp: string;
};

export interface DateParts {
  year: number;
  month: number; // 1-12
  day: number;
  hour: number;
  minute: number;
  weekday: string;
  monthName: string;
}

export interface BookingFormData {
  fullName: string;
  email: string;
  serviceId: string;
  message: string;
}

export interface BookingErrors {
  fullName?: string;
  email?: string;
}
