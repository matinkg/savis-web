import React from "react";
import style from "./style.module.css";
export default function CustomeSelectBox() {
  return (
    <div className={style.container} style={{ direction: "rtl" }}>
      <div className={style.select}>
        <select className={style.selectBox}>
          <option value="1" className="text-center">
            دسته بندی
          </option>
          <option value="1" className="text-center">
            دسته بندی
          </option>
          <option value="1" className="text-center">
            دسته بندی4
          </option>
          <option value="1" className="text-center">
            دسته بندی5
          </option>
        </select>
      </div>
    </div>
  );
}
