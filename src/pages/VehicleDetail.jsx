import React, { useState } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { ArrowLeft, Heart, Camera, Star, ShieldCheck, Phone, Mail, User, MessageSquare, CheckCircle } from 'lucide-react';
import Navbar from '../components/automarket/Navbar';
import Footer from '../components/automarket/Footer';
import { useFavorites } from '../hooks/useFavorites';
import SellerReviews from '../components/automarket/SellerReviews';
import VehicleStats from '../components/automarket/VehicleStats';
import LocationMap from '../components/automarket/LocationMap';
import PriceAlertBox from '../components/automarket/PriceAlertBox';

function StarRating({ rating }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1,2,3,4,5].map(s => (
        <Star key={s} className={`w-4 h-4 ${s <= Math.round(rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-200 fill-gray-200'}`} />
      ))}
    </div>
  );
}

export default function VehicleDetail() {
  const { id } = useParams();
  const location = useLocation();
  const car = location.state?.car;
  const { isFavorite, toggleFavorite } = useFavorites();

  const [form, setForm] = useState({ name: '', email: '', phone: '', message: `Hi, I'm interested in the ${car?.title || 'vehicle'}. Is it still available?` });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const set = (field) => (e) => setForm(f => ({ ...f, [field]: e.target.value }));

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = 'Name is required';
    if (!form.email.trim()) errs.email = 'Email is required';
    if (!form.message.trim()) errs.message = 'Message is required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitted(true);
  };

  if (!car) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="max-w-3xl mx-auto px-4 py-16 text-center">
          <p className="text-muted-foreground mb-4">Vehicle not found.</p>
          <Link to="/cars-for-sale" className="text-primary hover:underline">Back to listings</Link>
        </div>
        <Footer />
      </div>
    );
  }

  const saved = isFavorite(car.id);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="max-w-5xl mx-auto px-4 py-6">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-5">
          <Link to="/cars-for-sale" className="flex items-center gap-1 hover:text-primary transition-colors">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to listings
          </Link>
          <span>›</span>
          <span className="text-foreground font-medium">{car.title}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: Image + Details */}
          <div className="lg:col-span-2 flex flex-col gap-5">
            {/* Main image */}
            <div className="relative rounded-2xl overflow-hidden bg-black h-72 sm:h-96">
              <img src={car.image} alt={car.title} className="w-full h-full object-cover" />
              <div className="absolute bottom-3 left-3 flex items-center gap-1 bg-black/60 text-white text-xs px-2 py-1 rounded">
                <Camera className="w-3.5 h-3.5" /> {car.photos} photos
              </div>
              <button
                onClick={() => toggleFavorite(car)}
                className={`absolute top-3 right-3 p-2 rounded-full border transition-colors ${saved ? 'bg-white border-destructive text-destructive' : 'bg-white/80 border-border text-muted-foreground hover:border-destructive hover:text-destructive'}`}>
                <Heart className={`w-5 h-5 ${saved ? 'fill-destructive' : ''}`} />
              </button>
            </div>

            {/* Title + price */}
            <div className="bg-white rounded-2xl border border-border p-5 shadow-sm">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-extrabold text-foreground">{car.title}</h1>
                  <p className="text-sm text-muted-foreground mt-1">{[car.year, car.fuel, car.mileage, car.location].filter(Boolean).join(' · ')}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-2xl font-extrabold text-foreground">€{car.price?.toLocaleString()}</p>
                  {car.monthly && <p className="text-xs text-muted-foreground">From €{car.monthly}/mo</p>}
                </div>
              </div>
            </div>

            {/* Seller info */}
            <div className="bg-white rounded-2xl border border-border p-5 shadow-sm">
              <h2 className="text-base font-bold text-foreground mb-3">Seller Information</h2>
              <div className="flex items-center gap-3">
                {car.dealerLogo ? (
                  <img src={car.dealerLogo} alt={car.dealerName} className="w-12 h-12 rounded-lg object-contain border border-border bg-white p-1" />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center border border-border">
                    <User className="w-5 h-5 text-muted-foreground" />
                  </div>
                )}
                <div>
                  <p className="font-semibold text-foreground">{car.dealerName || 'Private Seller'}</p>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    {car.trusted && <ShieldCheck className="w-3.5 h-3.5 text-green-600" />}
                    <span className="text-xs text-muted-foreground">{car.sellerType}</span>
                    {car.sellerRating && (
                      <>
                        <StarRating rating={car.sellerRating} />
                        <span className="text-xs font-semibold text-foreground">{car.sellerRating}</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
            {/* Location Map */}
            <LocationMap location={car.location} />

            {/* Market Insights */}
            <VehicleStats car={car} />

            {/* Reviews */}
            <SellerReviews />
          </div>

          {/* Right: Contact Form */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl border border-border p-5 shadow-sm sticky top-4">
              <div className="flex items-center gap-2 mb-4">
                <MessageSquare className="w-5 h-5 text-primary" />
                <h2 className="text-base font-bold text-foreground">Contact Seller</h2>
              </div>

              {submitted ? (
                <div className="flex flex-col items-center gap-3 py-6 text-center">
                  <CheckCircle className="w-12 h-12 text-green-500" />
                  <p className="font-semibold text-foreground">Message sent!</p>
                  <p className="text-sm text-muted-foreground">The seller will get back to you shortly.</p>
                  <button onClick={() => setSubmitted(false)} className="text-sm text-primary hover:underline mt-2">Send another message</button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">Name <span className="text-destructive">*</span></label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <input
                        type="text"
                        value={form.name}
                        onChange={set('name')}
                        placeholder="Your full name"
                        className={`w-full border rounded-lg px-4 py-2.5 text-sm pl-9 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary ${errors.name ? 'border-destructive' : 'border-border'}`}
                      />
                    </div>
                    {errors.name && <p className="text-xs text-destructive mt-1">⚠ {errors.name}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">Email <span className="text-destructive">*</span></label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <input
                        type="email"
                        value={form.email}
                        onChange={set('email')}
                        placeholder="you@example.com"
                        className={`w-full border rounded-lg px-4 py-2.5 text-sm pl-9 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary ${errors.email ? 'border-destructive' : 'border-border'}`}
                      />
                    </div>
                    {errors.email && <p className="text-xs text-destructive mt-1">⚠ {errors.email}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">Phone</label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <input
                        type="tel"
                        value={form.phone}
                        onChange={set('phone')}
                        placeholder="e.g. 086 123 4567"
                        className="w-full border border-border rounded-lg px-4 py-2.5 text-sm pl-9 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">Message <span className="text-destructive">*</span></label>
                    <textarea
                      value={form.message}
                      onChange={set('message')}
                      rows={4}
                      className={`w-full border rounded-lg px-4 py-2.5 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary ${errors.message ? 'border-destructive' : 'border-border'}`}
                    />
                    {errors.message && <p className="text-xs text-destructive mt-1">⚠ {errors.message}</p>}
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-primary text-white font-semibold py-3 rounded-xl hover:bg-primary/90 transition-colors text-sm mt-1">
                    Send Message
                  </button>

                  <p className="text-xs text-muted-foreground text-center">Your contact details will be shared with the seller.</p>
                </form>
              )}
            </div>
            <PriceAlertBox car={car} />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}