import React from "react";
import { useDropzone } from "react-dropzone";
import "./style.css";
import Spinner from "../loading/spinner";

interface ImageUploaderProps {
  handleUpload?: (acceptedFiles: any) => void;
  loading: boolean;
  isBaseStyle?: boolean;
  error?: boolean;
}
export default function ImageUploader({
  handleUpload,
  loading,
  isBaseStyle,
  error,
}: ImageUploaderProps) {
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    accept: { "image/*": [] },
    onDrop: handleUpload,
    // minSize: 1024,
    // maxSize: 3072000,
  });

  const additionalClass = isDragAccept
    ? "accept"
    : isDragReject
      ? "reject"
      : "";
  const rootClass = `${isBaseStyle ? "" : error ? "dropzoneError" : "dropzone"} ${additionalClass}`;

  // console.log("loading ===========================>", loading);
  return (
    <div className="main-container">
      <div
        {...getRootProps({
          className: rootClass,
        })}
      >
        <input {...getInputProps()} />

        {loading ? (
          <div className="w-full h-[68px] flex flex-col items-center ">
            <Spinner type="spinner" className="w-8 h-8" />
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <p className="text-sm">
              Drag your photo here or
              <span className="text-primary"> Browse from device </span>
            </p>
            <img
              className="w-10 h-10 mt-2"
              src="/images/icons/img.png"
              alt=""
            />
          </div>
        )}
      </div>
    </div>
  );
}
