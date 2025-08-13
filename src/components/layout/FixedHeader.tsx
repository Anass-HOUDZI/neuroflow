import { Button } from "@/components/ui/button";
import { Moon, Sun, Heart, Settings, Info, Menu } from "lucide-react";
import { Link } from "react-router-dom";
import { useTheme } from "@/core/theme/ThemeProvider";
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet";

const mobileMenuItems = [
  { title: "Accueil", href: "/", icon: "🏠" },
  { title: "Favoris", href: "/favorites", icon: "❤️" },
  { title: "À propos", href: "/about", icon: "ℹ️" },
  { title: "Contact", href: "/contact", icon: "💬" },
  { title: "Paramètres", href: "/settings", icon: "⚙️" },
];

export default function FixedHeader() {
  const { isDark, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img 
            src="/lovable-uploads/a0fbbb2d-6964-4c6c-9eed-fb534407abd8.png" 
            alt="NeuroFlow Logo" 
            className="h-8 w-auto hover:scale-105 transition-transform duration-300"
          />
        </Link>

        {/* Desktop Icons */}
        <nav className="hidden md:flex items-center gap-2">
          <Button variant="ghost" size="icon" asChild>
            <Link to="/about" aria-label="À propos">
              <Info className="h-4 w-4" />
            </Link>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <Link to="/favorites" aria-label="Favoris">
              <Heart className="h-4 w-4" />
            </Link>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <Link to="/settings" aria-label="Paramètres">
              <Settings className="h-4 w-4" />
            </Link>
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleTheme}
            aria-label={isDark ? "Mode clair" : "Mode sombre"}
          >
            {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>
        </nav>

        {/* Mobile: Icons + Burger */}
        <div className="md:hidden flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleTheme}
            aria-label={isDark ? "Mode clair" : "Mode sombre"}
          >
            {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>
          
          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-64">
              <SheetHeader>
                <SheetTitle className="text-left">Menu</SheetTitle>
              </SheetHeader>
              <nav className="mt-6 space-y-2">
                {mobileMenuItems.map((item) => (
                  <Link
                    key={item.href}
                    to={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-muted"
                  >
                    <span>{item.icon}</span>
                    {item.title}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}