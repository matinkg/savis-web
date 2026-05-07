import { request } from "@/configs/HTTPService";
import { uploaderProps, uploaderReturn } from "@/libs/interface/uploader";
import React, { useState } from "react";

export function useFileUploader(url: string, setValue: any, keyName: string) {
  const [loading, setLoading] = useState(false);

  function handleUpload(acceptedFiles: File[], onChange: (file: any) => void) {
    setLoading(true);
    const formData = new FormData();
    acceptedFiles.forEach((item: File) => formData.append("files", item));
    request(url, "POST", formData)
      .then((res: any) => {
        if (!res?.error) {
          setLoading(false);
          setValue(keyName, res.data[0].fileName);
          onChange(res.data[0].fileName); // Update form value with the uploaded file URL
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return {
    handleUpload,
    loading,
  };
}
