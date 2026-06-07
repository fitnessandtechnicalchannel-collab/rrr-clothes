'use client';

import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AnnouncementBar() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (isVisible) {
        document.documentElement.style.setProperty('--announcement-h', '36px');
      } else {
        document.documentElement.style.setProperty('--announcement-h', '0px');
      }
    }
  }, [isVisible]);

  const messages = [
    '🔥 Download Our App & Get 10% Extra Cashback',
    '✨ Free Shipping on Orders Above ₹999',
    '🎁 Use Code RRR20 for 20% Off Your First Order',
    '👑 New Summer Collection Now Live — Shop Now',
    '⚡ Express Delivery Available in 2 Hours',
  ];

  const combined = [...messages, ...messages].join('   •   ');

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 60, opacity: 0 }}
          transition={{ duration: 0.35 }}
          // Fixed to bottom, above mobile bottom nav on mobile, flush on desktop
          className="fixed bottom-0 left-0 right-0 z-40 lg:z-50"
          style={{
            background: 'linear-gradient(90deg, #0f0f0f 0%, #1a1a1a 50%, #0f0f0f 100%)',
            borderTop: '1px solid rgba(212,175,55,0.35)',
            // On mobile, stay above the 64px bottom nav
            paddingBottom: 'env(safe-area-inset-bottom)',
          }}
        >
          {/* Mobile: push above bottom nav (64px) */}
          <div
            className="lg:mb-0"
            style={{ marginBottom: '0' }}
          >
            <div className="flex items-center justify-between px-3 lg:px-6" style={{ height: '36px' }}>
              <div className="flex-1 overflow-hidden">
                <div className="animate-marquee whitespace-nowrap flex items-center">
                  <span
                    className="text-[11px] lg:text-xs font-medium tracking-wider"
                    style={{ color: '#E5C66B', fontFamily: 'var(--font-display, Outfit, sans-serif)' }}
                  >
                    {combined}
                  </span>
                </div>
              </div>
              <button
                onClick={() => setIsVisible(false)}
                className="ml-3 flex-shrink-0 p-1 rounded-full transition-colors hover:bg-white/10"
                aria-label="Close announcement"
                style={{ color: '#E5C66B' }}
              >
                <X size={13} />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
