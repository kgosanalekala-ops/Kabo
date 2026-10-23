import type { Metadata } from "next";
import { Poppins, Space_Grotesk, Outfit } from "next/font/google";
import "./globals.css";
import "./vision.css";
import "./photo-studio.css";
import "./equipment-3d.css";
import "./cinematic.css";
import "./cinematic-interiors.css";
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

const outfit = Outfit({ variable: "--font-outfit", subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://www.kaboitgroup.co.za"),
  title: "KABO IT Group | Powering Africa’s Intelligent Infrastructure",
  description: "KABO IT Group supplies ICT equipment and workplace products and helps organisations plan integrated networking, data centre, AI infrastructure and security solutions in South Africa.",
  keywords: ["KABO IT Group", "ICT supplies", "enterprise networking", "SD-WAN", "data centre", "AI infrastructure", "South Africa", "HPE", "Dell", "Lenovo", "HP", "H3C", "Veeam"],
  authors: [{ name: "KABO IT Group" }],
  icons: { icon: [{ url: "/favicon.png", type: "image/png" }], apple: [{ url: "/icon.png", type: "image/png" }] },
  openGraph: {
    title: "KABO IT Group | Powering Africa’s Intelligent Infrastructure",
    description: "Infrastructure supply. Intelligent systems. Integrated solutions.",
    siteName: "KABO IT Group", type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${poppins.variable} ${spaceGrotesk.variable} ${outfit.variable} antialiased bg-white text-[#001E3C]`}>
        {children}
        <Toaster position="top-center" richColors closeButton />
      </body>
    </html>
  );
}
