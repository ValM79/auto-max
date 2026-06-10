import React from 'react';
import { Heart, Camera, Star, ShieldCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const STATUS_BADGE_STYLES = {
  'Newly Listed': 'bg-blue-100 text-blue-700 border-blue-200',
  'Price Reduced': 'bg-orange-100 text-orange-700 border-orange-200',
  'Hot Deal': 'bg-red-100 text-red-700 border-red-200',
  'Just In': 'bg-green-100 text-green-700 border-green-200',
  'Almost Gone': 'bg-yellow-100 text-yellow-700 border-yellow-200',
};

function StarRating({ rating }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1,2,3,4,5].map(s => (
        <Star key={s} className={`w-3 h-3 ${s <= Math.round(rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-200 fill-gray-200'}`} />
      ))}
    </div>
  );
}

/**
 * Shared listing card matching the Cars Ireland reference layout.
 */
export default function ListingCard({ item, saved, onToggleSave, viewMode = 'list' }) {
  const isGrid = viewMode === 'grid';
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/vehicle/${item.id}`, { state: { car: item } });
  };
  const thumbnails = item.images ? item.images.slice(1, 4) : [];
  const meta = [item.year, item.engine || item.fuel, item.mileage, item.location].filter(Boolean).join(' · ');

  const isTrusted = item.trusted || (item.sellerType && item.sellerType.toLowerCase().includes('trusted'));

  return (
    <div className="bg-white rounded-xl border border-border shadow-sm overflow-hidden hover:shadow-md transition-shadow cursor-pointer" onClick={handleCardClick}>

      {/* Dealer header row */}
      {item.dealer && (
        <div className="flex items-center gap-3 px-4 py-2.5 border-b border-border">
          {item.dealerLogo ? (
            <img src={item.dealerLogo} alt={item.dealer} className="w-8 h-8 rounded object-contain border border-border bg-white p-0.5" />
          ) : (
            <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center border border-border">
              <span className="text-xs font-bold text-muted-foreground">{item.dealer.charAt(0)}</span>
            </div>
          )}
          <span className="text-sm font-semibold text-foreground">{item.dealer}</span>
        </div>
      )}

      <div className={isGrid ? 'flex flex-col' : 'flex flex-col sm:flex-row'}>

        {/* Image section */}
        <div className={`flex-shrink-0 ${isGrid ? 'w-full' : 'sm:w-[42%]'}`}>
          <div className="relative h-52">
            {/* Spotlight badge on image */}
            {item.spotlight && (
              <span className="absolute top-2 left-0 bg-gray-800 text-white text-xs font-semibold px-2.5 py-1 z-10" style={{borderRadius: '0 4px 4px 0'}}>
                Spotlight
              </span>
            )}
            {/* Status badge on image */}
            {item.status && (
              <span className={`absolute top-2 right-2 text-xs font-semibold px-2 py-0.5 rounded border z-10 ${STATUS_BADGE_STYLES[item.status] || 'bg-gray-100 text-gray-700 border-gray-200'}`}>
                {item.status}
              </span>
            )}
            <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
            <div className="absolute bottom-2 left-2 flex items-center gap-1 bg-black/60 text-white text-xs px-2 py-0.5 rounded">
              <Camera className="w-3 h-3" /> {item.photos}
            </div>
          </div>

          {/* Thumbnail strip */}
          {thumbnails.length > 0 && !isGrid && (
            <div className="flex gap-0.5 bg-gray-100">
              {thumbnails.map((img, i) => (
                <div key={i} className="relative flex-1 h-14 overflow-hidden">
                  <img src={img} alt="" className="w-full h-full object-cover" />
                  {i === thumbnails.length - 1 && item.photos > 4 && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <span className="text-white text-xs font-bold">+{item.photos - 3}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Info panel */}
        <div className="flex-1 p-4 flex flex-col justify-between min-w-0">
          <div>
            {/* Trusted + rating row */}
            <div className="flex items-center gap-2 mb-1.5 flex-wrap">
              {isTrusted && (
                <span className="flex items-center gap-1 text-xs text-green-700 font-semibold">
                  <ShieldCheck className="w-3.5 h-3.5 text-green-600" />
                  {item.sellerType || 'Trusted Dealer'}
                </span>
              )}
              {!isTrusted && item.sellerType && (
                <span className="text-xs text-muted-foreground">{item.sellerType}</span>
              )}
              {item.sellerRating ? (
                <>
                  <StarRating rating={item.sellerRating} />
                  <span className="text-xs font-semibold text-foreground">{item.sellerRating}</span>
                </>
              ) : null}
            </div>

            {/* Title */}
            <h3 className="text-base font-bold text-foreground mb-1 hover:text-primary cursor-pointer transition-colors line-clamp-2">
              {item.title}
            </h3>

            {/* Specs row */}
            {meta && <p className="text-sm text-muted-foreground mb-2">{meta}</p>}

            {/* Badge (e.g. warranty) */}
            {item.badge && (
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-green-700 bg-green-50 border border-green-200 px-2 py-0.5 rounded mt-1">
                {item.badge}
              </span>
            )}

            {item.description && <p className="text-sm text-muted-foreground line-clamp-2 mt-1">{item.description}</p>}
            {item.category && <p className="text-xs text-primary mt-1">{item.category}</p>}
          </div>

          {/* Price + save */}
          <div className="flex items-end justify-between mt-4">
            <div>
              {item.originalPrice && <p className="text-xs text-muted-foreground line-through">{item.originalPrice}</p>}
              <div className="flex items-center gap-2">
                <p className="text-xl font-extrabold text-foreground">{item.price}</p>
                {item.priceNote && (
                  <span className={`text-xs font-semibold ${item.priceNoteColor || 'text-green-600'}`}>● {item.priceNote}</span>
                )}
              </div>
              {item.monthly && <p className="text-xs text-muted-foreground">From €{item.monthly}/mo</p>}
            </div>
            <button
              onClick={(e) => { e.stopPropagation(); onToggleSave(item.id); }}
              className={`p-2 rounded-full border transition-colors flex-shrink-0 ${saved ? 'border-destructive text-destructive' : 'border-border text-muted-foreground hover:text-destructive hover:border-destructive'}`}>
              <Heart className={`w-5 h-5 ${saved ? 'fill-destructive' : ''}`} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}