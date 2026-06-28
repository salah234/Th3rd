import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Th3rd — Luxury Modest Fashion",
  description:
    "Handcrafted hijabs and modest fashion for the modern woman. Premium fabrics, refined drape.",
};

// Runs synchronously before paint — prevents flash of wrong theme.
const themeScript = `
  try {
    var t = localStorage.getItem('th3rd-theme');
    var p = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (t === 'dark' || (!t && p)) {
      document.documentElement.classList.add('dark');
    }
  } catch(e) {}
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      // suppressHydrationWarning because the theme script mutates className
      // before React hydration, so the server/client class list will differ.
      suppressHydrationWarning
      className={`${cormorant.variable} ${dmSans.variable} h-full antialiased`}
    >
      <head>
        {/* eslint-disable-next-line @next/next/no-sync-scripts */}
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-full flex flex-col bg-ivory text-charcoal dark:bg-dk-base dark:text-dk-text transition-colors duration-200">
        {children}
      </body>
    </html>
  );
}
