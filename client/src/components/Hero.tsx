import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import heroBg from "@assets/generated_images/Premium_concert_crowd_hero_background_a02f724e.png";

interface HeroProps {
  onSearch: (query: string) => void;
}

export function Hero({ onSearch }: HeroProps) {
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const query = formData.get("search") as string;
    onSearch(query);
  };

  return (
    <div className="relative h-screen flex items-center justify-center overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-background" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight" data-testid="text-hero-title">
            Discover & Book Your
            <span className="block text-gradient-gold mt-2">
              Favorite Celebrities
            </span>
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-12 max-w-2xl mx-auto" data-testid="text-hero-subtitle">
            Connect with India's finest singers, actors, comedians, influencers, and more for your special events
          </p>

          <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
            <div className="glassmorphic p-2 flex gap-2 rounded-2xl">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/60" />
                <Input
                  name="search"
                  placeholder="Search celebrities by name or category..."
                  className="pl-12 bg-transparent border-0 text-white placeholder:text-white/60 focus-visible:ring-0 h-12 text-base"
                  data-testid="input-hero-search"
                />
              </div>
              <Button 
                type="submit"
                className="bg-primary hover:bg-primary border border-primary-border px-8 h-12"
                data-testid="button-hero-search"
              >
                Search
              </Button>
            </div>
          </form>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
    </div>
  );
}
