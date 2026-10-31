import { useState, useCallback } from 'react';
import { detectTimezone } from '@/lib/timeUtils';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Hero } from '@/components/home/Hero';
import { About } from '@/components/home/About';
import { TutoriaSection } from '@/components/services/TutoriaSection';
import { Calendar } from '@/components/booking/Calendar';
import { BookingModal } from '@/components/booking/BookingModal';
import { Confirmation } from '@/components/booking/Confirmation';
import { Reviews } from '@/components/reviews/Reviews';
import { Contact } from '@/components/contact/Contact';
import { FAQs } from '@/components/faq/FAQs';
function App() {
  const [timezone, setTimezone] = useState<string>(detectTimezone());

  // Flujo de reserva simulado
  const [bookingSlot, setBookingSlot] = useState<any>(null);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [confirmation, setConfirmation] = useState<any>(null);

  const handleSlotSelect = useCallback((slot: any) => {
    setBookingSlot(slot);
    setBookingOpen(true);
  }, []);

  const handleConfirm = useCallback((data: any) => {
    setConfirmation(data);
    setBookingOpen(false);
  }, []);

  const scrollTo = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const handleConsultar = useCallback((_serviceId: string) => {
    scrollTo('horarios');
  }, [scrollTo]);

  return (
    <div className="min-h-screen flex flex-col bg-rose-gradient">
      <Navbar />

      <main className="flex-grow relative">
        <Hero />
        <About />
        <TutoriaSection onConsultar={handleConsultar} />
        <Calendar
          onSlotSelect={handleSlotSelect}
          timezone={timezone}
          onTimezoneChange={setTimezone}
        />
        <Reviews />
        <FAQs />
        <Contact />
      </main>

      <Footer />

      {bookingOpen && bookingSlot && (
        <BookingModal
          isOpen={bookingOpen}
          onClose={() => setBookingOpen(false)}
          slot={bookingSlot}
          timezone={timezone}
          onConfirm={handleConfirm}
        />
      )}

      {confirmation && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#4A2E35]/60 backdrop-blur-sm p-4"
          role="dialog"
          aria-modal="true"
          onClick={() => setConfirmation(null)}
        >
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 md:p-8" onClick={(e) => e.stopPropagation()}>
            <Confirmation
              data={confirmation}
              onBackToCalendar={() => {
                setConfirmation(null);
                scrollTo('horarios');
              }}
              onRestart={() => {
                setConfirmation(null);
                scrollTo('inicio');
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
