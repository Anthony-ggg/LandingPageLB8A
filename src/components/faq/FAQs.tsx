import { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { FAQS } from '@/data/faqs';
import { SectionContainer, SectionHeader } from '@/components/layout/SectionContainer';

export function FAQs() {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <section id="faq" className="bg-white">
      <SectionContainer>
        <SectionHeader
          title="Preguntas frecuentes"
          description="Respuestas a las dudas más comunes sobre las tutorías y la agenda."
        />
        <div className="max-w-2xl mx-auto space-y-3">
          {FAQS.map((faq) => (
            <FAQItem
              key={faq.id}
              faq={faq}
              isOpen={openId === faq.id}
              onToggle={() => setOpenId(openId === faq.id ? null : faq.id)}
            />
          ))}
        </div>
      </SectionContainer>
    </section>
  );
}

function FAQItem({
  faq,
  isOpen,
  onToggle,
}: {
  faq: { id: string; question: string; answer: string };
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="rounded-xl border border-[#F0E2DE] bg-white shadow-sm overflow-hidden">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between px-6 py-4 text-left transition-bg hover:bg-[#FDF2F0]"
        aria-expanded={isOpen}
        aria-controls={`faq-${faq.id}`}
      >
        <HelpCircle size={18} className="mr-3 text-[#8E6B73] flex-shrink-0" />
        <span className="flex-1 text-sm font-semibold text-[#4A2E35] leading-tight">
          {faq.question}
        </span>
        <ChevronDown size={16} className={cnRotate(isOpen)} />
      </button>
      <div
        id={`faq-${faq.id}`}
        className={`border-t border-[#F0E2DE] px-6 pb-4 transition-all ${isOpen ? '' : 'max-h-0 opacity-0 overflow-hidden mt-0'}`}
      >
        <p className="text-sm text-[#8E6B73] leading-relaxed">{faq.answer}</p>
      </div>
    </div>
  );
}

function cnRotate(open: boolean): string {
  return `transition-transform duration-200 ${open ? 'rotate-180' : ''}`;
}
