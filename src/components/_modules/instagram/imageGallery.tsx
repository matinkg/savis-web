import React from "react";
import ArrowLeft from "@/public/icons/arrowLeft";
import Button from "../button";
import Close from "@/public/icons/close";

// swiper
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import useOperation from "@/components/_templates/clientLayout/hook/useOperation";

type ImageGalleryProps = {
  setShowModal: any;
  showModal: any;
};
export default function ImageGallery({
  setShowModal,
  showModal,
}: ImageGalleryProps) {
  const { siteSetting } = useOperation();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2">
      <div>
        <div className="flex w-full items-center justify-between pb-6 pt-4 lg:hidden">
          <div className="flex-center gap-x-6">
            <button className="swiper-button-prev_insta rotate-180">
              <ArrowLeft className="h-6 w-6 text-blue-1050" />
            </button>
            <button className="swiper-button-next_insta">
              <ArrowLeft className="h-6 w-6 text-blue-1050" />
            </button>
          </div>
          <Button
            onClick={() =>
              setShowModal({
                data: {
                  id: "",
                },
                status: false,
              })
            }
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16.7726 8.28772L8.28728 16.773C7.99737 17.0629 7.51653 17.0629 7.22662 16.773C6.93671 16.4831 6.93671 16.0023 7.22662 15.7123L15.7119 7.22706C16.0018 6.93715 16.4826 6.93715 16.7726 7.22706C17.0625 7.51698 17.0625 7.99781 16.7726 8.28772Z"
                fill="#211934"
              />
              <path
                d="M16.7726 16.7729C16.4826 17.0628 16.0018 17.0628 15.7119 16.7729L7.22662 8.28765C6.93671 7.99774 6.93671 7.51691 7.22662 7.22699C7.51653 6.93708 7.99737 6.93708 8.28728 7.22699L16.7726 15.7123C17.0625 16.0022 17.0625 16.483 16.7726 16.7729Z"
                fill="#211934"
              />
            </svg>
          </Button>
        </div>
        <Swiper
          slidesPerView={1}
          loop={true}
          rewind={true}
          navigation={{
            nextEl: ".swiper-button-next_insta",
            prevEl: ".swiper-button-prev_insta",
          }}
          modules={[Navigation]}
        >
          {showModal.data?.image_1 &&
            (showModal.data?.image_2
              ? [showModal.data.image_1, showModal.data.image_2]
              : [showModal.data.image_1]
            ).map((item: any, index: number) => (
              <SwiperSlide key={index + 1}>
                <div className="px-4 lg:p-0">
                  <img
                    src={item}
                    alt="instagram post"
                    className="h-auto w-full object-cover lg:h-[698px]"
                  />
                </div>
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
      <div className="px-4 py-6 lg:p-10">
        <div className="hidden w-full items-center justify-between lg:flex">
          <div className="flex-center gap-x-6">
            <button className="swiper-button-prev_insta rotate-180">
              <ArrowLeft className="h-6 w-6 text-blue-1050" />
            </button>
            <button className="swiper-button-next_insta">
              <ArrowLeft className="h-6 w-6 text-blue-1050" />
            </button>
          </div>
          <Button
            onClick={() =>
              setShowModal({
                data: {
                  id: "",
                  img: [],
                  desc: "",
                  date: new Date(),
                  link: "",
                },
                status: false,
              })
            }
          >
            <Close className="h-6 w-6 text-blue-1050" />
          </Button>
        </div>

        <p className="text-center font-peyda-400 text-xs text-blue-1050 lg:pt-[60px] lg:text-base">
          {showModal.data.summary}
        </p>

        <div className="flex-center gap-x-1 py-6 font-peyda-600 text-sm lg:py-10 lg:text-base">
          <span>nissa_jewellery</span>
          {/* <span>{showModal?.data?.created_at?.toLocaleDateString("fa-IR")}</span> */}
        </div>

        <div className="flex-center gap-x-3">
          <a href={siteSetting?.["youtube_link"]} target="_blank">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M17 4H7C4 4 2 6 2 9V15C2 18 4 20 7 20H17C20 20 22 18 22 15V9C22 6 20 4 17 4ZM13.89 13.03L11.42 14.51C10.42 15.11 9.59998 14.65 9.59998 13.48V10.51C9.59998 9.34001 10.42 8.88001 11.42 9.48001L13.89 10.96C14.84 11.54 14.84 12.46 13.89 13.03Z"
                fill="#211934"
              />
            </svg>
          </a>
          <a href={siteSetting?.["facebook_link"]} target="_blank">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M22 16.19C22 19.83 19.83 22 16.19 22H15C14.45 22 14 21.55 14 21V15.23C14 14.96 14.22 14.73 14.49 14.73L16.25 14.7C16.39 14.69 16.51 14.59 16.54 14.45L16.89 12.54C16.92 12.36 16.78 12.19 16.59 12.19L14.46 12.22C14.18 12.22 13.96 12 13.95 11.73L13.91 9.28C13.91 9.12 14.04 8.98001 14.21 8.98001L16.61 8.94C16.78 8.94 16.91 8.81001 16.91 8.64001L16.87 6.23999C16.87 6.06999 16.74 5.94 16.57 5.94L13.87 5.98001C12.21 6.01001 10.89 7.37 10.92 9.03L10.97 11.78C10.98 12.06 10.76 12.28 10.48 12.29L9.28 12.31C9.11 12.31 8.98001 12.44 8.98001 12.61L9.01001 14.51C9.01001 14.68 9.14 14.81 9.31 14.81L10.51 14.79C10.79 14.79 11.01 15.01 11.02 15.28L11.11 20.98C11.12 21.54 10.67 22 10.11 22H7.81C4.17 22 2 19.83 2 16.18V7.81C2 4.17 4.17 2 7.81 2H16.19C19.83 2 22 4.17 22 7.81V16.19Z"
                fill="#211934"
              />
            </svg>
          </a>
          <a href={siteSetting?.["whatsapp_link"]} target="_blank">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M21.9803 11.41C21.6403 5.60995 16.3703 1.13996 10.3003 2.13996C6.12029 2.82996 2.77029 6.21994 2.12029 10.3999C1.74029 12.8199 2.24031 15.1099 3.33031 16.9999L2.4403 20.3099C2.2403 21.0599 2.93028 21.7399 3.67028 21.5299L6.93029 20.63C8.41029 21.5 10.1403 21.9999 11.9903 21.9999C17.6303 21.9999 22.3103 17.03 21.9803 11.41ZM16.8803 15.7199C16.7903 15.8999 16.6803 16.07 16.5403 16.23C16.2903 16.5 16.0203 16.7 15.7203 16.82C15.4203 16.95 15.0903 17.01 14.7403 17.01C14.2303 17.01 13.6803 16.89 13.1103 16.64C12.5303 16.39 11.9603 16.0599 11.3903 15.6499C10.8103 15.2299 10.2703 14.7599 9.7503 14.2499C9.2303 13.7299 8.77027 13.1799 8.35027 12.6099C7.94027 12.0399 7.61029 11.4699 7.37029 10.8999C7.13029 10.3299 7.01031 9.77996 7.01031 9.25996C7.01031 8.91996 7.0703 8.58996 7.1903 8.28996C7.3103 7.97996 7.50032 7.69996 7.77032 7.44996C8.09032 7.12996 8.4403 6.97996 8.8103 6.97996C8.95029 6.97996 9.09027 7.00995 9.22027 7.06995C9.35027 7.12995 9.47029 7.21995 9.5603 7.34995L10.7203 8.98994C10.8103 9.11994 10.8803 9.22994 10.9203 9.33994C10.9703 9.44994 10.9903 9.54994 10.9903 9.64994C10.9903 9.76994 10.9503 9.88996 10.8803 10.01C10.8103 10.13 10.7203 10.2499 10.6003 10.3699L10.2203 10.7699C10.1603 10.8299 10.1403 10.8899 10.1403 10.9699C10.1403 11.0099 10.1503 11.0499 10.1603 11.0899C10.1803 11.1299 10.1903 11.16 10.2003 11.1899C10.2903 11.36 10.4503 11.5699 10.6703 11.8299C10.9003 12.0899 11.1403 12.3599 11.4003 12.6199C11.6703 12.8899 11.9303 13.1299 12.2003 13.3599C12.4603 13.5799 12.6803 13.73 12.8503 13.82C12.8803 13.83 12.9103 13.8499 12.9403 13.8599C12.9803 13.8799 13.0203 13.88 13.0703 13.88C13.1603 13.88 13.2203 13.85 13.2803 13.79L13.6603 13.41C13.7903 13.28 13.9103 13.19 14.0203 13.13C14.1403 13.06 14.2503 13.0199 14.3803 13.0199C14.4803 13.0199 14.5803 13.0399 14.6903 13.0899C14.8003 13.1399 14.9203 13.2 15.0403 13.29L16.7003 14.4699C16.8303 14.5599 16.9203 14.67 16.9803 14.79C17.0303 14.92 17.0603 15.0399 17.0603 15.1799C17.0003 15.3499 16.9603 15.5399 16.8803 15.7199Z"
                fill="#211934"
              />
            </svg>
          </a>
          <a href={siteSetting?.["telegram_link"]} target="_blank">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16.1401 2.96004L7.11012 5.96004C1.04012 7.99004 1.04012 11.3 7.11012 13.32L9.79012 14.21L10.6801 16.89C12.7001 22.96 16.0201 22.96 18.0401 16.89L21.0501 7.87004C22.3901 3.82004 20.1901 1.61004 16.1401 2.96004ZM16.4601 8.34004L12.6601 12.16C12.5101 12.31 12.3201 12.38 12.1301 12.38C11.9401 12.38 11.7501 12.31 11.6001 12.16C11.3101 11.87 11.3101 11.39 11.6001 11.1L15.4001 7.28004C15.6901 6.99004 16.1701 6.99004 16.4601 7.28004C16.7501 7.57004 16.7501 8.05004 16.4601 8.34004Z"
                fill="#211934"
              />
            </svg>
          </a>

          <a href={siteSetting?.["instagram_link"]} target="_blank">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16.19 2H7.81C4.17 2 2 4.17 2 7.81V16.18C2 19.83 4.17 22 7.81 22H16.18C19.82 22 21.99 19.83 21.99 16.19V7.81C22 4.17 19.83 2 16.19 2ZM12 15.88C9.86 15.88 8.12 14.14 8.12 12C8.12 9.86 9.86 8.12 12 8.12C14.14 8.12 15.88 9.86 15.88 12C15.88 14.14 14.14 15.88 12 15.88ZM17.92 6.88C17.87 7 17.8 7.11 17.71 7.21C17.61 7.3 17.5 7.37 17.38 7.42C17.26 7.47 17.13 7.5 17 7.5C16.73 7.5 16.48 7.4 16.29 7.21C16.2 7.11 16.13 7 16.08 6.88C16.03 6.76 16 6.63 16 6.5C16 6.37 16.03 6.24 16.08 6.12C16.13 5.99 16.2 5.89 16.29 5.79C16.52 5.56 16.87 5.45 17.19 5.52C17.26 5.53 17.32 5.55 17.38 5.58C17.44 5.6 17.5 5.63 17.56 5.67C17.61 5.7 17.66 5.75 17.71 5.79C17.8 5.89 17.87 5.99 17.92 6.12C17.97 6.24 18 6.37 18 6.5C18 6.63 17.97 6.76 17.92 6.88Z"
                fill="#211934"
              />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}
