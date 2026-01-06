"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function ContactPage() {
  const formRef = useRef<HTMLDivElement>(null);
  const faqRef = useRef<HTMLDivElement>(null);
  const toastRef = useRef<HTMLDivElement>(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState("");
  const [showToast, setShowToast] = useState(false);

  // Page animations
  useEffect(() => {
    if (formRef.current) {
      gsap.from(formRef.current, {
        y: 40,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });
    }

    if (faqRef.current) {
      gsap.from(faqRef.current, {
        y: 40,
        opacity: 0,
        duration: 1,
        delay: 0.3,
        ease: "power3.out",
      });
    }
  }, []);

  // Toast animation
  useEffect(() => {
    if (showToast && toastRef.current) {
      gsap.fromTo(
        toastRef.current,
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.4, ease: "power3.out" }
      );

      const timer = setTimeout(() => {
        gsap.to(toastRef.current, {
          scale: 0.8,
          opacity: 0,
          duration: 0.3,
          onComplete: () => setShowToast(false),
        });
      }, 2500);

      return () => clearTimeout(timer);
    }
  }, [showToast]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("Sending...");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setForm({ name: "", email: "", message: "" });
        setShowToast(true);
        setStatus("");
      } else {
        setStatus("Failed ❌");
      }
    } catch {
      setStatus("Failed ❌");
    }
  };

  return (
    <>
      {/* Header */}
      <div className="fixed w-full z-[100]">
        <Header />
      </div>

      {/* Page */}
      <div className="bg-[#f8f7f3] min-h-screen min-w-screen px-4 md:px-0 flex flex-col items-center pt-40">
        {/* Contact Form */}
        <div
          ref={formRef}
          className="w-full max-w-2xl pb-32 border-b border-gray-300"
        >
          <h1 className="text-6xl font-semibold text-black">Contact</h1>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-6 relative top-24"
          >
            <div>
              <label className="block text-sm mb-1">Name</label>
              <input
                required
                type="text"
                value={form.name}
                onChange={(e) =>
                  setForm({ ...form, name: e.target.value })
                }
                className="w-full border-b border-black bg-transparent outline-none py-2"
              />
            </div>

            <div>
              <label className="block text-sm mb-1">Email</label>
              <input
                required
                type="email"
                value={form.email}
                onChange={(e) =>
                  setForm({ ...form, email: e.target.value })
                }
                className="w-full border-b border-black bg-transparent outline-none py-2"
              />
            </div>

            <div>
              <label className="block text-sm mb-1">Message</label>
              <textarea
                required
                value={form.message}
                onChange={(e) =>
                  setForm({ ...form, message: e.target.value })
                }
                className="w-full border-b border-black bg-transparent outline-none py-2 resize-none"
                rows={4}
              />
            </div>

            <button
              type="submit"
              className="bg-black text-white py-4 rounded-lg shadow-[10px_15px_30px_rgba(0,0,0,0.3)] mt-6 hover:bg-gray-900 transition"
            >
              {status || "Send message"}
            </button>
          </form>
        </div>
      </div>

      {/* Success Toast */}
      {showToast && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center pointer-events-none">
          <div
            ref={toastRef}
            className="bg-black text-white px-8 py-4 rounded-xl text-lg shadow-2xl"
          >
            ✅ Message sent successfully
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}
