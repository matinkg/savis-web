"use client";

import React from "react";
import Select from "react-select";

type SelectBoxProps = {
  title: string;
  options: any;
  classNamePrefix?: string;
  handleChange: any;
  selectedOption: any;
  isMulti: boolean;
  titleStyle?: string;
  isStar?: boolean;
  loading?: boolean;
  customStyles?: any;
};

export default function SelectFullSearch({
  title,
  options,
  handleChange,
  selectedOption,
  isMulti,
  titleStyle,
  classNamePrefix,
  isStar,
  loading,
  customStyles,
}: SelectBoxProps) {
  // console.log("=======================> selectedOption", selectedOption);
  return (
    <div className={`w-full flex flex-col gap-y-1  `}>
      <div className="flex">
        <span
          className={`block font-peyda-600 text-gray-700 text-sm mr-1 tracking-wide ${titleStyle}`}
        >
          {title}
        </span>
        {isStar ? <span className="text-red-250">*</span> : null}
      </div>
      <Select
        value={selectedOption}
        onChange={handleChange}
        options={loading ? [] : options?.length > 0 && options}
        getOptionLabel={(option) =>
          option?.name ? option?.name : option?.title
        }
        getOptionValue={(option) => option?.id}
        isSearchable
        isMulti={isMulti}
        // closeMenuOnSelect={false}
        classNamePrefix={` ${classNamePrefix}`}
        placeholder={
          loading ? "در حال بارگذاری..." : "جستجو یا انتخاب کنید ...."
        }
        isLoading={loading}
        styles={customStyles}
      />
    </div>
  );
}
