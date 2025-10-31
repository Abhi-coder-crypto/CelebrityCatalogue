import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { categories } from "@shared/schema";

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'glassmorphic border-b border-white/10 shadow-lg' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/">
              <div className="flex items-center gap-2 cursor-pointer" data-testid="link-logo">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-chart-5 flex items-center justify-center">
                  <span className="font-display text-white text-xl font-bold">CB</span>
                </div>
                <span className="font-display text-base sm:text-xl font-bold">Celebs Booking</span>
              </div>
            </Link>

            <div className="hidden md:flex items-center gap-6">
              <Link 
                href="/"
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  location === '/' ? 'text-primary' : 'text-foreground'
                }`}
                data-testid="link-home"
              >
                Home
              </Link>
              <div className="group relative">
                <button 
                  className="text-sm font-medium text-foreground hover:text-primary transition-colors flex items-center gap-1"
                  data-testid="button-categories"
                >
                  Categories
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div className="absolute top-full left-0 mt-2 w-64 glassmorphic border border-white/10 rounded-xl p-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all shadow-xl">
                  {categories.map((category) => (
                    <Link 
                      key={category} 
                      href={`/category/${category.toLowerCase().replace(/\s+/g, '-')}`}
                      className="block px-4 py-2 text-sm rounded-lg hover-elevate transition-colors"
                      data-testid={`link-category-${category.toLowerCase().replace(/\s+/g, '-')}`}
                    >
                      {category}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <Button
              size="icon"
              variant="ghost"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              data-testid="button-mobile-menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>
      </nav>

      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)} />
          <div className="fixed top-16 left-0 right-0 bottom-0 glassmorphic border-t border-white/10 overflow-y-auto">
            <div className="p-6 space-y-4">
              <Link 
                href="/" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="block py-2 text-lg font-medium" 
                data-testid="link-mobile-home"
              >
                Home
              </Link>
              <div className="space-y-2">
                <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Categories</p>
                {categories.map((category) => (
                  <Link 
                    key={category} 
                    href={`/category/${category.toLowerCase().replace(/\s+/g, '-')}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block py-2 pl-4 hover-elevate rounded-lg transition-colors"
                  >
                    {category}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
