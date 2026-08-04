"use client";

import { useEffect, useState } from "react";
import SearchInput from "@/components/_modules/search";
import SearchIcon from "@/public/icons/Search";
import SearchResult from "@/components/_modules/searchComponents/searchResult";
import { request } from "@/configs/HTTPService";

export default function MobileSearch({
  onResultClick,
}: {
  onResultClick: () => void;
}) {
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<any[]>([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (value.trim().length < 2) {
        setResults([]);
        return;
      }

      setLoading(true);

      request(`/api/v1/search?query=${encodeURIComponent(value)}`)
        .then((res) => {
          setResults(res?.data?.results || []);
        })
        .catch(() => {
          setResults([]);
        })
        .finally(() => setLoading(false));
    }, 500);

    return () => clearTimeout(timer);
  }, [value]);

  return (
    <div>
      <SearchInput
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="جتسجو"
        className="h-10 w-full mb-3 border border-solid border-[#DDE4E6B2] bg-transparent font-peyda-400 text-xs text-white lg:mb-10"
        inputStyle={{
          color: "#fff",
          height: "40px",
          backgroundColor: "#EFF5F633",
        }}
      >
        <SearchIcon className="absolute left-2 top-[10px] h-[18px] w-[18px] text-white" />
      </SearchInput>

      {value.length >= 2 && (
        <div className="mt-2 rounded bg-black/20 backdrop-blur-sm overflow-hidden">
          {loading ? (
            <div className="p-3 text-center text-sm text-white">
              در حال جستجو...
            </div>
          ) : results.length ? (
            <div className="max-h-32 overflow-y-auto hide-scrollbar">
              {results.map((item) => (
              <div key={item.id} onClick={onResultClick}>
                <SearchResult name={item.name} link={item.slug} />
              </div>
            ))}
            </div>
          ) : (
            <div className="p-3 text-center text-sm text-white">
              هیچ نتیجه‌ای یافت نشد
            </div>
          )}
        </div>
      )}
    </div>
  );
}
