import { X, Trash2 } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { Celebrity } from "@shared/schema";

interface FavoritesSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  favorites: Celebrity[];
  onRemove: (id: string) => void;
  onSendCombinedEnquiry: () => void;
}

export function FavoritesSidebar({ 
  isOpen, 
  onClose, 
  favorites, 
  onRemove,
  onSendCombinedEnquiry
}: FavoritesSidebarProps) {
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="glassmorphic border-l border-white/10 w-full sm:max-w-md">
        <SheetHeader>
          <SheetTitle className="font-display text-2xl">Your Favorites</SheetTitle>
          <SheetDescription>
            {favorites.length} {favorites.length === 1 ? 'celebrity' : 'celebrities'} shortlisted
          </SheetDescription>
        </SheetHeader>

        <ScrollArea className="h-[calc(100vh-200px)] mt-6 -mx-6 px-6">
          <div className="space-y-3">
            {favorites.map((celebrity) => (
              <div
                key={celebrity.id}
                className="glassmorphic p-3 rounded-xl flex items-center gap-3 group"
                data-testid={`item-favorite-${celebrity.id}`}
              >
                <img
                  src={celebrity.image}
                  alt={celebrity.name}
                  className="w-16 h-16 rounded-lg object-cover"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold truncate">{celebrity.name}</h4>
                  <p className="text-sm text-muted-foreground truncate">{celebrity.category}</p>
                </div>
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => onRemove(celebrity.id)}
                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                  data-testid={`button-remove-favorite-${celebrity.id}`}
                >
                  <Trash2 className="w-4 h-4 text-destructive" />
                </Button>
              </div>
            ))}
          </div>
        </ScrollArea>

        {favorites.length > 0 && (
          <div className="absolute bottom-6 left-6 right-6">
            <Button
              onClick={onSendCombinedEnquiry}
              className="w-full bg-primary hover:bg-primary border border-primary-border h-12"
              data-testid="button-send-combined-enquiry"
            >
              <SiWhatsapp className="w-5 h-5 mr-2" />
              Send Combined Enquiry
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
