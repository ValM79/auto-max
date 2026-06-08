import React from 'react';

export default function PromoBanner({ image }) {
  return (
    <div className="mb-6 rounded-xl overflow-hidden border border-border h-36 sm:h-44">
      <img src={image} alt="Promo Banner" className="w-full h-full object-cover" />
    </div>
  );
}