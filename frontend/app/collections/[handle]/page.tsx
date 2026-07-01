import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import {
  getCollections,
  getCollectionByHandle,
  getItemsByCollection,
} from "@/lib/data";

interface CollectionPageProps {
  params: Promise<{ handle: string }>;
}

export async function generateStaticParams() {
  const collections = await getCollections();
  return collections.map((collection) => ({
    handle: collection.handle ?? collection.id,
  }));
}

export async function generateMetadata({
  params,
}: CollectionPageProps): Promise<Metadata> {
  const { handle } = await params;
  const collection = await getCollectionByHandle(handle);
  if (!collection) {
    return { title: "Collection Not Found — Th3rd" };
  }
  return {
    title: `${collection.title} — Th3rd`,
    description: collection.description,
  };
}

export default async function CollectionPage({ params }: CollectionPageProps) {
  const { handle } = await params;
  const collection = await getCollectionByHandle(handle);

  if (!collection) {
    notFound();
  }

  const products = await getItemsByCollection(collection);
  const accent = collection.accentColor ?? "#DB7CA1";

  return (
    <>
      <Navigation />
      <main className="bg-ivory dark:bg-dk-base">
        {/* Collection hero */}
        <section
          className="relative overflow-hidden px-6 md:px-10 pt-32 md:pt-44 pb-16 md:pb-24"
          style={{
            background: `linear-gradient(135deg, ${accent}22 0%, ${accent}44 100%)`,
          }}
        >
          <div className="max-w-screen-xl mx-auto">
            <Link
              href="/collections"
              className="inline-flex items-center gap-2 text-[11px] tracking-[0.14em] uppercase text-taupe dark:text-dk-muted hover:text-charcoal dark:hover:text-dk-text transition-colors duration-200 font-medium mb-8"
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
              All Collections
            </Link>
            <p className="text-[11px] tracking-[0.22em] uppercase text-soft-gold font-medium mb-3">
              {collection.description ?? "Collection"}
            </p>
            <h1 className="font-display text-[clamp(2.5rem,6vw,4rem)] font-light text-charcoal dark:text-dk-text leading-[1.05]">
              {collection.title}
            </h1>
          </div>
        </section>

        {/* Product grid */}
        <section
          className="px-6 md:px-10 py-16 md:py-24"
          aria-label={`${collection.title} products`}
        >
          <div className="max-w-screen-xl mx-auto">
            {products.length > 0 ? (
              <>
                <p className="text-[12px] tracking-[0.1em] uppercase text-taupe dark:text-dk-muted mb-10">
                  {products.length} {products.length === 1 ? "Piece" : "Pieces"}
                </p>
                <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-5 gap-y-10 md:gap-x-8 md:gap-y-14">
                  {products.map((item, i) => (
                    <ProductCard key={item.id} item={item} index={i} />
                  ))}
                </div>
              </>
            ) : (
              <div className="py-20 text-center">
                <h2 className="font-display text-2xl font-light text-charcoal dark:text-dk-text mb-3">
                  Coming Soon
                </h2>
                <p className="text-[15px] text-taupe dark:text-dk-muted">
                  Pieces from this collection are being finished by hand. Check
                  back shortly.
                </p>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
