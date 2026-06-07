'use client';

import { useState } from 'react';
import { User as UserIcon, Package, Heart, MapPin, Settings, ChevronRight, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { User } from '@/types';
import Link from 'next/link';

const STATUS_COLORS: Record<string, string> = {
  Delivered: '#16a34a',
  Shipped: '#2563eb',
  Processing: '#d97706',
  Cancelled: '#dc2626',
};

interface ProfileClientProps {
  user: User;
}

const TABS = [
  { id: 'orders', label: 'My Orders', icon: Package },
  { id: 'wishlist', label: 'Wishlist', icon: Heart },
  { id: 'addresses', label: 'Addresses', icon: MapPin },
  { id: 'settings', label: 'Account Settings', icon: Settings },
];

export default function ProfileClient({ user }: ProfileClientProps) {
  const [activeTab, setActiveTab] = useState('orders');

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-10 py-10">
      {/* Profile Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center gap-5 mb-8 p-6 rounded-2xl"
        style={{ background: 'linear-gradient(135deg, #111 0%, #222 100%)', border: '1px solid rgba(212,175,55,0.2)' }}
      >
        <div className="relative">
          {user.avatar ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={user.avatar} alt={user.name} className="w-16 h-16 rounded-full object-cover" />
          ) : (
            <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ background: 'rgba(212,175,55,0.2)' }}>
              <UserIcon size={28} style={{ color: 'var(--gold)' }} />
            </div>
          )}
          <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center" style={{ background: 'var(--gold)' }}>
            <CheckCircle size={12} color="#fff" />
          </div>
        </div>
        <div>
          <h1 className="text-xl font-bold text-white" style={{ fontFamily: 'var(--font-display)' }}>{user.name}</h1>
          <p className="text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>{user.email}</p>
          <p className="text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>{user.phone}</p>
        </div>
        <div className="ml-auto hidden md:block">
          <span className="badge badge-gold">Premium Member</span>
        </div>
      </motion.div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Tabs */}
        <div className="lg:w-56 flex-shrink-0">
          <nav className="flex lg:flex-col gap-1">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all text-left w-full"
                style={{
                  background: activeTab === tab.id ? 'rgba(212,175,55,0.1)' : 'transparent',
                  color: activeTab === tab.id ? 'var(--gold)' : 'var(--gray-dark)',
                  border: activeTab === tab.id ? '1px solid rgba(212,175,55,0.25)' : '1px solid transparent',
                }}
              >
                <tab.icon size={17} />
                <span className="hidden md:block">{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Content Area */}
        <div className="flex-1">
          {/* Orders */}
          {activeTab === 'orders' && (
            <div>
              <h2 className="text-xl font-bold mb-5" style={{ fontFamily: 'var(--font-display)' }}>My Orders</h2>
              <div className="space-y-4">
                {user.orders.map((order) => (
                  <div key={order.id} className="border border-gray-100 rounded-2xl overflow-hidden">
                    <div className="flex items-center justify-between px-5 py-3.5" style={{ background: 'var(--gray-pale)' }}>
                      <div>
                        <p className="text-sm font-bold" style={{ color: 'var(--charcoal)' }}>{order.id}</p>
                        <p className="text-xs" style={{ color: 'var(--gray-mid)' }}>{new Date(order.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span
                          className="text-xs font-bold px-3 py-1 rounded-full"
                          style={{ background: `${STATUS_COLORS[order.status]}20`, color: STATUS_COLORS[order.status] }}
                        >
                          {order.status}
                        </span>
                        <p className="text-sm font-bold" style={{ color: 'var(--charcoal)' }}>₹{order.total.toLocaleString('en-IN')}</p>
                      </div>
                    </div>
                    <div className="px-5 py-4">
                      <div className="flex gap-3 overflow-x-auto no-scrollbar">
                        {order.items.map((item, i) => (
                          <div key={i} className="flex-shrink-0 flex gap-3 items-center min-w-[200px]">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={item.image} alt={item.name} className="w-14 h-16 object-cover rounded-lg flex-shrink-0" />
                            <div>
                              <p className="text-xs font-semibold line-clamp-2" style={{ color: 'var(--charcoal)' }}>{item.name}</p>
                              <p className="text-[10px] mt-0.5" style={{ color: 'var(--gray-mid)' }}>Size: {item.size} · Qty: {item.qty}</p>
                              <p className="text-xs font-bold mt-1">₹{item.price.toLocaleString('en-IN')}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Wishlist shortcut */}
          {activeTab === 'wishlist' && (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Heart size={48} style={{ color: 'var(--gold)' }} />
              <h2 className="text-xl font-bold mt-4 mb-2" style={{ fontFamily: 'var(--font-display)' }}>Your Wishlist</h2>
              <p className="text-sm mb-5" style={{ color: 'var(--gray-mid)' }}>View and manage your saved items</p>
              <Link href="/wishlist" className="btn btn-gold px-8 py-3">Go to Wishlist</Link>
            </div>
          )}

          {/* Addresses */}
          {activeTab === 'addresses' && (
            <div>
              <h2 className="text-xl font-bold mb-5" style={{ fontFamily: 'var(--font-display)' }}>Saved Addresses</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {user.addresses.map((addr) => (
                  <div key={addr.id} className="p-5 rounded-2xl border border-gray-100 relative">
                    {addr.isDefault && (
                      <span className="absolute top-4 right-4 badge badge-gold text-[9px]">Default</span>
                    )}
                    <div className="flex items-center gap-2 mb-2">
                      <MapPin size={15} style={{ color: 'var(--gold)' }} />
                      <p className="text-sm font-bold">{addr.label}</p>
                    </div>
                    <p className="text-sm font-semibold" style={{ color: 'var(--charcoal)' }}>{addr.name}</p>
                    <p className="text-sm mt-0.5" style={{ color: 'var(--gray-dark)' }}>{addr.line1}</p>
                    {addr.line2 && <p className="text-sm" style={{ color: 'var(--gray-dark)' }}>{addr.line2}</p>}
                    <p className="text-sm" style={{ color: 'var(--gray-dark)' }}>{addr.city}, {addr.state} — {addr.pincode}</p>
                    <button className="mt-3 text-xs font-semibold" style={{ color: 'var(--gold)' }}>Edit Address</button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Settings */}
          {activeTab === 'settings' && (
            <div>
              <h2 className="text-xl font-bold mb-5" style={{ fontFamily: 'var(--font-display)' }}>Account Settings</h2>
              <div className="space-y-3">
                {['Edit Profile', 'Change Password', 'Notification Preferences', 'Privacy Settings', 'Delete Account'].map((item) => (
                  <button key={item} className="w-full flex items-center justify-between px-5 py-4 border border-gray-100 rounded-xl transition-colors hover:bg-yellow-50 text-sm font-medium" style={{ color: 'var(--charcoal)' }}>
                    {item}
                    <ChevronRight size={16} style={{ color: 'var(--gray-mid)' }} />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
