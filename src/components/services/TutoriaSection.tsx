import { useState } from 'react';
import {
  BookOpen,
  Pencil,
  Globe,
  Users,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

import { SERVICES } from '@/data/services';
import {
  SectionContainer,
  SectionHeader,
} from '@/components/layout/SectionContainer';
import { Button } from '@/components/ui/Button';

const SERVICE_ICONS: Record<string, React.ComponentType<any>> = {
  BookOpen,
  Pencil,
  Globe,
  Users,
};

export function TutoriaSection({
  onConsultar,
}: {
  onConsultar: (serviceId: string) => void;
}) {
  const [selectedService, setSelectedService] = useState<string | null>(null);

  return (
    <section
      id="tutorias"
      className="relative overflow-hidden bg-[#FDF2F0] py-6"
    >
      {/* Decoración sutil */}
      <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-[#F3E8D9]/50 blur-3xl" />
      <div className="absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-[#FADCD9]/40 blur-3xl" />

      <SectionContainer>
        <div className="relative z-10">
          <SectionHeader
            title="Mis tutorías"
            description="Encuentra el acompañamiento ideal para aprender español a tu ritmo, fortalecer tus habilidades y ganar confianza al comunicarte."
          />

          <div className="mb-10 flex justify-center">
            <div className="flex items-center gap-2 rounded-full border border-[#F0E2DE] bg-white px-4 py-2 shadow-sm">
              <Sparkles size={15} className="text-[#C5A059]" />
              <span className="text-xs font-semibold tracking-wide text-[#C5A059]">
                APRENDE ESPAÑOL A TU MANERA
              </span>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((service) => {
              const Icon = SERVICE_ICONS[service.icon] || BookOpen;
              const isSelected = selectedService === service.id;

              return (
                <article
                  key={service.id}
                  className="
                    group relative flex flex-col
                    rounded-2xl border border-[#F0E2DE]
                    bg-white p-7
                    shadow-sm
                    transition-all duration-500 ease-in-out
                    hover:-translate-y-1
                    hover:border-[#C5A059]
                    hover:bg-[#FFFDFB]
                    hover:shadow-lg
                  "
                >
                  {/* Icono */}
                  <div
                    className="
                      mb-6 flex h-14 w-14 items-center justify-center
                      rounded-2xl bg-[#F3E8D9] text-[#C5A059]
                      transition-all duration-500
                      group-hover:bg-[#C5A059]
                      group-hover:text-white
                    "
                  >
                    <Icon size={25} strokeWidth={1.8} />
                  </div>

                  {/* Título */}
                  <h3
                    className="
                      mb-3 text-xl font-bold text-[#4A2E35]
                      transition-colors duration-500
                      group-hover:text-[#C5A059]
                    "
                  >
                    {service.name}
                  </h3>

                  {/* Descripción */}
                  <p className="mb-7 flex-grow text-sm leading-7 text-[#8E6B73]">
                    {service.description}
                  </p>

                  {/* Información */}
                  <div
                    className="
                      mb-6 flex items-center justify-between gap-3
                      border-t border-[#F0E2DE] pt-5
                      text-xs font-medium
                    "
                  >
                    <span className="rounded-full bg-[#F3E8D9] px-3 py-2 text-[#C5A059]">
                      {service.modality}
                    </span>

                    <span className="font-semibold text-[#C5A059]">
                      {service.duration}
                    </span>
                  </div>

                  {/* Botón CTA */}
                  <Button
                    type="button"
                    variant="brand"
                    size="sm"
                    className="flex w-full items-center justify-center gap-2 transition-all duration-500"
                    onClick={() => onConsultar(service.id)}
                  >
                    Consultar disponibilidad
                    <ArrowRight size={16} />
                  </Button>
                </article>
              );
            })}
          </div>

          <p className="mx-auto mt-12 max-w-lg text-center text-xs leading-6 text-[#C9B7BD]">
            Los servicios y contenidos son provisionales y tienen fines de
            demostración. Consulta la disponibilidad para conocer más detalles.
          </p>
        </div>
      </SectionContainer>
    </section>
  );
}
