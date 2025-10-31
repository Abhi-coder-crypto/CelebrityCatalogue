import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useRoute, Link } from "wouter";
import { ArrowLeft, MapPin, Star, Eye, Heart } from "lucide-react";
import { SiInstagram, SiYoutube, SiX, SiFacebook } from "react-icons/si";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { EnquireModal } from "@/components/EnquireModal";
import type { Celebrity } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";

export default function CelebrityProfile() {
  const [, params] = useRoute("/celebrity/:slug");
  const slug = params?.slug || "";
  const [isEnquireModalOpen, setIsEnquireModalOpen] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const { data: celebrities = [] } = useQuery<Celebrity[]>({
    queryKey: ["/api/celebrities"],
  });

  const celebrity = celebrities.find((c) => c.slug === slug);

  const incrementViewMutation = useMutation({
    mutationFn: async (id: string) => {
      await apiRequest("POST", `/api/celebrities/${id}/view`, {});
    },
  });

  useEffect(() => {
    if (celebrity) {
      incrementViewMutation.mutate(celebrity.id);
    }
  }, [celebrity?.id]);

  if (!celebrity) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="font-display text-2xl font-bold mb-4">Celebrity not found</h2>
          <Link href="/">
            <Button>Back to Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  const socialIcons = {
    instagram: SiInstagram,
    youtube: SiYoutube,
    twitter: SiX,
    facebook: SiFacebook,
  };

  return (
    <div className="min-h-screen">
      <Navigation />

      <div className="relative h-96 md:h-[600px] overflow-hidden">
        <img
          src={celebrity.image}
          alt={celebrity.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        
        <div className="absolute top-24 left-6 md:left-8">
          <Link href="/">
            <Button 
              variant="outline" 
              className="bg-black/60 backdrop-blur-md border-white/30 text-white hover:bg-black/80 shadow-lg"
              data-testid="button-back"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          </Link>
        </div>

        {celebrity.isFeatured && (
          <Badge className="absolute top-24 right-6 md:right-8 bg-primary/90 backdrop-blur-sm border-primary-border">
            <Star className="w-3 h-3 mr-1 fill-current" />
            Featured
          </Badge>
        )}
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-8 -mt-32 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="glassmorphic p-8 rounded-2xl"
            >
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h1 className="font-display text-4xl md:text-5xl font-bold mb-3" data-testid="text-profile-name">
                    {celebrity.name}
                  </h1>
                  <div className="flex flex-wrap items-center gap-3">
                    <Badge variant="secondary" className="text-sm" data-testid="badge-profile-category">
                      {celebrity.category}
                    </Badge>
                    <div className="flex items-center gap-1 text-muted-foreground text-sm" data-testid="text-profile-location">
                      <MapPin className="w-4 h-4" />
                      {celebrity.location}
                    </div>
                    {celebrity.views > 0 && (
                      <div className="flex items-center gap-1 text-muted-foreground text-sm" data-testid="text-profile-views">
                        <Eye className="w-4 h-4" />
                        {celebrity.views} views
                      </div>
                    )}
                  </div>
                </div>
                
                <Button
                  size="icon"
                  variant="outline"
                  onClick={() => setIsFavorite(!isFavorite)}
                  className="glassmorphic border-white/20"
                  data-testid="button-toggle-favorite"
                >
                  <Heart className={`w-5 h-5 ${isFavorite ? 'fill-red-500 text-red-500' : ''}`} />
                </Button>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="font-accent text-xl font-semibold mb-3">About</h3>
                  <p className="text-muted-foreground leading-relaxed" data-testid="text-profile-bio">{celebrity.bio}</p>
                </div>

                <div>
                  <h3 className="font-accent text-xl font-semibold mb-3">Event Types</h3>
                  <div className="flex flex-wrap gap-2">
                    {celebrity.eventTypes.map((eventType) => (
                      <Badge key={eventType} variant="outline" className="glassmorphic border-white/10">
                        {eventType}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-accent text-xl font-semibold mb-3">Languages</h3>
                  <div className="flex flex-wrap gap-2">
                    {celebrity.language.map((lang) => (
                      <Badge key={lang} variant="outline" className="glassmorphic border-white/10">
                        {lang}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="glassmorphic p-6 rounded-2xl lg:sticky lg:top-24 space-y-6"
            >
              <div>
                <h3 className="font-accent text-lg font-semibold mb-4" data-testid="text-quick-info-title">Quick Info</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Category</span>
                    <span className="font-medium">{celebrity.category}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Location</span>
                    <span className="font-medium">{celebrity.location}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Gender</span>
                    <span className="font-medium">{celebrity.gender}</span>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-white/10">
                <h3 className="font-accent text-lg font-semibold mb-4">Connect</h3>
                <div className="flex gap-2">
                  {celebrity.socialLinks.map((link, idx) => {
                    const platform = Object.keys(socialIcons).find((p) => link.includes(p));
                    const Icon = platform ? socialIcons[platform as keyof typeof socialIcons] : SiFacebook;
                    
                    return (
                      <a
                        key={idx}
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-full glassmorphic flex items-center justify-center hover-elevate transition-all"
                        data-testid={`link-social-${idx}`}
                      >
                        <Icon className="w-5 h-5" />
                      </a>
                    );
                  })}
                </div>
              </div>

              <Button
                onClick={() => setIsEnquireModalOpen(true)}
                className="w-full bg-primary hover:bg-primary/90 border border-primary-border h-12 text-base font-semibold shadow-lg"
                data-testid="button-enquire-now"
              >
                Enquire Now
              </Button>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="h-24 lg:h-20" />

      <Footer />

      <div className="lg:hidden fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black via-black/95 to-transparent z-[100] pointer-events-none">
        <Button
          onClick={() => setIsEnquireModalOpen(true)}
          className="w-full bg-primary hover:bg-primary/90 border-2 border-primary-border h-14 text-lg font-bold shadow-2xl pointer-events-auto"
          data-testid="button-enquire-now-mobile"
        >
          Book Now
        </Button>
      </div>

      <EnquireModal
        isOpen={isEnquireModalOpen}
        onClose={() => setIsEnquireModalOpen(false)}
        celebrityId={celebrity.id}
        celebrityName={celebrity.name}
      />
    </div>
  );
}
