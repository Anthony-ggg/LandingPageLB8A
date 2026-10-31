import { CONTACT_INFO } from '@/data/contact';
import {
  Mail,
  Smartphone,
  ArrowUpRight,
  Sparkles,
} from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const linkClass =
    'text-[#FDF2F0] transition-colors duration-300 hover:text-[#C5A059]';

  const headingClass =
    'mb-5 text-xs font-bold uppercase tracking-[0.16em] text-[#FDF2F0]';

  return (
    <footer className="relative overflow-hidden border-t border-[#4A2E35]/40 bg-[#3B1F25] text-[#FDF2F0]">

      {/* Decoración muy discreta */}
      <div className="absolute -top-32 -right-24 h-80 w-80 rounded-full bg-[#C5A059]/10 blur-3xl" />
      <div className="absolute -bottom-32 -left-24 h-80 w-80 rounded-full bg-[#C5A059]/5 blur-3xl" />

      <div className="container relative mx-auto px-4 py-14 md:px-6 md:py-16">

        <div className="mb-12 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">

          {/* Marca */}
          <div>
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#4A2E35]/40 bg-[#4A2E35]/30 text-[#FDF2F0]">
                <Sparkles size={19} />
              </div>

              <div>
                <h3 className="text-xl font-semibold tracking-tight text-white">
                  Jossbell
                </h3>
                <p className="text-[10px] uppercase tracking-[0.2em] text-[#C5A059]">
                  Tutorías de español
                </p>
              </div>
            </div>

            <p className="max-w-xs text-sm leading-7 text-[#C9B7BD]">
              Un espacio para aprender español de manera cercana,
              personalizada y a tu propio ritmo.
            </p>
          </div>

          {/* Navegación */}
          <div>
            <h4 className={headingClass}>Explora</h4>

            <ul className="space-y-3 text-sm">
              <li><a href="#inicio" className={linkClass}>Inicio</a></li>
              <li><a href="#sobre-mi" className={linkClass}>Sobre mí</a></li>
              <li><a href="#tutorias" className={linkClass}>Tutorías</a></li>
              <li><a href="#horarios" className={linkClass}>Horarios</a></li>
              <li><a href="#opiniones" className={linkClass}>Opiniones</a></li>
              <li><a href="#contacto" className={linkClass}>Contacto</a></li>
            </ul>
          </div>

          {/* Agenda */}
          <div>
            <h4 className={headingClass}>Tu aprendizaje</h4>

            <ul className="space-y-4 text-sm">
              <li>
                <a href="#horarios" className={`flex items-center gap-2 ${linkClass}`}>
                  Consultar disponibilidad
                  <ArrowUpRight size={14} />
                </a>
              </li>

              <li>
                <a href="#horarios" className={`flex items-center gap-2 ${linkClass}`}>
                  Cambiar zona horaria
                  <ArrowUpRight size={14} />
                </a>
              </li>
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h4 className={headingClass}>Hablemos</h4>

            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[#4A2E35]/40 bg-[#4A2E35]/30 text-[#FDF2F0]">
                  <Mail size={16} />
                </div>

                <a
                  href={`mailto:${CONTACT_INFO.email}`}
                  className={`break-all pt-2 ${linkClass}`}
                >
                  {CONTACT_INFO.email}
                </a>
              </li>

              <li className="flex items-center gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[#4A2E35]/40 bg-[#4A2E35]/30 text-[#FDF2F0]">
                  <Smartphone size={16} />
                </div>

                <a
                  href={CONTACT_INFO.whatsapp}
                  className={`pt-2 ${linkClass}`}
                >
                  WhatsApp
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Pie inferior */}
        <div className="border-t border-[#4A2E35]/40 pt-7">
          <div className="flex flex-col items-center justify-between gap-5 md:flex-row">

            <p className="text-xs text-[#C9B7BD]">
              © {currentYear} Jossbell. Todos los derechos reservados.
            </p>

            <div className="flex items-center gap-6 text-xs">
              <a href="#" className={linkClass}>
                Privacidad (demo)
              </a>

              <a href="#" className={linkClass}>
                Términos (demo)
              </a>
            </div>

            <p className="max-w-sm text-center text-xs italic leading-5 text-[#C9B7BD] md:text-right">
              Prototipo demostrativo. Los formularios y la agenda no generan
              reservas reales.
            </p>
          </div>
        </div>

      </div>
    </footer>
  );
}
