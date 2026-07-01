import type { Metadata } from "next";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import CollectionCard from "@/components/CollectionCard";
import PageHeader from "@/components/PageHeader";
import { getCollections } from "@/lib/data";

export const metadata: Metadata = {
  title: "Collections — Th3rd",
  description:
    "Explore the Th3rd collections — refined everyday silks, occasion pieces, and timeless heritage craft.",
};

export default async function CollectionsPage() {
  const collections = await getCollections();

  return (
    <>
      <Navigation />
      <main className="bg-ivory dark:bg-dk-base">
        {/* Page header */}
        <PageHeader
          eyebrow="Shop by World"
          title="Our Collections"
          intro="Each collection is a study in restraint — considered fabrics, quiet colour, and pieces made to be worn for years, not seasons."
        />

        {/* Collections grid */}
        <section className="px-6 md:px-10 pb-24 md:pb-32" aria-label="All collections">
          <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
            {collections.map((collection, i) => (
              <CollectionCard
                key={collection.id}
                collection={collection}
                index={i}
                variant="portrait"
              />
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
