import React from "react";
import { SizeGuideData } from "@/static_data/SizeGuide";
import Image from "next/image";

interface SizeGuideProps {
  isModal?: boolean;
}

export default function SizeGuideComponent({
  isModal = false,
}: SizeGuideProps) {
  return (
    <>
      {!isModal && (
        <div className="SizeGuide_banner_mobile lg:SizeGuide_banner_desk mb-10 flex items-center lg:mb-[60px]">
          <div className="mx-auto flex w-[91.12%] flex-col lg:w-[91.67%] 4xl:w-[85%]">
            <h1 className="font-peyda-900 text-[44px] text-blue-1050 lg:font-peyda-600 lg:text-[85px]">
              راهنمای انتخاب سایز{" "}
            </h1>
          </div>
        </div>
      )}
      <section className={!isModal ? "mb-48" : ""}>
        <h1 className="text-center font-peyda-600 text-2xl text-blue-1050 lg:text-[32px]">
          راهنمای تعیین سایز انگشتر
        </h1>

        <table className="mx-auto my-10 w-[91.12%] lg:my-[60px] lg:w-[91.67%] 4xl:w-[85%] size-guide-table">
          <thead>
            <tr className="bg-third child:py-4 child:font-peyda-600 child:text-sm child:lg:py-6 child:lg:text-2xl">
              <th>ردیف</th>
              <th className="ignore-styling">سایز انگشتر</th>
              <th>دور انگشتر</th>
              <th>قطر انگشتر</th>
            </tr>
          </thead>

          <tbody>
            {SizeGuideData?.map((item, index) => (
              <tr
                key={index}
                className="bg-[#DDE4E7] child:py-4 child:text-center child:font-peyda-600 child:text-sm child:lg:text-base"
              >
                <td>{index + 1}</td>
                <td>{item?.RingSize}</td>
                <td>{item?.aroundTheRing}</td>
                <td className="ignore-styling">{item?.diameterOfRing}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="mx-auto w-[91.12%] lg:w-1/2">
          <h1 className="mb-[60px] text-center font-peyda-600 text-2xl text-blue-1050 lg:text-[32px]">
            راهنمای اندازه گیری سایز انگشتر
          </h1>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <div className="flex flex-col items-center gap-y-6">
              <p className="font-peyda-600 text-sm text-blue-1050 lg:text-base">
                ۱. برای داشتن انگشتری مناسب با اندازه دقیق ، به یک روبان یا یک
                قطعه نخ ، مداد و خط کش نیاز دارید .
              </p>
              <div className="">
                <Image
                  src="/images/SizeGuide/1.png"
                  alt="راهنمای سایز ۱"
                  width={300}
                  height={349}
                  className="h-[349px] object-contain"
                />
              </div>
            </div>

            <div className="flex flex-col items-center gap-y-6">
              <p className="font-peyda-600 text-sm text-blue-1050 lg:text-base">
                ۲. روبان یا نخ را به دور انگشت خود بپیچید .
              </p>
              <div className="">
                <Image
                  src="/images/SizeGuide/2.png"
                  alt=""
                  width={300}
                  height={349}
                  className="h-[349px] object-contain"
                />
              </div>
            </div>
            <div className="flex flex-col items-center gap-y-6">
              <p className="font-peyda-600 text-sm text-blue-1050 lg:text-base">
                ۳. محل دقیقی که روبان ها به یکدیگر می رسند را علامت بزنید .
              </p>
              <div className="">
                <Image
                  src="/images/SizeGuide/3.png"
                  alt=""
                  width={300}
                  height={349}
                  className="h-[349px] object-contain"
                />
              </div>
            </div>

            <div className="flex flex-col items-center gap-y-6">
              <p className="font-peyda-600 text-sm text-blue-1050 lg:text-base">
                ۴. روبان را روی یک خط کش قرار دهید و عددی که اندازه گیری کردید
                را با جدول سایز تطبیق دهید و سایز انگشت خود را بدست آورید .
              </p>
              <div className="">
                <Image
                  src="/images/SizeGuide/4.png"
                  alt=""
                  width={300}
                  height={349}
                  className="h-[349px] object-contain"
                />
              </div>
            </div>
          </div>

          {/*  */}

          <div className="my-40 flex w-full flex-col items-center gap-y-6">
            <p className="text-center font-peyda-600 text-2xl text-blue-1050 lg:text-[32px]">
              راهنمای تعیین گردنبند
            </p>
            <div className="">
              <Image
                src="/images/SizeGuide/5.png"
                alt="راهنمای گردنبند"
                width={400}
                height={544}
                className="h-[544px] object-contain"
              />
            </div>
          </div>
          {/*  */}

          <h1 className="mb-[60px] text-center font-peyda-600 text-2xl text-blue-1050 lg:text-[32px]">
            راهنمای تعیین دستبند{" "}
          </h1>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <div className="flex flex-col items-center gap-y-6">
              <p className="font-peyda-600 text-sm text-blue-1050 lg:text-base">
                ۱. برای داشتن انگشتری مناسب با اندازه دقیق ، به یک روبان یا یک
                قطعه نخ ، مداد و خط کش نیاز دارید .
              </p>
              <div className="">
                <Image
                  src="/images/SizeGuide/6.png"
                  alt="مرحله ۱ دستبند"
                  width={300}
                  height={349}
                  className="h-[349px] object-contain"
                />
              </div>
            </div>

            <div className="flex flex-col items-center gap-y-6">
              <p className="font-peyda-600 text-sm text-blue-1050 lg:text-base">
                ۲. روبان یا نخ را به دور انگشت خود بپیچید .
              </p>
              <div className="">
                <Image
                  src="/images/SizeGuide/7.png"
                  alt="مرحله ۲ دستبند"
                  width={300}
                  height={349}
                  className="h-[349px] object-contain"
                />
              </div>
            </div>
            <div className="flex flex-col items-center gap-y-6">
              <p className="font-peyda-600 text-sm text-blue-1050 lg:text-base">
                ۳. محل دقیقی که روبان ها به یکدیگر می رسند را علامت بزنید .
              </p>
              <div className="">
                <Image
                  src="/images/SizeGuide/8.png"
                  alt="مرحله ۳ دستبند"
                  width={300}
                  height={349}
                  className="h-[349px] object-contain"
                />
              </div>
            </div>

            <div className="flex flex-col items-center gap-y-6">
              <p className="font-peyda-600 text-sm text-blue-1050 lg:text-base">
                ۴. روبان را روی یک خط کش قرار دهید و عددی که اندازه گیری کردید
                را با جدول سایز تطبیق دهید و سایز انگشت خود را بدست آورید .
              </p>
              <div className="">
                <Image
                  src="/images/SizeGuide/9.png"
                  alt="مرحله ۴ دستبند"
                  width={300}
                  height={349}
                  className="h-[349px] object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
