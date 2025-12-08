import React, { useCallback } from "react";
import { Upload } from "lucide-react";

interface DocumentUploadProps {
  onUpload: (files: File[]) => void;
  accept?: string;
  multiple?: boolean;
}

const DocumentUpload: React.FC<DocumentUploadProps> = ({
  onUpload,
  accept = ".pdf,.jpg,.jpeg,.png",
  multiple = true,
}) => {
  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      const files = Array.from(e.dataTransfer.files);
      onUpload(files);
    },
    [onUpload]
  );

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    onUpload(files);
  };

  return (
    <div
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
      className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-maritime-blue transition-colors"
    >
      <Upload className="mx-auto h-12 w-12 text-gray-400" />
      <div className="mt-4">
        <label className="cursor-pointer">
          <span className="text-maritime-blue hover:text-maritime-darkBlue font-medium">
            Click to upload
          </span>
          <span className="text-gray-600"> or drag and drop</span>
          <input
            type="file"
            className="hidden"
            accept={accept}
            multiple={multiple}
            onChange={handleFileSelect}
          />
        </label>
        <p className="text-xs text-gray-500 mt-2">PDF, JPG, PNG up to 10MB</p>
      </div>
    </div>
  );
};

export default DocumentUpload;
