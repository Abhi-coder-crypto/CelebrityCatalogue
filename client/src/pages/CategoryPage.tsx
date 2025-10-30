import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { useRoute } from "wouter";
import { ArrowLeft } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { FilterBar } from "@/components/FilterBar";
import { CelebrityCard } from "@/components/CelebrityCard";
import { FavoritesButton } from "@/components/FavoritesButton";
import { FavoritesSidebar } from "@/components/FavoritesSidebar";
import type { Celebrity } from "@shared/schema";
import { categories } from "@shared/schema";

export default function CategoryPage() {
  const [, params] = useRoute("/category/:slug");
  const categorySlug = params?.slug || "";
  const categoryName = categories.find(
    cat => cat.toLowerCase().replace(/\s+/g, '-') === categorySlug
  ) || "";

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGender, setSelectedGender] = useState("all");
  const [selectedLanguage, setSelectedLanguage] = useState("all");
  const [selectedLocation, setSelectedLocation] = useState("all");
  const [selectedEventType, setSelectedEventType] = useState("all");
  const [favorites, setFavorites] = useState<string[]>([]);
  const [isFavoritesSidebarOpen, setIsFavoritesSidebarOpen] = useState(false);

  const { data: celebrities = [], isLoading } = useQuery<Celebrity[]>({
    queryKey: ["/api/celebrities"],
  });

  const filteredCelebrities = useMemo(() => {
    return celebrities.filter((celebrity) => {
      const matchesCategory = celebrity.category === categoryName;
      const matchesSearch = searchQuery === "" || 
        celebrity.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesGender = selectedGender === "all" || celebrity.gender === selectedGender;
      const matchesLanguage = selectedLanguage === "all" || celebrity.language.includes(selectedLanguage);
      const matchesLocation = selectedLocation === "all" || celebrity.location === selectedLocation;
      const matchesEventType = selectedEventType === "all" || celebrity.eventTypes.includes(selectedEventType);

      return matchesCategory && matchesSearch && matchesGender && matchesLanguage && 
             matchesLocation && matchesEventType;
    });
  }, [celebrities, categoryName, searchQuery, selectedGender, selectedLanguage, 
      selectedLocation, selectedEventType]);

  const favoriteCelebrities = celebrities.filter((c) => favorites.includes(c.id));

  const handleToggleFavorite = (id: string) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id]
    );
  };

  const handleClearFilters = () => {
    setSearchQuery("");
    setSelectedGender("all");
    setSelectedLanguage("all");
    setSelectedLocation("all");
    setSelectedEventType("all");
  };

  const handleSendCombinedEnquiry = () => {
    const celebrityNames = favoriteCelebrities.map(c => c.name).join(", ");
    const whatsappMessage = encodeURIComponent(
      `Hi! I'd like to enquire about the following celebrities for an event:\n\n${celebrityNames}\n\nPlease share more details about availability and pricing.`
    );
    const whatsappNumber = "919876543210";
    window.open(`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`, '_blank');
    setIsFavoritesSidebarOpen(false);
  };

  return (
    <div className="min-h-screen">
      <Navigation />

      <div className="pt-24 pb-12 px-6 md:px-8 bg-gradient-to-b from-card to-background">
        <div className="max-w-7xl mx-auto">
          <Link href="/">
            <Button variant="ghost" className="mb-6" data-testid="button-back-home">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4" data-testid="text-category-page-title">{categoryName}</h1>
          <p className="text-muted-foreground text-lg" data-testid="text-category-page-subtitle">
            Discover talented {categoryName.toLowerCase()} for your next event
          </p>
        </div>
      </div>

      <FilterBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedCategory={categoryName}
        onCategoryChange={() => {}}
        selectedGender={selectedGender}
        onGenderChange={setSelectedGender}
        selectedLanguage={selectedLanguage}
        onLanguageChange={setSelectedLanguage}
        selectedLocation={selectedLocation}
        onLocationChange={setSelectedLocation}
        selectedEventType={selectedEventType}
        onEventTypeChange={setSelectedEventType}
        onClearFilters={handleClearFilters}
      />

      <section className="py-12 px-6 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <p className="text-muted-foreground" data-testid="text-category-results-count">
              {filteredCelebrities.length} {filteredCelebrities.length === 1 ? 'celebrity' : 'celebrities'} found
            </p>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="aspect-[3/4] glassmorphic rounded-2xl animate-pulse" />
              ))}
            </div>
          ) : filteredCelebrities.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-muted-foreground text-lg">No celebrities found in this category</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredCelebrities.map((celebrity) => (
                <CelebrityCard
                  key={celebrity.id}
                  celebrity={celebrity}
                  onToggleFavorite={handleToggleFavorite}
                  isFavorite={favorites.includes(celebrity.id)}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />

      <FavoritesButton 
        count={favorites.length} 
        onClick={() => setIsFavoritesSidebarOpen(true)} 
      />

      <FavoritesSidebar
        isOpen={isFavoritesSidebarOpen}
        onClose={() => setIsFavoritesSidebarOpen(false)}
        favorites={favoriteCelebrities}
        onRemove={handleToggleFavorite}
        onSendCombinedEnquiry={handleSendCombinedEnquiry}
      />
    </div>
  );
}
