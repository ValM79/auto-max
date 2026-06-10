import React, { useState } from 'react';

import { base44 } from '@/api/base44Client';

const packages = [
{
  name: "Basic",
  price: '€5',
  priceId: 'price_1TgUNLLQxQzBuaMVLYYB7kul',
  adViews: 1,
  listingDays: 60,
  maxPhotos: 10,
  features: [
  '60 day listing',
  'Up to 10 photos']

},
{
  name: "Standard",
  price: '€7',
  priceId: 'price_1TgUNLLQxQzBuaMV0tXw1AVC',
  recommended: true,
  adViews: 2,
  features: [
  '72 day listing',
  'Up to 15 photos',
  'Ad performance analytics',
  '4x bumps to the top',
  { text: '(1 per week)', note: true }]

},
{
  name: 'Premium',
  price: '€12',
  priceId: 'price_1TgUNLLQxQzBuaMVV5Xq2fzw',
  adViews: 3,
  features: [
  '72 day listing',
  'Up to 20 photos',
  'Ad performance analytics',
  '8x bumps to the top',
  { text: '(2 per week)', note: true },
  'Spotlight',
  { text: '(5 days in the top spot)', note: true }]

}];





export default function AdPackageSelector({ onPackageSelected, onBeforeCheckout }) {
  const [loading, setLoading] = useState(null);

  const handleChoose = async (pkg) => {
    // Validate form before proceeding
    if (onBeforeCheckout && !onBeforeCheckout()) return;

    // Block checkout if running inside an iframe (app preview)
    if (window.self !== window.top) {
      alert('Checkout is only available from the published app, not the preview.');
      return;
    }

    setLoading(pkg.name);
    try {
      if (onPackageSelected) {
        onPackageSelected({ name: pkg.name, listingDays: pkg.listingDays, maxPhotos: pkg.maxPhotos });
      }
      const res = await base44.functions.invoke('createCheckoutSession', {
        priceId: pkg.priceId,
        packageName: pkg.name,
        listingDays: pkg.listingDays,
        maxPhotos: pkg.maxPhotos
      });
      if (res.data.url) {
        window.location.href = res.data.url;
      } else {
        alert('Could not start checkout. Please try again.');
      }
    } catch (e) {
      alert('Could not start checkout. Please try again.');
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="bg-white border border-border rounded-2xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-bold text-foreground">Select  your ad option</h2>
        <span className="text-sm font-semibold cursor-pointer hover:underline text-[hsl(var(--primary))]">Learn more about our new ad packages

        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {packages.map((pkg) =>
        <div
          key={pkg.name}
          className="relative border border-border rounded-xl flex flex-col overflow-hidden">
          
  

            <div className="p-5 flex flex-col flex-1">
              <p className="text-sm text-foreground font-medium mb-1">{pkg.name}</p>
              <p className="text-3xl font-bold text-foreground mb-4">{pkg.price}</p>

              <ul className="flex flex-col gap-1.5 flex-1 mb-6">
                {pkg.features.map((f, i) => {
                if (typeof f === 'object' && f.note) {
                  return (
                    <li key={i} className="text-xs text-muted-foreground ml-5 -mt-1">
                        {f.text}
                      </li>);
                }
                return (
                  <li key={i} className="flex items-center gap-2 text-sm text-foreground">
                      <span className="w-1.5 h-1.5 rounded-full bg-foreground flex-shrink-0 inline-block" />
                      {f}
                    </li>);
              })}
              </ul>

              <button
              onClick={() => handleChoose(pkg)}
              disabled={loading === pkg.name}
              className="w-full border border-foreground text-foreground font-semibold py-2.5 rounded-lg hover:bg-secondary transition-colors text-sm disabled:opacity-60">
              
                {loading === pkg.name ? 'Loading...' : 'Select'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>);

}