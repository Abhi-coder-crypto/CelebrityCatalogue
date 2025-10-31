import { motion } from "framer-motion";
import { useLocation } from "wouter";
import { Heart, MapPin, Eye } from "lucide-react";
import { SiInstagram, SiYoutube, SiX } from "react-icons/si";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Mic2, Film, Laugh, Smartphone, Music2, ChefHat, Presentation } from "lucide-react";
import type { Celebrity } from "@shared/schema";

interface CelebrityCardProps {
  celebrity: Celebrity;
  onToggleFavorite: (id: string) => void;
  isFavorite: boolean;
}

const categoryBackgrounds = {
  "Singers": "bg-gradient-to-br from-purple-600/30 to-pink-600/30",
  "Actors": "bg-gradient-to-br from-blue-600/30 to-cyan-600/30",
  "Actresses": "bg-gradient-to-br from-rose-600/30 to-pink-600/30",
  "Comedians": "bg-gradient-to-br from-yellow-600/30 to-orange-600/30",
  "Influencers": "bg-gradient-to-br from-green-600/30 to-emerald-600/30",
  "Choreographers": "bg-gradient-to-br from-red-600/30 to-rose-600/30",
  "Chefs": "bg-gradient-to-br from-orange-600/30 to-amber-600/30",
  "Motivational Speakers": "bg-gradient-to-br from-indigo-600/30 to-violet-600/30",
};

export function CelebrityCard({ celebrity, onToggleFavorite, isFavorite }: CelebrityCardProps) {
  const [, setLocation] = useLocation();

  const handleCardClick = () => {
    setLocation(`/celebrity/${celebrity.slug}`);
  };

  const categoryBg = categoryBackgrounds[celebrity.category as keyof typeof categoryBackgrounds] || "bg-gradient-to-br from-gray-600/30 to-slate-600/30";

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="group relative overflow-hidden rounded-2xl hover-elevate active-elevate-2 cursor-pointer"
      data-testid={`card-celebrity-${celebrity.id}`}
      onClick={handleCardClick}
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-muted">
          <img 
            src={celebrity.image} 
            alt={celebrity.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

          {celebrity.isFeatured && (
            <Badge 
              className="absolute top-4 left-4 bg-primary/90 backdrop-blur-sm border-primary-border"
              data-testid="badge-featured"
            >
              Featured
            </Badge>
          )}

          <Button
            size="icon"
            variant="ghost"
            className="absolute top-4 right-4 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white border border-white/20"
            onClick={(e) => {
              e.preventDefault();
              onToggleFavorite(celebrity.id);
            }}
            data-testid={`button-favorite-${celebrity.id}`}
          >
            <Heart className={`w-5 h-5 ${isFavorite ? 'fill-red-500 text-red-500' : ''}`} />
          </Button>

          <div className="absolute bottom-0 left-0 right-0 p-2">
            <div className="bg-black/70 backdrop-blur-md p-2 rounded-lg border border-white/10">
              <h3 className="font-accent text-base font-bold text-white mb-1 line-clamp-1" data-testid={`text-celebrity-name-${celebrity.id}`}>
                {celebrity.name}
              </h3>
              
              <div className="flex items-center gap-1.5 mb-1.5 flex-wrap">
                <Badge variant="secondary" className="text-[10px] px-1.5 py-0" data-testid={`badge-category-${celebrity.id}`}>
                  {celebrity.category}
                </Badge>
                <div className="flex items-center gap-0.5 text-white/90 text-[10px]" data-testid={`text-location-${celebrity.id}`}>
                  <MapPin className="w-2.5 h-2.5" />
                  <span className="line-clamp-1">{celebrity.location}</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex gap-1.5">
                  {celebrity.socialLinks.slice(0, 3).map((link, idx) => {
                    const Icon = link.includes('instagram') ? SiInstagram : 
                                 link.includes('youtube') ? SiYoutube : SiX;
                    return (
                      <a
                        key={idx}
                        href={link}
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-6 h-6 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-colors"
                        data-testid={`link-social-${idx}`}
                      >
                        <Icon className="w-3 h-3 text-white" />
                      </a>
                    );
                  })}
                </div>

                {celebrity.views > 0 && (
                  <div className="flex items-center gap-0.5 text-white/80 text-[10px]" data-testid={`text-views-${celebrity.id}`}>
                    <Eye className="w-2.5 h-2.5" />
                    {celebrity.views}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
    </motion.div>
  );
}
