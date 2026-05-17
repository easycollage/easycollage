"use client";

import { MessageCircle } from "lucide-react";
import { usePathname } from "next/navigation";

const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "";
const WHATSAPP_MESSAGE = encodeURIComponent(
  "Hi EasyCollege, I need help with TS EAMCET counselling."
);
const WHATSAPP_URL = WHATSAPP_NUMBER
  ? `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`
  : `https://wa.me/?text=${WHATSAPP_MESSAGE}`;

export function FloatingWhatsApp() {
  const pathname = usePathname();

  if (pathname.startsWith("/admin")) {
    return null;
  }

  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat on WhatsApp"
      title="Chat on WhatsApp"
      className="fixed bottom-5 right-5 z-[60] flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-green-900/20 transition-transform hover:scale-105 hover:bg-[#1ebe5d] focus:outline-none focus:ring-4 focus:ring-green-200 active:scale-95 sm:bottom-6 sm:right-6"
    >
      <MessageCircle className="h-7 w-7" />
    </a>
  );
}
