/* eslint-disable @next/next/no-img-element */
"use client";

import Link from "next/link";
import "./sidebar.scss";
import { useLanguage } from "../contexts/LanguageContext";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function Sidebar({ open, onClose }: Props) {
  const { lang, toggleLang } = useLanguage();

  const menuItems = [
    { href: "/", label: lang === "en" ? "Home" : "หน้าแรก", icon: "🏠" },
    { href: "/about", label: lang === "en" ? "About" : "เกี่ยวกับ", icon: "👤" },
    { href: "/contact", label: lang === "en" ? "Contact" : "ติดต่อ", icon: "📞" },
    // { href: "/history", label: lang === "en" ? "History" : "ประวัติ", icon: "🕒" },
    // { href: "/setting", label: lang === "en" ? "Settings" : "ตั้งค่า", icon: "⚙️" },
  ];

  return (
    <>
      <div className={`sidebar-wrapper ${open ? "open" : ""}`}>

        <aside className="sidebar">
          <header className="sidebar-header">
            <h2>{lang === "en" ? "Menu" : "เมนู"}</h2>
            <button className="close-btn" onClick={onClose}>✕</button>
          </header>

          {/* MENU */}
          <ul className="sidebar-menu">
            {menuItems.map(item => (
              <li key={item.href}>
                <Link href={item.href} className="menu-item" onClick={onClose}>
                  <span className="icon">{item.icon}</span>
                  <span className="label">{item.label}</span>
                  <span className="arrow">→</span>
                </Link>
              </li>
            ))}
          </ul>

          {/* LANGUAGE BUTTON */}
          {/* LANGUAGE BUTTON */}
          <div className="language-container">
            <button className="lang-btn" onClick={toggleLang}>
              <img
                src={lang === "en" ? "/img/flag/england.svg" : "/img/flag/thailand.svg"}
                alt={lang === "en" ? "English" : "ไทย"}
                style={{ width: "24px", height: "24px", marginRight: "8px" }}
              />
              {lang === "en" ? "English" : "ภาษาไทย"}
            </button>
          </div>


          {/* FOOTER */}
          <footer className="sidebar-footer">
            <p>{lang === "en" ? "Developed by ⚒️ ITD TEAM" : "พัฒนาโดย ⚒️ ITD TEAM"}</p>
            <small>Version 1.1.1</small>
          </footer>
        </aside>

      </div>

      {open && <div className="sidebar-overlay" onClick={onClose} />}
    </>
  );
}
