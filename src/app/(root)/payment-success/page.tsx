'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Lottie from 'lottie-react';
import successAnimation from '@/public/animation.json';

export default function PaymentSuccessPage() {
  const params = useSearchParams();
  const [refId, setRefId] = useState<string | null>(null);

  useEffect(() => {
    const id = params.get('ref_id');
    setRefId(id);
  }, [params]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-50 text-green-800 p-4 text-center">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
        <h1 className="text-3xl font-bold mb-4">پرداخت موفق</h1>
        <p className="mb-2">سفارش شما با موفقیت ثبت و پرداخت شد.</p>
        {refId && (
          <p className="text-sm text-gray-600 mb-4">
            کد رهگیری: <span className="font-mono">{refId}</span>
          </p>
        )}

        <div className="h-32 w-32 mx-auto mb-4">
          <Lottie animationData={successAnimation} loop={false} />
        </div>

        <Link
          href="/user-panel/orders"
          className="inline-block text-white bg-green-600 px-4 py-2 rounded hover:bg-green-700 transition"
        >
          مشاهده سفارشات
        </Link>
      </div>
    </div>
  );
}
