import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import ProductCard from "@/components/ProductCard";
import CollectionCard from "@/components/CollectionCard";
import NewsletterSection from "@/components/NewsletterSection";
import Footer from "@/components/Footer";
import FeaturedProducts from "@/components/FeaturedProducts";
import CollectionsGrid from "@/components/CollectionsGrid";
import BrandStory from "@/components/BrandStory";
import { getCollections, getFeaturedItems } from "@/lib/data";

export default async function HomePage() {
  const [collections, featuredItems] = await Promise.all([
    getCollections(),
    getFeaturedItems(),
  ]);

  return (
    <>
      <Navigation />
      <main>
        <HeroSection />
        <FeaturedProducts items={featuredItems} />
        <CollectionsGrid collections={collections} />
        <BrandStory />
        <NewsletterSection />
      </main>
      <Footer />
    </>
  );
}
