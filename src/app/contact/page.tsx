"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function ContactPage() {
  const formRef = useRef<HTMLDivElement>(null);
  const faqRef = useRef<HTMLDivElement>(null);
  const [form, setForm] = useState({name: "", email: "", message: ""});
  const [status, setStatus] = useState("");

  useEffect(() => {
    if (formRef.current) {
      gsap.from(formRef.current, {
        y: 40,
        opacity: 1,
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("Sending");
    const res = await fetch("/api/contact",{
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(form),
    });

    if (res.ok) {
      setStatus("Message sent ✅");
      setForm({name: "", email: "", message: ""});
    }else{
      setStatus("Failed ❌")
    }
  }

  return (
    <>
     <div className="fixed  w-full   z-100">
            
            <Header/>
            
          
          </div>
       <div className="bg-[#f8f7f3] min-h-screen min-w-screen px-4 md:px-0 flex flex-col items-center">
        
      {/* Contact Form */}
      <div
        ref={formRef}
        className="w-full max-w-2xl py-38 border-b border-gray-300"
      >
        <h1 className="text-6xl font-semibold text-black ">Contact</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-6 relative top-24">
          <div>
            <label className="block text-sm mb-1">Name</label>
            <input
              value={form.name}
              onChange={(e)=> setForm({...form, name: e.target.value})}
              required
              type="text"
              className="w-full border-b border-black bg-transparent outline-none py-2"
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Email</label>
            <input
              value={form.email}
              onChange={(e)=> setForm({...form, email: e.target.value})}
              required
              type="email"
              className="w-full border-b border-black bg-transparent outline-none py-2"
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Message</label>
            <textarea
             value={form.message} 
              onChange={(e)=> setForm({...form, message: e.target.value})}
              required
             className="w-full border-b border-black bg-transparent outline-none py-2"></textarea>
          </div>

          <button
            type="submit"
            className="bg-black text-white py-4 rounded-lg shadow-[10px_15px_30px_rgba(0,0,0,0.3)] mt-6 hover:bg-gray-900 transition"
          >
            Send message
          </button>
        </form>
      </div>


      
    </div>
    <Footer/>
    </>
 
  );
}
