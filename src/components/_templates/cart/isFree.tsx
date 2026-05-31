import React from "react";

interface IsFreeProps {
  price: number;
  threshold: number;
}

export default function IsFree({ price, threshold }: IsFreeProps) {
  const isFree = price >= threshold;
  const progress = threshold > 0 ? Math.min((price / threshold) * 100, 100) : 0;
  const baseColor = isFree ? "#2ecc71" : "#dd4444";
  const darkColor = isFree ? "#1e9e55" : "#780000";

  return (
    <div
      className="w-full p-4 lg:p-5 rounded-xl"
      style={{ background: "#7b1313" }}
    >
      <p
        className="text-white font-bold text-sm lg:text-base mb-3 text-right"
        dir="rtl"
      >
        {isFree
          ? "ارسال سفارش شما، رایگان شد!"
          : `با ${(threshold - price).toLocaleString("fa-IR")} تومان خرید بیشتر، ارسال شما رایگان می‌شود`}
      </p>

      <div
        className="w-full h-3 rounded-full overflow-hidden"
        style={{ background: "#FFFFFF" }}
      >
        <div
          className="h-full rounded-full transition-all duration-500 ease-out relative overflow-hidden"
          style={{ width: `${progress}%`, background: baseColor }}
        >
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `repeating-linear-gradient(
                55deg,
                transparent 0px,
                transparent 10px,
                ${darkColor} 20px,
                ${darkColor} 24px,
                transparent 14px,
                transparent 24px
              )`,
              backgroundSize: "28px 28px",
              animation: "slide-stripes 0.8s linear infinite",
            }}
          />
        </div>
      </div>

      <style>{`
        @keyframes slide-stripes {
          from { background-position: 0 0; }
          to { background-position: 28px 0; }
        }
      `}</style>
    </div>
  );
}
