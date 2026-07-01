import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ProductView from "@/components/ProductView";
import { getItems, getItemById } from "@/lib/data";

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  const items = await getItems();
  return items.map((item) => ({ id: item.id }));
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { id } = await params;
  const item = await getItemById(id);
  if (!item) {
    return { title: "Product Not Found — Th3rd" };
  }
  return {
    title: `${item.title} — Th3rd`,
    description: item.subtitle ?? `${item.title} from Th3rd.`,
  };
}

function formatPrice(amount: number, currency: string): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
  }).format(amount);
}

// Deterministic editorial gradient placeholder (mirrors ProductCard).
function placeholderGradient(id: string): string {
  const palettes = [
    "linear-gradient(140deg, #FAD6E3 0%, #FFF0F4 50%, #F6C8DB 100%)",
    "linear-gradient(140deg, #F6DBE5 0%, #FFF6F9 50%, #FAD6E3 100%)",
    "linear-gradient(140deg, #F1C3D4 0%, #FDECF2 50%, #F4CCDC 100%)",
    "linear-gradient(140deg, #EFB8CD 0%, #FBDEE8 50%, #F1C3D4 100%)",
    "linear-gradient(140deg, #FAD0E0 0%, #FFF0F4 50%, #F6CEDD 100%)",
    "linear-gradient(140deg, #F2C2D5 0%, #FCE6EE 50%, #F4CEDD 100%)",
  ];
  return palettes[id.charCodeAt(0) % palettes.length];
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  const item = await getItemById(id);

  if (!item) {
    notFound();
  }

  const price = formatPrice(item.price, item.currency);
  const originalPrice = item.originalPrice
    ? formatPrice(item.originalPrice, item.currency)
    : null;

  return (
    <>
      <Navigation />
      <main className="bg-ivory dark:bg-dk-base">
        <section className="px-6 md:px-10 pt-32 md:pt-40 pb-20 md:pb-28">
          <div className="max-w-screen-xl mx-auto">
            {/* Back link */}
            <Link
              href="/new-arrivals"
              className="inline-flex items-center gap-2 text-[11px] tracking-[0.14em] uppercase text-taupe dark:text-dk-muted hover:text-charcoal dark:hover:text-dk-text transition-colors duration-200 font-medium mb-10"
            >
              <svg
                width="12"
                height="12"
                viewBox="0 0 14 14"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
              >
                <path d="M13 7H1M6 2 1 7l5 5" />
              </svg>
              Continue Shopping
            </Link>

            <ProductView
              title={item.title}
              subtitle={item.subtitle}
              price={price}
              originalPrice={originalPrice}
              images={item.images ?? []}
              colorOptions={item.colorOptions}
              body={item.body}
              placeholder={placeholderGradient(item.id)}
            />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
