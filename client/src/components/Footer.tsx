import { Link } from "wouter";
import { SiInstagram, SiX, SiLinkedin, SiFacebook } from "react-icons/si";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { categories } from "@shared/schema";

export function Footer() {
  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <footer className="border-t border-white/10 mt-20">
      <div className="max-w-7xl mx-auto px-6 md:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-chart-5 flex items-center justify-center">
                <span className="font-display text-white text-xl font-bold">A</span>
              </div>
              <span className="font-display text-xl font-bold">Airavata</span>
            </div>
            <p className="text-muted-foreground mb-6 text-sm">
              India's premier celebrity booking platform. Connect with your favorite celebrities for unforgettable events.
            </p>
            <div className="flex gap-3">
              <a 
                href="#" 
                className="w-9 h-9 rounded-full glassmorphic flex items-center justify-center hover-elevate transition-all"
                data-testid="link-social-instagram"
              >
                <SiInstagram className="w-4 h-4" />
              </a>
              <a 
                href="#" 
                className="w-9 h-9 rounded-full glassmorphic flex items-center justify-center hover-elevate transition-all"
                data-testid="link-social-twitter"
              >
                <SiX className="w-4 h-4" />
              </a>
              <a 
                href="#" 
                className="w-9 h-9 rounded-full glassmorphic flex items-center justify-center hover-elevate transition-all"
                data-testid="link-social-linkedin"
              >
                <SiLinkedin className="w-4 h-4" />
              </a>
              <a 
                href="#" 
                className="w-9 h-9 rounded-full glassmorphic flex items-center justify-center hover-elevate transition-all"
                data-testid="link-social-facebook"
              >
                <SiFacebook className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-accent font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/">
                  <a className="text-muted-foreground hover:text-primary transition-colors" data-testid="link-footer-home">
                    Home
                  </a>
                </Link>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-accent font-semibold mb-4">Categories</h4>
            <ul className="space-y-2 text-sm">
              {categories.slice(0, 5).map((category) => (
                <li key={category}>
                  <Link href={`/category/${category.toLowerCase().replace(/\s+/g, '-')}`}>
                    <a className="text-muted-foreground hover:text-primary transition-colors">
                      {category}
                    </a>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-accent font-semibold mb-4">Newsletter</h4>
            <p className="text-muted-foreground text-sm mb-4">
              Subscribe to get updates on new celebrities and exclusive offers
            </p>
            <form onSubmit={handleNewsletterSubmit} className="space-y-2">
              <Input
                type="email"
                placeholder="Enter your email"
                className="glassmorphic border-white/10 h-10"
                data-testid="input-newsletter"
              />
              <Button 
                type="submit" 
                className="w-full bg-primary hover:bg-primary border border-primary-border h-10"
                data-testid="button-newsletter-submit"
              >
                Subscribe
              </Button>
            </form>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © 2024 Airavata. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
