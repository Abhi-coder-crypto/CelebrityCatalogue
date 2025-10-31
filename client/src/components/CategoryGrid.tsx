import { motion } from "framer-motion";
import { Link } from "wouter";
import { categories } from "@shared/schema";
import { categoryIcons, categoryColors, categoryCardBackgrounds } from "@shared/categoryAssets";

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

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {categories.map((category, index) => {
            const Icon = categoryIcons[category];
            const gradient = categoryColors[category];
            const backgroundImage = categoryCardBackgrounds[category];
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
                    className="group relative overflow-hidden rounded-2xl p-4 md:p-8 h-64 hover-elevate active-elevate-2 cursor-pointer transition-all duration-300"
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
                    
                    <div className="relative h-full flex flex-col">
                      <div className="w-14 h-14 rounded-xl bg-primary/20 backdrop-blur-sm flex items-center justify-center mb-auto group-hover:scale-110 transition-transform">
                        <Icon className="w-7 h-7 text-primary" />
                      </div>
                      <div className="mt-auto">
                        <h3 className="font-accent text-xl md:text-2xl font-semibold mb-2" data-testid={`text-category-name-${category.toLowerCase().replace(/\s+/g, '-')}`}>
                          {category}
                        </h3>
                        <p className="text-muted-foreground text-sm" data-testid={`text-category-count-${category.toLowerCase().replace(/\s+/g, '-')}`}>
                          {count} {count === 1 ? 'Celebrity' : 'Celebrities'}
                        </p>
                      </div>
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
