import "./globals.css";
import "swiper/css";
import "react-toastify/dist/ReactToastify.css";

import { ToastContainer } from "react-toastify";
import ClientLayout from "@/components/_templates/clientLayout";
import ReferralTracker from "@/components/_layout/ReferralTracker";
import { Suspense } from "react";

// export const metadata = {
//   title: " فروشگاه اینترنتی  ساویس ",
//   description: "",
//   icons: {
//     icon: "/images/logo/Logo.svg",
//   },
// };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa" dir="rtl">
      <head>
        <link rel="shortcut icon" href={"/images/logo/Logo.svg"} />
        <title>فروشگاه اینترنتی ساویس</title>
        {/* <meta name="description" content={`${SeoSite.description}`} />
        <meta name="keywords" content={`${SeoSite.keywords}`} />
        <meta name="robots" content="index, follow" />
         */}
        {/* for social media */}
        {/* <meta property="og:title" content={`${SeoSite.titleOG}`} />
        <meta property="og:description" content={`${SeoSite.description}`} />
        <meta property="og:image" content={`${SeoSite.image}`} />
        <meta property="og:url" content={`${SeoSite.url}`} /> */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className="bg-gray-150">
        <Suspense>
        <ReferralTracker />
        <ClientLayout>{children}</ClientLayout>
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={true}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        </Suspense>
      </body>
    </html>
  );
}
