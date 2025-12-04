"use client";

import { useState } from "react";
import "./setting.scss";

export default function SettingsPage() {
  const [darkMode, setDarkMode] = useState(false);
  const [autosave, setAutosave] = useState(true);

  return (
    <div className="setting-container uk-container">
      <h1 className="uk-heading-medium uk-text-center">Settings</h1>

      <div className="uk-card uk-card-default uk-card-body settings-box">
        <div className="setting-row">
          <span>Dark Mode</span>
          <input type="checkbox" checked={darkMode} onChange={e => setDarkMode(e.target.checked)} />
        </div>

        <div className="setting-row">
          <span>Auto Save History</span>
          <input type="checkbox" checked={autosave} onChange={e => setAutosave(e.target.checked)} />
        </div>

        <button className="uk-button uk-button-primary uk-width-1-1 mt-3">
          Save Settings
        </button>
      </div>
    </div>
  );
}
