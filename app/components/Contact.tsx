"use client";

import { useState } from "react";

type FormData = {
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

    const formData = new FormData(e.currentTarget);

    const payload: FormData = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      message: formData.get("message") as string,
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
    <form method="post" onSubmit={handleSubmit} className="flex flex-col gap-1">
      <input name="name" placeholder="Name" required />
      <input name="email" type="email" placeholder="Email" required />
      <textarea name="message" placeholder="Message" required />

      <button type="submit" disabled={loading}>
        {loading ? "Sending..." : "Send"}
      </button>
    </form>
  );
}
