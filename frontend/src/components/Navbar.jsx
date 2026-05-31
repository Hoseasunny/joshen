import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { navLinks, brand } from '../data';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        open || scrolled ? 'bg-white/95 shadow-lg backdrop-blur-xl' : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 sm:py-4 lg:px-8">
        <a href="#hero" className="font-heading text-xl text-brandBlue sm:text-2xl">
          {brand.name}
        </a>

        <nav className="hidden items-center gap-8 lg:flex">
          {navLinks.map(link => (
            <a key={link.href} href={link.href} className="nav-link text-sm font-medium text-slate-700 hover:text-brandBlue">
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden lg:block">
          <a
            href="#contact"
            className="pulse-cta inline-flex items-center rounded-full bg-brandBlue px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-brandBlue/90"
          >
            Get Free Quote
          </a>
        </div>

        <button
          type="button"
          aria-label="Open menu"
          className="grid h-10 w-10 place-items-center rounded-full border border-slate-200 bg-white text-brandBlue shadow-sm lg:hidden"
          onClick={() => setOpen(true)}
        >
          <Menu size={18} />
        </button>
      </div>

      <div className={`fixed inset-0 z-50 lg:hidden ${open ? 'pointer-events-auto' : 'pointer-events-none'}`}>
        <div
          className={`absolute inset-0 bg-slate-950/55 transition-opacity duration-300 ${
            open ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={() => setOpen(false)}
        />
        <aside
          className={`menu-panel absolute right-0 top-0 h-dvh w-[86vw] max-w-sm border-l border-slate-200 bg-[linear-gradient(180deg,rgba(255,255,255,0.98)_0%,rgba(238,249,241,0.98)_100%)] px-5 py-5 shadow-2xl backdrop-blur-2xl ${
            open ? 'open' : ''
          }`}
        >
          <div className="flex items-center justify-between border-b border-slate-200 pb-4">
            <span className="font-heading text-xl text-brandBlue">{brand.name}</span>
            <button type="button" aria-label="Close menu" onClick={() => setOpen(false)}>
              <X size={22} />
            </button>
          </div>
          <nav className="mt-5 flex flex-col gap-3">
            {navLinks.map(link => (
              <a
                key={link.href}
                href={link.href}
                className="rounded-2xl bg-white/90 px-4 py-3 text-sm font-medium text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:bg-brandGreen/10 hover:text-brandBlue"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </a>
            ))}
          </nav>
          <a
            href="#contact"
            className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-brandBlue px-5 py-3.5 text-sm font-semibold text-white shadow-lg"
            onClick={() => setOpen(false)}
          >
            Get Free Quote
          </a>
        </aside>
      </div>
    </header>
  );
}
