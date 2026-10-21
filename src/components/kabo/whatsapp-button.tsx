"use client";
import { MessageCircle } from "lucide-react";
/** Opens a user-initiated WhatsApp chat, with no background API submission. */
export function WhatsAppButton(){
  return <a href="https://wa.me/27612854418?text=Hello%20KABO%20IT%20Group%2C%20I%20would%20like%20an%20ICT%20quote%20or%20consultation." target="_blank" rel="noopener noreferrer" title="Ask KABO on WhatsApp" aria-label="Open WhatsApp to enquire about KABO supplies and solutions" className="fixed bottom-5 right-5 sm:bottom-5 sm:right-6 z-40 group inline-flex items-center gap-2 rounded-full bg-[#075e54] text-white py-3.5 px-4 shadow-xl hover:bg-[#064e46] transition-colors"><MessageCircle size={21} aria-hidden="true"/><span className="hidden sm:inline text-sm font-semibold">WhatsApp KABO</span></a>;
}
