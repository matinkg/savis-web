import React, { useState, useRef, useEffect, ChangeEvent } from "react";
import "./style.css";
import Star from "@/public/icons/start";
import StarOutLine from "@/public/icons/starOutLine";
import { Controller } from "react-hook-form";

function RangeSliderComponents({ control, name }: any) {
  const [numOfStars, setNumOfStars] = useState<number>(1);
  const sliderEl = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const sliderElNode = sliderEl.current;

    const handleSliderInput = (event: Event) => {
      const tempSliderValue = (event.target as HTMLInputElement).valueAsNumber;
      const min = Number(sliderElNode?.min) || 20;
      const max = Number(sliderElNode?.max) || 100;
      const progress = ((tempSliderValue - min) / (max - min)) * 100;

      if (sliderElNode) {
        sliderElNode.style.background = `linear-gradient(
          to right,
          rgba(243, 176, 67, 1) ${progress}%,
          #fff ${progress}%
        )`;
      }
    };

    if (sliderElNode) {
      sliderElNode.addEventListener("input", handleSliderInput);
    }

    return () => {
      if (sliderElNode) {
        sliderElNode.removeEventListener("input", handleSliderInput);
      }
    };
  }, []);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { value, onChange } }) => (
        <div className="range" style={{ direction: "ltr" }}>
          <div className="range-slider">
            <input
              type="range"
              min="20"
              max="100"
              value={value}
              ref={sliderEl}
              className="range-input"
              id="range4"
              step="20"
              onChange={(e) => {
                const tempSliderValue = Number(e.target.value);
                onChange(tempSliderValue); // آپدیت مقدار فرم
                const stars = Math.ceil(tempSliderValue / 20);
                setNumOfStars(stars > 5 ? 5 : stars); // حداکثر تعداد ستاره‌ها ۵
              }}
            />
            <div className="sliderticks mt-10">
              {Array.from({ length: 5 }, (_, index) =>
                index < numOfStars ? (
                  <Star key={index} className="h-6 w-6 text-yellow-500" />
                ) : (
                  <StarOutLine
                    key={index}
                    className="h-6 w-6 text-yellow-500"
                  />
                ),
              )}
            </div>
          </div>
        </div>
      )}
    />
  );
}

export default RangeSliderComponents;
