import { getCurrentUser } from '@/services/api';
import ProfileClient from './ProfileClient';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'My Profile',
  description: 'Manage your RRR account, orders, addresses, and settings.',
};

export default async function ProfilePage() {
  const user = await getCurrentUser();
  return <ProfileClient user={user} />;
}
