import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-start">
              {/* Image */}
              <div
                className="relative overflow-hidden bg-warm-white dark:bg-dk-surface aspect-[3/4]"
                style={{
                  background: item.imageUrl
                    ? undefined
                    : placeholderGradient(item.id),
                }}
              >
                {item.imageUrl && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                )}
              </div>

              {/* Details */}
              <div className="md:pt-6">
                {item.subtitle && (
                  <p className="text-[11px] tracking-[0.22em] uppercase text-soft-gold font-medium mb-4">
                    {item.subtitle}
                  </p>
                )}
                <h1 className="font-display text-[clamp(2rem,4vw,3rem)] font-light text-charcoal dark:text-dk-text leading-[1.1] mb-6">
                  {item.title}
                </h1>

                {/* Price */}
                <div className="flex items-baseline gap-3 mb-8">
                  <span className="text-[20px] text-charcoal dark:text-dk-text font-medium">
                    {price}
                  </span>
                  {originalPrice && (
                    <span className="text-[16px] text-taupe dark:text-dk-subtle line-through">
                      {originalPrice}
                    </span>
                  )}
                </div>

                {/* Color swatches */}
                {item.colorOptions && item.colorOptions.length > 0 && (
                  <div className="mb-8">
                    <p className="text-[11px] tracking-[0.12em] uppercase text-taupe dark:text-dk-muted mb-3">
                      Colours
                    </p>
                    <div
                      className="flex items-center gap-2"
                      role="list"
                      aria-label="Available colours"
                    >
                      {item.colorOptions.map((color) => (
                        <div
                          key={color}
                          role="listitem"
                          title={color}
                          aria-label={color}
                          className="w-6 h-6 rounded-full border border-sand/60 dark:border-dk-border/60"
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* Add to bag */}
                <button
                  type="button"
                  className="w-full md:w-auto md:min-w-[280px] bg-charcoal dark:bg-dk-text text-ivory dark:text-dk-base text-[12px] tracking-[0.14em] uppercase py-4 px-10 font-medium hover:bg-ink dark:hover:opacity-90 transition-colors duration-200"
                >
                  Add to Bag
                </button>

                <p className="mt-8 text-[14px] leading-relaxed text-taupe dark:text-dk-muted max-w-md">
                  Considered fabric, quiet colour, and a drape made to be worn for
                  years. Each piece is finished by hand in small runs.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
