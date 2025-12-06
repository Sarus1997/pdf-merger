"use client";

import dynamic from "next/dynamic";
import { rgb } from "pdf-lib";
import { useRef, useState, useEffect } from "react";
import "uikit/dist/css/uikit.min.css";
import "./editor.scss";

// Dynamic import เพื่อป้องกัน SSR
const Document = dynamic(() => import("react-pdf").then(m => m.Document), {
  ssr: false,
});
const Page = dynamic(() => import("react-pdf").then(m => m.Page), {
  ssr: false,
});

type Annotation = {
  id: string;
  page: number;
  x: number;
  y: number;
  text?: string;
  type: "text" | "rect";
};

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [numPages, setNumPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [annotations, setAnnotations] = useState<Annotation[]>([]);
  const [viewerWidth, setViewerWidth] = useState<number>(800);
  const [pdfLoaded, setPdfLoaded] = useState(false);

  const viewerRef = useRef<HTMLDivElement | null>(null);

  // Setup PDF.js worker (client-side only)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      import('react-pdf').then((module) => {
        // ใช้ CDN ที่ match version อัตโนมัติ
        module.pdfjs.GlobalWorkerOptions.workerSrc =
          `//unpkg.com/pdfjs-dist@${module.pdfjs.version}/build/pdf.worker.min.mjs`;
        setPdfLoaded(true);
      });
    }
  }, []);

  // Auto resize
  useEffect(() => {
    function updateWidth() {
      if (viewerRef.current) {
        setViewerWidth(viewerRef.current.clientWidth);
      }
    }
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0] || null;
    setFile(f);
    setAnnotations([]);
    setCurrentPage(1);
  }

  function onDocLoad({ numPages }: { numPages: number }) {
    setNumPages(numPages);
  }

  function addText() {
    const id = Math.random().toString(36).slice(2);
    setAnnotations((a) => [
      ...a,
      { id, page: currentPage, x: 10, y: 10, text: "Text", type: "text" },
    ]);
  }

  function addRect() {
    const id = Math.random().toString(36).slice(2);
    setAnnotations((a) => [
      ...a,
      { id, page: currentPage, x: 20, y: 20, type: "rect" },
    ]);
  }

  function updateAnnotationText(id: string, text: string) {
    setAnnotations((a) => a.map((o) => (o.id === id ? { ...o, text } : o)));
  }

  async function exportPDF() {
    if (!file) return;

    const { PDFDocument } = await import("pdf-lib");
    const buffer = await file.arrayBuffer();
    const pdfDoc = await PDFDocument.load(buffer);
    const pages = pdfDoc.getPages();

    annotations.forEach((ann) => {
      const p = pages[ann.page - 1];

      const pdfW = p.getWidth();
      const pdfH = p.getHeight();

      const x = (ann.x / 100) * pdfW;
      const y = pdfH - (ann.y / 100) * pdfH;

      if (ann.type === "text" && ann.text) {
        p.drawText(ann.text, {
          x,
          y,
          size: 14,
          color: rgb(0, 0, 0),
        });
      }

      if (ann.type === "rect") {
        p.drawRectangle({
          x,
          y,
          width: 120,
          height: 60,
          borderColor: rgb(1, 0, 0),
          borderWidth: 2,
        });
      }
    });

    const bytes = await pdfDoc.save();
    const blob = new Blob([bytes as BlobPart], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "annotated.pdf";
    a.click();

    URL.revokeObjectURL(url);
  }

  if (!pdfLoaded) {
    return (
      <div className="uk-section uk-padding-small">
        <div className="uk-container">
          <div className="uk-text-center">Loading PDF Editor...</div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="uk-section uk-padding-small">
        <div className="uk-container">
          <h2>PDF Editor (React-PDF + PDF-Lib)</h2>

          <div className="pdf-toolbar">
            <input type="file" accept="application/pdf" onChange={handleUpload} />

            <button
              className="uk-button uk-button-default"
              onClick={addText}
              disabled={!file}
            >
              Add Text
            </button>

            <button
              className="uk-button uk-button-default"
              onClick={addRect}
              disabled={!file}
            >
              Add Rect
            </button>

            <button
              className="uk-button uk-button-primary"
              onClick={exportPDF}
              disabled={!file}
            >
              Export PDF
            </button>
          </div>

          <div className="pdf-scroll-wrapper">
            <div
              className="pdf-viewer-container"
              ref={viewerRef}
              style={{ position: "relative" }}
            >
              {file && (
                <Document file={file} onLoadSuccess={onDocLoad}>
                  <Page pageNumber={currentPage} width={viewerWidth} />
                </Document>
              )}

              {/* Overlays */}
              {file &&
                annotations
                  .filter((a) => a.page === currentPage)
                  .map((a) =>
                    a.type === "text" ? (
                      <div
                        key={a.id}
                        contentEditable
                        suppressContentEditableWarning
                        onInput={(e) =>
                          updateAnnotationText(
                            a.id,
                            (e.target as HTMLElement).innerText
                          )
                        }
                        className="annotation-text"
                        style={{
                          position: "absolute",
                          left: `${a.x}%`,
                          top: `${a.y}%`,
                        }}
                      >
                        {a.text}
                      </div>
                    ) : (
                      <div
                        key={a.id}
                        className="annotation-rect"
                        style={{
                          position: "absolute",
                          left: `${a.x}%`,
                          top: `${a.y}%`,
                          width: 120,
                          height: 60,
                        }}
                      />
                    )
                  )}
            </div>
          </div>

          {file && (
            <div className="pdf-page-controls">
              <button
                className="uk-button uk-button-secondary"
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              >
                Prev
              </button>

              <span className="page-number">
                {currentPage} / {numPages}
              </span>

              <button
                className="uk-button uk-button-secondary"
                onClick={() => setCurrentPage((p) => Math.min(numPages, p + 1))}
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}