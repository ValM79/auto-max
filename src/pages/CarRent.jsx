import React from 'react';
import Navbar from '../components/automarket/Navbar';
import Footer from '../components/automarket/Footer';

const rentalPlaces = [
  {
    name: 'Enterprise Rent-A-Car',
    location: 'Dublin City Centre',
    phone: '+353 1 812 0444',
    rating: 4.5,
    reviews: 1240,
    priceFrom: '€35/day',
    image: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=400&q=80',
  },
  {
    name: 'Hertz Ireland',
    location: 'Dublin Airport',
    phone: '+353 1 844 5466',
    rating: 4.3,
    reviews: 980,
    priceFrom: '€40/day',
    image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=400&q=80',
  },
  {
    name: 'Avis Car Hire',
    location: 'Cork Airport',
    phone: '+353 21 432 7460',
    rating: 4.4,
    reviews: 760,
    priceFrom: '€38/day',
    image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=400&q=80',
  },
  {
    name: 'Budget Car Rental',
    location: 'Shannon Airport',
    phone: '+353 61 471 361',
    rating: 4.1,
    reviews: 540,
    priceFrom: '€30/day',
    image: 'https://images.unsplash.com/photo-1502877338535-766e1452684a?w=400&q=80',
  },
  {
    name: 'Sixt Rent a Car',
    location: 'Galway City',
    phone: '+353 91 564 122',
    rating: 4.6,
    reviews: 430,
    priceFrom: '€42/day',
    image: 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=400&q=80',
  },
  {
    name: 'Europcar Ireland',
    location: 'Belfast City',
    phone: '+44 28 9031 3444',
    rating: 4.2,
    reviews: 610,
    priceFrom: '€36/day',
    image: 'https://images.unsplash.com/photo-1612825173281-9a193378527e?w=400&q=80',
  },
];

function StarRating({ rating }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={`w-4 h-4 ${star <= Math.round(rating) ? 'text-yellow-400' : 'text-gray-200'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
      <span className="text-sm text-muted-foreground ml-1">{rating}</span>
    </div>
  );
}

export default function CarRent() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold text-foreground mb-2">Rent a Car</h1>
        <p className="text-muted-foreground mb-8">Find the best car rental deals across Ireland</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rentalPlaces.map((place) => (
            <div key={place.name} className="bg-white rounded-xl border border-border shadow-sm overflow-hidden hover:shadow-md transition-shadow">
              <div className="h-44 overflow-hidden">
                <img src={place.image} alt={place.name} className="w-full h-full object-cover" />
              </div>
              <div className="p-5">
                <h2 className="text-lg font-semibold text-foreground mb-1">{place.name}</h2>
                <p className="text-sm text-muted-foreground mb-2">{place.location}</p>
                <div className="flex items-center gap-1 mb-3">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                      key={star}
                      className={`w-4 h-4 ${star <= Math.round(place.rating) ? 'text-yellow-400' : 'text-gray-200'}`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                  <span className="text-sm text-muted-foreground ml-1">{place.rating} ({place.reviews} reviews)</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-primary font-semibold">From {place.priceFrom}</span>
                  <button className="bg-primary text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors">
                    Book Now
                  </button>
                </div>
                <p className="text-xs text-muted-foreground mt-3">{place.phone}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}