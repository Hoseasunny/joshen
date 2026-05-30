import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

export default function Counter({ icon: Icon, label, value, suffix = '+' }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;

    const duration = 2500;
    const start = performance.now();
    let frameId;

    const tick = now => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(value * eased));
      if (progress < 1) {
        frameId = requestAnimationFrame(tick);
      }
    };

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [inView, value]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.7 }}
      className="glass rounded-3xl p-6 shadow-[0_18px_45px_rgba(10,77,157,0.08)]"
    >
      <div className="flex items-center gap-4">
        <div className="grid h-14 w-14 place-items-center rounded-2xl bg-brandBlue/10 text-brandBlue">
          <Icon size={28} />
        </div>
        <div>
          <div className="font-heading text-3xl text-brandBlue">
            {count}
            {suffix}
          </div>
          <div className="mt-1 text-sm text-slate-600">{label}</div>
        </div>
      </div>
    </motion.div>
  );
}
