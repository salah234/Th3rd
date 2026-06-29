import type { Metadata } from "next";
import { Fraunces, Jost } from "next/font/google";
import "./globals.css";

// Display — characterful high-contrast serif with elegant italics.
const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

// Body — refined geometric sans; beautiful tracked uppercase.
const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
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
      className={`${fraunces.variable} ${jost.variable} h-full antialiased`}
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
