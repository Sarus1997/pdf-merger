"use client";

import { PDFDocument } from "pdf-lib";

export async function mergePDFs(files: File[]): Promise<Blob> {
  const mergedPdf = await PDFDocument.create();

  for (const file of files) {
    const bytes = await file.arrayBuffer();
    const pdf = await PDFDocument.load(bytes);

    const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
    copiedPages.forEach((page) => mergedPdf.addPage(page));
  }

  const mergedBytes = await mergedPdf.save();

  // ✔ แก้ TypeScript issue ตอน build
  return new Blob([mergedBytes.buffer], { type: "application/pdf" });
}
