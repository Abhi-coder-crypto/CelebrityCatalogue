import { Search, SlidersHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { categories } from "@shared/schema";

interface FilterBarProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  selectedCategory: string;
  onCategoryChange: (value: string) => void;
  selectedGender: string;
  onGenderChange: (value: string) => void;
  selectedLanguage: string;
  onLanguageChange: (value: string) => void;
  selectedLocation: string;
  onLocationChange: (value: string) => void;
  selectedEventType: string;
  onEventTypeChange: (value: string) => void;
  onClearFilters: () => void;
}

export function FilterBar({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  selectedGender,
  onGenderChange,
  selectedLanguage,
  onLanguageChange,
  selectedLocation,
  onLocationChange,
  selectedEventType,
  onEventTypeChange,
  onClearFilters,
}: FilterBarProps) {
  const hasActiveFilters = selectedCategory !== "all" || selectedGender !== "all" || 
                          selectedLanguage !== "all" || selectedLocation !== "all" || 
                          selectedEventType !== "all";

  return (
    <div className="sticky top-0 z-40 glassmorphic border-b border-white/10 py-4 px-6 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search by name..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-12 glassmorphic border-white/10 h-10"
              data-testid="input-search-filter"
            />
          </div>

          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-5 h-5 text-muted-foreground hidden lg:block" />
            
            <div className="grid grid-cols-2 lg:flex gap-2 flex-1 lg:flex-none">
              <Select value={selectedCategory} onValueChange={onCategoryChange}>
                <SelectTrigger className="glassmorphic border-white/10 h-10 min-w-[140px]" data-testid="select-category">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedGender} onValueChange={onGenderChange}>
                <SelectTrigger className="glassmorphic border-white/10 h-10 min-w-[120px]" data-testid="select-gender">
                  <SelectValue placeholder="Gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Genders</SelectItem>
                  <SelectItem value="Male">Male</SelectItem>
                  <SelectItem value="Female">Female</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>

              <Select value={selectedLanguage} onValueChange={onLanguageChange}>
                <SelectTrigger className="glassmorphic border-white/10 h-10 min-w-[130px]" data-testid="select-language">
                  <SelectValue placeholder="Language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Languages</SelectItem>
                  <SelectItem value="Hindi">Hindi</SelectItem>
                  <SelectItem value="English">English</SelectItem>
                  <SelectItem value="Tamil">Tamil</SelectItem>
                  <SelectItem value="Telugu">Telugu</SelectItem>
                  <SelectItem value="Kannada">Kannada</SelectItem>
                  <SelectItem value="Malayalam">Malayalam</SelectItem>
                  <SelectItem value="Bengali">Bengali</SelectItem>
                </SelectContent>
              </Select>

              <Select value={selectedLocation} onValueChange={onLocationChange}>
                <SelectTrigger className="glassmorphic border-white/10 h-10 min-w-[120px]" data-testid="select-location">
                  <SelectValue placeholder="Location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Locations</SelectItem>
                  <SelectItem value="Mumbai">Mumbai</SelectItem>
                  <SelectItem value="Delhi">Delhi</SelectItem>
                  <SelectItem value="Bangalore">Bangalore</SelectItem>
                  <SelectItem value="Hyderabad">Hyderabad</SelectItem>
                  <SelectItem value="Chennai">Chennai</SelectItem>
                  <SelectItem value="Kolkata">Kolkata</SelectItem>
                </SelectContent>
              </Select>

              <Select value={selectedEventType} onValueChange={onEventTypeChange}>
                <SelectTrigger className="glassmorphic border-white/10 h-10 min-w-[130px]" data-testid="select-event-type">
                  <SelectValue placeholder="Event Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Events</SelectItem>
                  <SelectItem value="Corporate">Corporate</SelectItem>
                  <SelectItem value="Wedding">Wedding</SelectItem>
                  <SelectItem value="Concert">Concert</SelectItem>
                  <SelectItem value="Private Party">Private Party</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {hasActiveFilters && (
              <Button
                variant="outline"
                size="sm"
                onClick={onClearFilters}
                className="glassmorphic border-white/10 h-10"
                data-testid="button-clear-filters"
              >
                Clear
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
