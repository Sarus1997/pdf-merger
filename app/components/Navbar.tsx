/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import "./navbar.scss";
import Sidebar from "./Sidebar";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  // 🟦 โหลดค่าภาษาจาก localStorage (ถ้ามี)
  const [lang, setLang] = useState<"en" | "th">("en");

  useEffect(() => {
    const savedLang = localStorage.getItem("appLanguage") as "en" | "th" | null;
    if (savedLang) {
      setLang(savedLang);
    }
  }, []);

  // 🟩 เมื่อเปลี่ยนภาษา → บันทึกลง localStorage
  const handleChangeLanguage = () => {
    const newLang = lang === "en" ? "th" : "en";
    setLang(newLang);
    localStorage.setItem("appLanguage", newLang);
  };

  return (
    <>
      <nav className="custom-navbar">
        <div className="navbar-content">
          <div className="navbar-left">
            <button className="sidebar-toggle" onClick={() => setOpen(true)}>
              <span></span>
              <span></span>
              <span></span>
            </button>

            <Link href="/" className="navbar-logo">
              <span className="logo-icon">📄</span>
              <span className="logo-text">PDF EDITOR</span>
            </Link>
          </div>

          <div className="navbar-right">
            <ul className="navbar-nav">
              <li><Link href="/">Home</Link></li>
              <li><Link href="/about">About</Link></li>
              <li><Link href="/contact">Contact</Link></li>
            </ul>
          </div>
        </div>
      </nav>

      <Sidebar
        open={open}
        onClose={() => setOpen(false)}
        language={lang}
        onChangeLanguage={handleChangeLanguage}
      />
    </>
  );
}
