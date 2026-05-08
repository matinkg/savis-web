"use client";
import Nav from "./nav";
import Logo from "@/components/_modules/logo";
import Link from "next/link";
import ArrowDown from "@/public/icons/arrowDown";
import Menu from "@/public/icons/menu";
import NavMenu from "./navMenu";
import MegaMenu from "./megaMenu";
import SearchComponents from "@/components/_modules/searchComponents";
import SearchIcon from "@/public/icons/Search";
import HeaderProfile from "./headerProfile";
import useMegaMenuOperation from "./hook/useMegaMenuOperation";

type propsType = { noFixed: boolean; data?: any };

export default function Header({ noFixed, data }: propsType) {
  const {
    bgColor,
    showNavMenu,
    setShowNavMenu,
    showMegaMenu,
    setShowMegaMenu,
    windowRef,
    setShowSearchModal,
    showSearchModal,
  } = useMegaMenuOperation();
  // ----------------------------------------------------------------
  return (
    <>
      <div
        className={
          noFixed
            ? `${
                bgColor
                  ? "fixed top-0 z-20 w-full transition-all"
                  : "fixed top-0 z-20 w-full transition-all"
              }`
            : "fixed top-0 z-20 w-full"
        }
        ref={windowRef}
        onMouseLeave={(e) => {
          e.stopPropagation();

          setShowMegaMenu({
            status: false,
            data: [],
            ads: null,
          });
        }}
      >
        <Nav />
        <header
          className={`hidden lg:block ${
            bgColor
              ? "bg-white shadow-sm"
              : `${
                  noFixed
                    ? "bg-white shadow-sm"
                    : "bg-white/50 backdrop-blur-sm"
                }`
          }`}
        >
          <div className="mx-auto flex w-[91.67%] items-center justify-between py-3">
            <div>
              <Logo type="primary" className="h-[59px] w-[82px]" />
            </div>

            {/* /=======================Header menu ====================== */}
            <div className="flex gap-x-8">
              {data?.map((item: any, index: number) => (
                <div key={item?.id} className="flex items-center gap-x-2">
                  <Link
                    href={`${item?.href || "#"}`}
                    className="text-center font-peyda-600 text-lg text-blue-1050 xl:text-xl"
                  >
                    {item?.title}
                  </Link>

                  {item?.children?.length > 0 ? (
                    <ArrowDown
                      className="h-[18px] w-[18px] cursor-pointer text-[#16161666]"
                      onMouseEnter={() =>
                        setShowMegaMenu({
                          status: true,
                          data: item?.children,
                          ads: item?.banners ?? null,
                        })
                      }
                    />
                  ) : null}
                </div>
              ))}
            </div>

            {/* /=======================Header menu ====================== */}
            <div className="flex items-center gap-x-3">
              <SearchIcon
                onClick={() => setShowSearchModal(!showSearchModal)}
                className="h-6 w-6 text-blue-1050"
              />

              <HeaderProfile />
            </div>
          </div>
        </header>

        <header
          className={`block lg:hidden ${
            bgColor ? "bg-white shadow-sm" : "bg-white/50 backdrop-blur-sm"
          }`}
        >
          <div className="mx-auto flex w-[91.12%] items-center justify-between py-4">
            <div>
              <Menu
                onClick={() => {
                  setShowNavMenu(true);
                }}
                className="h-6 w-6 text-blue-1050"
              />

              {showNavMenu && (
                <NavMenu
                  data={data}
                  showNavMenu={showNavMenu}
                  setShowNavMenu={setShowNavMenu}
                />
              )}
            </div>

            <Logo type="secondary" className="h-[40px] w-[90px]" />
            <HeaderProfile />
          </div>
        </header>
        {/* mega menu in desktop mode */}
        {showMegaMenu.status && <MegaMenu megaMenu={showMegaMenu} />}
        {/* search section */}

        {showSearchModal && <SearchComponents inMobile={false} />}
      </div>
    </>
  );
}
