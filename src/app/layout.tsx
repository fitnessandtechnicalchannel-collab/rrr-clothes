import type { Metadata } from 'next';
import { Outfit, Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import AnnouncementBar from '@/components/layout/AnnouncementBar';
import MobileSidebar from '@/components/layout/MobileSidebar';
import MobileBottomNav from '@/components/layout/MobileBottomNav';
import CartDrawer from '@/components/shared/CartDrawer';
import SearchOverlay from '@/components/shared/SearchOverlay';
import ToastContainer from '@/components/shared/ToastContainer';

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700', '800', '900'],
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
  weight: ['400', '600', '700', '800', '900'],
});

export const metadata: Metadata = {
  title: {
    default: 'RRR — Rare · Rich · Right | Premium Fashion for the Modern Generation',
    template: '%s | RRR Fashion',
  },
  description:
    'Shop RRR (Rare · Rich · Right) — India\'s premium fashion brand for men and women. Explore streetwear, oversized fits, premium basics, and more. Fast delivery · Easy returns · Secure payments.',
  keywords: ['fashion', 'streetwear', 'RRR', 'rare rich right', 'premium clothes', 'oversized tee', 'Indian fashion brand'],
  authors: [{ name: 'RRR Fashion' }],
  creator: 'RRR Fashion',
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://rrrfashion.com',
    title: 'RRR — Rare · Rich · Right',
    description: 'Premium fashion for the modern generation.',
    siteName: 'RRR Fashion',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'RRR — Rare · Rich · Right',
    description: 'Premium fashion for the modern generation.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${outfit.variable} ${inter.variable} ${playfair.variable}`}>
      <body>
        <AnnouncementBar />
        <Header />
        <MobileSidebar />
        <SearchOverlay />
        <CartDrawer />
        <ToastContainer />

        {/* Page content — top offset = sticky header only */}
        <main
          style={{
            paddingTop: 'var(--header-h)',
            paddingBottom: 'var(--main-pb)',
          }}
        >
          {children}
        </main>

        <Footer />
        <MobileBottomNav />
      </body>
    </html>
  );
}
