import { useEffect, useState, useCallback } from 'react';
import { Menu, X, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

const NAV_LINKS = [
  { id: 'inicio', label: 'Inicio' },
  { id: 'sobre-mi', label: 'Sobre mí' },
  { id: 'tutorias', label: 'Tutorías' },
  { id: 'horarios', label: 'Horarios' },
  { id: 'opiniones', label: 'Opiniones' },
  { id: 'contacto', label: 'Contacto' },
];

export function Navbar() {
  const [activeSection, setActiveSection] = useState('inicio');
  const [mobileOpen, setMobileOpen] = useState(false);

  const scrollToSection = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: 'smooth',
    });
    setActiveSection(id);
    setMobileOpen(false);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) =>
              b.intersectionRatio - a.intersectionRatio
          );

        if (visible.length > 0) {
          setActiveSection(visible[0].target.id);
        }
      },
      {
        rootMargin: '-100px 0px -55% 0px',
        threshold: [0, 0.2, 0.5],
      }
    );

    NAV_LINKS.forEach(({ id }) => {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToCalendar = useCallback(() => {
    scrollToSection('horarios');
  }, [scrollToSection]);

  return (
    <nav className="fixed top-0 z-50 w-full border-b border-[#F0E2DE]/40 bg-[#FFFFFF]/80 shadow-[0_2px_15px_rgba(74,46,53,0.05)] backdrop-blur-xl">

      <div className="container mx-auto flex h-[76px] items-center justify-between px-4 md:px-6">

        {/* Logotipo */}
        <button
          type="button"
          onClick={() => scrollToSection('inicio')}
          className="group flex items-center gap-3"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#F0E2DE] bg-[#FDF2F0] text-[#C5A059] transition-all duration-300 group-hover:bg-[#F3E8D9]">
            <Sparkles size={19} strokeWidth={1.7} />
          </div>

          <div className="flex flex-col items-start">
            <span className="text-xl font-semibold tracking-tight text-[#4A2E35]">
              Jossbell
            </span>
            <span className="text-[10px] font-medium uppercase tracking-[0.22em] text-[#C5A059]">
              Tutorías de español
            </span>
          </div>
        </button>

        {/* Navegación escritorio */}
        <div className="hidden items-center gap-7 lg:flex">
          {NAV_LINKS.map((link) => {
            const isActive = activeSection === link.id;

            return (
              <button
                key={link.id}
                type="button"
                onClick={() => scrollToSection(link.id)}
                className={cn(
                  'relative py-2 text-[13px] font-medium transition-colors duration-300',
                  'after:absolute after:bottom-0 after:left-0 after:h-[2px] after:rounded-full after:bg-[#C5A059] after:transition-all after:duration-300',
                  isActive
                    ? 'text-[#C5A059] after:w-full'
                    : 'text-[#4A2E35]/80 after:w-0 hover:text-[#C5A059] hover:after:w-full'
                )}
              >
                {link.label}
              </button>
            );
          })}

          <button
            type="button"
            onClick={scrollToCalendar}
            className="ml-2 rounded-full border border-[#C5A059] bg-[#C5A059] px-6 py-2.5 text-xs font-semibold tracking-wide text-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-[#B5904A] hover:bg-[#B5904A] hover:shadow-md"
          >
            Reservar tutoría
          </button>
        </div>

        {/* Menú móvil */}
        <button
          type="button"
          onClick={() => setMobileOpen((prev) => !prev)}
          className="rounded-xl border border-[#F0E2DE] bg-white p-2.5 text-[#4A2E35] transition-colors hover:bg-[#FDF2F0] lg:hidden"
          aria-label={mobileOpen ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X size={21} /> : <Menu size={21} />}
        </button>
      </div>

      {/* Desplegable móvil */}
      <div
        className={cn(
          'grid overflow-hidden transition-all duration-300 ease-in-out lg:hidden',
          mobileOpen
            ? 'grid-rows-[1fr] border-t border-[#F0E2DE]'
            : 'grid-rows-[0fr]'
        )}
      >
        <div className="min-h-0 overflow-hidden">
          <div className="bg-[#FFFFFF] px-5 py-4">
            <div className="space-y-1">
              {NAV_LINKS.map((link) => {
                const isActive = activeSection === link.id;

                return (
                  <button
                    key={link.id}
                    type="button"
                    onClick={() => scrollToSection(link.id)}
                    className={cn(
                      'block w-full rounded-xl px-4 py-3 text-left text-sm font-medium transition-colors duration-300',
                      isActive
                        ? 'bg-[#FDF2F0] text-[#C5A059]'
                        : 'text-[#4A2E35]/80 hover:bg-[#FDF2F0]'
                    )}
                  >
                    {link.label}
                  </button>
                );
              })}
            </div>

            <button
              type="button"
              onClick={scrollToCalendar}
              className="mt-4 w-full rounded-xl bg-[#C5A059] px-4 py-3 text-sm font-semibold text-white transition-colors duration-300 hover:bg-[#B5904A]"
            >
              Reservar tutoría
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
