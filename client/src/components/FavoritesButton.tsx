import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface FavoritesButtonProps {
  count: number;
  onClick: () => void;
}

export function FavoritesButton({ count, onClick }: FavoritesButtonProps) {
  if (count === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Button
        size="lg"
        onClick={onClick}
        className="rounded-full h-14 px-6 bg-primary hover:bg-primary border border-primary-border shadow-2xl relative"
        data-testid="button-favorites-fab"
      >
        <Heart className="w-5 h-5 mr-2 fill-current" />
        <span className="font-semibold">Favorites</span>
        <Badge className="ml-2 bg-white/20 hover:bg-white/20 text-white border-0">
          {count}
        </Badge>
      </Button>
    </div>
  );
}
