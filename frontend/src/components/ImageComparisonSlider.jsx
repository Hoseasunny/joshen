import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ImageComparisonSlider({ before, after, label }) {
  const [position, setPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);
  const dragging = useRef(false);

  const updatePosition = clientX => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const next = ((clientX - rect.left) / rect.width) * 100;
    setPosition(Math.max(0, Math.min(100, next)));
  };

  useEffect(() => {
    const stopDragging = () => {
      dragging.current = false;
      setIsDragging(false);
    };

    const move = event => {
      if (!dragging.current) return;
      updatePosition(event.clientX ?? event.touches?.[0]?.clientX ?? 0);
    };

    window.addEventListener('pointerup', stopDragging);
    window.addEventListener('pointermove', move);
    window.addEventListener('touchend', stopDragging);
    window.addEventListener('touchmove', move, { passive: true });

    return () => {
      window.removeEventListener('pointerup', stopDragging);
      window.removeEventListener('pointermove', move);
      window.removeEventListener('touchend', stopDragging);
      window.removeEventListener('touchmove', move);
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8 }}
      className="overflow-hidden rounded-[28px] border border-white/50 bg-white shadow-[0_24px_80px_rgba(10,77,157,0.12)]"
    >
      <div className="border-b border-slate-100 px-5 py-4">
        <h3 className="font-heading text-xl text-brandBlue">{label}</h3>
      </div>
      <div
        ref={containerRef}
        className="relative aspect-[16/11] cursor-ew-resize select-none overflow-hidden bg-slate-100 touch-none"
        onPointerDown={event => {
          dragging.current = true;
          setIsDragging(true);
          event.currentTarget.setPointerCapture?.(event.pointerId);
          updatePosition(event.clientX);
        }}
        onTouchStart={event => {
          dragging.current = true;
          setIsDragging(true);
          updatePosition(event.touches[0].clientX);
        }}
      >
        <img src={after} alt={`${label} after`} className="absolute inset-0 h-full w-full object-cover" />
        <div
          className={`slider-track absolute inset-0 overflow-hidden ${isDragging ? 'is-dragging' : ''}`}
          style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
        >
          <img src={before} alt={`${label} before`} className="h-full w-full object-cover" />
        </div>

        <div className="absolute left-4 top-4 rounded-full bg-rose-500 px-3 py-1 text-xs font-semibold text-white shadow-lg">
          Before
        </div>
        <div className="absolute right-4 top-4 rounded-full bg-brandGreen px-3 py-1 text-xs font-semibold text-white shadow-lg">
          After
        </div>

        <div
          className="absolute top-0 h-full w-[4px] bg-white shadow-[0_0_0_1px_rgba(255,255,255,0.9)] transition-[left] duration-200 ease-out"
          style={{ left: `${position}%`, transform: 'translateX(-50%)' }}
        />
        <button
          type="button"
          aria-label={`Drag before and after slider for ${label}`}
          className="absolute top-1/2 grid h-14 w-14 -translate-y-1/2 place-items-center rounded-full border-[3px] border-white bg-brandBlue text-white shadow-xl transition-[left,transform] duration-200 ease-out"
          style={{ left: `${position}%`, transform: `translate(-50%, -50%) scale(${isDragging ? 1.05 : 1})` }}
          onKeyDown={event => {
            if (event.key === 'ArrowLeft') {
              setPosition(current => Math.max(0, current - 5));
            }
            if (event.key === 'ArrowRight') {
              setPosition(current => Math.min(100, current + 5));
            }
          }}
        >
          <span className="flex items-center gap-0.5">
            <ChevronLeft size={16} />
            <ChevronRight size={16} />
          </span>
        </button>
      </div>
    </motion.div>
  );
}
