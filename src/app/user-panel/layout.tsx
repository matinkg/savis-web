import InstagramPosts from "@/components/_modules/instagram";
import UserPanelLayout from "@/components/_templates/user-panel/layout";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* banner  */}
      <div className="profile_banner_mobile lg:profile_banner_desk mb-10 flex items-center lg:mb-[60px] mt-20 md:mt-14 h-[360px] md:h-[550px] 2xl:h-[650px] 3xl:h-[950px]"></div>
      {/* banner  */}

      <UserPanelLayout>{children}</UserPanelLayout>

      <section className="mx-auto mt-10 w-[91.12%] space-y-10 lg:mt-[60px] lg:w-[91.67%] lg:space-y-20 4xl:w-[85%]">
        <InstagramPosts className="hidden md:grid w-full" />
      </section>
    </>
  );
}
