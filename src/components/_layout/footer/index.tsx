"use client";
import Button from "@/components/_modules/button";
import DropDownMenu from "@/components/_modules/dropDownMenu";
import ArrowLeft from "@/public/icons/arrowLeft";
import Input from "@/components/_modules/input/inex";
import nisaLogoImg from "@/lib/assets/images/nisa-logo.webp";
import SocialMedia from "@/components/_modules/socialMedia";
import Link from "next/link";
import React from "react";
import useOperation from "@/components/_templates/clientLayout/hook/useOperation";
import Image from "next/image";

export default function Footer() {
  const { siteSetting } = useOperation();

  return (
    <footer className="w-full bg-white">
      <div className="mx-auto grid w-[91.12%] grid-cols-1 py-10 lg:w-[91.67%] lg:grid-cols-3 lg:py-[60px] 4xl:w-[85%]">
        <div className="flex flex-col">
          <span className="mb-6 font-peyda-500 text-lg text-blue-1050 lg:mb-4 lg:text-xl">
            پاسخگوی سریع
          </span>
          <div className="my-1 flex items-center justify-between bg-[#EFF5F6] p-3 font-peyda-500 text-lg text-blue-1050 lg:text-xl">
            <div className="flex-center gap-x-1">
              <a
                href={
                  siteSetting?.["support_telegram"]
                    ? `tel:${siteSetting["support_telegram"]}`
                    : "#"
                }
                target="_blank"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M16.1401 2.96004L7.11012 5.96004C1.04012 7.99004 1.04012 11.3 7.11012 13.32L9.79012 14.21L10.6801 16.89C12.7001 22.96 16.0201 22.96 18.0401 16.89L21.0501 7.87004C22.3901 3.82004 20.1901 1.61004 16.1401 2.96004ZM16.4601 8.34004L12.6601 12.16C12.5101 12.31 12.3201 12.38 12.1301 12.38C11.9401 12.38 11.7501 12.31 11.6001 12.16C11.3101 11.87 11.3101 11.39 11.6001 11.1L15.4001 7.28004C15.6901 6.99004 16.1701 6.99004 16.4601 7.28004C16.7501 7.57004 16.7501 8.05004 16.4601 8.34004Z"
                    fill="currentColor"
                  />
                </svg>
              </a>

              <span>پشتیبان تلگرام</span>
            </div>

            <span style={{ direction: "ltr" }}>
              {siteSetting?.["support_telegram"]}
            </span>
          </div>

          <div className="my-1 flex items-center justify-between bg-[#EFF5F6] p-3 font-peyda-500 text-lg text-blue-1050 lg:text-xl">
            <div className="flex-center gap-x-1">
              <a
                href={`https://wa.me/${siteSetting?.["support_whatsapp"]}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M21.9803 11.41C21.6403 5.60995 16.3703 1.13996 10.3003 2.13996C6.12029 2.82996 2.77029 6.21994 2.12029 10.3999C1.74029 12.8199 2.24031 15.1099 3.33031 16.9999L2.4403 20.3099C2.2403 21.0599 2.93028 21.7399 3.67028 21.5299L6.93029 20.63C8.41029 21.5 10.1403 21.9999 11.9903 21.9999C17.6303 21.9999 22.3103 17.03 21.9803 11.41ZM16.8803 15.7199C16.7903 15.8999 16.6803 16.07 16.5403 16.23C16.2903 16.5 16.0203 16.7 15.7203 16.82C15.4203 16.95 15.0903 17.01 14.7403 17.01C14.2303 17.01 13.6803 16.89 13.1103 16.64C12.5303 16.39 11.9603 16.0599 11.3903 15.6499C10.8103 15.2299 10.2703 14.7599 9.7503 14.2499C9.2303 13.7299 8.77027 13.1799 8.35027 12.6099C7.94027 12.0399 7.61029 11.4699 7.37029 10.8999C7.13029 10.3299 7.01031 9.77996 7.01031 9.25996C7.01031 8.91996 7.0703 8.58996 7.1903 8.28996C7.3103 7.97996 7.50032 7.69996 7.77032 7.44996C8.09032 7.12996 8.4403 6.97996 8.8103 6.97996C8.95029 6.97996 9.09027 7.00995 9.22027 7.06995C9.35027 7.12995 9.47029 7.21995 9.5603 7.34995L10.7203 8.98994C10.8103 9.11994 10.8803 9.22994 10.9203 9.33994C10.9703 9.44994 10.9903 9.54994 10.9903 9.64994C10.9903 9.76994 10.9503 9.88996 10.8803 10.01C10.8103 10.13 10.7203 10.2499 10.6003 10.3699L10.2203 10.7699C10.1603 10.8299 10.1403 10.8899 10.1403 10.9699C10.1403 11.0099 10.1503 11.0499 10.1603 11.0899C10.1803 11.1299 10.1903 11.16 10.2003 11.1899C10.2903 11.36 10.4503 11.5699 10.6703 11.8299C10.9003 12.0899 11.1403 12.3599 11.4003 12.6199C11.6703 12.8899 11.9303 13.1299 12.2003 13.3599C12.4603 13.5799 12.6803 13.73 12.8503 13.82C12.8803 13.83 12.9103 13.8499 12.9403 13.8599C12.9803 13.8799 13.0203 13.88 13.0703 13.88C13.1603 13.88 13.2203 13.85 13.2803 13.79L13.6603 13.41C13.7903 13.28 13.9103 13.19 14.0203 13.13C14.1403 13.06 14.2503 13.0199 14.3803 13.0199C14.4803 13.0199 14.5803 13.0399 14.6903 13.0899C14.8003 13.1399 14.9203 13.2 15.0403 13.29L16.7003 14.4699C16.8303 14.5599 16.9203 14.67 16.9803 14.79C17.0303 14.92 17.0603 15.0399 17.0603 15.1799C17.0003 15.3499 16.9603 15.5399 16.8803 15.7199Z"
                    fill="currentColor"
                  />
                </svg>
              </a>
              <span>پشتیبان واتساپ</span>
            </div>

            <span>{siteSetting?.["support_whatsapp"]}</span>
          </div>

          <span className="pb-4 pt-10 font-peyda-500 text-lg text-blue-1050 lg:pt-6 lg:text-xl">
            از جدیدترین محصولات و مطالب با خبر شو!
          </span>
          <form className="grid grid-cols-2 gap-4 lg:gap-3">
            <Input
              className="h-[38px] border border-solid border-gray-230 bg-gray-150 px-3 font-peyda-400 text-xs text-[#C6CED0] lg:text-lg"
              type="email"
              placeholder="ادرس ایمیل"
            />
            <Input
              className="h-[38px] border border-solid border-gray-230 bg-gray-150 px-3 font-peyda-400 text-xs text-[#C6CED0] lg:text-lg"
              type="text"
              placeholder="تلفن همراه"
            />
            <Button className="flex-center col-span-2 gap-x-1 bg-secendry p-2 font-peyda-400 text-sm text-white lg:px-[18px] lg:py-3 lg:text-lg">
              <span>ارسال</span>
              <ArrowLeft href="#" className="h-[18px] w-[18px] lg:h-6 lg:w-6" />
            </Button>
          </form>
        </div>
        <div className="hidden grid-cols-2 lg:grid">
          <div className="flex flex-col items-center">
            <div className="flex flex-col items-start">
              <span className="mb-4 font-peyda-500 text-lg text-blue-1050 lg:text-xl">
                ساویس
              </span>
              {siteSetting?.["footer"]?.savis?.map((link: any, index: any) => (
                <Link
                  key={index}
                  href={link?.link}
                  className="text-[# ] py2 font-peyda-400 text-lg hover:text-primary"
                >
                  {link?.title}
                </Link>
              ))}
            </div>
          </div>
          <div className="flex flex-col items-center">
            <div className="flex flex-col items-start">
              <span className="mb-4 font-peyda-500 text-lg text-blue-1050 lg:text-xl">
                راهنمای خرید
              </span>
              {siteSetting?.["footer"]?.buy?.map((link: any, index: any) => (
                <Link
                  key={index}
                  href={link?.link}
                  className="text-[# ] py2 font-peyda-400 text-lg hover:text-primary"
                >
                  {link?.title}
                </Link>
              ))}
            </div>
          </div>
        </div>
        {/* in mobile mode */}

        <div className="my-10 block lg:hidden">
          <DropDownMenu
            titleStyle="text-lg"
            title={"ساویس"}
            type="down"
            className="border-y border-solid border-y-gray-150 py-3 text-blue-1050"
          >
            {siteSetting?.["footer"]?.savis?.map((link: any, index: any) => (
              <div key={index} className="flex flex-col gap-y-5">
                <Link
                  href={link?.link}
                  className="my-1 font-peyda-400 text-base text-[#8A8E8E]"
                >
                  {link?.title}
                </Link>
              </div>
            ))}
          </DropDownMenu>
          <DropDownMenu
            titleStyle="text-lg"
            title={"راهنمای خرید"}
            type="down"
            className="border-y border-solid border-y-gray-150 py-3 text-blue-1050"
          >
            {siteSetting?.["footer"]?.buy?.map((link: any, index: any) => (
              <div key={index} className="flex flex-col gap-y-5">
                <Link
                  href={link?.link}
                  className="my-1 font-peyda-400 text-base text-[#8A8E8E]"
                >
                  {link?.title}
                </Link>
              </div>
            ))}
          </DropDownMenu>
        </div>

        {/* in mobile mode */}
        <div className="flex flex-col">
          <Image className="w-20" src={nisaLogoImg} alt="nisa-logo" />

          <p className="mb-8 mt-6 font-peyda-400 text-base text-blue-1050 lg:text-xl">
            گالری <span className="font-peyda-600">نیسا</span> برند شانت
            باباییان با بیشتر از ۱4 سال تجربه‌ی درخشان در زمینه طلا و جواهرات
            زیباترین و باکیفیت‌ترین زیورآلات را با پشتیبانی و ضمانت به صورت
            آنلاین و حضوری به شما تقدیم می‌کند.
          </p>

          <div className="grid grid-cols-3 items-end lg:grid-cols-4 lg:gap-x-5">
            <img src="/images/home/17.png" alt="مجوز کسب کار" className="" />
            <img src="/images/home/18.png" alt="enamad" className="" />
            <img src="/images/home/19.png" alt="نشان ملی" className="" />
          </div>
        </div>
      </div>
      <div className="bg-secendry text-white">
        <div className="mx-auto flex w-[91.12%] flex-col items-center justify-between gap-y-3 py-3 lg:w-[91.67%] lg:flex-row 4xl:w-[85%]">
          <span className="font-peyda-400 text-sm lg:text-lg">
            {" "}
            تمام حقوق برای savis.com محفوظ است
          </span>

          <SocialMedia className="h-6 w-6 text-white" />
        </div>
      </div>
    </footer>
  );
}
