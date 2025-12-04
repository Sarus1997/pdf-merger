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

  // 🔥 แปลง Uint8Array -> ArrayBuffer แบบปลอดภัย 100%
  const arrayBuffer = mergedBytes.buffer.slice(
    mergedBytes.byteOffset,
    mergedBytes.byteOffset + mergedBytes.byteLength
  );

  return new Blob([arrayBuffer], { type: "application/pdf" });
}
