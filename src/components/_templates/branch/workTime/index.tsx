"use client";
import { days } from "@/configs/constants";
import { useEffect, useState } from "react";

export default function WorkTimeComponents({ work_time }: { work_time: any }) {
  const [workTime, setWorkTime] = useState("");

  useEffect(() => {
    const workingDays = [];
    let isClosedOnFriday = false;
    for (const [day, info] of Object.entries(work_time)) {
      if (day.trim() === "جمعه" && (info as { closed: boolean }).closed) {
        isClosedOnFriday = true;
      } else if (
        days.includes(day.trim()) &&
        !(info as { closed: boolean }).closed
      ) {
        workingDays.push(day.trim());
      }
    }

    const openingTime = work_time[workingDays[0]].open;
    const closingTime = work_time[workingDays[0]].close;

    const formattedWorkTime = `${workingDays[0]} تا ${workingDays[workingDays.length - 1]} ${closingTime}  الی ${openingTime} `;
    const fridayClosed = isClosedOnFriday ? " روزهای جمعه تعطیل می باشد" : "";

    setWorkTime(`${formattedWorkTime} ${fridayClosed}`);
  }, []);

  return (
    <>
      <p className="font-peyda-400 text-sm ">{workTime}</p>
    </>
  );
}
