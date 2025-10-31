import { Mic2, Film, Laugh, Smartphone, Music2, ChefHat, Presentation, Sparkles, type LucideIcon } from "lucide-react";
import type { Category } from "./schema";

export const categoryIcons: Record<Category, LucideIcon> = {
  "Singers": Mic2,
  "Actors": Film,
  "Actresses": Sparkles,
  "Comedians": Laugh,
  "Influencers": Smartphone,
  "Choreographers": Music2,
  "Chefs": ChefHat,
  "Motivational Speakers": Presentation,
};

export const categoryColors: Record<Category, string> = {
  "Singers": "from-purple-500/20 to-pink-500/20",
  "Actors": "from-blue-500/20 to-cyan-500/20",
  "Actresses": "from-rose-500/20 to-pink-500/20",
  "Comedians": "from-yellow-500/20 to-orange-500/20",
  "Influencers": "from-green-500/20 to-emerald-500/20",
  "Choreographers": "from-red-500/20 to-rose-500/20",
  "Chefs": "from-orange-500/20 to-amber-500/20",
  "Motivational Speakers": "from-indigo-500/20 to-violet-500/20",
};

export const categoryCardBackgrounds: Record<Category, string> = {
  "Singers": "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400&h=400&fit=crop",
  "Actors": "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=400&h=400&fit=crop",
  "Actresses": "https://images.unsplash.com/photo-1594909122845-11baa439b7bf?w=400&h=400&fit=crop",
  "Comedians": "https://images.unsplash.com/photo-1527224857830-43a7acc85260?w=400&h=400&fit=crop",
  "Influencers": "https://images.unsplash.com/photo-1493612276216-ee3925520721?w=400&h=400&fit=crop",
  "Choreographers": "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=400&h=400&fit=crop",
  "Chefs": "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=400&h=400&fit=crop",
  "Motivational Speakers": "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=400&fit=crop",
};

export const categoryBackgrounds: Record<Category, string> = {
  "Singers": "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=1920&h=600&fit=crop",
  "Actors": "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=1920&h=600&fit=crop",
  "Actresses": "https://images.unsplash.com/photo-1594909122845-11baa439b7bf?w=1920&h=600&fit=crop",
  "Comedians": "https://images.unsplash.com/photo-1527224857830-43a7acc85260?w=1920&h=600&fit=crop",
  "Influencers": "https://images.unsplash.com/photo-1493612276216-ee3925520721?w=1920&h=600&fit=crop",
  "Choreographers": "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=1920&h=600&fit=crop",
  "Chefs": "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=1920&h=600&fit=crop",
  "Motivational Speakers": "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1920&h=600&fit=crop",
};
