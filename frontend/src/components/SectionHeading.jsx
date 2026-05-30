import { motion } from 'framer-motion';

export default function SectionHeading({ eyebrow, title, subtitle, light = false }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="mx-auto max-w-3xl text-center"
    >
      {eyebrow ? (
        <p className={`text-sm font-semibold uppercase tracking-[0.35em] ${light ? 'text-skyBlue/90' : 'text-brandGreen'}`}>
          {eyebrow}
        </p>
      ) : null}
      <h2 className={`mt-3 text-3xl font-heading text-shadow-soft sm:text-4xl lg:text-5xl ${light ? 'text-white' : 'text-brandBlue'}`}>
        {title}
      </h2>
      {subtitle ? (
        <p className={`mt-4 text-base leading-7 sm:text-lg ${light ? 'text-white/80' : 'text-slate-600'}`}>
          {subtitle}
        </p>
      ) : null}
    </motion.div>
  );
}
