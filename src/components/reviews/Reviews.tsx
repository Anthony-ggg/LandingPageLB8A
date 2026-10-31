import { useState } from 'react';
import { Star, MessageCircle, AlertCircle as AlertCircleIcon } from 'lucide-react';
import { SectionContainer, SectionHeader } from '@/components/layout/SectionContainer';
import { Button } from '@/components/ui/Button';
import { StarRating } from '@/components/ui/StarRating';
import { Modal } from '@/components/ui/Modal';
import { Input } from '@/components/ui/Input';
import { TESTIMONIALS } from '@/data/testimonials';
import type { Testimonial } from '@/types/index';

export function Reviews() {
  const [open, setOpen] = useState(false);
  const [localTestimonials, setLocalTestimonials] = useState<Testimonial[]>(TESTIMONIALS);

  const handlePublish = (data: { name: string; rating: number; comment: string }) => {
    const item: Testimonial = {
      id: `demo-${Date.now()}`,
      name: data.name,
      comment: data.comment,
      rating: data.rating,
      demo: true,
    };
    setLocalTestimonials((prev) => [item, ...prev]);
    setOpen(false);
  };

  return (
    <section id="opiniones" className="bg-[#FDF2F0]">
      <SectionContainer>
        <SectionHeader
          title="Opiniones"
          description="Contenido de demostración. Los comentarios son ficticios y solo tienen fines ilustrativos."
        />

        <div className="grid md:grid-cols-3 gap-6">
          {localTestimonials.map((t) => (
            <ReviewCard key={t.id} testimonial={t} />
          ))}
        </div>

        <div className="flex justify-end mt-10">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setOpen(true)}
          >
            <MessageCircle size={18} className="mr-2" />
            Dejar mi comentario
          </Button>
        </div>

        <p className="text-xs text-[#C9B7BD] text-center mt-8 max-w-xs mx-auto">
          En la versión definitiva, los comentarios podrán requerir moderación
          antes de publicarse públicamente.
        </p>

        <ReviewModal
          isOpen={open}
          onClose={() => setOpen(false)}
          onPublish={handlePublish}
        />
      </SectionContainer>
    </section>
  );
}

function ReviewCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div className="rounded-xl border border-[#F0E2DE] bg-white p-6 shadow-sm">
      <div className="flex items-center gap-2 mb-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={i < testimonial.rating ? 'text-[#D4AF37]' : 'text-[#F0E2DE]'}
            size={18}
            fill={i < testimonial.rating ? 'currentColor' : 'none'}
            stroke={i < testimonial.rating ? 'none' : 'currentColor'}
          />
        ))}
        <span className="ml-auto text-xs font-semibold text-[#C5A059] uppercase tracking-wider">
          Demo
        </span>
      </div>
      <p className="text-sm text-[#8E6B73] leading-relaxed mb-4">
        "{testimonial.comment}"
      </p>
      <div className="flex items-center gap-2 pt-3 border-t border-[#F0E2DE]">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#F3E8D9] text-[#C5A059] font-medium text-sm">
          {testimonial.name.split(' ').map((p: string) => p[0]).join('')}
        </div>
        <div>
          <p className="text-sm font-semibold text-[#4A2E35]">{testimonial.name}</p>
          <p className="text-xs text-[#C9B7BD]">Vista previa · Demo</p>
        </div>
      </div>
    </div>
  );
}

function ReviewModal({
  isOpen,
  onClose,
  onPublish,
}: {
  isOpen: boolean;
  onClose: () => void;
  onPublish: (data: { name: string; rating: number; comment: string }) => void;
}) {
  const [form, setForm] = useState({ name: '', rating: 0, comment: '' });
  const [errors, setErrors] = useState<{
    name?: string;
    rating?: string;
    comment?: string;
  }>({});

  const validate = () => {
    const next: { name?: string; rating?: string; comment?: string } = {};
    if (!form.name.trim()) next.name = 'El nombre o alias es obligatorio.';
    if (!form.rating) next.rating = 'Selecciona una calificación.';
    if (!form.comment.trim()) next.comment = 'El comentario es obligatorio.';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    onPublish({
      name: form.name.trim(),
      rating: form.rating,
      comment: form.comment.trim(),
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Dejar tu comentario">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Nombre o alias"
          id="review-name"
          value={form.name}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setForm({ ...form, name: e.target.value })
          }
          error={errors.name}
          required
        />
        <div className="w-full">
          <label className="block text-sm font-medium text-[#4A2E35] mb-2">
            Calificación
          </label>
          <StarRating
            value={form.rating}
            onChange={(v: number) => setForm({ ...form, rating: v })}
          />
          {errors.rating && <p className="mt-1 text-sm text-[#C5A059]">{errors.rating}</p>}
        </div>
        <div className="w-full">
          <label htmlFor="review-comment" className="block text-sm font-medium text-[#4A2E35] mb-1.5">
            Comentario
          </label>
          <textarea
            id="review-comment"
            className="flex h-20 w-full rounded-md border border-[#F0E2DE] bg-white px-3 py-2 text-sm text-[#4A2E35] focus:outline-none focus:ring-2 focus:ring-[#C5A059] focus:border-transparent"
            value={form.comment}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            setForm({ ...form, comment: e.target.value })
          }
            rows={3}
            placeholder="Cuéntanos tu experiencia..."
          />
          {errors.comment && <p className="mt-1 text-sm text-[#C5A059]">{errors.comment}</p>}
        </div>
        <div className="flex items-start gap-2 text-xs text-[#C9B7BD] mt-2">
          <AlertCircleIcon size={14} className="mt-1.5" />
          <p>
            Comentario de demostración. No se envía a ningún servidor ni se
            persiste más allá de esta sesión.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 pt-4">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 px-4 py-2.5 rounded-md border border-[#F0E2DE] bg-white text-[#4A2E35] text-sm font-medium hover:bg-[#FDF2F0] transition-colors"
          >
            Cancelar
          </button>
          <Button type="submit" variant="brand">
            Publicar comentario
          </Button>
        </div>
      </form>
    </Modal>
  );
}
