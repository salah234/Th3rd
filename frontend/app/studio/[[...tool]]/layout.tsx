import type { Metadata, Viewport } from "next";

/**
 * Studio route shell. Metadata/viewport live here (server) so the page itself
 * can be a client component — the Sanity Studio is client-only and must stay
 * out of the React Server Component graph.
 */
export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Th3rd Studio",
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
