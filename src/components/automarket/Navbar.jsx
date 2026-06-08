import React, { useState, useRef, useEffect } from 'react';
import { Search, ChevronDown, Menu, X, User, Megaphone, MessageSquare, Bookmark, Heart, History, CreditCard, HelpCircle, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { base44 } from '@/api/base44Client';
import { useAuth } from '@/lib/AuthContext';
import { Link } from 'react-router-dom';
import PlaceAdModal from './PlaceAdModal';
import { useNavigate } from 'react-router-dom';

const userMenuItems = [
{ label: 'Profile', icon: User },
{ label: 'My Ads', icon: Megaphone },
{ label: 'Messages', icon: MessageSquare },
{ label: 'Saved Ads', icon: Bookmark },
{ label: 'Saved Searches', icon: Heart },
{ label: 'Browsing History', icon: History },
{ divider: true },
{ label: 'History Checks', icon: History },
{ label: 'Payment History', icon: CreditCard },
{ label: 'Help', icon: HelpCircle },
{ label: 'Log out', icon: LogOut, action: 'logout' }];


const sellMenuItems = [
{ label: 'Place an ad' },
{ label: 'How to sell my car' },
{ label: 'Selling tips' }];


const dealersMenuItems = [
{ label: 'Find a dealer' },
{ label: 'Information for dealers' }];


const buyMenuItems = [
{ label: 'Used cars', count: '83,969', route: '/used-cars' },
{ label: 'New cars', count: '6,558', route: '/new-cars' },
{ label: 'Dealership cars', count: '72,543', route: '/dealership-cars' },
{ label: 'Trusted Dealer cars', count: '33,624', route: '/trusted-dealer-cars' },
{ label: 'Electric & Hybrid cars', count: '25,493', route: '/electric-hybrid-cars' },
{ divider: true },
{ label: 'All motors', route: '/all-motors' },
{ label: 'Buying tips', route: '/buying-tips' }];


export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showPlaceAd, setShowPlaceAd] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showBuyMenu, setShowBuyMenu] = useState(false);
  const [showSellMenu, setShowSellMenu] = useState(false);
  const [showDealersMenu, setShowDealersMenu] = useState(false);
  const menuRef = useRef(null);
  const buyMenuRef = useRef(null);
  const sellMenuRef = useRef(null);
  const dealersMenuRef = useRef(null);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setShowUserMenu(false);
      }
      if (buyMenuRef.current && !buyMenuRef.current.contains(e.target)) {
        setShowBuyMenu(false);
      }
      if (sellMenuRef.current && !sellMenuRef.current.contains(e.target)) {
        setShowSellMenu(false);
      }
      if (dealersMenuRef.current && !dealersMenuRef.current.contains(e.target)) {
        setShowDealersMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  const isLoggedIn = !!user;

  const handlePlaceAd = () => {
    if (!isLoggedIn) {
      base44.auth.redirectToLogin();
    } else {
      navigate('/place-ad');
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
          <Link to="/" className="flex items-center gap-2">
            <span className="text-[hsl(var(--foreground))] text-xl font-extrabold tracking-tight">AutoMax</span>
            <img src="https://media.base44.com/images/public/69ceb6b4f41f5a2cee0c7016/ca07bfd68_generated_image.png" alt="AutoMax Logo" className="w-6 h-6 object-contain" />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-5">
            {navLinks.map((link) =>
            link.label === 'Buy' ?
            <div key="Buy" className="relative" ref={buyMenuRef}>
                  <button
                onClick={() => setShowBuyMenu((v) => !v)}
                className="text-[hsl(var(--foreground))] px-3 text-sm font-medium hover:text-destructive flex items-center gap-1 transition-colors underline py-2">
                    Buy <ChevronDown className="w-3.5 h-3.5" />
                  </button>
                  {showBuyMenu &&
              <div className="absolute left-0 mt-2 w-56 bg-white border border-border rounded-xl shadow-lg py-1 z-50">
                      {buyMenuItems.map((item, i) =>
                item.divider ?
                <div key={i} className="border-t border-border my-1" /> :
                item.route ?
                <Link
                  key={item.label}
                  to={item.route}
                  onClick={() => setShowBuyMenu(false)}
                  className="flex items-center justify-between w-full px-4 py-2 text-sm text-foreground hover:bg-secondary transition-colors">
                            <span>{item.label}</span>
                            {item.count && <span className="text-xs text-muted-foreground">({item.count})</span>}
                          </Link> :

                <button
                  key={item.label}
                  onClick={() => setShowBuyMenu(false)}
                  className="flex items-center justify-between w-full px-4 py-2 text-sm text-foreground hover:bg-secondary transition-colors">
                            <span>{item.label}</span>
                            {item.count && <span className="text-xs text-muted-foreground">({item.count})</span>}
                          </button>

                )}
                    </div>
              }
                </div> :
            link.label === 'Sell' ?
            <div key="Sell" className="relative" ref={sellMenuRef}>
                  <button
                onClick={() => setShowSellMenu((v) => !v)}
                className="text-[hsl(var(--foreground))] px-3 py-2 text-sm font-medium hover:text-destructive flex items-center gap-1 transition-colors">
                    Sell <ChevronDown className="w-3.5 h-3.5" />
                  </button>
                  {showSellMenu &&
              <div className="absolute left-0 mt-2 w-48 bg-white border border-border rounded-xl shadow-lg py-1 z-50">
                      {sellMenuItems.map((item) =>
                <button
                  key={item.label}
                  onClick={() => setShowSellMenu(false)}
                  className="flex items-center w-full px-4 py-2 text-sm text-foreground hover:bg-secondary transition-colors">
                          {item.label}
                        </button>
                )}
                    </div>
              }
                </div> :
            link.label === 'Dealers' ?
            <div key="Dealers" className="relative" ref={dealersMenuRef}>
                  <button
                onClick={() => setShowDealersMenu((v) => !v)}
                className="text-[hsl(var(--foreground))] px-3 py-2 text-sm font-medium hover:text-destructive flex items-center gap-1 transition-colors">
                    Dealers <ChevronDown className="w-3.5 h-3.5" />
                  </button>
                  {showDealersMenu &&
              <div className="absolute left-0 mt-2 w-52 bg-white border border-border rounded-xl shadow-lg py-1 z-50">
                      {dealersMenuItems.map((item) =>
                item.label === 'Find a dealer' ?
                <Link
                  key={item.label}
                  to="/dealers"
                  onClick={() => setShowDealersMenu(false)}
                  className="flex items-center w-full px-4 py-2 text-sm text-foreground hover:bg-secondary transition-colors">
                            {item.label}
                          </Link> :

                <button
                  key={item.label}
                  onClick={() => setShowDealersMenu(false)}
                  className="flex items-center w-full px-4 py-2 text-sm text-foreground hover:bg-secondary transition-colors">
                            {item.label}
                          </button>

                )}
                    </div>
              }
                </div> :
            link.label === 'Car Rent' ?
            <Link
              key="Car Rent"
              to="/car-rent"
              className="text-[hsl(var(--foreground))] px-3 py-2 text-sm font-medium hover:text-destructive flex items-center gap-1 transition-colors">
                  Car Rent
                </Link> :
            link.label === 'Car insurance' ?
            <Link
              key="Car insurance"
              to="/car-insurance"
              className="text-[hsl(var(--foreground))] px-3 py-2 text-sm font-medium hover:text-destructive flex items-center gap-1 transition-colors">
                  Car insurance
                </Link> :

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

            <Button
              onClick={handlePlaceAd}
              className="bg-transparent border border-foreground text-semibold hover:bg-secondary hover:text-foreground font-semibold px-10 h-9 text-sm">
              Place Ad
            </Button>

            {!isLoggedIn ?
            <button
              onClick={() => base44.auth.redirectToLogin()}
              className="hidden sm:block text-foreground text-sm font-medium hover:underline transition-all ml-1">
                Login or Sign up
              </button> :

            <div className="relative hidden sm:block" ref={menuRef}>
                <button
                onClick={() => setShowUserMenu((v) => !v)}
                className="flex items-center gap-1 text-foreground text-sm font-medium hover:underline transition-all">
                  My Account <ChevronDown className="w-3.5 h-3.5" />
                </button>
                {showUserMenu &&
              <div className="absolute right-0 mt-2 w-52 bg-white border border-border rounded-xl shadow-lg py-1 z-50">
                    {userMenuItems.map((item, i) =>
                item.divider ?
                <div key={i} className="border-t border-border my-1" /> :
                item.label === 'Profile' ?
                <Link
                  key={item.label}
                  to="/profile"
                  onClick={() => setShowUserMenu(false)}
                  className="flex items-center gap-2.5 w-full px-4 py-2 text-sm text-foreground hover:bg-secondary transition-colors">
                          <item.icon className="w-4 h-4 text-muted-foreground" />
                          {item.label}
                        </Link> :
                item.label === 'My Ads' ?
                <Link
                  key={item.label}
                  to="/my-ads"
                  onClick={() => setShowUserMenu(false)}
                  className="flex items-center gap-2.5 w-full px-4 py-2 text-sm text-foreground hover:bg-secondary transition-colors">
                          <item.icon className="w-4 h-4 text-muted-foreground" />
                          {item.label}
                        </Link> :
                item.label === 'Messages' ?
                <Link
                  key={item.label}
                  to="/messages"
                  onClick={() => setShowUserMenu(false)}
                  className="flex items-center gap-2.5 w-full px-4 py-2 text-sm text-foreground hover:bg-secondary transition-colors">
                          <item.icon className="w-4 h-4 text-muted-foreground" />
                          {item.label}
                        </Link> :
                item.label === 'Saved Searches' ?
                <Link
                  key={item.label}
                  to="/saved-searches"
                  onClick={() => setShowUserMenu(false)}
                  className="flex items-center gap-2.5 w-full px-4 py-2 text-sm text-foreground hover:bg-secondary transition-colors">
                          <item.icon className="w-4 h-4 text-muted-foreground" />
                          {item.label}
                        </Link> :
                item.label === 'Browsing History' ?
                <Link
                  key={item.label}
                  to="/browsing-history"
                  onClick={() => setShowUserMenu(false)}
                  className="flex items-center gap-2.5 w-full px-4 py-2 text-sm text-foreground hover:bg-secondary transition-colors">
                          <item.icon className="w-4 h-4 text-muted-foreground" />
                          {item.label}
                        </Link> :
                item.label === 'History Checks' ?
                <Link
                  key={item.label}
                  to="/history-checks"
                  onClick={() => setShowUserMenu(false)}
                  className="flex items-center gap-2.5 w-full px-4 py-2 text-sm text-foreground hover:bg-secondary transition-colors">
                          <item.icon className="w-4 h-4 text-muted-foreground" />
                          {item.label}
                        </Link> :
                item.label === 'Payment History' ?
                <Link
                  key={item.label}
                  to="/payment-history"
                  onClick={() => setShowUserMenu(false)}
                  className="flex items-center gap-2.5 w-full px-4 py-2 text-sm text-foreground hover:bg-secondary transition-colors">
                          <item.icon className="w-4 h-4 text-muted-foreground" />
                          {item.label}
                        </Link> :
                item.label === 'Help' ?
                <Link
                  key={item.label}
                  to="/help"
                  onClick={() => setShowUserMenu(false)}
                  className="flex items-center gap-2.5 w-full px-4 py-2 text-sm text-foreground hover:bg-secondary transition-colors">
                          <item.icon className="w-4 h-4 text-muted-foreground" />
                          {item.label}
                        </Link> :

                <button
                  key={item.label}
                  onClick={() => {
                    setShowUserMenu(false);
                    if (item.action === 'logout') base44.auth.logout(window.location.origin + '/');
                  }}
                  className="flex items-center gap-2.5 w-full px-4 py-2 text-sm text-foreground hover:bg-secondary transition-colors">
                          <item.icon className="w-4 h-4 text-muted-foreground" />
                          {item.label}
                        </button>

                )}
                  </div>
              }
              </div>
            }

            <button
              className="lg:hidden text-white"
              onClick={() => setMobileOpen(!mobileOpen)}>
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {showPlaceAd && <PlaceAdModal onClose={() => setShowPlaceAd(false)} />}

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