"use client";

import { useState } from "react";
import H1 from "./core/H1";

type ContactFormData = {
  name: string;
  email: string;
  message: string;
};

export default function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new window.FormData(e.currentTarget);

    const payload: ContactFormData = {
      name: formData.get("name")?.toString() || "",
      email: formData.get("email")?.toString() || "",
      message: formData.get("message")?.toString() || "",
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed to send");

      setSuccess(true);
      e.currentTarget.reset();
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  if (success) return <p>Message sent ✅</p>;

  return (
    <section id="contact" className="flex flex-col gap-8">
      <H1 content="contact us" />
      <div className="grid md:grid-cols-2 md:gap-3 gap-1">
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            name="name"
            placeholder="Name"
            required
            className="border p-2 rounded"
          />
          <input
            name="email"
            type="email"
            placeholder="Email"
            required
            className="border p-2 rounded"
          />

          <textarea
            name="message"
            placeholder="Message"
            required
            className="border p-2 rounded"
          />

          {error && <p className="text-red-500">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="bg-accent text-white px-4 py-2 rounded-full disabled:opacity-50 self-start "
          >
            {loading ? "Sending..." : "Send"}
          </button>
        </form>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2890.246911755926!2d10.1953618!3d36.822669999999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12fd350065594217%3A0x7d5e77b155db5e60!2sPopulup%20studio!5e1!3m2!1sen!2stn!4v1770889786742!5m2!1sen!2stn"
          width="600"
          height="450"
          loading="lazy"
        ></iframe>
      </div>
    </section>
  );
}
