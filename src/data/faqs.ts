import type { FAQ } from '../types/index';

export const FAQS: FAQ[] = [
  {
    id: 'faq1',
    question: '¿Cómo funcionan las tutorías?',
    answer: 'Las sesiones son individuales y se adaptan a tus objetivos y nivel. Se realizan por videollamada con materiales compartidos en tiempo real.',
  },
  {
    id: 'faq2',
    question: '¿Cómo consulto los horarios disponibles?',
    answer: 'Selecciona una fecha en la agenda y elige uno de los horarios mostrados. Los horarios se ajustan automáticamente a tu zona horaria.',
  },
  {
    id: 'faq3',
    question: '¿Cómo se muestran las diferencias horarias?',
    answer: 'Cada horario se muestra tanto en la hora de Jossbell (España, Madrid) como en la hora local de tu zona horaria, teniendo en cuenta el cambio de verano e invierno.',
  },
  {
    id: 'faq4',
    question: '¿Cómo solicito una sesión?',
    answer: 'Elige un horario, completa el formulario de reserva y recibirás una confirmación simulada. Este es un prototipo, por lo que no se genera una reserva real.',
  },
  {
    id: 'faq5',
    question: '¿Cómo se gestionarán los comentarios?',
    answer: 'En esta versión los comentarios se publican localmente como demostración. En la versión definitiva podrán requerir moderación antes de mostrarse públicamente.',
  },
];
