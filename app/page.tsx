"use client";

import Link from "next/link";
import { FileEdit, Scissors, FileDown } from "lucide-react";
import "./HomePage.scss";

export default function HomePage() {
  return (
    <div className="home-container">
      <h1 className="title">PDF Tools</h1>
      <p className="subtitle">เลือกเครื่องมือที่ต้องการใช้งาน</p>

      <div className="tool-grid">

        {/* Merge PDF */}
        <Link href="/merger" className="tool-card">
          <div className="icon-wrapper">
            <FileEdit size={48} />
          </div>
          <h2 className="tool-title">Merge PDF</h2>
          <p className="tool-desc">รวมไฟล์ PDF หลายไฟล์เป็นไฟล์เดียว</p>
        </Link>

        {/* Split PDF */}
        <div className="tool-card disabled">
          <div className="icon-wrapper">
            <Scissors size={48} />
          </div>
          <h2 className="tool-title">Split PDF (รอแป๊บ เดี๋ยวมา)</h2>
        </div>

        {/* Compress PDF */}
        <div className="tool-card disabled">
          <div className="icon-wrapper">
            <FileDown size={48} />
          </div>
          <h2 className="tool-title">Compress PDF (รอแป๊บ เดี๋ยวมา)</h2>
        </div>
      </div>
    </div>
  );
}
