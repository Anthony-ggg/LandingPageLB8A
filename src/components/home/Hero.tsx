import { Globe, Clock, BookOpen, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function Hero() {
  return (
    <section
      id="inicio"
      className="relative overflow-hidden bg-white"
    >
      {/* Decorative background */}
      <div className="absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full bg-[#FDF2F0]/60 blur-[100px]" />
      <div className="absolute top-40 right-0 w-[500px] h-[500px] rounded-full bg-[#FADCD9]/50 blur-[80px]" />

      <div className="container relative mx-auto px-4 md:px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center py-16 md:py-24 lg:min-h-[700px]">

          {/* Left content */}
          <div className="relative z-10 space-y-7 max-w-xl">

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-[#F0E2DE] shadow-sm text-[#C5A059] text-xs font-semibold uppercase tracking-wider">
              <Clock size={15} />
              Tutorías personalizadas online
            </div>

            <div>
              <span className="block text-2xl md:text-3xl font-bold text-[#C5A059] tracking-tight mb-3">
                Jossbell
              </span>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#4A2E35] tracking-tight leading-[1.12]">
                Tutorías cercanas,
                <span className="block text-[#C5A059] mt-2">
                  donde quiera que estés.
                </span>
              </h1>
            </div>

            <p className="text-lg md:text-xl text-[#8E6B73] leading-relaxed max-w-lg">
              Aprende español con clases personalizadas y dinámicas.
              Te acompaño en cada paso, adaptando las tutorías a tu nivel,
              objetivos y zona horaria.
            </p>

            {/* Benefits */}
            <div className="flex flex-wrap gap-3 text-sm text-[#C9B7BD]">
              <span className="flex items-center gap-2">
                <Globe size={17} className="text-[#C5A059]" />
                Desde cualquier país
              </span>

              <span className="flex items-center gap-2">
                <BookOpen size={17} className="text-[#C5A059]" />
                Clases a tu ritmo
              </span>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <Button
                type="button"
                variant="brand"
                size="lg"
                onClick={() => {
                  document.getElementById('horarios')
                    ?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Consultar horarios
              </Button>

              <Button
                type="button"
                variant="outline"
                size="lg"
                onClick={() => {
                  document.getElementById('sobre-mi')
                    ?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Conocerme
              </Button>
            </div>

            <div className="flex items-center gap-2 pt-2 text-sm text-[#8E6B73]">
              <span className="w-2 h-2 rounded-full bg-[#5C8A70] animate-pulse" />
              Disponible para nuevas estudiantes
            </div>
          </div>

          {/* Right image composition */}
          <div className="relative flex justify-center items-center py-8 lg:py-0">

            {/* Decorative circle */}
            <div className="absolute w-[320px] h-[320px] md:w-[460px] md:h-[460px] rounded-full bg-[#FDF2F0]/60 blur-3xl" />

            <div className="absolute w-[360px] h-[360px] md:w-[510px] md:h-[510px] rounded-full border border-[#FADCD9]/50" />

            {/* Main portrait */}
            <div className="relative z-10 w-[280px] h-[360px] md:w-[390px] md:h-[490px]">
              <div className="absolute inset-0 rounded-[48%_48%_40%_40%] bg-white shadow-2xl overflow-hidden border-[6px] border-white glow-rose">
                <img
                  src="/Fotos/JossebelImagen.jpg"
                  alt="Jossbell, profesora de español"
                  className="w-full h-full object-cover object-center"
                />
              </div>
            </div>

            {/* Spanish badge */}
            <div className="absolute z-20 top-4 right-0 md:right-2 bg-white shadow-lg rounded-2xl p-3 md:p-4 flex items-center gap-3 rotate-3">
              <span className="text-3xl">🇪🇸</span>
              <div>
                <p className="text-xs text-[#C9B7BD]">Aprende</p>
                <p className="font-bold text-[#4A2E35]">Español</p>
              </div>
            </div>

            {/* Online badge */}
            <div className="absolute z-20 bottom-4 left-0 md:left-0 bg-white shadow-xl rounded-2xl px-4 py-3 flex items-center gap-3 -rotate-3">
              <div className="w-11 h-11 rounded-full bg-[#F3E8D9] flex items-center justify-center">
                <Globe size={22} className="text-[#C5A059]" />
              </div>
              <div>
                <p className="font-bold text-[#4A2E35] text-sm">
                  Tutorías Online
                </p>
                <p className="text-xs text-[#C9B7BD]">
                  Aprende desde donde estés
                </p>
              </div>
            </div>

            {/* Floating decoration */}
            <div className="absolute top-1/3 -left-2 md:left-2 z-20 bg-white p-3 rounded-xl shadow-lg rotate-[-8deg]">
              <Sparkles size={23} className="text-[#C5A059]" />
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
