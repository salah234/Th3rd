import type { Metadata } from "next";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import PageHeader from "@/components/PageHeader";
import { getItems, getCollections } from "@/lib/data";

export const metadata: Metadata = {
  title: "New Arrivals — Th3rd",
  description:
    "The latest pieces from Th3rd — newly landed silks, occasion veils, and heritage wraps.",
};

export default async function NewArrivalsPage() {
  const [collections, items] = await Promise.all([
    getCollections(),
    getItems(),
  ]);

  // Newest pieces first, full catalogue follows.
  const sortedItems = [...items].sort(
    (a, b) => Number(Boolean(b.isNew)) - Number(Boolean(a.isNew)),
  );

  return (
    <>
      <Navigation />
      <main className="bg-ivory dark:bg-dk-base">
        <PageHeader
          eyebrow="Just Landed"
          title="New Arrivals"
          intro="The pieces we're wearing now — fresh fabrics and colourways, added as they leave the atelier."
        />

        {/* Collection chip row */}
        <section className="px-6 md:px-10 pb-10" aria-label="Browse by collection">
          <div className="max-w-screen-xl mx-auto flex flex-wrap justify-center gap-3">
            {collections.map((collection) => (
              <Link
                key={collection.id}
                href={`/collections/${collection.handle ?? collection.id}`}
                className="text-[11px] tracking-[0.12em] uppercase text-taupe dark:text-dk-muted border border-sand dark:border-dk-border rounded-full px-5 py-2.5 hover:text-charcoal dark:hover:text-dk-text hover:border-taupe dark:hover:border-dk-muted transition-colors duration-200 font-medium"
              >
                {collection.title}
              </Link>
            ))}
          </div>
        </section>

        {/* Product grid */}
        <section
          className="px-6 md:px-10 pb-24 md:pb-32"
          aria-label="New arrival products"
        >
          <div className="max-w-screen-xl mx-auto grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-5 gap-y-10 md:gap-x-8 md:gap-y-14">
            {sortedItems.map((item, i) => (
              <ProductCard key={item.id} item={item} index={i} />
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
