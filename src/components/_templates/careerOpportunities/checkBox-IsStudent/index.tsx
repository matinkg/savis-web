import { gender } from "@/configs/constants";
import React, { useState } from "react";

type PropsTypes = {
  register: any;
  errors: any;
  setValue: any;
};
export default function CheckBoxIsStudent({
  register,
  errors,
  setValue,
}: PropsTypes) {
  // check box
  const [selectedOption, setSelectedOption] = useState(null);
  const handleCheckboxChange = (option: any) => {
    setSelectedOption(option);
    setValue("isStudent", Number(option));
  };
  return (
    <>
      <div className="flex items-center gap-x-4 lg:gap-x-6">
        <div className="flex-center gap-x-2">
          <label>بله</label>
          <input
            type="checkbox"
            checked={selectedOption === true}
            onChange={() => handleCheckboxChange(true)}
          />
        </div>
        <div className="flex-center gap-x-2">
          <label>خیر</label>
          <input
            type="checkbox"
            checked={selectedOption === false}
            onChange={() => handleCheckboxChange(false)}
          />
        </div>
      </div>

      <small className="block pt-1 font-peyda-400 text-red-600">
        {errors.isStudent?.message}
      </small>
    </>
  );
}
