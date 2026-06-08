import React from 'react';
import { X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function PlaceAdModal({ onClose }) {
  const navigate = useNavigate();

  const handleGoToPlaceAd = () => {
    onClose();
    navigate('/place-ad');
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors">
          <X className="w-5 h-5" />
        </button>
        <h2 className="text-2xl font-bold text-foreground mb-2">Place an Ad</h2>
        <p className="text-muted-foreground text-sm mb-6">Ready to sell? Create your listing in minutes.</p>
        <div className="flex flex-col gap-3">
          <button
            onClick={handleGoToPlaceAd}
            className="w-full bg-primary text-white font-semibold py-3 rounded-xl hover:bg-primary/90 transition-colors"
          >
            Create a Listing
          </button>
          <button
            onClick={onClose}
            className="w-full border border-border text-foreground font-medium py-3 rounded-xl hover:bg-secondary transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}