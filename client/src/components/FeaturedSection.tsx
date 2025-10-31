import { useState } from "react";
import { motion } from "framer-motion";
import { Star, TrendingUp } from "lucide-react";
import { CelebrityCard } from "./CelebrityCard";
import { Button } from "./ui/button";
import type { Celebrity } from "@shared/schema";
import { categories } from "@shared/schema";

interface FeaturedSectionProps {
  celebrities: Celebrity[];
  onToggleFavorite: (id: string) => void;
  favorites: string[];
}

export function FeaturedSection({ celebrities, onToggleFavorite, favorites }: FeaturedSectionProps) {
  const [featuredCategory, setFeaturedCategory] = useState<string>("All");
  const [trendingCategory, setTrendingCategory] = useState<string>("All");

  const filteredForFeatured = featuredCategory === "All" 
    ? celebrities 
    : celebrities.filter(c => c.category === featuredCategory);
  
  const filteredForTrending = trendingCategory === "All" 
    ? celebrities 
    : celebrities.filter(c => c.category === trendingCategory);

  const featured = [...filteredForFeatured]
    .sort((a, b) => b.likes - a.likes)
    .slice(0, 3);
  
  const trending = [...filteredForTrending]
    .sort((a, b) => b.views - a.views)
    .slice(0, 3);

  if (celebrities.length === 0) return null;

  return (
    <section className="py-16 md:py-24 px-6 md:px-8">
      <div className="max-w-7xl mx-auto space-y-16">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-6"
          >
            <div className="flex items-center gap-3 mb-4">
              <Star className="w-8 h-8 text-primary fill-primary" />
              <h2 className="font-display text-3xl md:text-4xl font-bold" data-testid="text-featured-title">
                Featured Celebrities
              </h2>
            </div>
            
            <div className="flex gap-2 flex-wrap">
              <Button
                variant={featuredCategory === "All" ? "default" : "outline"}
                size="sm"
                onClick={() => setFeaturedCategory("All")}
                data-testid="button-featured-all"
                className="text-xs md:text-sm"
              >
                All
              </Button>
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={featuredCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFeaturedCategory(category)}
                  data-testid={`button-featured-${category.toLowerCase().replace(/\s+/g, '-')}`}
                  className="text-xs md:text-sm"
                >
                  {category}
                </Button>
              ))}
            </div>
          </motion.div>
          
          {featured.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {featured.map((celebrity) => (
                <CelebrityCard
                  key={celebrity.id}
                  celebrity={celebrity}
                  onToggleFavorite={onToggleFavorite}
                  isFavorite={favorites.includes(celebrity.id)}
                />
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground text-center py-8" data-testid="text-no-featured">
              No featured celebrities in this category yet
            </p>
          )}
        </div>

        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-6"
          >
            <div className="flex items-center gap-3 mb-4">
              <TrendingUp className="w-8 h-8 text-primary" />
              <h2 className="font-display text-3xl md:text-4xl font-bold" data-testid="text-trending-title">
                Trending Now
              </h2>
            </div>
            
            <div className="flex gap-2 flex-wrap">
              <Button
                variant={trendingCategory === "All" ? "default" : "outline"}
                size="sm"
                onClick={() => setTrendingCategory("All")}
                data-testid="button-trending-all"
                className="text-xs md:text-sm"
              >
                All
              </Button>
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={trendingCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setTrendingCategory(category)}
                  data-testid={`button-trending-${category.toLowerCase().replace(/\s+/g, '-')}`}
                  className="text-xs md:text-sm"
                >
                  {category}
                </Button>
              ))}
            </div>
          </motion.div>
          
          {trending.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {trending.map((celebrity) => (
                <CelebrityCard
                  key={celebrity.id}
                  celebrity={celebrity}
                  onToggleFavorite={onToggleFavorite}
                  isFavorite={favorites.includes(celebrity.id)}
                />
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground text-center py-8" data-testid="text-no-trending">
              No trending celebrities in this category yet
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
