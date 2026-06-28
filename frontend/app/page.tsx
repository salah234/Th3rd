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

export default function HomePage() {
  return (
    <>
      <Navigation />
      <main>
        <HeroSection />
        <FeaturedProducts />
        <CollectionsGrid />
        <BrandStory />
        <NewsletterSection />
      </main>
      <Footer />
    </>
  );
}
