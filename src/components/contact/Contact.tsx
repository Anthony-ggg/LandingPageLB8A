import { useState } from 'react';
import { Mail, Smartphone, Send } from 'lucide-react';
import { SectionContainer, SectionHeader } from '@/components/layout/SectionContainer';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { CONTACT_INFO } from '@/data/contact';

export function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({});
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const validate = () => {
    const next: { name?: string; email?: string; message?: string } = {};
    if (!form.name.trim()) next.name = 'El nombre es obligatorio.';
    if (!form.email.trim()) next.email = 'El correo es obligatorio.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = 'El formato del correo no es válido.';
    if (!form.message.trim()) next.message = 'El mensaje es obligatorio.';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus('submitting');
    setTimeout(() => {
      setStatus('success');
      setForm({ name: '', email: '', message: '' });
    }, 800);
  };

  return (
    <section id="contacto" className="bg-[#FDF2F0]">
      <SectionContainer>
        <SectionHeader
          title="Contacto"
          description="¿Tienes dudas? Escríbeme y responderé lo antes posible."
        />

        <div className="grid md:grid-cols-3 gap-12">
          <div className="md:col-span-1 space-y-6">
            <div className="rounded-xl border border-[#F0E2DE] bg-white p-6 shadow-sm">
              <h3 className="text-base font-bold text-[#4A2E35] mb-3">Escríbeme</h3>
              <p className="text-sm text-[#8E6B73] leading-relaxed">
                Formulario de contacto simulado. Los datos no se envían a ningún servidor.
              </p>
            </div>
            <div className="space-y-4">
              <ContactItem icon={<Mail size={18} />}>
                <span className="font-medium text-[#4A2E35]">Correo electrónico</span>
                <span className="text-sm text-[#8E6B73] block mt-1">{CONTACT_INFO.email}</span>
              </ContactItem>
              <ContactItem icon={<Smartphone size={18} />}>
                <span className="font-medium text-[#4A2E35]">WhatsApp</span>
                <a href={CONTACT_INFO.whatsapp} className="text-sm text-[#C5A059] hover:text-[#B5904A] hover:underline transition-colors">
                  Escribir por WhatsApp
                </a>
              </ContactItem>
            </div>
          </div>

          <div className="md:col-span-2">
            {status === 'success' ? (
              <ConfirmationContact onReset={() => setStatus('idle')} />
            ) : (
              <form onSubmit={handleSubmit} className="rounded-xl border border-[#F0E2DE] bg-white p-8 md:p-10 shadow-sm space-y-5">
                <div className="grid md:grid-cols-2 gap-5">
                  <Input
                    label="Nombre"
                    id="name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    error={errors.name}
                    required
                  />
                  <Input
                    label="Correo electrónico"
                    id="email"
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    error={errors.email}
                    required
                  />
                </div>
                <div className="w-full">
                  <label htmlFor="message" className="block text-sm font-medium text-[#4A2E35] mb-1.5">
                    Mensaje
                  </label>
                  <textarea
                    id="message"
                    className="flex h-24 w-full rounded-md border border-[#F0E2DE] bg-white px-3 py-2 text-sm text-[#4A2E35] focus:outline-none focus:ring-2 focus:ring-[#C5A059] focus:border-transparent"
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    rows={4}
                    placeholder="Cuéntame en qué puedo ayudarte..."
                  />
                  {errors.message && <p className="mt-1 text-sm text-[#C5A059]">{errors.message}</p>}
                </div>
                <Button type="submit" variant="brand" disabled={status === 'submitting'}>
                  {status === 'submitting' ? 'Enviando...' : (
                    <>
                      <Send size={18} className="mr-2" />
                      Enviar mensaje
                    </>
                  )}
                </Button>
              </form>
            )}
          </div>
        </div>
      </SectionContainer>
    </section>
  );
}

function ContactItem({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-3">
      <div className="flex items-center rounded-md bg-[#F3E8D9] text-[#C5A059] p-2">
        {icon}
      </div>
      {children}
    </div>
  );
}

function ConfirmationContact({ onReset }: { onReset: () => void }) {
  return (
    <div className="rounded-xl border border-[#F0E2DE] bg-white p-8 md:p-10 shadow-sm text-center space-y-4">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#F3E8D9] text-[#C5A059] mx-auto mb-2">
        <Send size={20} />
      </div>
      <h3 className="text-lg font-bold text-[#4A2E35]">Mensaje enviado (demo)</h3>
      <p className="text-sm text-[#8E6B73]">
        Gracias por escribir. Esta es una confirmación simulada: el mensaje no se envía realmente.
      </p>
      <Button type="button" variant="outline" size="sm" onClick={onReset}>
        Enviar otro mensaje
      </Button>
    </div>
  );
}
