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
        scrolled ? 'bg-white/90 shadow-lg backdrop-blur-xl' : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <a href="#hero" className="font-heading text-2xl text-brandBlue">
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
          className="grid h-11 w-11 place-items-center rounded-full border border-slate-200 bg-white text-brandBlue shadow-sm lg:hidden"
          onClick={() => setOpen(true)}
        >
          <Menu size={20} />
        </button>
      </div>

      <div className={`fixed inset-0 z-50 lg:hidden ${open ? 'pointer-events-auto' : 'pointer-events-none'}`}>
        <div
          className={`absolute inset-0 bg-slate-950/45 transition-opacity duration-300 ${
            open ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={() => setOpen(false)}
        />
        <aside
          className={`menu-panel absolute right-0 top-0 h-full w-[82vw] max-w-sm bg-white px-6 py-6 shadow-2xl ${
            open ? 'open' : ''
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="font-heading text-2xl text-brandBlue">{brand.name}</span>
            <button type="button" aria-label="Close menu" onClick={() => setOpen(false)}>
              <X size={22} />
            </button>
          </div>
          <nav className="mt-8 flex flex-col gap-4">
            {navLinks.map(link => (
              <a
                key={link.href}
                href={link.href}
                className="rounded-2xl bg-slate-50 px-4 py-3 text-base font-medium text-slate-700"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </a>
            ))}
          </nav>
          <a
            href="#contact"
            className="mt-8 inline-flex w-full items-center justify-center rounded-full bg-brandBlue px-5 py-4 font-semibold text-white"
            onClick={() => setOpen(false)}
          >
            Get Free Quote
          </a>
        </aside>
      </div>
    </header>
  );
}
