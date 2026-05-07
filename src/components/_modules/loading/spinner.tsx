import React from "react";
import style from "./style.module.css";
import loadingStyle from "./loading.module.css";
type SpinnerProps = {
  className?: string;
  type?: "spinner" | "source";
};

export default function Spinner({ className, type = "spinner" }: SpinnerProps) {
  return (
    <>
      {type === "spinner" ? (
        <>
          <div
            className={`mx-auto ${style.loader} ${style.spinner} ${className}`}
          ></div>
        </>
      ) : (
        <>
          <>
            <div
              className={`mx-auto ${loadingStyle.spinner} ${className}`}
            ></div>
          </>
        </>
      )}
    </>
  );
}
