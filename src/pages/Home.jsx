import React from 'react';
import Navbar from '../components/automarket/Navbar';
import QuickLinks from '../components/automarket/QuickLinks';
import HeroSearch from '../components/automarket/HeroSearch';
import BrowseByCategory from '../components/automarket/BrowseByCategory';
import CarValuationSection from '../components/automarket/CarValuationSection';
import Footer from '../components/automarket/Footer';
import CarListings from '../components/automarket/CarListings';

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="hidden md:block">
        <QuickLinks />
      </div>
      <HeroSearch />
      <CarValuationSection />
      <BrowseByCategory />
      <CarListings />

      <Footer />
    </div>
  );
}