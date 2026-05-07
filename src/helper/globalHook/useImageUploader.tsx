import { request } from "@/configs/HTTPService";
import { uploaderProps, uploaderReturn } from "@/libs/interface/uploader";
import React, { useState } from "react";

export function useImageUploader(url: string, setValue: any, keyName: string) {
  const [loading, setLoading] = useState(false);

  const handleUpload = async (
    acceptedFiles: any,
    onChange: (file: any) => void
  ) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("files", acceptedFiles[0]); // Assuming you only accept one file

    request(url, "POST", formData)
      .then((res) => {
        if (!res?.error) {
          // //console.log(res);
          setLoading(false);
          setValue(keyName, res?.data[0].fileUrl);
          onChange(res?.data[0].fileUrl); // Update form value with the uploaded file URL
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return {
    handleUpload,
    loading,
  };
}
