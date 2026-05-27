import Profile from "@/public/icons/Profile";
import ProfileIcon from "@/public/icons/profile-2";
import SettingIcon from "@/public/icons/setting";
import SignOutIcon from "@/public/icons/signOut";
import React from "react";
import useUserInfo from "./hook/useUserInfo";
import Link from "next/link";
import { useDataContext } from "@/libs/context/app-data";
import Like from "@/public/icons/Like";
import Bag from "@/public/icons/Bag";
import Notify from "@/components/_modules/notify";
import { useCart } from "@/libs/context/cart-shopping/CartContext";

export default function HeaderProfile() {
  const { siginOutUserHandler } = useUserInfo();
  const { userInfo } = useDataContext();
  const { state } = useCart();

  return (
    <>
      <div className="hidden lg:flex items-center gap-x-3">
        {userInfo?.id ? (
          <>
            <div className="relative">
              <Link href={"/wishlist"}>
                <Like className="h-6 w-6 text-blue-1050" />
              </Link>

              {/* <Notify className="flex-center absolute -right-1 -top-1 h-4 w-4 rounded-full bg-primary font-peyda-400 text-[8px] text-white">
                  0
                </Notify> */}
            </div>
          </>
        ) : null}
        <div className="relative">
          <Bag className="h-6 w-6 text-blue-1050" href="/cart" />

          <Notify className="flex-center absolute pt-0.5 -right-1 -top-1 h-4 w-4 rounded-full bg-primary font-peyda-400 text-[8px] text-white">
            {state?.items?.length}
          </Notify>
        </div>

        <div className="relative group inline-block">
          {userInfo?.id ? (
            <Profile className="h-6 w-6 text-blue-1050 cursor-pointer" />
          ) : (
            <Link href="/auth/signin">
              <Profile className="h-6 w-6 text-blue-1050" />
            </Link>
          )}
          {userInfo?.id ? (
            <div className="absolute  -left-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all pt-2 w-[200px] ">
              <div className="relative w-full py-1 bg-white border border-gray-200 rounded-md shadow-xl">
                {/*Shape */}
                <div className="absolute top-0 left-0 w-4 h-4 origin-center transform rotate-45 translate-x-5 -translate-y-2 bg-white border-t border-l border-gray-200 rounded-sm pointer-events-none"></div>
                {/*Shape */}
                <div className="relative child:cursor-pointer">
                  <Link
                    // href={userRole === roles.ADMIN ? "/admin-panel" : "/user-panel"}
                    href={"/user-panel"}
                    className="flex items-center gap-x-1 w-full  px-4 py-2 font-peyda-600 text-xs text-gray-550  hover:bg-gray-100 focus:outline-none hover:text-gray-900 focus:text-gray-900 focus:shadow-outline transition duration-300 ease-in-out"
                  >
                    <ProfileIcon className="w-4 h-4 " />
                    <span>پنل کاربری</span>
                  </Link>
                  <div className="flex items-center gap-x-1 w-full  px-4 py-2 font-peyda-600 text-xs text-gray-550  hover:bg-gray-100 focus:outline-none hover:text-gray-900 focus:text-gray-900 focus:shadow-outline transition duration-300 ease-in-out">
                    <SettingIcon className="w-4 h-4 " />
                    <span>تنظیمات</span>
                  </div>
                  <div
                    onClick={() => siginOutUserHandler()}
                    className="flex items-center gap-x-1 w-full  px-4 py-2 font-peyda-600 text-xs text-gray-550  hover:bg-gray-100 focus:outline-none hover:text-gray-900 focus:text-gray-900 focus:shadow-outline transition duration-300 ease-in-out border-solid border-t border-t-slate-100"
                  >
                    <SignOutIcon className="w-4 h-4 " />
                    <span> خروج از حساب کاربری</span>{" "}
                  </div>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
      {/* --------------------in mobile mode------------------- */}

      <div className="flex lg:hidden items-center gap-x-2">
        <div className="relative">
          <Bag className="h-6 w-6 text-blue-1050" href="/cart" />
          <Notify className="flex-center absolute -right-1 -top-1 h-4 w-4 rounded-full bg-primary font-peyda-400 text-[8px] text-white">
            {state?.items?.length}
          </Notify>
        </div>

        <div className="relative group inline-block">
          {userInfo?.id ? (
            <Profile className="h-6 w-6 text-blue-1050 cursor-pointer" />
          ) : (
            <Link href="/auth/signin">
              <Profile className="h-6 w-6 text-blue-1050" />
            </Link>
          )}
          {userInfo?.id ? (
            <div className="absolute  -left-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all pt-2 w-[200px] ">
              <div className="relative w-full py-1 bg-white border border-gray-200 rounded-md shadow-xl">
                {/*Shape */}
                <div className="absolute top-0 left-0 w-4 h-4 origin-center transform rotate-45 translate-x-5 -translate-y-2 bg-white border-t border-l border-gray-200 rounded-sm pointer-events-none"></div>
                {/*Shape */}
                <div className="relative child:cursor-pointer">
                  <Link
                    // href={userRole === roles.ADMIN ? "/admin-panel" : "/user-panel"}
                    href={"/user-panel"}
                    className="flex items-center gap-x-1 w-full  px-4 py-2 font-peyda-600 text-xs text-gray-550  hover:bg-gray-100 focus:outline-none hover:text-gray-900 focus:text-gray-900 focus:shadow-outline transition duration-300 ease-in-out"
                  >
                    <ProfileIcon className="w-4 h-4 " />
                    <span>پنل کاربری</span>
                  </Link>
                  <div className="flex items-center gap-x-1 w-full  px-4 py-2 font-peyda-600 text-xs text-gray-550  hover:bg-gray-100 focus:outline-none hover:text-gray-900 focus:text-gray-900 focus:shadow-outline transition duration-300 ease-in-out">
                    <SettingIcon className="w-4 h-4 " />
                    <span>تنظیمات</span>
                  </div>
                  <div
                    onClick={() => siginOutUserHandler()}
                    className="flex items-center gap-x-1 w-full  px-4 py-2 font-peyda-600 text-xs text-gray-550  hover:bg-gray-100 focus:outline-none hover:text-gray-900 focus:text-gray-900 focus:shadow-outline transition duration-300 ease-in-out border-solid border-t border-t-slate-100"
                  >
                    <SignOutIcon className="w-4 h-4 " />
                    <span> خروج از حساب کاربری</span>{" "}
                  </div>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
}
