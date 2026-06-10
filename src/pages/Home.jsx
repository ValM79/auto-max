import React from 'react';
import Navbar from '../components/automarket/Navbar';
import HeroSearch from '../components/automarket/HeroSearch';
import BrowseByCategory from '../components/automarket/BrowseByCategory';
import Footer from '../components/automarket/Footer';
import CarListings from '../components/automarket/CarListings';

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSearch />
      <BrowseByCategory />
      <CarListings />

      <Footer />
    </div>
  );
}