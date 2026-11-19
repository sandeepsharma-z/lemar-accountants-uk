"use client";

import { ChevronUp } from "lucide-react";
import { useEffect, useState } from "react";

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const updateVisibility = () => setVisible(window.scrollY > 420);
    updateVisibility();
    window.addEventListener("scroll", updateVisibility, { passive: true });
    return () => window.removeEventListener("scroll", updateVisibility);
  }, []);

  return (
    <button className={`scroll-to-top${visible ? " is-visible" : ""}`} type="button" aria-label="Scroll to top" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
      <ChevronUp />
    </button>
  );
}
