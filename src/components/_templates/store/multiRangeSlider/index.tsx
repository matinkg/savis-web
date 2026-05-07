import { useSearchParams } from "next/navigation";
import React, { useCallback, useEffect, useState, useRef, FC } from "react";

interface MultiRangeSliderProps {
  min: number;
  max: number;
  onChange: (values: { min: number; max: number }) => void;
}

const MultiRangeSlider: FC<MultiRangeSliderProps> = ({ min, max, onChange }) => {
  const searchParams = useSearchParams();
  const min_price = Number(searchParams.get("min_price")) || min;
  const max_price = Number(searchParams.get("max_price")) || max;

  const [minVal, setMinVal] = useState<number>(min_price);
  const [maxVal, setMaxVal] = useState<number>(max_price);

  const minValRef = useRef<number>(min_price);
  const maxValRef = useRef<number>(max_price);
  const range = useRef<HTMLDivElement>(null);

  // تابع محاسبه درصد مقدار نسبت به بازه min-max
  const getPercent = useCallback(
    (value: number) => Math.round(((value - min) / (max - min)) * 100),
    [min, max]
  );

  // بروزرسانی مقدار اسلایدر از URL هر بار که پارامترهای جستجو تغییر کنند
  useEffect(() => {
    setMinVal(min_price);
    setMaxVal(max_price);
    minValRef.current = min_price;
    maxValRef.current = max_price;
  }, [min_price, max_price]);

  useEffect(() => {
    const minPercent = getPercent(minVal);
    const maxPercent = getPercent(maxValRef.current);

    if (range.current) {
      range.current.style.left = `${minPercent}%`;
      range.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [minVal, getPercent]);

  useEffect(() => {
    const minPercent = getPercent(minValRef.current);
    const maxPercent = getPercent(maxVal);

    if (range.current) {
      range.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [maxVal, getPercent]);

  // ارسال مقدار جدید به کامپوننت والد
  useEffect(() => {
    onChange({ min: minVal, max: maxVal });
  }, [minVal, maxVal, onChange]);

  return (
    <>
      <div className="container">
        <input
          type="range"
          min={min}
          max={max}
          value={minVal}
          onChange={(event) => {
            const value = Math.min(Number(event.target.value), maxVal - 1);
            setMinVal(value);
            minValRef.current = value;
          }}
          className="thumb thumb--left"
          style={{ zIndex: minVal > max - 100 ? 5 : undefined }}
        />
        <input
          type="range"
          min={min}
          max={max}
          value={maxVal}
          onChange={(event) => {
            const value = Math.max(Number(event.target.value), minVal + 1);
            setMaxVal(value);
            maxValRef.current = value;
          }}
          className="thumb thumb--right"
        />

        <div className="slider">
          <div className="slider__track" />
          <div ref={range} className="slider__range" />
        </div>
      </div>
      <div
        className="flex items-center justify-between mt-6"
        style={{ direction: "ltr" }}
      >
        <div className="font-peyda-600 text-xs text-blue-1050">
          از : {minVal.toLocaleString("fa-ir")} تومان
        </div>
        <div className="font-peyda-600 text-xs text-blue-1050">
          تا : {maxVal.toLocaleString("fa-ir")} تومان
        </div>
      </div>
    </>
  );
};

export default MultiRangeSlider;
