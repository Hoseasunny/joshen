import {
  ArrowRight,
  Bath,
  BedDouble,
  Brush,
  Building2,
  CalendarCheck2,
  CarFront,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Facebook,
  FileSearch,
  Flower2,
  Home,
  Layers3,
  Linkedin,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Microwave,
  MoveRight,
  ShieldCheck,
  Sparkles,
  Star,
  TabletSmartphone,
  Target,
  Users,
  Wand2,
  Wind,
  X,
  Instagram,
  Twitter,
  Phone,
} from 'lucide-react';

export const brand = {
  name: 'JOSHEM',
  fullName: 'JOSHEM General Cleaning Services Ltd',
};

export const navLinks = [
  { label: 'Home', href: '#hero' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Why Us', href: '#why-us' },
  { label: 'Stats', href: '#stats' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Domestic', href: '#domestic' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contact', href: '#contact' },
];

export const services = [
  {
    title: 'Residential Cleaning',
    description: 'Complete home cleaning services that keep your living space fresh, healthy, and inviting.',
    icon: Home,
    image: '/icons/residential.jpg',
  },
  {
    title: 'Office Cleaning',
    description: 'Professional workplace cleaning to boost productivity and create a healthy environment.',
    icon: Building2,
    image: '/icons/office.jpg',
  },
  {
    title: 'Laundry Services',
    description: 'Expert fabric care with modern equipment for pristine, fresh-smelling results.',
    icon: Bath,
    image: '/icons/laundry.jpg',
  },
  {
    title: 'Sofa Cleaning',
    description: 'Deep cleaning that removes stains, allergens, and odors from your furniture.',
    icon: Brush,
    image: '/icons/sofa.jpg',
  },
  {
    title: 'Carpet Cleaning',
    description: 'Specialized techniques to restore the beauty and hygiene of your carpets.',
    icon: Layers3,
    image: '/icons/carpet.jpg',
  },
  {
    title: 'Move-In / Move-Out',
    description: 'Thorough cleaning services to prepare spaces for new occupants.',
    icon: CalendarCheck2,
    image: '/icons/move.jpg',
  },
  {
    title: 'Fumigation Services',
    description: 'Effective pest control solutions for a safe, pest-free environment.',
    icon: ShieldCheck,
    image: '/icons/safe.jpg',
  },
  {
    title: 'Landscaping Design',
    description: 'Beautiful outdoor spaces designed and maintained to perfection.',
    icon: Flower2,
    image: '/icons/outdoor.jpg',
  },
];

export const chooseReasons = [
  {
    title: 'Professionally Trained Staff',
    description: 'Our team undergoes rigorous training to deliver expert-level service.',
    icon: Users,
  },
  {
    title: 'Reliable Service Delivery',
    description: 'We respect your time with punctual, consistent, and dependable service.',
    icon: Clock3,
  },
  {
    title: 'Affordable Pricing',
    description: 'Premium quality cleaning at competitive, transparent rates.',
    icon: FileSearch,
  },
  {
    title: 'Eco-Friendly Solutions',
    description: 'Safe, sustainable cleaning products that protect your family and the planet.',
    icon: Wind,
  },
  {
    title: 'Modern Equipment',
    description: 'State-of-the-art tools and technology for superior cleaning efficiency.',
    icon: Wand2,
  },
  {
    title: 'Satisfaction Guarantee',
    description: 'We stand behind our work with a 100% customer satisfaction promise.',
    icon: CheckCircle2,
  },
];

export const stats = [
  { label: 'Projects Completed', value: 500, suffix: '+', icon: Target },
  { label: 'Happy Clients', value: 300, suffix: '+', icon: Sparkles },
  { label: 'Properties Cleaned', value: 1000, suffix: '+', icon: Building2 },
  { label: 'Expert Staff', value: 50, suffix: '+', icon: Users },
];

export const beforeAfterPairs = [
  {
    label: 'Office Refresh',
    before: '/icons/office.jpg',
    after: '/icons/professional.jpg',
  },
  {
    label: 'Sofa Revival',
    before: '/icons/sofa.jpg',
    after: '/icons/customer.jpg',
  },
  {
    label: 'Washroom Reset',
    before: '/icons/washroom.jpg',
    after: '/icons/safe.jpg',
  },
];

export const domesticServices = [
  {
    title: 'Housekeeping Support',
    description: 'Reliable day-to-day domestic support matched to your household routine.',
    image: '/icons/trained.jpg',
  },
  {
    title: 'Live-In Assistance',
    description: 'Carefully vetted live-in staff for families needing consistent home support.',
    image: '/icons/trainedd.jpg',
  },
  {
    title: 'Domestic Staff Placement',
    description: 'Trusted placement services with screening, matching, and follow-up support.',
    image: '/icons/flexible.jpg',
  },
];

export const testimonials = [
  {
    name: 'Sarah M.',
    role: 'Office Manager',
    quote:
      'JOSHEM transformed our office. The team was professional, thorough, and left everything spotless.',
    image: '/icons/professional.jpg',
  },
  {
    name: 'James K.',
    role: 'Homeowner',
    quote: 'Best cleaning service we have ever used. Reliable, affordable, and always on time.',
    image: '/icons/residential.jpg',
  },
  {
    name: 'Patricia N.',
    role: 'Business Owner',
    quote: 'Their attention to detail is incredible. My carpets look brand new.',
    image: '/icons/carpet.jpg',
  },
  {
    name: 'David O.',
    role: 'Parent',
    quote: 'Eco-friendly products and amazing results. I feel safe having them clean my home.',
    image: '/icons/eco-friendly.jpg',
  },
  {
    name: 'Grace W.',
    role: 'Tenant',
    quote: 'The move-out cleaning saved me thousands on my deposit. Worth every penny.',
    image: '/icons/move.jpg',
  },
  {
    name: 'Michael T.',
    role: 'Facility Manager',
    quote: 'Professional staff, modern equipment, and outstanding customer service. Highly recommend.',
    image: '/icons/equipment.jpg',
  },
];

export const faqs = [
  {
    question: 'Do you offer free quotes?',
    answer:
      'Yes. You can request a no-obligation quote through the contact form or by phone/WhatsApp.',
  },
  {
    question: 'Which areas do you serve?',
    answer:
      'We primarily serve Nairobi and surrounding areas, with flexible arrangements for special projects.',
  },
  {
    question: 'Do you bring your own cleaning equipment?',
    answer:
      'Yes. Our team arrives with professional tools, cleaning products, and protective gear when needed.',
  },
  {
    question: 'Can I schedule recurring service?',
    answer:
      'Absolutely. We can arrange one-time, weekly, bi-weekly, or monthly cleaning plans.',
  },
];

export const contactDetails = [
  { icon: Phone, title: 'Phone', lines: ['+254 XXX XXX XXX', '+254 XXX XXX XXX'] },
  { icon: Mail, title: 'Email', lines: ['info@joshemcleaning.co.ke'] },
  { icon: Clock3, title: 'Business Hours', lines: ['Mon - Sat: 8:00 AM - 6:00 PM'] },
  { icon: MapPin, title: 'Location', lines: ['Nairobi, Kenya'] },
];

export const socialLinks = [
  { icon: Facebook, label: 'Facebook', color: 'bg-blue-600' },
  { icon: Instagram, label: 'Instagram', color: 'bg-pink-500' },
  { icon: Twitter, label: 'X', color: 'bg-slate-900' },
  { icon: Linkedin, label: 'LinkedIn', color: 'bg-blue-700' },
];

export const icons = {
  menu: Menu,
  close: X,
  arrowRight: ArrowRight,
  chevronDown: ChevronDown,
  chevronLeft: ChevronLeft,
  chevronRight: ChevronRight,
  sparkles: Sparkles,
  message: MessageCircle,
  phone: Phone,
  moveRight: MoveRight,
  tablet: TabletSmartphone,
  star: Star,
  bath: Bath,
  microwave: Microwave,
};
