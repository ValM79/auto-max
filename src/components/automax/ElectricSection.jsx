import React from 'react';
import { Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const bgImage = 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1400&q=80';

export default function ElectricSection() {
  const navigate = useNavigate();
  return (
    <div
      className="relative w-full py-20 px-4 flex items-center justify-center overflow-hidden"
      style={{ minHeight: 280 }}
    >
      <img src={bgImage} alt="Electric Cars" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 bg-black/60" />
      <div className="relative z-10 text-center max-w-2xl mx-auto">
        <div className="flex items-center justify-center gap-2 mb-3">
          <Zap className="w-6 h-6 text-yellow-400" />
          <span className="text-yellow-400 font-semibold text-sm uppercase tracking-wider">Go Green</span>
        </div>
        <h2 className="text-3xl font-extrabold text-white mb-3">Electric & Hybrid Cars in Ireland</h2>
        <p className="text-white/80 mb-6 text-sm">Discover thousands of electric and hybrid vehicles. Drive smarter, drive cleaner.</p>
        <div className="flex gap-3 justify-center flex-wrap">
          <button
            onClick={() => navigate('/electric-hybrid-cars')}
            className="bg-white text-primary font-semibold px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors text-sm"
          >
            Electric Cars
          </button>
          <button
            onClick={() => navigate('/electric-hybrid-cars')}
            className="border border-white text-white font-semibold px-6 py-3 rounded-lg hover:bg-white/10 transition-colors text-sm"
          >
            Hybrid Cars
          </button>
        </div>
      </div>
    </div>
  );
}