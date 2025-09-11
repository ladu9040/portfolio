"use client";

import { useEffect, useState } from "react";
import Loader from "@/components/Loader";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000); // adjust time as needed

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-[#F8F7F3] z-[9999]">
        <Loader />
      </div>
    );
  }

  return <>{children}</>;
}
