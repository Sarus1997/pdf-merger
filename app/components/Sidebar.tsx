"use client";

import Link from "next/link";
import "./sidebar.scss";

interface Props {
  open: boolean;
  onClose: () => void;
  language: "en" | "th";
  onChangeLanguage: () => void;
}

export default function Sidebar({ open, onClose, language, onChangeLanguage }: Props) {
  const menuItems = [
    { href: "/", label: language === "en" ? "Home" : "หน้าแรก", icon: "🏠" },
    { href: "/history", label: language === "en" ? "History" : "ประวัติ", icon: "🕒" },
    { href: "/setting", label: language === "en" ? "Settings" : "ตั้งค่า", icon: "⚙️" },
  ];

  return (
    <>
      <div className={`sidebar-wrapper ${open ? "open" : ""}`}>
        <div className="sidebar">
          <div className="sidebar-header">
            <h2 className="sidebar-title">{language === "en" ? "Menu" : "เมนู"}</h2>
            <button className="close-btn" onClick={onClose} aria-label="Close menu">
              ✕
            </button>
          </div>

          <ul className="sidebar-menu">
            {menuItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="menu-item"
                  onClick={onClose}
                >
                  <span className="menu-icon">{item.icon}</span>
                  <span className="menu-label">{item.label}</span>
                  <span className="menu-arrow">→</span>
                </Link>
              </li>
            ))}
          </ul>

          <div className="sidebar-footer">
            <button className="lang-btn" onClick={onChangeLanguage}>
              🌐 {language === "en" ? "English" : "ภาษาไทย"}
            </button>

            <p>PDF Merger Pro</p>
            <small>Version 1.0.0</small>
          </div>
        </div>
      </div>

      {open && <div className="sidebar-overlay" onClick={onClose} />}
    </>
  );
}
