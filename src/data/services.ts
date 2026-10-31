import type { Service } from '../types/index';

/**
 * Servicios de tutoría demostrativos.
 * El contenido es provisional y fácil de editar; no representa ofertas reales.
 */
export const SERVICES: Service[] = [
  {
    id: 'refuerzo-escolar',
    name: 'Refuerzo escolar',
    description: 'Apoyo personalizado en asignaturas principales para consolidar hábitos de estudio y superar dificultades académicas.',
    modality: 'Online · Individual',
    icon: 'BookOpen',
    duration: '60 min',
  },
  {
    id: 'preparacion-examenes',
    name: 'Preparación de exámenes',
    description: 'Sesiones enfocadas en la preparación de exámenes oficiales, selectividad o certificaciones de idiomas.',
    modality: 'Online · Individual',
    icon: 'Pencil',
    duration: '90 min',
  },
  {
    id: 'aprende-espanol',
    name: 'Español para extranjeros',
    description: 'Clases de español como lengua extranjera adaptadas al nivel y objetivos de cada estudiante, sea cual sea su país.',
    modality: 'Online · Individual o grupo',
    icon: 'Globe',
    duration: '60 min',
  },
  {
    id: 'asesoramiento-academico',
    name: 'Asesoramiento académico',
    description: 'Orientación sobre planificación de estudios, organización del tiempo y técnicas de aprendizaje efectivas.',
    modality: 'Online · Individual',
    icon: 'Users',
    duration: '45 min',
  },
];

export const DEFAULT_SERVICE_ID = SERVICES[0].id;
