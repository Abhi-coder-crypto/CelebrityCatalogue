import { motion } from "framer-motion";
import { Link } from "wouter";
import { Mic2, Film, Laugh, Smartphone, Music2, ChefHat, Presentation, Sparkles, type LucideIcon } from "lucide-react";
import { categories, type Category } from "@shared/schema";

const categoryIcons: Record<Category, LucideIcon> = {
  "Singers": Mic2,
  "Actors": Film,
  "Actresses": Sparkles,
  "Comedians": Laugh,
  "Influencers": Smartphone,
  "Choreographers": Music2,
  "Chefs": ChefHat,
  "Motivational Speakers": Presentation,
};

const categoryColors: Record<Category, string> = {
  "Singers": "from-purple-500/20 to-pink-500/20",
  "Actors": "from-blue-500/20 to-cyan-500/20",
  "Actresses": "from-rose-500/20 to-pink-500/20",
  "Comedians": "from-yellow-500/20 to-orange-500/20",
  "Influencers": "from-green-500/20 to-emerald-500/20",
  "Choreographers": "from-red-500/20 to-rose-500/20",
  "Chefs": "from-orange-500/20 to-amber-500/20",
  "Motivational Speakers": "from-indigo-500/20 to-violet-500/20",
};

const categoryBackgrounds: Record<Category, string> = {
  "Singers": "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400&h=400&fit=crop",
  "Actors": "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=400&h=400&fit=crop",
  "Actresses": "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=400&h=400&fit=crop",
  "Comedians": "https://images.unsplash.com/photo-1527224857830-43a7acc85260?w=400&h=400&fit=crop",
  "Influencers": "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400&h=400&fit=crop",
  "Choreographers": "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=400&h=400&fit=crop",
  "Chefs": "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=400&h=400&fit=crop",
  "Motivational Speakers": "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=400&h=400&fit=crop",
};

interface CategoryGridProps {
  celebrityCounts?: Record<string, number>;
}

export function CategoryGrid({ celebrityCounts = {} }: CategoryGridProps) {
  return (
    <section className="py-20 md:py-32 px-6 md:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4" data-testid="text-category-title">
            Browse by Category
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto" data-testid="text-category-subtitle">
            Explore our diverse roster of talented celebrities across multiple categories
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {categories.map((category, index) => {
            const Icon = categoryIcons[category];
            const gradient = categoryColors[category];
            const backgroundImage = categoryBackgrounds[category];
            const count = celebrityCounts[category] || 0;

            return (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link href={`/category/${category.toLowerCase().replace(/\s+/g, '-')}`}>
                  <div 
                    className="group relative overflow-hidden rounded-2xl p-8 h-64 hover-elevate active-elevate-2 cursor-pointer transition-all duration-300"
                    style={{ perspective: "1000px" }}
                    data-testid={`card-category-${category.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    <img 
                      src={backgroundImage}
                      alt={category}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-60 group-hover:opacity-40 transition-opacity`} />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                    
                    <div className="relative h-full flex flex-col items-center justify-center text-center">
                      <div className="w-16 h-16 rounded-2xl bg-primary/20 backdrop-blur-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <Icon className="w-8 h-8 text-primary" />
                      </div>
                      <h3 className="font-accent text-xl md:text-2xl font-semibold mb-2" data-testid={`text-category-name-${category.toLowerCase().replace(/\s+/g, '-')}`}>
                        {category}
                      </h3>
                      <p className="text-muted-foreground text-sm" data-testid={`text-category-count-${category.toLowerCase().replace(/\s+/g, '-')}`}>
                        {count} {count === 1 ? 'Celebrity' : 'Celebrities'}
                      </p>
                    </div>

                    <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
