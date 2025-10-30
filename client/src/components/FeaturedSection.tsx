import { motion } from "framer-motion";
import { Star, TrendingUp } from "lucide-react";
import { CelebrityCard } from "./CelebrityCard";
import type { Celebrity } from "@shared/schema";

interface FeaturedSectionProps {
  celebrities: Celebrity[];
  onToggleFavorite: (id: string) => void;
  favorites: string[];
}

export function FeaturedSection({ celebrities, onToggleFavorite, favorites }: FeaturedSectionProps) {
  const featured = celebrities.filter(c => c.isFeatured).slice(0, 3);
  const trending = [...celebrities]
    .sort((a, b) => b.views - a.views)
    .slice(0, 3);

  if (featured.length === 0 && trending.length === 0) return null;

  return (
    <section className="py-16 md:py-24 px-6 md:px-8">
      <div className="max-w-7xl mx-auto space-y-16">
        {featured.length > 0 && (
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-3 mb-8"
            >
              <Star className="w-8 h-8 text-primary fill-primary" />
              <h2 className="font-display text-3xl md:text-4xl font-bold">
                Featured Celebrities
              </h2>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featured.map((celebrity) => (
                <CelebrityCard
                  key={celebrity.id}
                  celebrity={celebrity}
                  onToggleFavorite={onToggleFavorite}
                  isFavorite={favorites.includes(celebrity.id)}
                />
              ))}
            </div>
          </div>
        )}

        {trending.length > 0 && (
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-3 mb-8"
            >
              <TrendingUp className="w-8 h-8 text-primary" />
              <h2 className="font-display text-3xl md:text-4xl font-bold">
                Trending Now
              </h2>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {trending.map((celebrity) => (
                <CelebrityCard
                  key={celebrity.id}
                  celebrity={celebrity}
                  onToggleFavorite={onToggleFavorite}
                  isFavorite={favorites.includes(celebrity.id)}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
