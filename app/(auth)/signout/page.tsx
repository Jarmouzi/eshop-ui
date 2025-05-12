'use client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function SignoutPage() {
  const router = useRouter();

  useEffect(() => {
    async function handleLogout() {
      try {
        const response = await fetch('/api/auth/signout', {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
          router.push('/');
        } else {
          console.error('Logout failed:', await response.json());
        }
      } catch (error) {
        console.error('Logout error:', error);
      }
    }

    handleLogout();
  }, [router]);

  return <div>خروج از سامانه...</div>;
}
