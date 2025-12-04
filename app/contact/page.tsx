/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState } from "react";
import "./contact.scss";

export default function ContactPage() {
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    const res = await fetch("/api/contact", {
      method: "POST",
      body: JSON.stringify({
        name: e.target.name.value,
        email: e.target.email.value,
        message: e.target.message.value,
      }),
    });

    setLoading(false);

    if (res.ok) {
      alert("Message sent!");
      e.target.reset();
    } else {
      alert("Failed to send message.");
    }
  };

  return (
    <div className="contact-container">
      <h1 className="contact-title">Contact Us</h1>

      <form onSubmit={onSubmit} className="contact-form">
        <div className="form-group">
          <label>Your Name</label>
          <input name="name" required />
        </div>

        <div className="form-group">
          <label>Email Address</label>
          <input type="email" name="email" required />
        </div>

        <div className="form-group">
          <label>Message</label>
          <textarea name="message" required></textarea>
        </div>

        <button type="submit" disabled={loading} className="submit-btn">
          {loading ? "Sending..." : "Send Message"}
        </button>
      </form>
    </div>
  );
}
