import "./globals.css";
import "swiper/css";
import "react-toastify/dist/ReactToastify.css";

import { Suspense } from "react";
import Script from "next/script";
import { ToastContainer } from "react-toastify";
import ClientLayout from "@/components/_templates/clientLayout";
import ReferralTracker from "@/components/_layout/ReferralTracker";
import RootProviders from "./providers";

// export const metadata = {
//   title: " فروشگاه اینترنتی  نیسا ",
//   description: "",
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
        <title>فروشگاه اینترنتی نیسا</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <Script id="gtm" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){
              w[l]=w[l]||[];
              w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});
              var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),
              dl=l!='dataLayer'?'&l='+l:'';
              j.async=true;
              j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
              f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-N8LK6KBQ');
          `}
        </Script>
      </head>
      <body className="bg-gray-150">
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-N8LK6KBQ"
            height="0"
            width="0"
            style={{
              display: "none",
              visibility: "hidden",
            }}
          />
        </noscript>
        <Suspense>
          <ReferralTracker />
          <RootProviders>
            <ClientLayout>{children}</ClientLayout>
          </RootProviders>
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
