import React, { useState, useEffect } from 'react';
import { Search, ChevronDown, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { base44 } from '@/api/base44Client';

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(null); // null = loading

  useEffect(() => {
    base44.auth.isAuthenticated()
      .then((authed) => setIsLoggedIn(authed));
  }, []);

  const handleAuthClick = () => {
    if (isLoggedIn) {
      base44.auth.logout();
    } else {
      base44.auth.redirectToLogin();
    }
  };

  const navLinks = [
  { label: 'Buy', hasDropdown: true },
  { label: 'Sell', hasDropdown: true },
  { label: 'Dealers', hasDropdown: true },
  { label: 'Car Rent', hasDropdown: true },
  { label: 'Car insurance', hasDropdown: true }];


  return (
    <nav className="bg-[hsl(var(--background))] sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-1">
            <span className="text-[hsl(var(--foreground))] text-xl font-semibold tracking-tight">Auto</span>
            <span className="text-[hsl(var(--foreground))] text-xl font-extrabold tracking-tight">Market</span>
            <svg className="text-[hsl(var(--destructive))] mt-0.5 w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <path d="M7 17l9.2-9.2M17 17V7H7" />
            </svg>
          </div>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-5">
            {navLinks.map((link) =>
            <button
              key={link.label} className="text-[hsl(var(--foreground))] px-3 py-2 text-sm font-medium hover:text-destructive flex items-center gap-1 transition-colors">
                {link.label}
                {link.hasDropdown && <ChevronDown className="w-3.5 h-3.5" />}
              </button>
            )}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-10">
            <button className="hidden sm:flex items-center text-foreground hover:text-primary transition-colors">
              <Search className="w-5 h-5" />
            </button>

            <Button className="bg-transparent border border-foreground text-semibold hover:bg-secondary hover:text-foreground font-semibold px-10 h-9 text-sm">
              Place Ad
            </Button>

            <button
              onClick={() => base44.auth.redirectToLogin()}
              className="hidden sm:block text-foreground text-sm font-medium hover:underline transition-all ml-1">
              Login or Sign up
            </button>

            <button
              className="lg:hidden text-white"
              onClick={() => setMobileOpen(!mobileOpen)}>
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileOpen &&
      <div className="lg:hidden bg-primary border-t border-white/10 pb-4">
          {navLinks.map((link) =>
        <button
          key={link.label}
          className="w-full text-left text-white/90 hover:text-white hover:bg-white/10 px-6 py-3 text-sm font-medium flex items-center justify-between transition-colors">
              {link.label}
              {link.hasDropdown && <ChevronDown className="w-4 h-4" />}
            </button>
        )}
          <div className="flex gap-6 px-6 pt-3 border-t border-white/10 mt-2">
            <button className="flex items-center gap-2 text-white/80 text-sm">
              <Search className="w-4 h-4" /> Search
            </button>
            <button className="flex items-center gap-2 text-white/80 text-sm font-semibold">
              Place Ad
            </button>
          </div>
        </div>
      }
    </nav>);
}