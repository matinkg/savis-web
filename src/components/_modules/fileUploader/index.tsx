import React from "react";
import { useDropzone } from "react-dropzone";
import Spinner from "../loading/spinner";
import DocumentUpload from "@/public/icons/documentupload";
import "./style.css";

interface flieUploaderProps {
  handleUpload?: (acceptedFiles: any) => void;
  loading: boolean;
}
export default function FileUploader({
  handleUpload,
  loading,
}: flieUploaderProps) {
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    accept: { "application/pdf": [] },
    onDrop: handleUpload,
    // minSize: 1024,
    // maxSize: 3072000,
  });

  const additionalClass = isDragAccept
    ? "accept"
    : isDragReject
      ? "reject"
      : "";

  return (
    <div className="main-container">
      <div
        {...getRootProps({
          className: `dropzone ${additionalClass}`,
        })}
      >
        <input {...getInputProps()} />

        {loading ? (
          <div className="w-full h-[68px] flex flex-col items-center ">
            <Spinner type="spinner" className="w-8 h-8" />
          </div>
        ) : (
          <div className="flex-center h-10 w-fit gap-x-2 bg-secendry px-5 py-3 font-peyda-400 text-sm text-white lg:text-lg cursor-pointer">
            <span>ضمیمه فایل</span>

            <DocumentUpload className="h-[18px] w-[18px] lg:h-6 lg:w-6" />
          </div>
        )}
      </div>
    </div>
  );
}
