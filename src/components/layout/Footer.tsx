'use client';

import Link from 'next/link';
import { ExternalLink, Mail, Phone, Play } from 'lucide-react';

const FOOTER_LINKS = {
  Shop: [
    { label: 'Men', href: '/collections/men' },
    { label: 'Women', href: '/collections/women' },
    { label: 'New Arrivals', href: '/collections/new-arrivals' },
    { label: 'Collections', href: '/collections' },
    { label: 'Sale', href: '/collections/sale' },
  ],
  Support: [
    { label: 'Help Center', href: '#' },
    { label: 'Returns & Refunds', href: '#' },
    { label: 'Shipping Policy', href: '#' },
    { label: 'FAQs', href: '#' },
    { label: 'Track Order', href: '#' },
  ],
  Company: [
    { label: 'About RRR', href: '#' },
    { label: 'Careers', href: '#' },
    { label: 'Contact Us', href: '#' },
    { label: 'Sustainability', href: '#' },
    { label: 'Press', href: '#' },
  ],
};

const SOCIAL = [
  { icon: ExternalLink, label: 'Instagram', href: '#', color: '#E1306C' },
  { icon: Play, label: 'YouTube', href: '#', color: '#FF0000' },
  { icon: ExternalLink, label: 'Pinterest', href: '#', color: '#E60023' },
  { icon: ExternalLink, label: 'TikTok', href: '#', color: '#010101' },
];

export default function Footer() {
  return (
    <footer style={{ background: 'var(--black)', color: 'var(--white)' }} className="mt-16">
      {/* Newsletter Strip */}
      <div
        className="border-b"
        style={{ borderColor: 'rgba(212,175,55,0.2)', background: 'rgba(212,175,55,0.06)' }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl font-bold" style={{ fontFamily: 'var(--font-display)', color: 'var(--gold)' }}>
              Join the RRR Family
            </h3>
            <p className="text-sm mt-1" style={{ color: 'rgba(255,255,255,0.5)' }}>
              Get exclusive drops, early access & 15% off your first order.
            </p>
          </div>
          <form className="flex w-full md:w-auto gap-2" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 md:w-64 px-4 py-3 rounded-lg text-sm bg-white/10 border border-white/20 text-white placeholder:text-white/40 focus:outline-none focus:border-yellow-500 transition-colors"
            />
            <button
              type="submit"
              className="btn btn-gold px-6 py-3 whitespace-nowrap text-xs"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-14">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="col-span-2 md:col-span-4 lg:col-span-1">
            <Link href="/" className="block mb-4">
              <div className="text-2xl font-black tracking-widest" style={{ fontFamily: 'var(--font-display)', letterSpacing: '0.3em', color: 'var(--white)' }}>RRR</div>
              <div className="text-[10px] font-semibold tracking-widest" style={{ color: 'var(--gold)' }}>Rare • Rich • Right</div>
            </Link>
            <p className="text-sm leading-relaxed mb-5" style={{ color: 'rgba(255,255,255,0.45)', maxWidth: '220px' }}>
              Premium fashion for the modern generation. Rare styles, rich quality, always the right choice.
            </p>
            <div className="flex gap-3">
              {SOCIAL.map((s) => (
                <Link
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="w-9 h-9 rounded-full flex items-center justify-center transition-all hover:scale-110"
                  style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)' }}
                >
                  <s.icon size={15} color="#E5C66B" />
                </Link>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(FOOTER_LINKS).map(([section, links]) => (
            <div key={section}>
              <h4 className="text-xs font-bold tracking-widest uppercase mb-4" style={{ color: 'var(--gold)' }}>
                {section}
              </h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm transition-colors hover:text-yellow-400"
                      style={{ color: 'rgba(255,255,255,0.5)' }}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact */}
          <div>
            <h4 className="text-xs font-bold tracking-widest uppercase mb-4" style={{ color: 'var(--gold)' }}>
              Contact
            </h4>
            <div className="space-y-3">
              <a href="mailto:support@rrrfashion.com" className="flex items-center gap-2 text-sm transition-colors hover:text-yellow-400" style={{ color: 'rgba(255,255,255,0.5)' }}>
                <Mail size={14} /> support@rrrfashion.com
              </a>
              <a href="tel:+918800001234" className="flex items-center gap-2 text-sm transition-colors hover:text-yellow-400" style={{ color: 'rgba(255,255,255,0.5)' }}>
                <Phone size={14} /> +91 88000 01234
              </a>
              <p className="text-xs mt-4" style={{ color: 'rgba(255,255,255,0.35)' }}>
                Mon–Sat, 10AM – 7PM IST
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div
        className="border-t"
        style={{ borderColor: 'rgba(212,175,55,0.15)' }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>
            © {new Date().getFullYear()} RRR (Rare · Rich · Right). All rights reserved.
          </p>
          <div className="flex gap-4">
            {['Privacy Policy', 'Terms of Use', 'Cookie Policy'].map((t) => (
              <Link key={t} href="#" className="text-xs transition-colors hover:text-yellow-400" style={{ color: 'rgba(255,255,255,0.3)' }}>
                {t}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
