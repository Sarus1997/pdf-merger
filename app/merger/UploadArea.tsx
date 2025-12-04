/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { CloudUpload } from "lucide-react";

export default function UploadArea({
  isDragging,
  onDrop,
  onDragOver,
  onDragLeave,
  onFileInput,
}: any) {
  return (
    <div
      className={`pdf-upload-area ${isDragging ? "dragging" : ""}`}
      onDrop={onDrop}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
    >
      <label style={{ cursor: "pointer", display: "block" }}>
        <input
          type="file"
          multiple
          accept="application/pdf"
          onChange={onFileInput}
        />
        <div className="flex flex-col items-center gap-2">
          <CloudUpload size={48} className="uk-icon" />
          <div className="upload-text">
            {isDragging ? "วางไฟล์ที่นี่" : "คลิกหรือลากไฟล์มาที่นี่"}
          </div>
          <div className="upload-hint">รองรับไฟล์ PDF เท่านั้น</div>
        </div>
      </label>
    </div>
  );
}
