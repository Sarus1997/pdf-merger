"use client";
import "./about.scss";

export default function AboutPage() {
  return (
    <div className="page-container">
      <div className="page-card">
        <h1 className="page-title">
          <span>ℹ️</span> About PDF Merger
        </h1>

        <p className="page-text">
          PDF Merger เป็นเครื่องมือที่ช่วยให้คุณรวมไฟล์ PDF ได้ง่าย รวดเร็ว และปลอดภัย
          ถูกออกแบบให้ใช้งานฟรี ไม่มีโฆษณา และรองรับทุกอุปกรณ์
        </p>

        <div className="feature-list">
          <div className="feature-item">
            <span className="icon">⚡</span>
            <p>ประมวลผลรวดเร็ว ระบบเบาและใช้งานง่าย</p>
          </div>

          <div className="feature-item">
            <span className="icon">🔒</span>
            <p>ความปลอดภัยสูง ไฟล์ทั้งหมดจะไม่ถูกเก็บบนเซิร์ฟเวอร์</p>
          </div>

          <div className="feature-item">
            <span className="icon">📱</span>
            <p>รองรับมือถือและแท็บเล็ตผ่าน Responsive UI</p>
          </div>
        </div>
      </div>
    </div>
  );
}
