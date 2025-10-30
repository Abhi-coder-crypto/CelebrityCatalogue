import { motion } from "framer-motion";
import { Link } from "wouter";
import { Heart, MapPin, Eye } from "lucide-react";
import { SiInstagram, SiYoutube, SiX } from "react-icons/si";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Celebrity } from "@shared/schema";

interface CelebrityCardProps {
  celebrity: Celebrity;
  onToggleFavorite: (id: string) => void;
  isFavorite: boolean;
}

export function CelebrityCard({ celebrity, onToggleFavorite, isFavorite }: CelebrityCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="group relative overflow-hidden rounded-2xl hover-elevate active-elevate-2"
      data-testid={`card-celebrity-${celebrity.id}`}
    >
      <Link href={`/celebrity/${celebrity.slug}`}>
        <div className="relative aspect-[3/4] overflow-hidden bg-muted">
          <img 
            src={celebrity.image} 
            alt={celebrity.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90" />

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

          <div className="absolute bottom-0 left-0 right-0 p-6">
            <div className="glassmorphic p-4 rounded-xl">
              <h3 className="font-accent text-xl font-semibold text-white mb-2" data-testid={`text-celebrity-name-${celebrity.id}`}>
                {celebrity.name}
              </h3>
              
              <div className="flex items-center gap-2 mb-3">
                <Badge variant="secondary" className="text-xs" data-testid={`badge-category-${celebrity.id}`}>
                  {celebrity.category}
                </Badge>
                <div className="flex items-center gap-1 text-white/80 text-xs" data-testid={`text-location-${celebrity.id}`}>
                  <MapPin className="w-3 h-3" />
                  {celebrity.location}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex gap-2">
                  {celebrity.socialLinks.slice(0, 3).map((link, idx) => {
                    const Icon = link.includes('instagram') ? SiInstagram : 
                                 link.includes('youtube') ? SiYoutube : SiX;
                    return (
                      <a
                        key={idx}
                        href={link}
                        onClick={(e) => e.stopPropagation()}
                        className="w-7 h-7 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-colors"
                        data-testid={`link-social-${idx}`}
                      >
                        <Icon className="w-3.5 h-3.5 text-white" />
                      </a>
                    );
                  })}
                </div>

                {celebrity.views > 0 && (
                  <div className="flex items-center gap-1 text-white/70 text-xs" data-testid={`text-views-${celebrity.id}`}>
                    <Eye className="w-3 h-3" />
                    {celebrity.views}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
