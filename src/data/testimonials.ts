import type { Testimonial } from '../types/index';

/**
 * Testimonios de demostración.
 * Son contenido ficticio con fines ilustrativos. No son opiniones reales de estudiantes.
 */
export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    name: 'M. R.',
    comment: 'Las clases son muy claras y se adaptan a mi ritmo. Me ayudó a organizar mejor el estudio antes de los exámenes.',
    rating: 5,
    demo: true,
  },
  {
    id: 't2',
    name: 'A. S.',
    comment: 'Una tutora atenta y cercana. Las explicaciones de español me resultan muy fáciles de seguir desde Colombia.',
    rating: 4,
    demo: true,
  },
  {
    id: 't3',
    name: 'L. M.',
    comment: 'Muy contenta con el refuerzo escolar. Mi hijo avanza con más confianza y motivación.',
    rating: 5,
    demo: true,
  },
  {
    id: 't4',
    name: 'C. P.',
    comment: 'El asesoramiento académico me dio herramientas para planificar mis estudios sin estrés.',
    rating: 4,
    demo: true,
  },
];
