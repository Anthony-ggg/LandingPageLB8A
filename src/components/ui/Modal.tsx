import { createPortal } from 'react-dom';
import { type ReactNode, useEffect, useCallback } from 'react';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  className?: string;
  children: ReactNode;
}

export function Modal({ isOpen, onClose, title, className, children }: ModalProps) {
  if (!isOpen) return null;

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    },
    [onClose]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [handleKeyDown, onClose]);

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="fixed inset-0 bg-[#4A2E35]/50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        className={cn(
          'relative w-full max-w-md mx-4 rounded-xl bg-white p-6 shadow-2xl transform transition-all',
          className
        )}
        role="dialog"
        aria-modal="true"
        aria-label={title}
      >
        {title && (
          <div className="flex items-center gap-2 mb-4">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#F3E8D9] text-[#C5A059] font-semibold text-sm">
              {title.charAt(0)}
            </div>
            <h3 className="text-lg font-semibold text-[#4A2E35]">{title}</h3>
          </div>
        )}
        <div className="mb-6">{children}</div>
        <button
          type="button"
          onClick={onClose}
          className="absolute right-3 top-3 rounded-full p-1.5 text-[#8E6B73] hover:bg-[#FDF2F0] hover:text-[#C5A059] transition-colors"
          aria-label="Cerrar"
        >
          <X size={20} />
        </button>
      </div>
    </div>,
    document.body
  );
}
