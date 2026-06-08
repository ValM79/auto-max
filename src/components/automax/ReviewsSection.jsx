import React from 'react';
import { Star } from 'lucide-react';

const featuredImage = 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=600&q=80';

const articles = [
  { title: 'Best Electric Cars 2025', excerpt: 'Our top picks for electric vehicles in Ireland this year.', type: 'Review', rating: 4.5, image: 'https://images.unsplash.com/photo-1560958089-b8a63019b834?w=400&q=80' },
  { title: 'Toyota Corolla Review', excerpt: 'Is the Corolla still the best family car on the market?', type: 'Review', rating: 4.2, image: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=400&q=80' },
  { title: 'How to Buy a Used Car Safely', excerpt: 'Essential tips before signing the dotted line.', type: 'Advice', rating: null, image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400&q=80' },
  { title: 'BMW 3 Series Long-Term Test', excerpt: 'After 12 months, here\'s what we think of the 3 Series.', type: 'Review', rating: 4.7, image: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=400&q=80' },
];

export default function ReviewsSection() {
  return (
    <div className="py-12 max-w-7xl mx-auto px-4">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-foreground">Car Reviews & Advice</h2>
        <button className="text-primary text-sm font-semibold hover:underline">See all articles →</button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {articles.map((article) => (
          <div key={article.title} className="bg-white rounded-xl border border-border overflow-hidden hover:shadow-md transition-shadow cursor-pointer group">
            <div className="h-40 overflow-hidden">
              <img src={article.image} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
            </div>
            <div className="p-4">
              <span className="text-xs font-semibold text-primary uppercase tracking-wide">{article.type}</span>
              <h3 className="text-sm font-bold text-foreground mt-1 mb-1 line-clamp-2">{article.title}</h3>
              <p className="text-xs text-muted-foreground line-clamp-2">{article.excerpt}</p>
              {article.rating && (
                <div className="flex items-center gap-1 mt-2">
                  {[1,2,3,4,5].map(s => (
                    <Star key={s} className={`w-3 h-3 ${s <= Math.round(article.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-200 fill-gray-200'}`} />
                  ))}
                  <span className="text-xs text-muted-foreground ml-1">{article.rating}</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}