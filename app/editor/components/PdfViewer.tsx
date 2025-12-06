/* eslint-disable react-hooks/immutability */
"use client";

import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useCallback,
} from "react";
import * as pdfjsLib from "pdfjs-dist";
import "pdfjs-dist/build/pdf.worker.min";
import type { PDFDocumentProxy } from "pdfjs-dist/types/src/display/api";

export interface PdfViewerHandle {
  goToPage: (page: number) => void;
}

interface Props {
  url: string;
  pageNumber: number;
  scale: number;
  rotation: number;
  onDocumentLoad: (pages: number) => void;
  onPageRender: (size: { width: number; height: number }) => void;
}

const PdfViewer = forwardRef<PdfViewerHandle, Props>(
  ({ url, pageNumber, scale, rotation, onDocumentLoad, onPageRender }, ref) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const pdfRef = useRef<PDFDocumentProxy | null>(null);
    const renderTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    const isMountedRef = useRef(true);

    /** Expose method outside */
    useImperativeHandle(ref, () => ({
      goToPage(page: number) {
        render(page);
      },
    }));

    /** Render PDF page */
    const render = useCallback(
      async (pageNum: number) => {
        if (!pdfRef.current || !canvasRef.current) return;

        if (renderTimeoutRef.current) {
          clearTimeout(renderTimeoutRef.current);
        }

        renderTimeoutRef.current = setTimeout(async () => {
          try {
            const pdf = pdfRef.current;
            if (!pdf) return;

            const page = await pdf.getPage(pageNum);
            const viewport = page.getViewport({ scale, rotation });

            const canvas = canvasRef.current!;
            const context = canvas.getContext("2d");

            if (!context || !isMountedRef.current) return;

            canvas.height = viewport.height;
            canvas.width = viewport.width;

            context.clearRect(0, 0, canvas.width, canvas.height);

            onPageRender({ width: viewport.width, height: viewport.height });

            const renderContext = {
              canvasContext: context,
              viewport,
              canvas: canvasRef.current,
            };

            await page.render(renderContext).promise;
          } catch (error) {
            if (isMountedRef.current) {
              console.error("Error rendering PDF page:", error);
            }
          }
        }, 16);
      },
      [scale, rotation, onPageRender]
    );

    /** Load PDF with useCallback */
    const loadPDF = useCallback(async () => {
      try {
        const loadingTask = pdfjsLib.getDocument({ url });

        const pdf = await loadingTask.promise;
        if (!isMountedRef.current) return;

        pdfRef.current = pdf;

        onDocumentLoad(pdf.numPages);

        const validPage = Math.min(Math.max(1, pageNumber), pdf.numPages);
        render(validPage);
      } catch (err) {
        console.error("Failed to load PDF:", err);
      }
    }, [url, onDocumentLoad, pageNumber, render]);

    /** Load when URL changes */
    useEffect(() => {
      isMountedRef.current = true;
      loadPDF();

      return () => {
        isMountedRef.current = false;

        if (pdfRef.current) {
          pdfRef.current.destroy();
          pdfRef.current = null;
        }
      };
    }, [loadPDF]);

    /** Rerender on props changes */
    useEffect(() => {
      if (!pdfRef.current) return;

      const numPages = pdfRef.current.numPages;
      const valid = Math.min(Math.max(1, pageNumber), numPages);

      render(valid);
    }, [pageNumber, scale, rotation, render]);

    /** Cleanup timeout */
    useEffect(() => {
      return () => {
        if (renderTimeoutRef.current) {
          clearTimeout(renderTimeoutRef.current);
        }
      };
    }, []);

    return <canvas ref={canvasRef} className="pdf-canvas" />;
  }
);

PdfViewer.displayName = "PdfViewer";

export default PdfViewer;
