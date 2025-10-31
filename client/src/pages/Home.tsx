import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { Hero } from "@/components/Hero";
import { CategoryGrid } from "@/components/CategoryGrid";
import { FeaturedSection } from "@/components/FeaturedSection";
import { ScrollingTicker } from "@/components/ScrollingTicker";
import { FilterBar } from "@/components/FilterBar";
import { CelebrityCard } from "@/components/CelebrityCard";
import { FavoritesButton } from "@/components/FavoritesButton";
import { FavoritesSidebar } from "@/components/FavoritesSidebar";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import type { Celebrity } from "@shared/schema";

export default function Home() {
  const [, setLocation] = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedGender, setSelectedGender] = useState("all");
  const [selectedLanguage, setSelectedLanguage] = useState("all");
  const [selectedLocation, setSelectedLocation] = useState("all");
  const [selectedEventType, setSelectedEventType] = useState("all");
  const [favorites, setFavorites] = useState<string[]>([]);
  const [isFavoritesSidebarOpen, setIsFavoritesSidebarOpen] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const { data: celebrities = [], isLoading } = useQuery<Celebrity[]>({
    queryKey: ["/api/celebrities"],
  });

  const filteredCelebrities = useMemo(() => {
    return celebrities.filter((celebrity) => {
      const matchesSearch = searchQuery === "" || 
        celebrity.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        celebrity.category.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = selectedCategory === "all" || celebrity.category === selectedCategory;
      const matchesGender = selectedGender === "all" || celebrity.gender === selectedGender;
      const matchesLanguage = selectedLanguage === "all" || celebrity.language.includes(selectedLanguage);
      const matchesLocation = selectedLocation === "all" || celebrity.location === selectedLocation;
      const matchesEventType = selectedEventType === "all" || celebrity.eventTypes.includes(selectedEventType);

      return matchesSearch && matchesCategory && matchesGender && matchesLanguage && 
             matchesLocation && matchesEventType;
    });
  }, [celebrities, searchQuery, selectedCategory, selectedGender, selectedLanguage, 
      selectedLocation, selectedEventType]);

  const celebrityCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    celebrities.forEach((celebrity) => {
      counts[celebrity.category] = (counts[celebrity.category] || 0) + 1;
    });
    return counts;
  }, [celebrities]);

  const favoriteCelebrities = celebrities.filter((c) => favorites.includes(c.id));

  const handleToggleFavorite = (id: string) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id]
    );
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setShowFilters(true);
    const element = document.getElementById('results-section');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleClearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("all");
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
      
      <Hero onSearch={handleSearch} />
      
      <ScrollingTicker />

      {!showFilters && (
        <>
          <CategoryGrid celebrityCounts={celebrityCounts} />
          <FeaturedSection 
            celebrities={celebrities}
            onToggleFavorite={handleToggleFavorite}
            favorites={favorites}
          />
        </>
      )}

      {showFilters && (
        <>
          <FilterBar
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
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

          <section id="results-section" className="py-12 px-6 md:px-8">
            <div className="max-w-7xl mx-auto">
              <div className="mb-8">
                <h2 className="font-display text-3xl font-bold mb-2" data-testid="text-results-title">
                  {searchQuery ? `Search Results for "${searchQuery}"` : 'All Celebrities'}
                </h2>
                <p className="text-muted-foreground" data-testid="text-results-count">
                  {filteredCelebrities.length} {filteredCelebrities.length === 1 ? 'celebrity' : 'celebrities'} found
                </p>
              </div>

              {isLoading ? (
                <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                  {[...Array(8)].map((_, i) => (
                    <div key={i} className="aspect-[3/4] glassmorphic rounded-2xl animate-pulse" />
                  ))}
                </div>
              ) : filteredCelebrities.length === 0 ? (
                <div className="text-center py-20">
                  <p className="text-muted-foreground text-lg">No celebrities found matching your criteria</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
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
        </>
      )}

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
