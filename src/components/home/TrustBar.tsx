'use client';

import { motion } from 'framer-motion';
import { Shield, Truck, RotateCcw, Lock } from 'lucide-react';

const TRUST_ITEMS = [
  { icon: Shield, label: 'Premium Quality', desc: '100% authentic products' },
  { icon: Truck, label: 'Fast Delivery', desc: '2-5 business days' },
  { icon: RotateCcw, label: 'Easy Returns', desc: '30-day hassle-free' },
  { icon: Lock, label: 'Secure Payments', desc: '256-bit SSL encryption' },
];

export default function TrustBar() {
  return (
    <section
      className="border-y"
      style={{ borderColor: 'rgba(212,175,55,0.15)', background: 'var(--off-white)' }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {TRUST_ITEMS.map((item, i) => (
            <motion.div
              key={item.label}
              className="flex items-center gap-3"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
            >
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ background: 'rgba(212,175,55,0.12)', border: '1px solid rgba(212,175,55,0.25)' }}
              >
                <item.icon size={18} style={{ color: 'var(--gold)' }} />
              </div>
              <div>
                <p className="text-sm font-bold" style={{ fontFamily: 'var(--font-display)', color: 'var(--black)' }}>
                  {item.label}
                </p>
                <p className="text-xs" style={{ color: 'var(--gray-mid)' }}>{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
