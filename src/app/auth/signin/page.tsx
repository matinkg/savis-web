import RenderSigninStep from "@/components/_templates/renderAuthStep/signin";
import nisaLoginImg from "@/lib/assets/images/nisa-login-img.webp";
import nisaLogoImg from "@/lib/assets/images/nisa-logo.webp";
import nisaLightLogoImg from "@/lib/assets/images/nisa-light-logo.webp";
import Image from "next/image";

export default function SignIn() {
  return (
    <section className="min-h-dvh lg:grid lg:grid-cols-2">
      <div className="relative h-[460px] w-full lg:hidden">
        <Image
          fill
          priority
          className="object-cover"
          src={nisaLoginImg}
          alt="nisa-login-img"
        />
        <Image
          className="lg:hidden absolute top-14 mx-auto right-0 left-0 w-[155px]"
          src={nisaLightLogoImg}
          alt="nisa-light-logo-img"
        />
      </div>

      <div className="flex min-h-[calc(100dvh-460px)] md:px-20 lg:px-0 flex-col items-center justify-center bg-acsent px-4 py-10 lg:h-auto lg:gap-y-[246px]">
        <Image
          className="hidden w-40 lg:inline-block"
          src={nisaLogoImg}
          alt="nisa-logo-img"
        />

        <div className="flex w-full flex-col items-center text-[#0A141A] lg:w-[69.5%]">
          <h1 className="mb-6 text-center font-peyda-600 text-2xl lg:mb-8 lg:text-[32px]">
            ایجاد حساب کاربری
          </h1>

          <RenderSigninStep />
        </div>
      </div>

      <div className="relative hidden min-h-dvh lg:block">
        <Image
          fill
          priority
          className="object-cover"
          src={nisaLoginImg}
          alt="nisa-login-img"
        />
      </div>
    </section>
  );
}
