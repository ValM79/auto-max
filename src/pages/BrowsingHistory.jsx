import React, { useState } from 'react';
import { ArrowLeft, Trash2, History } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '../components/automarket/Navbar';
import Footer from '../components/automarket/Footer';

export default function BrowsingHistory() {
  const [browsingHistory, setBrowsingHistory] = useState([
    {
      id: 1,
      title: '2019 BMW 3 Series',
      price: '€15,500',
      location: 'Dublin, Ireland',
      image: 'https://media.base44.com/images/public/69ceb6b4f41f5a2cee0c7016/cffa66889_generated_image.png',
      viewedAt: '2 hours ago',
      seller: 'John Motors',
    },
    {
      id: 2,
      title: '2021 Tesla Model 3',
      price: '€38,900',
      location: 'Cork, Ireland',
      image: 'https://media.base44.com/images/public/69ceb6b4f41f5a2cee0c7016/700a41555_generated_image.png',
      viewedAt: '5 hours ago',
      seller: 'Electric Dreams',
    },
    {
      id: 3,
      title: '2018 Audi A4',
      price: '€12,750',
      location: 'Galway, Ireland',
      image: 'https://media.base44.com/images/public/69ceb6b4f41f5a2cee0c7016/77e01c47a_generated_image.png',
      viewedAt: '1 day ago',
      seller: 'Premium Cars Ltd',
    },
    {
      id: 4,
      title: '2020 Honda Civic',
      price: '€14,200',
      location: 'Limerick, Ireland',
      image: 'https://media.base44.com/images/public/69ceb6b4f41f5a2cee0c7016/cffa66889_generated_image.png',
      viewedAt: '2 days ago',
      seller: 'Honda Specialist',
    },
  ]);

  const handleRemoveItem = (id) => {
    setBrowsingHistory(browsingHistory.filter(item => item.id !== id));
  };

  const handleClearHistory = () => {
    setBrowsingHistory([]);
  };

  return (
    <div className="min-h-screen bg-[#f4f5f6]">
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
          <button onClick={() => window.history.back()} className="flex items-center gap-1 hover:text-primary transition-colors">
            <ArrowLeft className="w-3.5 h-3.5" /> Back
          </button>
          <span>›</span>
          <Link to="/" className="hover:text-primary transition-colors">Home</Link>
          <span>›</span>
          <span className="text-foreground font-medium">Browsing History</span>
        </div>

        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-foreground">Browsing History</h1>
          {browsingHistory.length > 0 && (
            <button
              onClick={handleClearHistory}
              className="flex items-center gap-2 px-4 py-2 text-sm text-destructive hover:bg-destructive/10 rounded-lg transition-colors">
              <Trash2 className="w-4 h-4" />
              Clear all
            </button>
          )}
        </div>

        {browsingHistory.length === 0 ? (
          <div className="bg-white rounded-xl border border-border shadow-sm p-12 text-center">
            <History className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-lg font-medium text-foreground mb-2">No browsing history</p>
            <p className="text-sm text-muted-foreground">Your browsing history will appear here</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {browsingHistory.map(item => (
              <div key={item.id} className="bg-white rounded-xl border border-border shadow-sm p-4 hover:shadow-md transition-shadow">
                <div className="flex gap-4">
                  <img src={item.image} alt={item.title} className="w-24 h-24 object-cover rounded-lg flex-shrink-0" />
                  <div className="flex-1">
                    <h3 className="text-sm font-semibold text-foreground mb-1">{item.title}</h3>
                    <p className="text-sm text-muted-foreground mb-2">{item.seller}</p>
                    <p className="text-xs text-muted-foreground">{item.location}</p>
                  </div>
                  <div className="flex flex-col items-end justify-between">
                    <p className="text-lg font-bold text-primary">{item.price}</p>
                    <div className="flex flex-col items-end text-xs text-muted-foreground">
                      <p>Viewed {item.viewedAt}</p>
                      <button
                        onClick={() => handleRemoveItem(item.id)}
                        className="text-destructive hover:underline mt-2">
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}