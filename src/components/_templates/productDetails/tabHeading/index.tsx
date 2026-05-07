import React from "react";

type propsType = {
  tabs: any;
  setActiveTab: any;
  activeTab: any;
};

export default function TabHeading({
  tabs,
  setActiveTab,
  activeTab,
}: propsType) {
  return (
    <div className="mb-6 flex items-center justify-between bg-white px-[18px] lg:justify-start lg:gap-x-[75px]">
      {tabs?.map((item: any, index: number) => (
        <span
          key={index}
          onClick={() =>
            setActiveTab({
              index,
            })
          }
          className={`cursor-pointer py-[18px] font-peyda-500 text-sm lg:text-xl ${
            index === activeTab?.index
              ? "border-b-2 border-solid border-b-primary text-primary"
              : "border-b-2 border-solid border-b-transparent"
          }`}
        >
          {item?.title}
        </span>
      ))}
    </div>
  );
}
