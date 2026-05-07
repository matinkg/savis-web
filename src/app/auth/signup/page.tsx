import Logo from "@/components/_modules/logo";
import RenderSignUpStep from "@/components/_templates/renderAuthStep/signup";
import redirectUser from "@/helper/serverHelpers/redirectUser";
import { cookies } from "next/headers";

export default function SignUp() {
  return (
    <section className="signUpBackImg_mobile md:signUpBackImg flex flex-col lg:flex-row">
      <Logo
        type="third"
        className="mx-auto mt-[60px] block h-[147px] w-[87px] text-white lg:mt-[72px] lg:hidden"
      />
      <div className="mt-auto w-full bg-white/20 py-[60px] backdrop-blur-2xl lg:h-screen lg:w-[45.5%] lg:py-0">
        <div className="flex flex-col items-center lg:gap-y-[146px]">
          <Logo
            type="third"
            className="mt-[60px] hidden h-[147px] w-[87px] text-white lg:mt-[72px] lg:block"
          />
          <div className="w-[91.1%] text-white lg:w-[69.5%] 2xl:w-[55%]">
            <h1 className="mb-6 text-center font-peyda-600 text-2xl lg:mb-10 lg:text-[32px]">
              ایجاد حساب کاربری
            </h1>
            <RenderSignUpStep />
          </div>
        </div>
      </div>
    </section>
  );
}
