import InstagramPosts from "@/components/_modules/instagram";
import UserPanelLayout from "@/components/_templates/user-panel/layout";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* banner  */}
      <div className="cart_banner_mobile lg:cart_banner_desk mb-10 flex items-center lg:mb-[60px] mt-20 md:mt-14 h-[360px] md:h-[550px] 2xl:h-[650px] 3xl:h-[950px]">
        <div className="mx-auto flex w-[91.12%] flex-col lg:w-[91.67%] 4xl:w-[85%]">
          <h1 className="font-peyda-900 text-[44px] text-white lg:font-peyda-600 lg:text-[85px]">
            حساب کاربری من{" "}
          </h1>
        </div>
      </div>
      {/* banner  */}

      <UserPanelLayout>{children}</UserPanelLayout>

      <section className="mx-auto mt-10 w-[91.12%] space-y-10 lg:mt-[60px] lg:w-[91.67%] lg:space-y-20 4xl:w-[85%]">
        <InstagramPosts className="hidden md:grid w-full" />
      </section>
    </>
  );
}
