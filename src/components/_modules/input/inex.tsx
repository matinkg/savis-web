import { InputProps } from "../../../../libs/interface/input";
import React from "react";

export default function Input({
  name,
  className,
  style,
  type,
  placeholder,
  value,
  defaultValue,
  label,
  labelStyle,
  readOnly,
  children,
  onClick,
  onChange,
  validate,
  isStar,
  customElement,

  ...rest
}: InputProps) {
  return (
    <div className="relative flex w-full flex-col gap-y-[1px]">
      <div className="w-full flex items-center justify-between">
        {label && (
          <label className={`capitalize ${labelStyle}`}>
            {label}

            {isStar ? <span className="text-red-250">*</span> : null}
          </label>
        )}

        {customElement}
      </div>
      <input
        name={name}
        style={style}
        readOnly={readOnly}
        onChange={onChange}
        className={` ${className}`}
        type={type}
        placeholder={placeholder}
        value={value}
        defaultValue={defaultValue}
        onClick={onClick}
        {...validate}
        {...rest}
      />
      {children}
    </div>
  );
}
