"use client";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

const Portal = ({ children }: { children: React.ReactNode }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; // Prevents rendering on SSR

  return createPortal(children, document.body);
};

export default Portal;
