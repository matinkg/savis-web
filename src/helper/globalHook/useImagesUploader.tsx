import { request } from "@/configs/HTTPService";
import React, { useState } from "react";

export function useImagesUploader(url: string) {
  const [imageLoading, setImageLoading] = useState(false);

  const handleUpload = async (
    acceptedFiles: any,
    onChange: (file: any) => void,
    setValue: any,
    keyName: string,
    previousFileName?: string, // اضافه شدن پارامتر برای نام فایل قبلی
    isImageArray?: boolean
  ) => {
    setImageLoading(true);
    const formData = new FormData();

    // افزودن فایل‌های جدید به فرم‌داده
    acceptedFiles.forEach((item: any) => formData.append("files", item));

    // اگر نام فایل قبلی وجود دارد، آن را به فرم‌داده اضافه کنید
    if (previousFileName) {
      formData.append("previousFileName", previousFileName);
    }

    request(url, "POST", formData)
      .then((res) => {
        if (!res?.error) {
          setImageLoading(false);
          setValue(keyName, isImageArray ? res?.data : res?.data[0].fileUrl);
          onChange(isImageArray ? res?.data : res?.data[0].fileUrl); // به‌روزرسانی مقدار فرم با URL فایل آپلود شده
        }
      })
      .finally(() => {
        setImageLoading(false);
      });
  };

  return {
    handleUpload,
    imageLoading,
  };
}
