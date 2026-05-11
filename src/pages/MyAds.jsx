import React, { useState } from 'react';
import { ArrowLeft, Edit2, Trash2, Plus, Megaphone } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/automarket/Navbar';
import Footer from '../components/automarket/Footer';

export default function MyAds() {
  const navigate = useNavigate();
  const [myAds, setMyAds] = useState([
    {
      id: 1,
      title: '2020 BMW 320i Sport',
      price: '€18,500',
      location: 'Dublin, Ireland',
      image: 'https://media.base44.com/images/public/69ceb6b4f41f5a2cee0c7016/cffa66889_generated_image.png',
      status: 'Active',
      views: 245,
      createdAt: '2026-05-01',
    },
    {
      id: 2,
      title: '2018 Audi A4 Sedan',
      price: '€15,900',
      location: 'Cork, Ireland',
      image: 'https://media.base44.com/images/public/69ceb6b4f41f5a2cee0c7016/700a41555_generated_image.png',
      status: 'Active',
      views: 156,
      createdAt: '2026-04-28',
    },
    {
      id: 3,
      title: '2019 Ford Focus Hatchback',
      price: '€12,200',
      location: 'Galway, Ireland',
      image: 'https://media.base44.com/images/public/69ceb6b4f41f5a2cee0c7016/77e01c47a_generated_image.png',
      status: 'Sold',
      views: 342,
      createdAt: '2026-04-15',
    },
  ]);

  const deleteAd = (id) => {
    setMyAds(prev => prev.filter(ad => ad.id !== id));
  };

  const getStatusColor = (status) => {
    return status === 'Active' ? 'bg-green-50 text-green-700' : 'bg-gray-50 text-gray-600';
  };

  return (
    <div className="min-h-screen bg-[#f4f5f6]">
      <Navbar />
      <div className="max-w-5xl mx-auto px-4 py-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
          <button onClick={() => window.history.back()} className="flex items-center gap-1 hover:text-primary transition-colors">
            <ArrowLeft className="w-3.5 h-3.5" /> Back
          </button>
          <span>›</span>
          <Link to="/" className="hover:text-primary transition-colors">Home</Link>
          <span>›</span>
          <span className="text-foreground font-medium">My Ads</span>
        </div>

        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-foreground">My Ads</h1>
          <button
            onClick={() => navigate('/place-ad')}
            className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2.5 rounded-lg hover:bg-primary/90 transition-colors font-medium text-sm">
            <Plus className="w-4 h-4" /> Place New Ad
          </button>
        </div>

        {myAds.length === 0 ? (
          <div className="bg-white rounded-xl border border-border shadow-sm p-12 text-center">
            <Megaphone className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-lg font-medium text-foreground mb-2">No ads yet</p>
            <p className="text-sm text-muted-foreground mb-6">Start selling by placing your first ad</p>
            <button
              onClick={() => navigate('/place-ad')}
              className="inline-block bg-primary text-primary-foreground px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium">
              Place Ad
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {myAds.map(ad => (
              <div key={ad.id} className="bg-white rounded-xl border border-border shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                <div className="flex flex-col sm:flex-row">
                  <div className="flex-shrink-0 sm:w-48 h-40 sm:h-auto">
                    <img src={ad.image} alt={ad.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 p-4 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="text-base font-bold text-foreground mb-1">{ad.title}</h3>
                          <p className="text-sm text-muted-foreground">{ad.location}</p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(ad.status)}`}>
                          {ad.status}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground">Listed {ad.createdAt} • {ad.views} views</p>
                    </div>
                    <div className="flex items-end justify-between mt-4">
                      <p className="text-2xl font-bold text-foreground">{ad.price}</p>
                      <div className="flex gap-2">
                        <button className="p-2 rounded-lg border border-border hover:bg-secondary transition-colors">
                          <Edit2 className="w-4 h-4 text-foreground" />
                        </button>
                        <button
                          onClick={() => deleteAd(ad.id)}
                          className="p-2 rounded-lg border border-destructive hover:bg-destructive/10 transition-colors">
                          <Trash2 className="w-4 h-4 text-destructive" />
                        </button>
                      </div>
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