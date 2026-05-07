'use client';

import { useEffect } from 'react';
import Cookies from 'js-cookie';
import { useSearchParams } from 'next/navigation';

export default function ReferralTracker() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const refCode = searchParams.get('ref');
    if (refCode) {
      Cookies.set('referral_code', refCode, { expires: 7 });
    }
  }, [searchParams]);

  return null;
}
