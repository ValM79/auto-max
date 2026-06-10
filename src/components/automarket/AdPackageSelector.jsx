import React, { useState } from 'react';
import { Check } from 'lucide-react';
import { base44 } from '@/api/base44Client';

const packages = [
{
  name: 'Lite',
  price: '€5',
  priceId: 'price_1TgUNLLQxQzBuaMVLYYB7kul',
  adViews: 1, // 1 out of 4 bars
  features: [
  '72 day listing',
  'Up to 10 photos']

},
{
  name: 'Standard',
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


const AdViewBar = ({ filled, total = 4 }) =>
<div className="flex gap-1 mb-4">
    {Array.from({ length: total }).map((_, i) =>
  <div
    key={i}
    className={`h-1.5 flex-1 rounded-full ${
    i < filled ?
    i === 0 ?
    'bg-orange-400' :
    'bg-green-500' :
    'bg-gray-200'}`
    } />

  )}
  </div>;


export default function AdPackageSelector({ onPackageSelected }) {
  const [loading, setLoading] = useState(null);

  const handleChoose = async (pkg) => {
    // Block checkout if running inside an iframe (app preview)
    if (window.self !== window.top) {
      alert('Checkout is only available from the published app, not the preview.');
      return;
    }

    setLoading(pkg.name);
    try {
      const res = await base44.functions.invoke('createCheckoutSession', {
        priceId: pkg.priceId,
        packageName: pkg.name
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
        <span className="text-sm text-green-600 font-semibold cursor-pointer hover:underline">
          Learn more about our new ad packages
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {packages.map((pkg) =>
        <div
          key={pkg.name}
          className={`relative border rounded-xl flex flex-col overflow-hidden ${
          pkg.recommended ? 'border-foreground' : 'border-border'}`
          }>
          
            {pkg.recommended &&
          <div className="bg-foreground text-white text-xs font-bold text-center py-1.5 tracking-wide">
                Recommended
              </div>
          }

            <div className="p-5 flex flex-col flex-1">
              <p className="text-sm text-foreground font-medium mb-1">{pkg.name}</p>
              <p className="text-3xl font-bold text-foreground mb-4">{pkg.price}</p>

              <p className="text-xs text-muted-foreground mb-1">Ad Views</p>
              <AdViewBar filled={pkg.adViews} />

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
                      <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                      {f}
                    </li>);

              })}
              </ul>

              <button
              onClick={() => handleChoose(pkg)}
              disabled={loading === pkg.name}
              className="w-full border border-foreground text-foreground font-semibold py-2.5 rounded-lg hover:bg-secondary transition-colors text-sm disabled:opacity-60">
              
                {loading === pkg.name ? 'Loading...' : 'Choose'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>);

}