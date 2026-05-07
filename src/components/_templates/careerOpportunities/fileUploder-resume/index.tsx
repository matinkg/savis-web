import FileUploader from "@/components/_modules/fileUploader";
import Close from "@/public/icons/close";
import React, { useState } from "react";
import { Controller } from "react-hook-form";

type PropsTypes = {
  control: any;
  setValue: any;
};

export default function FileUploderResume({ control, setValue }: PropsTypes) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      setSelectedFile(file);
      setValue("resume_file", file); 
    }
  };

  return (
    <Controller
      name="resume_file"
      control={control}
      render={({ field: { onChange, value } }) =>
        selectedFile ? (
          <div className="relative flex items-center justify-between w-full p-3 border border-gray-300 rounded-md">
            <span className="truncate">{selectedFile.name}</span>
            <Close
              className="w-6 h-6 text-rose-600 cursor-pointer"
              onClick={() => {
                setSelectedFile(null);
                onChange(null);
              }}
            />
          </div>
        ) : (
          <FileUploader loading={false} handleUpload={handleFileChange} />
        )
      }
    />
  );
}
