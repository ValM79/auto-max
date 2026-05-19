import React from 'react';
import { Heart, Camera, Star, ShieldCheck } from 'lucide-react';

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
 * Shared listing card matching the reference layout.
 * Props:
 *   item: {
 *     id, title, image, images (optional array), photos,
 *     dealer (string|null), dealerLogo (string|null), trusted (bool),
 *     sellerType, sellerRating,
 *     spotlight,
 *     badge, badgeColor,
 *     price, originalPrice, priceNote, priceNoteColor, monthly,
 *     year, fuel, mileage, engine, location, timeAgo, daysAgo, description,
 *     category, phone
 *   }
 *   saved: bool
 *   onToggleSave: fn
 *   viewMode: 'list'|'grid'
 */
export default function ListingCard({ item, saved, onToggleSave, viewMode = 'list' }) {
  const isGrid = viewMode === 'grid';
  const thumbnails = item.images ? item.images.slice(1, 4) : [];

  const meta = [item.year, item.engine || item.fuel, item.mileage, item.location].filter(Boolean).join(' · ');
  const timeMeta = [(item.timeAgo || item.daysAgo), item.location].filter(Boolean).join(' · ');

  return (
    <div className="bg-white rounded-xl border border-border shadow-sm overflow-hidden hover:shadow-md transition-shadow">
      {/* Dealer header */}
      {item.dealer && (
        <div className="flex items-center gap-3 px-4 py-2.5 border-b border-border bg-secondary/20">
          {item.dealerLogo ? (
            <img src={item.dealerLogo} alt={item.dealer} className="w-9 h-9 rounded object-cover border border-border" />
          ) : (
            <div className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center border border-border">
              <span className="text-xs font-bold text-muted-foreground">{item.dealer.charAt(0)}</span>
            </div>
          )}
          <span className="text-sm font-semibold text-foreground">{item.dealer}</span>
          {item.trusted && (
            <span className="ml-auto flex items-center gap-1 text-xs text-green-700 font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-green-600" /> Trusted
            </span>
          )}
          {item.spotlight && (
            <span className="ml-auto bg-gray-800 text-white text-xs font-semibold px-2 py-0.5 rounded">Spotlight</span>
          )}
        </div>
      )}

      <div className={isGrid ? 'flex flex-col' : 'flex flex-col sm:flex-row'}>
        {/* Image section */}
        <div className={`flex-shrink-0 ${isGrid ? 'w-full' : 'sm:w-[42%]'}`}>
          <div className="relative h-52 sm:h-52">
            {!item.dealer && item.spotlight && (
              <span className="absolute top-2 left-2 bg-black/70 text-white text-xs font-semibold px-2 py-0.5 rounded z-10">Spotlight</span>
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

        {/* Info */}
        <div className="flex-1 p-4 flex flex-col justify-between min-w-0">
          <div>
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <span className="text-xs text-muted-foreground">{item.sellerType}</span>
              {item.sellerRating ? (
                <>
                  <StarRating rating={item.sellerRating} />
                  <span className="text-xs text-muted-foreground">{item.sellerRating}</span>
                </>
              ) : (
                <span className="text-xs text-muted-foreground flex items-center gap-1">
                  <Star className="w-3 h-3 text-gray-300 fill-gray-300" /> No rating
                </span>
              )}
            </div>
            <h3 className="text-base font-bold text-foreground mb-1 hover:text-primary cursor-pointer transition-colors line-clamp-2">{item.title}</h3>
            {meta && <p className="text-sm text-muted-foreground mb-1">{meta}</p>}
            {!meta && timeMeta && <p className="text-sm text-muted-foreground mb-1">{timeMeta}</p>}
            {item.description && <p className="text-sm text-muted-foreground line-clamp-2 mb-1">{item.description}</p>}
            {item.badge && (
              <span className={`inline-block text-xs font-medium px-2 py-0.5 rounded border border-border text-muted-foreground mt-1 ${item.badgeColor || ''}`}>
                {item.badge}
              </span>
            )}
            {item.category && <p className="text-xs text-primary mt-1">{item.category}</p>}
          </div>

          <div className="flex items-end justify-between mt-3">
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
              onClick={() => onToggleSave(item.id)}
              className={`p-2 rounded-full border transition-colors flex-shrink-0 ${saved ? 'border-destructive text-destructive' : 'border-border text-muted-foreground hover:text-destructive hover:border-destructive'}`}>
              <Heart className={`w-5 h-5 ${saved ? 'fill-destructive' : ''}`} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}