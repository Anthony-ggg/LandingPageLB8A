import {
  BookOpen,
  GraduationCap,
  Lightbulb,
  ShieldCheck,
  Heart,
  Globe,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  MessageCircle,
} from 'lucide-react';

import {
  SectionContainer,
  SectionHeader,
} from '@/components/layout/SectionContainer';

import { Button } from '@/components/ui/Button';

const ABOUT_FEATURES = [
  {
    icon: BookOpen,
    label: 'Acompañamiento individual',
    text: 'Sesiones diseñadas para tu ritmo, nivel y objetivos personales.',
  },
  {
    icon: GraduationCap,
    label: 'Metodología adaptada',
    text: 'Enfoque práctico y cercano que refuerza lo que más necesitas mejorar.',
  },
  {
    icon: ShieldCheck,
    label: 'Flexibilidad horaria',
    text: 'Horarios pensados para distintas zonas horarias y disponibilidades.',
  },
];

const ABOUT_VALUES = [
  {
    icon: Heart,
    number: '01',
    title: 'Atención personalizada',
    text: 'Cada estudiante es diferente. Las tutorías se adaptan a tu forma de aprender y a tus objetivos.',
  },
  {
    icon: MessageCircle,
    number: '02',
    title: 'Confianza y cercanía',
    text: 'Un espacio agradable para aprender, equivocarte y avanzar con seguridad y sin presiones.',
  },
  {
    icon: Globe,
    number: '03',
    title: 'Sin fronteras',
    text: 'Clases online para estudiantes de distintos países, adaptadas a sus horarios y necesidades.',
  },
];

export function About() {
  return (
    <section
      id="sobre-mi"
      className="relative overflow-hidden bg-[#FDF2F0]"
    >
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-[#FDF2F0]/50 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-[#FADCD9]/40 blur-[80px] pointer-events-none" />

      <SectionContainer>
        <div className="relative z-10">

          {/* Section heading */}
          <SectionHeader
            title="Sobre Jossbell"
            description="Conoce mi forma de enseñar y lo que hace especial cada experiencia de aprendizaje."
          />

          {/* Introduction */}
          <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-center mt-14">

            {/* JB identity composition */}
            <div className="relative order-2 lg:order-1">

              <div className="relative max-w-md mx-auto">

                {/* Main identity card */}
                <div className="relative overflow-hidden rounded-[2rem] bg-white border border-[#F0E2DE] p-8 md:p-12 shadow-sm glow-rose">

                  {/* Decorative elements */}
                  <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full border border-[#F3E8D9]/70" />
                  <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full border border-[#F3E8D9]/60" />
                  <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-[#FDF2F0]/60 blur-3xl" />

                  <div className="relative z-10">

                    <div className="flex items-center gap-2 text-[#C5A059] text-xs font-bold uppercase tracking-[0.2em] mb-10">
                      <Sparkles size={16} />
                      Aprende español
                    </div>

                    {/* Monogram */}
                    <div className="relative py-8">
                      <div className="text-center">
                        <span className="block text-[125px] md:text-[165px] leading-none font-serif font-bold tracking-[-0.09em] text-[#C5A059]">
                          JB
                        </span>
                      </div>

                      <div className="absolute top-0 right-2 md:right-8 text-[#F3E8D9]">
                        <Sparkles size={30} />
                      </div>
                    </div>

                    <div className="w-16 h-[2px] bg-[#C5A059]/60 mx-auto my-5" />

                    <div className="text-center">
                      <h3 className="text-2xl font-bold text-[#4A2E35] tracking-tight">
                        Jossbell
                      </h3>

                      <p className="text-sm text-[#C9B7BD] mt-2">
                        Tutora de español
                      </p>
                    </div>

                    <div className="flex justify-center gap-3 mt-8">
                      <span className="px-4 py-2 rounded-full bg-white/80 border border-[#F0E2DE] text-xs font-medium text-[#8E6B73]">
                        Español
                      </span>

                      <span className="px-4 py-2 rounded-full bg-white/80 border border-[#F0E2DE] text-xs font-medium text-[#8E6B73]">
                        Online
                      </span>
                    </div>

                  </div>
                </div>

                {/* Secondary floating card */}
                <div className="relative md:absolute md:-bottom-7 md:-right-7 mt-5 md:mt-0 bg-white rounded-2xl border border-[#F0E2DE] shadow-xl p-5 max-w-xs mx-auto md:mx-0">

                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl bg-[#F3E8D9] flex items-center justify-center">
                      <Globe size={22} className="text-[#C5A059]" />
                    </div>

                    <div>
                      <p className="font-bold text-[#4A2E35] text-sm">
                        Aprendizaje sin fronteras
                      </p>
                      <p className="text-xs text-[#C9B7BD] mt-1">
                        Desde cualquier lugar del mundo
                      </p>
                    </div>
                  </div>

                </div>

              </div>
            </div>

            {/* About information */}
            <div className="order-1 lg:order-2 space-y-8">

              <div className="space-y-5">

                <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-[#C5A059]">
                  <span className="w-8 h-[2px] bg-[#C5A059] rounded-full" />
                  Mi historia y compromiso
                </span>

                <h3 className="text-3xl md:text-4xl font-bold text-[#4A2E35] leading-tight">
                  Aprender un idioma es abrirse a
                  <span className="text-[#C5A059]"> nuevas oportunidades.</span>
                </h3>

                <p className="text-base md:text-lg text-[#8E6B73] leading-relaxed">
                  Soy Jossbell, tutora basada en España. Acompaño a estudiantes
                  de distintos países en su proceso de aprendizaje, ofreciendo
                  tutorías online adaptadas a sus necesidades, nivel y objetivos.
                </p>

                <p className="text-base md:text-lg text-[#8E6B73] leading-relaxed">
                  Creo que aprender un idioma va mucho más allá de memorizar
                  palabras. Mi propósito es crear un espacio de confianza donde
                  puedas desarrollar tus habilidades, ganar seguridad y disfrutar
                  cada avance.
                </p>

              </div>

              {/* Teaching methodology */}
              <div className="space-y-6 pt-3">

                <h4 className="text-lg font-bold text-[#4A2E35]">
                  Mi metodología de enseñanza
                </h4>

                <div className="space-y-5">
                  {ABOUT_FEATURES.map((feature) => {
                    const Icon = feature.icon;

                    return (
                      <div
                        key={feature.label}
                        className="flex items-start gap-4"
                      >
                        <div className="w-11 h-11 shrink-0 rounded-xl bg-[#F3E8D9] flex items-center justify-center">
                          <Icon size={20} className="text-[#C5A059]" />
                        </div>

                        <div>
                          <h5 className="font-bold text-[#4A2E35] mb-1">
                            {feature.label}
                          </h5>

                          <p className="text-sm text-[#8E6B73] leading-relaxed">
                            {feature.text}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>

              </div>

              {/* CTA */}
              <div className="pt-2">
                <Button
                  type="button"
                  variant="brand"
                  size="lg"
                  onClick={() => {
                    document.getElementById('horarios')
                      ?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  Comenzar mi aprendizaje
                  <ArrowRight size={17} className="ml-2" />
                </Button>
              </div>

            </div>
          </div>

          {/* Values section */}
          <div className="mt-28 md:mt-36">

            <div className="max-w-2xl mx-auto text-center mb-14">

              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#C5A059]">
                Mi compromiso contigo
              </span>

              <h3 className="text-3xl md:text-4xl font-bold text-[#4A2E35] mt-4">
                Una forma diferente de aprender
              </h3>

              <p className="text-[#8E6B73] mt-4 leading-relaxed">
                Cada estudiante tiene su propio camino. Mi compromiso es
                acompañarte para que avances con confianza y a tu ritmo.
              </p>

            </div>

            <div className="grid md:grid-cols-3 gap-6">

              {ABOUT_VALUES.map((value) => {
                const Icon = value.icon;

                return (
                  <article
                    key={value.number}
                    className="group relative bg-white border border-[#F0E2DE] rounded-2xl p-7 md:p-8 hover:border-[#C5A059] hover:shadow-xl transition-all duration-300"
                  >

                    <div className="flex justify-between items-start mb-8">

                      <div className="w-12 h-12 rounded-xl bg-[#F3E8D9] flex items-center justify-center group-hover:bg-[#C5A059] transition-colors">
                        <Icon size={23} className="text-[#C5A059]" />
                      </div>

                      <span className="text-3xl font-serif font-bold text-[#F3E8D9] group-hover:text-[#F3E8D9] transition-colors">
                        {value.number}
                      </span>

                    </div>

                    <h4 className="text-lg font-bold text-[#4A2E35] mb-3">
                      {value.title}
                    </h4>

                    <p className="text-sm text-[#8E6B73] leading-relaxed">
                      {value.text}
                    </p>

                    <div className="mt-7 pt-5 border-t border-[#F0E2DE] flex items-center gap-2 text-xs font-semibold text-[#C5A059]">
                      <CheckCircle2 size={15} />
                      <span>Aprendizaje a tu medida</span>
                    </div>

                  </article>
                );
              })}
            </div>
          </div>

          {/* Closing statement */}
          <div className="mt-20 rounded-3xl bg-[#FDF2F0] border border-[#F0E2DE] p-8 md:p-12 text-center">

            <Lightbulb
              size={30}
              className="text-[#C5A059] mx-auto mb-5"
            />

            <h3 className="text-2xl md:text-3xl font-bold text-[#4A2E35]">
              Tu próximo paso comienza con una conversación.
            </h3>

            <p className="text-[#8E6B73] mt-3 max-w-xl mx-auto leading-relaxed">
              Descubre cómo unas tutorías personalizadas pueden ayudarte
              a alcanzar tus objetivos con el español.
            </p>

            <button
              type="button"
              onClick={() => {
                document.getElementById('horarios')
                  ?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-2 mt-6 font-semibold text-[#C5A059] hover:gap-3 transition-all"
            >
              Conocer los horarios
              <ArrowRight size={17} />
            </button>

          </div>

        </div>
      </SectionContainer>
    </section>
  );
}
