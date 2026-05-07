import React, { useState } from "react";
import Button from "../button";
import Check from "@/public/icons/check";
import Image from "next/image";

interface GiftCardProps {
  selected: boolean;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  name: string;
  price: number;
  image: string;
}

export default function GiftCard({
  selected,
  onClick,
  name,
  price,
  image,
}: GiftCardProps) {
  return (
    <div
      className={`flex flex-col items-center gap-y-3 bg-gray-250 p-3 rounded-md transition-all duration-200 ${
        selected ? "ring-2 ring-secendry" : ""
      }`}
    >
      <div className="relative w-full aspect-square max-w-[288px] overflow-hidden rounded-md">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 288px"
        />
      </div>

      <span className="font-peyda-500 text-base text-black">{name}</span>

      <span className="font-peyda-500 text-base text-black">
        {price === 0
          ? "رایگان"
          : Number(price)?.toLocaleString("fa-ir") + " تومان "}
      </span>

      <Button
        onClick={onClick}
        className={`w-full py-1 font-peyda-400 text-sm lg:text-lg ${
          selected
            ? "bg-secendry text-white"
            : "border border-Indigo-1000 bg-transparent text-Indigo-1000"
        }`}
      >
        {selected ? (
          <div className="flex items-center justify-center gap-x-1">
            <span>انتخاب شده</span>
            <Check className="h-6 w-6" />
          </div>
        ) : (
          <span>انتخاب</span>
        )}
      </Button>
    </div>
  );
}
