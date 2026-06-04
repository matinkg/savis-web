"use client";
import React, { useEffect, useState } from "react";
import SearchInput from "../search";
import SearchIcon from "@/public/icons/Search";
import Close from "@/public/icons/close";
import SearchResult from "./searchResult";
import SwiperSearch from "./swiperSearch";
import Clock from "@/public/icons/clock";
import Flash from "@/public/icons/flash";
import { request } from "@/configs/HTTPService";

const hotKeywords = ["گردنبند", "زنجیر", "حلقه ست", "گوشواره طلا", "پیرسینگ"];

export default function SearchComponents({
  inMobile,
  setShowSearchModal,
}: {
  inMobile: boolean;
  setShowSearchModal: (show: boolean) => void;
}) {
  const [value, setValue] = useState("");
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("recent_searches");
    if (stored) {
      setRecentSearches(JSON.parse(stored));
    }
  }, []);

  const saveToRecentSearches = (term: string) => {
    if (!term) return;
    const updated = [term, ...recentSearches.filter((t) => t !== term)];
    const sliced = updated.slice(0, 5);
    setRecentSearches(sliced);
    localStorage.setItem("recent_searches", JSON.stringify(sliced));
  };

  const handleRecentClick = (term: string) => {
    setValue(term);
    saveToRecentSearches(term);
  };

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (value.length > 1) {
        setLoading(true);
        request(`/api/v1/search?query=${encodeURIComponent(value)}`)
          .then((data) => {
            setSearchResults(data?.data?.results || []);
            saveToRecentSearches(value);
          })
          .catch((err) => console.error("Search error:", err))
          .finally(() => setLoading(false));
      } else {
        setSearchResults([]);
      }
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [value]);

  return (
    <div
      className={`searchBox flex h-fit w-full justify-center ${
        inMobile ? "bg-transparent" : "bg-white py-10 shadow-md transition-all"
      }`}
    >
      <div className={inMobile ? "w-full" : "w-[71%]"}>
        {!inMobile && (
          <div className="mb-6 w-full border-b border-solid border-b-[#1E1E1E33] pb-6">
            <SearchInput
              className="mb-10 h-10 w-full border border-solid border-[#DDE4E6B2] bg-transparent font-peyda-400 text-xs text-white"
              placeholder="جستجو کنید"
              inputStyle={{
                color: "#211934",
                height: "40px",
                padding: "0 40px",
                backgroundColor: "#DDE4E7",
              }}
              value={value}
              onChange={(e) => setValue(e.target.value)}
            >
              <SearchIcon className="absolute right-2 top-[10px] h-[18px] w-[18px] text-slate-1000/50" />
              {value && (
                <Close
                  onClick={() => setValue("")}
                  className="absolute left-2 top-[10px] h-[18px] w-[18px] cursor-pointer text-slate-1000"
                />
              )}
            </SearchInput>

            {value && (
              <div className="flex flex-col gap-y-2">
                {loading ? (
                  <p className="text-center text-gray-500">در حال جستجو...</p>
                ) : searchResults.length > 0 ? (
                  searchResults.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => setShowSearchModal(false)}
                    >
                      <SearchResult name={item.name} link={item.slug} />
                    </div>
                  ))
                ) : (
                  <p className="text-center text-sm text-gray-500">
                    هیچ نتیجه‌ای یافت نشد!
                  </p>
                )}
              </div>
            )}
          </div>
        )}

        {inMobile && (
          <div className="my-4 flex flex-col gap-y-2">
            {recentSearches.map((term, idx) => (
              <div
                className="bg-white/20 lg:bg-gray-250 h-10 flex items-center justify-between p-2.5 "
                key={idx}
                onClick={() => handleRecentClick(term)}
              >
                <span className="font-peyda-400 text-base text-white lg:text-slate-1000">
                  {term}
                </span>
                <svg
                  className="text-white lg:text-slate-1000"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3.5 22.75H20.5C20.91 22.75 21.25 22.41 21.25 22C21.25 21.59 20.91 21.25 20.5 21.25H3.5C3.09 21.25 2.75 21.59 2.75 22C2.75 22.41 3.09 22.75 3.5 22.75Z"
                    fill="currentColor"
                  />
                  <path
                    d="M5.00006 18.2499C5.19006 18.2499 5.38006 18.1799 5.53006 18.0299L19.5301 4.02994C19.8201 3.73994 19.8201 3.25994 19.5301 2.96994C19.2401 2.67994 18.7601 2.67994 18.4701 2.96994L4.47006 16.9699C4.18006 17.2599 4.18006 17.7399 4.47006 18.0299C4.62006 18.1799 4.81006 18.2499 5.00006 18.2499Z"
                    fill="currentColor"
                  />
                  <path
                    d="M19 14.52C19.41 14.52 19.75 14.18 19.75 13.77V3.5C19.75 3.09 19.41 2.75 19 2.75H8.73C8.32 2.75 7.98 3.09 7.98 3.5C7.98 3.91 8.32 4.25 8.73 4.25H18.25V13.77C18.25 14.18 18.59 14.52 19 14.52Z"
                    fill="currentColor"
                  />
                </svg>
              </div>
            ))}
          </div>
        )}

        <SwiperSearch
          data={recentSearches.map((name) => ({
            name,
            id: name,
            link: "#",
          }))}
          onItemClick={handleRecentClick}
        >
          <div className="flex items-center gap-x-2">
            <Clock
              className={`${
                inMobile ? "h-4 w-4 text-white" : "h-6 w-6 text-blue-1050"
              }`}
            />
            <h1
              className={`font-peyda-500 ${
                inMobile ? "text-sm text-white" : "text-lg text-blue-1050"
              }`}
            >
              جستجوهای اخیر
            </h1>
          </div>
        </SwiperSearch>

        <SwiperSearch
          data={hotKeywords.map((name) => ({
            name,
            id: name,
            link: "#",
          }))}
          onItemClick={handleRecentClick}
        >
          <div className="flex items-center gap-x-2">
            <Flash
              className={`${
                inMobile ? "h-4 w-4 text-white" : "h-6 w-6 text-blue-1050"
              }`}
            />
            <h1
              className={`font-peyda-500 ${
                inMobile ? "text-sm text-white" : "text-lg text-blue-1050"
              }`}
            >
              جستجوهای پرطرفدار
            </h1>
          </div>
        </SwiperSearch>
      </div>
    </div>
  );
}
