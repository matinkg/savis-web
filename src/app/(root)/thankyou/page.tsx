"use client";

import Head from 'next/head'
import { useRouter } from "next/navigation";

export default function ThankYouPage() {
  const router = useRouter();
  const { ref_id } = router.

  return (
    <>
      <Head>
        <title>تشکر از پرداخت شما | سویس</title>
        <meta name="description" content="صفحه تشکر پس از پرداخت موفق" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-md bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
          <div className="bg-gradient-to-r from-indigo-600 to-blue-500 p-6 text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-20 w-20 mx-auto text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h1 className="text-2xl font-bold text-white mt-4">پرداخت موفق</h1>
          </div>

          <div className="p-6">
            <div className="text-center mb-6">
              <p className="text-gray-700 mb-4">
                سپاس از خرید شما! سفارش شما با موفقیت ثبت شد.
              </p>
              <p className="text-gray-600 text-sm">
                یک ایمیل حاوی جزئیات سفارش برای شما ارسال خواهد شد.
              </p>
            </div>

            <div className="bg-blue-50 rounded-lg p-4 mb-6">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">کد پیگیری:</span>
                <span className="font-mono font-bold text-indigo-600 bg-indigo-100 px-3 py-1 rounded">
                  {ref_id || '---'}
                </span>
              </div>
            </div>

            <div className="flex flex-col space-y-3">
              <button
                onClick={() => router.push('/')}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200"
              >
                بازگشت به صفحه اصلی
              </button>
              <button
                onClick={() => window.print()}
                className="w-full border border-indigo-600 text-indigo-600 hover:bg-indigo-50 font-medium py-2 px-4 rounded-lg transition duration-200"
              >
                چاپ رسید
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}