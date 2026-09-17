import type { Metadata } from "next";
import { Poppins, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "KABO IT Group — Intelligent Infrastructure, Engineered to Perform",
  description:
    "KABO IT Group is a Gauteng-established systems integrator — B-BBEE Level 1 with 135% procurement recognition. Fifteen strategic alliances. Twelve interlocking solution domains. A unified architecture, a single contract, a single escalation path, a single engineering team. Nationwide footprint today, expanding into the broader African continent.",
  keywords: ["KABO IT Group", "intelligent infrastructure", "AI infrastructure", "GPU compute", "data centre", "B-BBEE Level 1", "South Africa", "Gauteng", "HPE", "Dell", "NVIDIA", "Hikvision", "Pure Storage", "Fortinet", "Juniper", "Palo Alto", "Veeam", "Schneider", "Commvault", "ManageEngine", "H3C", "Huawei", "Microsoft", "Sophos"],
  authors: [{ name: "KABO IT Group" }],
  icons: {
    icon: [
      { url: "/favicon.png", type: "image/png" },
    ],
    apple: [{ url: "/icon.png", type: "image/png" }],
  },
  openGraph: {
    title: "KABO IT Group — Intelligent Infrastructure, Engineered to Perform",
    description: "Fifteen strategic alliances. Twelve interlocking domains. A unified architecture — engineered end-to-end. Nationwide footprint today, expanding into the broader African continent.",
    siteName: "KABO IT Group",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${poppins.variable} ${spaceGrotesk.variable} antialiased bg-white text-[#001E3C]`}>
        {children}
        <Toaster position="top-center" richColors closeButton />
      </body>
    </html>
  );
}
