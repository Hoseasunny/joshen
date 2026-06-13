import { useEffect, useMemo, useRef, useState } from 'react';
import {
  ArrowRight,
  ChevronDown,
  ChevronRight,
  MessageCircle,
  Phone,
  Star,
} from 'lucide-react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, FreeMode } from 'swiper/modules';
import 'swiper/css';
import Navbar from './components/Navbar';
import SectionHeading from './components/SectionHeading';
import Reveal from './components/Reveal';
import Counter from './components/Counter';
import ImageComparisonSlider from './components/ImageComparisonSlider';
import {
  beforeAfterPairs,
  brand,
  chooseReasons,
  contactDetails,
  domesticServices,
  domesticPlacement,
  faqs,
  extraServices,
  serviceBreakdowns,
  services,
  socialLinks,
  stats,
  testimonials,
} from './data';

gsap.registerPlugin(ScrollTrigger);

const WHATSAPP_NUMBER = '254700000000';

function buildWhatsAppUrl({ name = '', phone = '', service = '' } = {}) {
  const lines = [
    'Hi JOSHEM, I need a quote for cleaning services.',
    service ? `Service: ${service}` : 'Service: Cleaning service',
    name ? `Name: ${name}` : null,
    phone ? `Phone: ${phone}` : null,
    'Location: Nairobi',
  ].filter(Boolean);

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join('\n'))}`;
}

function BubbleField({ count = 16, small = false }) {
  const bubbles = useMemo(() => {
    return Array.from({ length: count }, (_, index) => ({
      size: small ? 8 + (index % 5) * 6 : 12 + (index % 6) * 8,
      left: (index * 13) % 100,
      duration: small ? 18 + (index % 5) * 4 : 15 + (index % 7) * 2,
      drift: ((index % 2 === 0 ? 1 : -1) * (10 + (index % 5) * 5)),
      delay: (index % 8) * 1.2,
    }));
  }, [count, small]);

  return (
    <div className="bubble-layer absolute inset-0">
      {bubbles.map((bubble, index) => (
        <span
          key={index}
          className="bubble"
          style={{
            width: `${bubble.size}px`,
            height: `${bubble.size}px`,
            left: `${bubble.left}%`,
            animationDuration: `${bubble.duration}s`,
            animationDelay: `${bubble.delay}s`,
            '--drift': `${bubble.drift}px`,
          }}
        />
      ))}
    </div>
  );
}

function RippleDrops({ count = 7 }) {
  const drops = useMemo(() => {
    return Array.from({ length: count }, () => {
      const delay = Math.random() * 7.2;

      return {
        left: 8 + Math.random() * 84,
        top: 10 + Math.random() * 70,
        size: 5 + Math.random() * 4,
        ripple: 84 + Math.random() * 72,
        delay,
        duration: 6.2 + Math.random() * 1.4,
      };
    }).sort((a, b) => a.delay - b.delay);
  }, [count]);

  return (
    <div aria-hidden className="surface-ripples" style={{ zIndex: 0 }}>
      {drops.map((drop, index) => (
        <span
          key={index}
          className="surface-drop"
          style={{
            left: `${drop.left}%`,
            top: `${drop.top}%`,
            '--drop-size': `${drop.size}px`,
            '--ripple-size': `${drop.ripple}px`,
            '--drop-delay': `${drop.delay}s`,
            '--drop-duration': `${drop.duration}s`,
          }}
        >
          <span className="surface-drop-core" />
          <span className="surface-drop-wave" />
        </span>
      ))}
    </div>
  );
}

function Hero() {
  return (
    <section id="hero" className="relative overflow-hidden bg-[linear-gradient(135deg,#E6F7EA_0%,#CFEFD8_46%,#F0FBF3_100%)] pt-28 mobile-hero-section section-spacious section-tight-bottom">
      <BubbleField count={18} />
      <div className="soft-grid absolute inset-0 opacity-40" />
      <div className="yellow-green-wash absolute inset-x-0 top-0 h-72 opacity-70" />
      <div className="yellow-green-glow absolute -left-20 top-16 h-96 w-96 rounded-full blur-3xl" />
      <div className="absolute left-0 top-24 h-72 w-72 rounded-full bg-skyBlue/20 blur-3xl parallax-shape" data-parallax="0.18" />
      <div className="absolute right-0 top-40 h-96 w-96 rounded-full bg-brandGreen/15 blur-3xl parallax-shape" data-parallax="0.3" />

      <div className="relative mx-auto grid max-w-7xl gap-14 px-4 pb-20 sm:px-6 lg:grid-cols-2 lg:px-8 lg:pb-28 mobile-tight-gap">
        <Reveal className="flex flex-col justify-center">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-brandGreen">Premium Cleaning Company</p>
          <p className="mt-2 text-xs font-semibold uppercase tracking-[0.4em] text-brandBlue/70">JOSHEM FRESHAURA</p>
          <h1 className="mt-5 max-w-3xl text-4xl font-heading leading-tight text-brandBlue sm:text-5xl lg:text-6xl">
            PROFESSIONAL CLEANING SERVICES YOU CAN TRUST
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600 sm:text-xl mobile-hide md:block">
            Transforming Homes, Offices and Commercial Spaces Through Professional Cleaning Solutions.
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <a
              href="#quick-quote"
              className="pulse-cta inline-flex items-center justify-center rounded-full bg-brandBlue px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-brandBlue/90 sm:px-8 sm:py-4 sm:text-base"
            >
              Get Free Quote
            </a>
            <a
              href={buildWhatsAppUrl({ service: 'Office cleaning' })}
              className="inline-flex items-center justify-center rounded-full border-2 border-brandBlue px-6 py-3 text-sm font-semibold text-brandBlue transition hover:-translate-y-0.5 hover:bg-brandBlue hover:text-white sm:px-8 sm:py-4 sm:text-base"
            >
              WhatsApp Us
            </a>
          </div>

          <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 xl:grid-cols-4">
            {stats.map(stat => (
              <div key={stat.label} className="glass rounded-2xl p-3 shadow-[0_18px_45px_rgba(10,77,157,0.08)] sm:rounded-3xl sm:p-5">
                <RippleDrops count={4} />
                <div className="flex items-center gap-3">
                  <div className="grid h-10 w-10 place-items-center rounded-2xl bg-brandBlue/10 text-brandBlue sm:h-12 sm:w-12">
                    <stat.icon size={20} className="sm:hidden" />
                    <stat.icon size={24} className="hidden sm:block" />
                  </div>
                  <div>
                    <div className="font-heading text-xl text-brandBlue sm:text-2xl">{stat.value}+</div>
                    <p className="text-xs text-slate-600 sm:text-sm">{stat.label}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.15} className="relative flex items-center justify-center">
          <div className="relative w-full max-w-[620px]">
            <div className="absolute -left-6 top-12 h-24 w-24 rounded-3xl bg-brandGreen/20 blur-sm" />
            <div className="absolute -right-6 bottom-16 h-28 w-28 rounded-full bg-yellow-400/25 blur-md" />
            <div className="glass relative overflow-hidden rounded-[2rem] p-4 shadow-[0_32px_90px_rgba(10,77,157,0.18)]">
              <RippleDrops count={6} />
              <img
                src="/icons/hero.png"
                alt="Professional cleaning team"
                className="mobile-hero-media h-[520px] w-full rounded-[1.5rem] object-cover"
              />
              <div className="mobile-hide absolute bottom-6 left-6 right-6 grid gap-4 rounded-[1.5rem] bg-white/85 p-5 backdrop-blur-xl sm:grid-cols-2 md:grid">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.25em] text-brandGreen">Trusted Results</p>
                  <p className="mt-2 text-lg font-heading text-brandBlue">Luxury care for homes and businesses.</p>
                </div>
                <div className="flex items-center justify-end gap-4">
                  <div className="rounded-2xl bg-brandBlue px-4 py-3 text-white">
                    <Phone size={18} />
                  </div>
                  <div className="rounded-2xl bg-brandGreen px-4 py-3 text-white">
                    <MessageCircle size={18} />
                  </div>
                  <div className="rounded-2xl bg-skyBlue px-4 py-3 text-white">
                    <Star size={18} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>

      <svg className="block w-full" viewBox="0 0 1440 120" aria-hidden="true">
        <path
          fill="#ffffff"
          d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,64C960,75,1056,85,1152,80C1248,75,1344,53,1392,42.7L1440,32V120H0Z"
        />
      </svg>
    </section>
  );
}

function QuickQuote() {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    service: '',
  });

  const update = event => {
    setForm(previous => ({ ...previous, [event.target.name]: event.target.value }));
  };

  const whatsappUrl = buildWhatsAppUrl(form);

  return (
    <div id="quick-quote" className="relative overflow-hidden bg-none backdrop-blur-sm mobile-compact-section section-tight-about">
      <BubbleField count={8} small />
      <Reveal>
        <div className="glass overflow-hidden rounded-[2rem] px-4 py-5 shadow-[0_20px_60px_rgba(10,77,157,0.10)] sm:px-8 sm:py-8 lg:px-10 lg:py-10">
          <RippleDrops count={6} />
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between sm:gap-8">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.35em] text-brandGreen">Request in 30 seconds</p>
              <h2 className="text-2xl font-heading text-brandBlue sm:text-4xl">Quick Quote</h2>
              <p className="max-w-2xl text-sm leading-6 text-slate-600 sm:text-base sm:leading-7">
                Share your name, phone, and service needed, then send the quickest request by WhatsApp.
              </p>
            </div>
            <a
              href={buildWhatsAppUrl({ service: 'Office cleaning' })}
              className="inline-flex items-center justify-center rounded-full bg-[#25D366] px-4 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 sm:px-5"
            >
              WhatsApp Fastest
            </a>
          </div>

          <div className="mt-4 grid gap-3 sm:mt-6 sm:gap-4 md:grid-cols-[1fr_1fr_1.2fr]">
            <label className="block">
              <span className="mb-1.5 block text-sm font-medium text-slate-700 sm:mb-2">Name</span>
              <input
                name="name"
                value={form.name}
                onChange={update}
                className="focus-glow w-full rounded-2xl border border-slate-200 px-4 py-3"
                placeholder="Your name"
              />
            </label>
            <label className="block">
              <span className="mb-1.5 block text-sm font-medium text-slate-700 sm:mb-2">Phone</span>
              <input
                name="phone"
                value={form.phone}
                onChange={update}
                className="focus-glow w-full rounded-2xl border border-slate-200 px-4 py-3"
                placeholder="+254..."
              />
            </label>
            <label className="block">
              <span className="mb-1.5 block text-sm font-medium text-slate-700 sm:mb-2">Service Needed</span>
              <select
                name="service"
                value={form.service}
                onChange={update}
                className="focus-glow w-full rounded-2xl border border-slate-200 px-4 py-3"
              >
                <option value="">Select a service</option>
                {services.map(service => (
                  <option key={service.title} value={service.title}>
                    {service.title}
                  </option>
                ))}
                <option value="Domestic Workers Services">Domestic Workers Services</option>
              </select>
            </label>
          </div>

          <div className="mt-4 flex flex-col gap-2 sm:mt-6 sm:flex-row sm:gap-3">
            <a
              href={whatsappUrl}
              className="inline-flex items-center justify-center rounded-full bg-brandBlue px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-brandBlue/90 sm:px-6"
            >
              Send on WhatsApp
            </a>
            <a
              href="#contact"
              className="inline-flex items-center justify-center rounded-full border-2 border-brandGreen px-5 py-3 text-sm font-semibold text-brandGreen transition hover:-translate-y-0.5 hover:bg-brandGreen hover:text-white sm:px-6"
            >
              Full Quote Form
            </a>
          </div>
        </div>
      </Reveal>
    </div>
  );
}

function About() {
  return (
    <section
      id="about"
      className="relative overflow-hidden bg-[linear-gradient(135deg,#EAF8ED_0%,#DDF2E2_50%,#F7FCF8_100%)] py-20 backdrop-blur-sm sm:py-24 mobile-compact-section section-spacious section-tight-top"
    >
      <BubbleField count={10} small />
      <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:items-center lg:px-8">
        <div className="yellow-green-wash pointer-events-none absolute inset-x-0 my-20 h-56 rounded-[3rem] opacity-35 blur-3xl" />
        <Reveal>
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-brandGreen">About Us</p>
          <h2 className="mt-3 text-3xl font-heading text-brandBlue sm:text-4xl">About JOSHEM</h2>
          <p className="mt-5 text-lg leading-8 text-slate-600 mobile-hide md:block">
            JOSHEM General Cleaning Services Ltd is dedicated to providing professional, affordable and high-quality
            cleaning and sanitation services for homes, offices, businesses and institutions. We combine skilled
            personnel, modern equipment and safe cleaning solutions to deliver exceptional results while conserving
            the environment.
          </p>
          <p className="mt-5 text-base leading-7 text-slate-600 md:hidden">
            Professional, affordable cleaning for homes, offices, and businesses.
          </p>
          <a href="#services" className="mt-6 inline-flex items-center gap-2 font-semibold text-brandBlue">
            Learn more about us <ArrowRight size={18} />
          </a>
        </Reveal>

        <Reveal delay={0.12}>
          <div className="relative">
            <div className="absolute -bottom-5 -right-5 h-full w-full rounded-[2rem] bg-brandGreen/20" />
            <img
              src="/icons/about-section.png"
              alt="Cleaning team with equipment"
              className="relative h-[420px] w-full rounded-[2rem] object-cover shadow-[0_25px_75px_rgba(10,77,157,0.12)] md:h-[420px] max-md:h-[280px]"
            />
          </div>
        </Reveal>
      </div>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <QuickQuote />
      </div>
    </section>
  );
}

function Services() {
  const [expandedService, setExpandedService] = useState(null);

  const toggleExpanded = (index) => {
    setExpandedService(expandedService === index ? null : index);
  };

  const serviceDetails = {
    'Residential Cleaning': {
      duration: '2-4 hours',
      coverage: 'Entire home',
      includes: ['Deep house cleaning', 'Bathroom and toilet cleaning', 'Living room cleaning', 'Window and glass cleaning', 'Exterior and outdoor cleaning'],
      benefits: ['Fresh, healthy living space', 'Allergen removal', 'Odor elimination'],
      cta: 'Schedule Residential Service',
    },
    'Office Cleaning': {
      duration: '1-3 hours',
      coverage: 'Full office space',
      includes: ['Floor sweeping and mopping', 'Desk and workstation cleaning', 'Sanitizing high-touch surfaces', 'Waste management', 'Carpet vacuuming'],
      benefits: ['Boost productivity', 'Professional appearance', 'Healthy workplace'],
      cta: 'Book Office Cleaning',
    },
    'Laundry Services': {
      duration: '1-2 days',
      coverage: 'Bulk fabric care',
      includes: ['Professional washing', 'Stain treatment', 'Fabric-safe drying', 'Ironing and pressing', 'Delivery available'],
      benefits: ['Extended fabric life', 'Expert stain removal', 'Fresh-smelling results'],
      cta: 'Order Laundry Service',
    },
    'Sofa Cleaning': {
      duration: '2-3 hours',
      coverage: 'Complete upholstery',
      includes: ['Deep stain removal', 'Allergen extraction', 'Fabric conditioning', 'Odor treatment', 'Protective coating'],
      benefits: ['Restored appearance', 'Hygienic surface', 'Extended furniture life'],
      cta: 'Get Sofa Cleaned',
    },
    'Carpet Cleaning': {
      duration: '2-4 hours',
      coverage: 'Entire carpet area',
      includes: ['Professional extraction', 'Stain and spot treatment', 'Fiber restoration', 'Deodorizing', 'Quick-dry treatment'],
      benefits: ['Like-new appearance', 'Allergen reduction', 'Longevity boost'],
      cta: 'Clean Your Carpets',
    },
    'Move-In / Move-Out': {
      duration: '3-6 hours',
      coverage: 'Complete property',
      includes: ['Deep cleaning all rooms', 'Carpet shampooing', 'Window and blind cleaning', 'Appliance cleaning', 'Post-construction cleanup'],
      benefits: ['Move-ready property', 'Deposit protection', 'Fresh start'],
      cta: 'Schedule Move Cleaning',
    },
    'Fumigation Services': {
      duration: '4-6 hours',
      coverage: 'Entire building',
      includes: ['Pest inspection', 'Safe chemical application', 'Follow-up treatment', 'Documentation', 'Prevention advice'],
      benefits: ['Pest-free environment', 'Long-term protection', 'Health safety'],
      cta: 'Book Fumigation',
    },
    'Landscaping Design': {
      duration: 'Ongoing',
      coverage: 'Full outdoor space',
      includes: ['Garden design', 'Maintenance planning', 'Plant care', 'Lawn treatment', 'Seasonal updates'],
      benefits: ['Curb appeal boost', 'Property value increase', 'Relaxing outdoor space'],
      cta: 'Design Your Garden',
    },
  };

  return (
    <section
      id="services"
      className="relative overflow-hidden bg-[linear-gradient(135deg,#EFFAF1_0%,#DFF3E5_50%,#F8FCF8_100%)] py-20 backdrop-blur-sm sm:py-24 mobile-compact-section section-spacious"
    >
      <BubbleField count={10} small />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="yellow-green-glow pointer-events-none absolute right-10 top-10 h-64 w-64 rounded-full opacity-30 blur-3xl" />
        <SectionHeading
          eyebrow="Services"
          title="Services We Offer"
          subtitle="Comprehensive cleaning solutions tailored to your needs"
        />
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, index) => {
            const details = serviceDetails[service.title];
            return (
              <Reveal key={service.title} delay={index * 0.06}>
                <article className="card-ripple group flex flex-col h-full overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white shadow-[0_6px_28px_rgba(0,0,0,0.06)] transition duration-300 hover:-translate-y-2 hover:shadow-glow">
                  <RippleDrops count={7} />
                  {/* Image - No padding, extends to edges */}
                  <div className="overflow-hidden bg-slate-100">
                    <img src={service.image} alt={service.title} className="h-40 sm:h-48 w-full object-cover transition duration-500 group-hover:scale-105" />
                  </div>
                  
                  {/* Content - Flex grow to fill available space */}
                  <div className="flex flex-col flex-grow p-4 sm:p-5">
                    <div className="mt-1 grid h-12 sm:h-14 w-12 sm:w-14 place-items-center rounded-2xl bg-brandBlue/10 text-brandBlue transition duration-300 group-hover:rotate-6 group-hover:bg-brandGreen/15 group-hover:text-brandGreen">
                      <service.icon size={24} />
                    </div>
                    <h3 className="mt-3 sm:mt-4 text-lg sm:text-xl font-heading text-brandBlue">{service.title}</h3>
                    <p className="mt-2 sm:mt-3 text-xs sm:text-sm leading-6 text-slate-600 mobile-hide md:block flex-grow">{service.description}</p>
                    <p className="mt-2 sm:mt-3 text-xs sm:text-sm leading-6 text-slate-600 md:hidden flex-grow">Reliable, professional service for your space.</p>
                    <button
                      type="button"
                      onClick={() => toggleExpanded(index)}
                      className="mt-4 sm:mt-5 inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-brandGreen transition group-hover:translate-x-1"
                    >
                      Learn More
                      <ChevronRight size={16} className={`expand-icon ${expandedService === index ? 'expanded' : ''}`} />
                    </button>

                    <div className={`expandable-content ${expandedService === index ? 'expanded' : ''}`}>
                      <div className="space-y-3 sm:space-y-4 border-t border-slate-100 pt-3 sm:pt-4 text-xs sm:text-sm text-slate-600">
                        {/* Duration & Coverage */}
                        <div className="grid grid-cols-2 gap-3 sm:gap-4">
                          <div className="bg-brandBlue/5 rounded-lg p-2 sm:p-3">
                            <p className="text-xs font-semibold text-brandBlue mb-1">Duration</p>
                            <p className="text-slate-700 font-medium">{details.duration}</p>
                          </div>
                          <div className="bg-brandGreen/5 rounded-lg p-2 sm:p-3">
                            <p className="text-xs font-semibold text-brandGreen mb-1">Coverage</p>
                            <p className="text-slate-700 font-medium">{details.coverage}</p>
                          </div>
                        </div>

                        {/* What's Included */}
                        <div>
                          <p className="font-semibold text-brandBlue mb-2 text-xs">What's Included:</p>
                          <ul className="space-y-1.5 sm:space-y-2">
                            {details.includes.slice(0, 3).map((item) => (
                              <li key={item} className="flex items-start gap-2">
                                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-brandGreen flex-shrink-0" />
                                <span className="text-slate-600">{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Benefits */}
                        <div>
                          <p className="font-semibold text-brandBlue mb-2 text-xs">Key Benefits:</p>
                          <ul className="space-y-1 sm:space-y-1.5">
                            {details.benefits.map((benefit) => (
                              <li key={benefit} className="flex items-start gap-2">
                                <span className="text-brandGreen font-bold text-sm">✓</span>
                                <span className="text-slate-600">{benefit}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* CTA */}
                        <a href="#contact" className="inline-flex items-center gap-2 text-brandGreen font-semibold hover:translate-x-1 transition mt-3 text-xs sm:text-sm group">
                          {details.cta} <ArrowRight size={14} />
                        </a>
                      </div>
                    </div>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function AdditionalServices() {
  return (
    <section
      id="additional-services"
      className="relative overflow-hidden bg-[linear-gradient(135deg,#EEF9F1_0%,#E0F6E6_52%,#F8FCF8_100%)] py-20 backdrop-blur-sm sm:py-24 mobile-compact-section section-spacious"
    >
      <BubbleField count={8} small />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="More Services"
          title="Specialized Cleaning & Moving Services"
          subtitle="Additional services from the DOCX that extend our core offering."
        />
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {extraServices.map((service, index) => (
            <Reveal key={service.title} delay={index * 0.06}>
              <article className="glass h-full rounded-[1.5rem] p-6 shadow-[0_18px_45px_rgba(10,77,157,0.08)] transition duration-300 hover:-translate-y-2 hover:shadow-[0_24px_55px_rgba(76,175,80,0.18)]">
                <RippleDrops count={6} />
                <div className="grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br from-brandBlue/15 to-brandGreen/15 text-brandGreen">
                  <service.icon size={30} />
                </div>
                <h3 className="mt-5 text-2xl font-heading text-brandBlue">{service.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">{service.description}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceBreakdown() {
  return (
    <section
      id="service-breakdown"
      className="relative overflow-hidden bg-[linear-gradient(135deg,#F7FCF8_0%,#EAF8ED_55%,#F8FCF8_100%)] py-20 backdrop-blur-sm sm:py-24 mobile-compact-section section-spacious"
    >
      <BubbleField count={8} small />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Details"
          title="What Each Service Includes"
          subtitle="A quick breakdown of the deeper service scope from the DOCX."
        />
        <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {serviceBreakdowns.map((group, index) => (
            <Reveal key={group.title} delay={index * 0.05}>
              <article className="card-ripple rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-[0_10px_35px_rgba(10,77,157,0.08)]">
                <RippleDrops count={7} />
                <h3 className="font-heading text-2xl text-brandBlue">{group.title}</h3>
                <ul className="mt-4 space-y-3 text-sm leading-7 text-slate-600">
                  {group.items.map(item => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="mt-2 h-2.5 w-2.5 rounded-full bg-brandGreen" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhyChooseUs() {
  return (
    <section
      id="why-us"
      className="relative overflow-hidden bg-[linear-gradient(135deg,#EEF9F1_0%,#DFF4E4_52%,#F8FCF8_100%)] py-20 backdrop-blur-sm sm:py-24 mobile-compact-section section-spacious"
    >
      <BubbleField count={8} small />
      <div className="yellow-green-wash absolute inset-x-0 top-0 h-40 opacity-40" />
      <div className="absolute left-0 top-16 h-64 w-64 rounded-full bg-brandGreen/10 blur-3xl parallax-shape" data-parallax="0.2" />
      <div className="absolute right-0 bottom-0 h-80 w-80 rounded-full bg-skyBlue/15 blur-3xl parallax-shape" data-parallax="0.35" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Why Us"
          title="Why Choose JOSHEM"
          subtitle="What sets us apart from the rest"
        />
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {chooseReasons.map((item, index) => (
            <Reveal key={item.title} delay={index * 0.08}>
              <article className="glass group h-full rounded-[1.75rem] p-6 shadow-[0_18px_45px_rgba(10,77,157,0.08)] transition duration-300 hover:-translate-y-2 hover:rotate-[0.7deg] hover:shadow-[0_24px_55px_rgba(76,175,80,0.18)]">
                <RippleDrops count={6} />
                <div className="grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br from-brandBlue/15 to-brandGreen/15 text-brandGreen transition duration-300 group-hover:rotate-6">
                  <item.icon size={30} />
                </div>
                <h3 className="mt-5 text-2xl font-heading text-brandBlue">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600 mobile-hide md:block">{item.description}</p>
                <p className="mt-3 text-sm leading-7 text-slate-600 md:hidden">Trusted, efficient, and eco-friendly service.</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Stats() {
  return (
    <section
      id="stats"
      className="relative overflow-hidden bg-[linear-gradient(135deg,#EEF9F1_0%,#DFF4E5_50%,#F6FBF8_100%)] py-20 backdrop-blur-sm sm:py-24 mobile-compact-section section-spacious"
    >
      <BubbleField count={8} small />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="yellow-green-glow pointer-events-none absolute left-1/2 top-8 h-72 w-72 -translate-x-1/2 rounded-full opacity-25 blur-3xl" />
        <SectionHeading
          eyebrow="Results"
          title="Numbers That Build Trust"
          subtitle="A quick snapshot of the results we deliver."
        />
        <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {stats.map(stat => (
            <Counter key={stat.label} icon={stat.icon} label={stat.label} value={stat.value} suffix={stat.suffix} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Gallery() {
  return (
    <section
      id="gallery"
      className="relative overflow-hidden bg-[linear-gradient(135deg,#F0FBF3_0%,#E0F4E6_52%,#F8FCF8_100%)] py-20 backdrop-blur-sm sm:py-24 mobile-compact-section section-spacious"
    >
      <BubbleField count={8} small />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="yellow-green-wash pointer-events-none absolute inset-x-0 top-20 h-52 opacity-25" />
        <SectionHeading
          eyebrow="Gallery"
          title="Before & After Showcase"
          subtitle="Real results that speak for themselves"
        />
        <div className="mt-14 grid gap-8 lg:grid-cols-3">
          {beforeAfterPairs.map(pair => (
            <ImageComparisonSlider key={pair.label} before={pair.before} after={pair.after} label={pair.label} />
          ))}
        </div>
      </div>
    </section>
  );
}

function DomesticWorkers() {
  return (
    <section
      id="domestic"
      className="relative overflow-hidden bg-[linear-gradient(135deg,#EAF8ED_0%,#DDF2E2_50%,#F7FCF8_100%)] py-20 backdrop-blur-sm sm:py-24 mobile-compact-section section-spacious"
    >
      <BubbleField count={8} small />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="yellow-green-glow pointer-events-none absolute right-12 top-12 h-72 w-72 rounded-full opacity-25 blur-3xl" />
        <SectionHeading
          eyebrow="Domestic"
          title="Domestic Workers Services"
          subtitle="Reliable, vetted domestic staff matched to your household needs."
        />
        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {domesticServices.map((service, index) => (
            <Reveal key={service.title} delay={index * 0.08}>
              <article className="card-ripple overflow-hidden rounded-[1.75rem] bg-white shadow-[0_14px_45px_rgba(10,77,157,0.08)] transition duration-300 hover:-translate-y-2">
                <RippleDrops count={6} />
                <img src={service.image} alt={service.title} className="h-56 w-full object-cover" />
                <div className="p-6">
                  <h3 className="text-2xl font-heading text-brandBlue">{service.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600 mobile-hide md:block">{service.description}</p>
                  <p className="mt-3 text-sm leading-7 text-slate-600 md:hidden">Reliable domestic support for your home.</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <Reveal>
            <article className="card-ripple rounded-[1.75rem] bg-white p-6 shadow-[0_14px_45px_rgba(10,77,157,0.08)] sm:p-8">
              <RippleDrops count={6} />
              <h3 className="font-heading text-2xl text-brandBlue">Background-Checked Placement Roles</h3>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {domesticPlacement.roles.map(role => (
                  <div key={role} className="rounded-2xl bg-brandGreen/10 px-4 py-3 text-sm font-medium text-brandBlue">
                    {role}
                  </div>
                ))}
              </div>
              <p className="mt-5 text-sm leading-7 text-slate-600">{domesticPlacement.note}</p>
            </article>
          </Reveal>

          <Reveal delay={0.1}>
            <article className="card-ripple rounded-[1.75rem] bg-[linear-gradient(135deg,#EEF9F1_0%,#E0F6E6_52%,#F8FCF8_100%)] p-6 shadow-[0_14px_45px_rgba(10,77,157,0.08)] sm:p-8">
              <RippleDrops count={5} />
              <h3 className="font-heading text-2xl text-brandBlue">Placement Charges</h3>
              <ul className="mt-5 space-y-4 text-sm leading-7 text-slate-600">
                {domesticPlacement.fees.map(fee => (
                  <li key={fee} className="flex items-start gap-3">
                    <span className="mt-2 h-2.5 w-2.5 rounded-full bg-brandGreen" />
                    <span>{fee}</span>
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  return (
    <section id="testimonials" className="relative overflow-hidden bg-[linear-gradient(135deg,#0A4D9D_0%,#4CAF50_100%)] py-20 sm:py-24">
      <BubbleField count={8} small />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          light
          eyebrow="Testimonials"
          title="What Our Clients Say"
          subtitle="Trusted by homeowners and businesses alike"
        />
        <Swiper
          className="mt-14"
          modules={[Autoplay, FreeMode]}
          slidesPerView="auto"
          spaceBetween={24}
          loop
          freeMode
          speed={7000}
          autoplay={{
            delay: 0,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
        >
          {[...testimonials, ...testimonials].map((item, index) => (
            <SwiperSlide key={`${item.name}-${index}`} className="!w-[340px]">
              <article className="glass h-full rounded-[1.5rem] border-white/20 bg-white/15 p-6 text-white shadow-[0_20px_60px_rgba(0,0,0,0.12)]">
                <RippleDrops count={5} />
                <div className="flex items-center gap-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-14 w-14 rounded-full border-2 border-white object-cover"
                  />
                  <div>
                    <h3 className="font-heading text-xl text-white">{item.name}</h3>
                    <p className="text-sm text-white/75">{item.role}</p>
                  </div>
                </div>
                <div className="mt-4 flex items-center gap-1 text-amber-300">
                  {Array.from({ length: 5 }).map((_, starIndex) => (
                    <Star key={starIndex} size={15} fill="currentColor" />
                  ))}
                </div>
                <p className="mt-4 text-sm leading-7 text-white/90">"{item.quote}"</p>
              </article>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}

function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section
      id="faq"
      className="relative overflow-hidden bg-[linear-gradient(135deg,#EEF9F1_0%,#DFF4E5_52%,#F8FCF8_100%)] py-20 backdrop-blur-sm sm:py-24 mobile-compact-section section-spacious"
    >
      <BubbleField count={8} small />
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="yellow-green-wash pointer-events-none absolute inset-x-0 top-12 h-44 opacity-25" />
        <SectionHeading
          eyebrow="FAQ"
          title="Frequently Asked Questions"
          subtitle="Quick answers to common questions."
        />
        <div className="mt-14 space-y-4">
          {faqs.map((faq, index) => {
            const open = openIndex === index;
            return (
              <div key={faq.question} className="card-ripple rounded-[1.5rem] border border-slate-200 bg-lightGray/80">
                <RippleDrops count={5} />
                <button
                  type="button"
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                  onClick={() => setOpenIndex(open ? -1 : index)}
                >
                  <span className="font-heading text-xl text-brandBlue">{faq.question}</span>
                  <ChevronDown className={`transition duration-300 ${open ? 'rotate-180' : ''}`} />
                </button>
                <div className={`overflow-hidden px-6 transition-all duration-300 ${open ? 'faq-open pb-6' : 'faq-closed'}`}>
                  <p className="max-w-3xl text-sm leading-7 text-slate-600">{faq.answer}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    location: '',
    service: '',
    message: '',
  });
  const [feedback, setFeedback] = useState('');

  const update = event => {
    setForm(previous => ({ ...previous, [event.target.name]: event.target.value }));
  };

  const submit = event => {
    event.preventDefault();
    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email);
    const phoneValid = /^[0-9+\-\s()]{7,}$/.test(form.phone);

    if (!form.name || !form.phone || !form.email || !form.location || !form.service || !form.message) {
      setFeedback('Please fill in all fields.');
      return;
    }
    if (!emailValid) {
      setFeedback('Please enter a valid email address.');
      return;
    }
    if (!phoneValid) {
      setFeedback('Please enter a valid phone number.');
      return;
    }

    setFeedback('Thanks! Your message has been sent successfully. We will contact you shortly.');
    setForm({ name: '', phone: '', email: '', location: '', service: '', message: '' });
  };

  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-[linear-gradient(135deg,#EEF9F2_0%,#DFF5E7_52%,#F8FCF8_100%)] py-20 backdrop-blur-sm sm:py-24 mobile-compact-section section-spacious"
    >
      <BubbleField count={8} small />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="yellow-green-glow pointer-events-none absolute left-10 top-10 h-72 w-72 rounded-full opacity-20 blur-3xl" />
        <SectionHeading
          eyebrow="Contact"
          title="Detailed Request Form"
          subtitle="Need more detail? Share the extra information below for a fuller quote."
        />
        <div className="mt-14 grid gap-8 lg:grid-cols-[1.45fr_0.9fr]">
          <Reveal>
            <form onSubmit={submit} className="card-ripple rounded-[1.75rem] bg-white p-6 shadow-[0_18px_60px_rgba(10,77,157,0.08)] sm:p-8">
              <RippleDrops count={7} />
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-2 block text-sm font-medium text-slate-700">Name</span>
                  <input
                    name="name"
                    value={form.name}
                    onChange={update}
                    className="focus-glow w-full rounded-2xl border border-slate-200 px-4 py-3"
                    placeholder="Your name"
                  />
                </label>
                <label className="block">
                  <span className="mb-2 block text-sm font-medium text-slate-700">Phone</span>
                  <input
                    name="phone"
                    value={form.phone}
                    onChange={update}
                    className="focus-glow w-full rounded-2xl border border-slate-200 px-4 py-3"
                    placeholder="+254..."
                  />
                </label>
                <label className="block">
                  <span className="mb-2 block text-sm font-medium text-slate-700">Email</span>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={update}
                    className="focus-glow w-full rounded-2xl border border-slate-200 px-4 py-3"
                    placeholder="you@example.com"
                  />
                </label>
                <label className="block">
                  <span className="mb-2 block text-sm font-medium text-slate-700">Location</span>
                  <input
                    name="location"
                    value={form.location}
                    onChange={update}
                    className="focus-glow w-full rounded-2xl border border-slate-200 px-4 py-3"
                    placeholder="Nairobi / Westlands"
                  />
                </label>
                <label className="block">
                  <span className="mb-2 block text-sm font-medium text-slate-700">Service Needed</span>
                  <select
                    name="service"
                    value={form.service}
                    onChange={update}
                    className="focus-glow w-full rounded-2xl border border-slate-200 px-4 py-3"
                  >
                    <option value="">Select a service</option>
                    {services.map(service => (
                      <option key={service.title} value={service.title}>
                        {service.title}
                      </option>
                    ))}
                    <option value="Domestic Workers Services">Domestic Workers Services</option>
                  </select>
                </label>
              </div>
              <label className="mt-5 block">
                <span className="mb-2 block text-sm font-medium text-slate-700">Message</span>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={update}
                  rows={5}
                  className="focus-glow w-full rounded-2xl border border-slate-200 px-4 py-3"
                  placeholder="Tell us about your cleaning needs"
                />
              </label>
              {feedback ? (
                <p className={`mt-4 rounded-2xl px-4 py-3 text-sm ${feedback.startsWith('Thanks') ? 'bg-brandGreen/10 text-brandGreen' : 'bg-rose-50 text-rose-600'}`}>
                  {feedback}
                </p>
              ) : null}
              <button
                type="submit"
                className="mt-5 inline-flex w-full items-center justify-center rounded-full bg-brandBlue px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-brandBlue/90 sm:py-4 sm:text-base"
              >
                Send Message
              </button>
            </form>
          </Reveal>

          <Reveal delay={0.12}>
            <aside className="card-ripple mobile-hide rounded-[1.75rem] bg-lightGray p-6 shadow-[0_18px_60px_rgba(10,77,157,0.08)] sm:p-8 lg:block">
              <RippleDrops count={6} />
              <h3 className="font-heading text-2xl text-brandBlue">Contact Details</h3>
              <div className="mt-6 space-y-4">
                {contactDetails.map(detail => (
                  <div key={detail.title} className="card-ripple rounded-2xl bg-white p-4">
                    <RippleDrops count={4} />
                    <div className="flex items-start gap-4">
                      <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-brandBlue/10 text-brandBlue">
                        <detail.icon size={22} />
                      </div>
                      <div>
                        <h4 className="font-semibold text-brandBlue">{detail.title}</h4>
                        <div className="mt-1 space-y-1 text-sm text-slate-600">
                          {detail.lines.map(line => (
                            <p key={line}>{line}</p>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 flex items-center gap-3">
                {socialLinks.map(social => (
                  <a
                    key={social.label}
                    href="#"
                    aria-label={social.label}
                    className={`grid h-11 w-11 place-items-center rounded-full text-white transition hover:-translate-y-0.5 hover:scale-105 ${social.color}`}
                  >
                    <social.icon size={18} />
                  </a>
                ))}
              </div>
            </aside>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function MobileBottomBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-[60] border-t border-white/20 bg-[linear-gradient(135deg,rgba(245,252,245,0.98)_0%,rgba(224,246,230,0.98)_100%)] px-3 py-2 shadow-[0_-10px_30px_rgba(10,77,157,0.12)] backdrop-blur-xl md:hidden">
      <div className="mx-auto grid max-w-7xl grid-cols-3 gap-2">
        <a
          href="tel:+254700000000"
          className="flex items-center justify-center gap-2 rounded-2xl bg-white/95 px-3 py-3 text-sm font-semibold text-brandBlue shadow-sm"
        >
          <Phone size={16} /> Call
        </a>
        <a
          href={buildWhatsAppUrl({ service: 'Office cleaning' })}
          className="flex items-center justify-center gap-2 rounded-2xl bg-[#25D366] px-3 py-3 text-sm font-semibold text-white shadow-sm"
        >
          <MessageCircle size={16} /> WhatsApp
        </a>
        <a
          href="#quick-quote"
          className="flex items-center justify-center gap-2 rounded-2xl bg-brandGreen px-3 py-3 text-sm font-semibold text-white shadow-sm"
        >
          Quote
        </a>
      </div>
    </div>
  );
}

function CTA() {
  return (
    <section className="relative overflow-hidden bg-[linear-gradient(135deg,#0A4D9D_0%,#4CAF50_100%)] py-20 sm:py-24 mobile-compact-section section-spacious">
      <BubbleField count={12} small />
      <div className="yellow-green-wash pointer-events-none absolute inset-x-0 top-0 h-28 opacity-35" />
      <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <Reveal>
          <h2 className="text-3xl font-heading text-white sm:text-4xl lg:text-5xl">
            Ready for a Cleaner Environment?
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-white/90">
            Contact JOSHEM today and experience professional cleaning services tailored to your needs.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <a
              href="tel:+254700000000"
              className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-brandBlue transition hover:-translate-y-0.5 sm:px-8 sm:py-4 sm:text-base"
            >
              Call Now
            </a>
            <a
              href="https://wa.me/254700000000"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 sm:px-8 sm:py-4 sm:text-base"
            >
              <MessageCircle size={18} /> WhatsApp Us
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[linear-gradient(180deg,#062a5c_0%,#0A4D9D_100%)] text-white">
      <BubbleField count={10} small />
      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="font-heading text-3xl">{brand.name}</div>
            <p className="mt-4 text-sm leading-7 text-white/70">
              Professional cleaning services you can trust. We deliver premium results for homes, offices, and
              businesses across Nairobi and beyond.
            </p>
          </div>
          <div>
            <h3 className="font-heading text-xl">Quick Links</h3>
            <ul className="mt-4 space-y-3 text-sm text-white/75">
              {['Home', 'About', 'Services', 'Why Us', 'Stats', 'Gallery', 'Domestic', 'Testimonials', 'FAQ', 'Contact'].map(item => (
                <li key={item}>
                  <a href={`#${item.toLowerCase().replace(/\s+/g, '-').replace(/us/, 'us')}`} className="hover:text-brandGreen">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-heading text-xl">Our Services</h3>
            <ul className="mt-4 space-y-3 text-sm text-white/75">
              {services.map(service => (
                <li key={service.title}>
                  <a href="#services" className="hover:text-brandGreen">
                    {service.title}
                  </a>
                </li>
              ))}
              <li>
                <a href="#domestic" className="hover:text-brandGreen">
                  Domestic Workers Services
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-heading text-xl">Contact Us</h3>
            <div className="mt-4 space-y-3 text-sm text-white/75">
              <p>+254 XXX XXX XXX</p>
              <p>info@joshemcleaning.co.ke</p>
              <p>Nairobi, Kenya</p>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-white/10 pt-6 text-center text-sm text-white/60">
          © 2026 JOSHEM General Cleaning Services Ltd. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  const rootRef = useRef(null);

  useEffect(() => {
    const revealItems = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      },
      { threshold: 0.15 }
    );

    revealItems.forEach(item => observer.observe(item));

    const parallaxItems = gsap.utils.toArray('[data-parallax]');
    parallaxItems.forEach(item => {
      gsap.to(item, {
        y: () => Number(item.dataset.parallax) * -90,
        ease: 'none',
        scrollTrigger: {
          trigger: item,
          scrub: true,
          start: 'top bottom',
          end: 'bottom top',
        },
      });
    });

    const line = document.querySelector('.timeline-line');
    if (line) {
      gsap.to(line, {
        strokeDashoffset: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: '#hero',
          start: 'top top',
          end: 'bottom center',
          scrub: true,
        },
      });
    }

    return () => observer.disconnect();
  }, []);

  return (
    <motion.div
      ref={rootRef}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="min-h-screen overflow-x-hidden font-body"
    >
      <Navbar />
      <main className="pb-24 md:pb-0">
        <Hero />
        <About />
        <Services />
        <AdditionalServices />
        <ServiceBreakdown />
        <WhyChooseUs />
        <Stats />
        <Gallery />
        <DomesticWorkers />
        <Testimonials />
        <FAQ />
        <Contact />
        <CTA />
      </main>
      <Footer />
      <MobileBottomBar />
    </motion.div>
  );
}
