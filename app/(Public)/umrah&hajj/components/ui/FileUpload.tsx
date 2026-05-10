// components/ui/FileUpload.tsx
import { UploadToCloudinary } from "@/app/components/uploadPdf/uploadToCloudinary";
import React, { useRef, useState } from "react";

interface FileUploadProps {
  label: string;
  accept?: string;
  value: string;
  onChange: (file: File) => Promise<void>;
  error?: string;
  uploading?: boolean;
  placeholder?: string;
  className?: string;
}

const FileUpload: React.FC<FileUploadProps> = ({
  label,
  accept = "image/*",
  value,
  onChange,
  error,
  uploading = false,
  placeholder = "Upload file",
  className = "",
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string>(value);

  React.useEffect(() => {
    setPreview(value);
  }, [value]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Create preview for images
      const result = await UploadToCloudinary(file);

      setPreview(result as string);

      await onChange(result);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className={`space-y-1 ${className}`}>
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <div
        onClick={handleClick}
        className={`
          relative border-2 border-dashed rounded-lg p-4 cursor-pointer
          hover:border-red-400 transition-all duration-200
          ${uploading ? "opacity-50 cursor-wait" : ""}
          ${error ? "border-red-500" : "border-gray-300"}
          ${preview ? "border-red-500" : ""}
        `}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          onChange={handleFileChange}
          className="hidden"
          disabled={uploading}
        />

        {uploading ? (
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
            <p className="mt-2 text-sm text-gray-500">Uploading...</p>
          </div>
        ) : preview ? (
          <div className="relative">
            <img
              src={preview}
              alt="Preview"
              className="max-h-48 mx-auto rounded-lg"
            />
            <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-10 transition-all duration-200 rounded-lg flex items-center justify-center">
              <span className="text-white bg-red-600 px-3 py-1 rounded-full text-sm opacity-0 hover:opacity-100 transition-opacity duration-200">
                Change File
              </span>
            </div>
          </div>
        ) : (
          <div className="text-center py-4">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              />
            </svg>
            <p className="mt-2 text-sm text-gray-500">{placeholder}</p>
            <p className="text-xs text-gray-400 mt-1">
              Click to browse or drag and drop
            </p>
          </div>
        )}
      </div>
      {error && (
        <p className="text-red-500 text-xs mt-1 flex items-center">
          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
          {error}
        </p>
      )}
    </div>
  );
};

export default FileUpload;
