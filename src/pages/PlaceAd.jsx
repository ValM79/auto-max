import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Upload, X, Youtube, User, Mail, Phone, MapPin, Tag, FileText, DollarSign, ChevronDown } from 'lucide-react';
import Navbar from '../components/automarket/Navbar';
import Footer from '../components/automarket/Footer';
import { base44 } from '@/api/base44Client';
import { useAuth } from '@/lib/AuthContext';

const counties = ['Dublin', 'Cork', 'Galway', 'Limerick', 'Waterford', 'Kilkenny', 'Mayo', 'Kerry', 'Clare', 'Tipperary', 'Roscommon', 'Westmeath', 'Wexford', 'Wicklow', 'Meath', 'Kildare'];

const areasByCounty = {
  Dublin: ['Dublin City Centre', 'North Dublin', 'South Dublin', 'West County', 'East Dublin'],
  Cork: ['Cork City', 'North Cork', 'South Cork', 'West Cork'],
  Galway: ['Galway City', 'Connemara', 'East Galway'],
  Limerick: ['Limerick City', 'North Limerick', 'South Limerick'],
  default: ['North', 'South', 'East', 'West', 'City Centre'],
};

const sections = [
  {
    label: 'Cars',
    subsections: ['New Cars', 'Cars', 'Cars from Dealerships', 'Vintage Cars', 'Modified Cars', 'Car Parts', 'Car Extras', 'Rally Cars', 'Breaking & Repairables'],
  },
  {
    label: 'Trucks & Vans',
    subsections: ['Trucks', 'Commercials', 'Trailers', 'Campers', 'Coaches & Buses', 'Plant Machinery', 'Motorbike Extras', 'Caravans'],
  },
  {
    label: 'Bikes & Boats',
    subsections: ['Motorbikes', 'Vintage Bikes', 'Scooters', 'Quads', 'Boats & Jet Skis', 'Boat Extras', 'Other Motor'],
  },
];

const categoryToSection = {
  'new cars': { section: 'Cars', subsection: 'New Cars' },
  cars: { section: 'Cars', subsection: 'Cars' },
  'cars from dealerships': { section: 'Cars', subsection: 'Cars from Dealerships' },
  'vintage cars': { section: 'Cars', subsection: 'Vintage Cars' },
  'modified cars': { section: 'Cars', subsection: 'Modified Cars' },
  'car parts': { section: 'Cars', subsection: 'Car Parts' },
  'car extras': { section: 'Cars', subsection: 'Car Extras' },
  'rally cars': { section: 'Cars', subsection: 'Rally Cars' },
  'breaking & repairables': { section: 'Cars', subsection: 'Breaking & Repairables' },
  trucks: { section: 'Trucks & Vans', subsection: 'Trucks' },
  commercials: { section: 'Trucks & Vans', subsection: 'Commercials' },
  trailers: { section: 'Trucks & Vans', subsection: 'Trailers' },
  campers: { section: 'Trucks & Vans', subsection: 'Campers' },
  'coaches & buses': { section: 'Trucks & Vans', subsection: 'Coaches & Buses' },
  'plant machinery': { section: 'Trucks & Vans', subsection: 'Plant Machinery' },
  'motorbike extras': { section: 'Trucks & Vans', subsection: 'Motorbike Extras' },
  caravans: { section: 'Trucks & Vans', subsection: 'Caravans' },
  motorbikes: { section: 'Bikes & Boats', subsection: 'Motorbikes' },
  'vintage bikes': { section: 'Bikes & Boats', subsection: 'Vintage Bikes' },
  scooters: { section: 'Bikes & Boats', subsection: 'Scooters' },
  quads: { section: 'Bikes & Boats', subsection: 'Quads' },
  'boats & jet skis': { section: 'Bikes & Boats', subsection: 'Boats & Jet Skis' },
  'boat extras': { section: 'Bikes & Boats', subsection: 'Boat Extras' },
  'other motor': { section: 'Bikes & Boats', subsection: 'Other Motor' },
};

const emptyForm = {
  category: '',
  section: '',
  subsection: '',
  adType: 'for_sale',
  title: '',
  description: '',
  price: '',
  youtubeUrl: '',
  fullName: '',
  email: '',
  phone: '',
  county: 'Dublin',
  area: '',
  contactByMessage: true,
  contactByPhone: false,
  isTrader: false,
};

export default function PlaceAd() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    ...emptyForm,
    fullName: user?.full_name || '',
    email: user?.email || '',
  });
  const [photos, setPhotos] = useState([]);
  const [video, setVideo] = useState(null);
  const [dragOver, setDragOver] = useState(false);
  const [step, setStep] = useState('form'); // 'form' | 'preview'
  const [categoryStarted, setCategoryStarted] = useState(false);

  const set = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));
  const toggle = (field) => () => setForm((f) => ({ ...f, [field]: !f[field] }));

  const handleCategoryChange = (e) => {
    const val = e.target.value;
    const match = categoryToSection[val.trim().toLowerCase()];
    setForm((f) => ({
      ...f,
      category: val,
      section: match ? match.section : f.section,
      subsection: match ? match.subsection : f.subsection,
    }));
  };

  const currentSectionObj = sections.find((s) => s.label === form.section);
  const subsections = currentSectionObj ? currentSectionObj.subsections : [];

  const areas = areasByCounty[form.county] || areasByCounty.default;

  const handleReset = () => {
    setForm({ ...emptyForm, fullName: user?.full_name || '', email: user?.email || '' });
    setPhotos([]);
    setVideo(null);
  };

  const handleFiles = (files) => {
    const validFiles = Array.from(files).filter((f) => f.type.startsWith('image/'));
    const remaining = 15 - photos.length;
    const toAdd = validFiles.slice(0, remaining).map((f) => ({
      file: f,
      preview: URL.createObjectURL(f),
    }));
    setPhotos((prev) => [...prev, ...toAdd]);
  };

  const removePhoto = (idx) => {
    setPhotos((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    handleFiles(e.dataTransfer.files);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="max-w-3xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
          <Link to="/" className="hover:text-primary transition-colors">Home</Link>
          <span>›</span>
          <span className="text-foreground font-medium">Place Ad</span>
        </div>

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Let's start with the basics</h1>
          </div>
          <button onClick={handleReset} className="text-sm text-primary hover:underline flex items-center gap-1">
            Reset Form
          </button>
        </div>

        <div className="flex flex-col gap-8">

          {/* Section 1: Category */}
          <Section title="What are you selling?">
            <div className="flex flex-col gap-4">
              <div className="flex gap-3">
                <input
                  type="text"
                  value={form.category}
                  onChange={handleCategoryChange}
                  placeholder="e.g. Car, Van, Truck"
                  className="flex-1 border border-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                />
                <button
                  onClick={() => {
                    if (form.category) {
                      setCategoryStarted(true);
                    }
                  }}
                  className="bg-muted text-foreground font-semibold px-8 py-2.5 rounded-lg hover:bg-muted/80 transition-colors text-sm whitespace-nowrap"
                >
                  Start
                </button>
              </div>

              {categoryStarted && (
                <>
                  {/* Select Section */}
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">Select Section</label>
                    <div className="relative">
                      <select
                        value={form.section}
                        onChange={(e) => setForm((f) => ({ ...f, section: e.target.value, subsection: '' }))}
                        className="w-full appearance-none border border-border rounded-lg px-4 py-3 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary pr-9"
                      >
                        <option value="">Select a section...</option>
                        {sections.map((s) => <option key={s.label}>{s.label}</option>)}
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                    </div>
                  </div>

                  {/* Select Subsection */}
                  {form.section && (
                    <div className="flex items-start gap-3">
                      <div className="flex flex-col items-center mt-1">
                        <div className="w-px h-4 bg-border" />
                        <div className="w-3 h-px bg-border" />
                      </div>
                      <div className="flex-1">
                        <label className="block text-sm font-medium text-foreground mb-1.5">Select Subsection</label>
                        <div className="relative">
                          <select
                            value={form.subsection}
                            onChange={set('subsection')}
                            className="w-full appearance-none border border-border rounded-lg px-4 py-3 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary pr-9"
                          >
                            <option value="">Select a subsection...</option>
                            {subsections.map((s) => <option key={s}>{s}</option>)}
                          </select>
                          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Ad Type */}
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Ad Type</label>
                    <div className="flex gap-4">
                      {['for_sale', 'wanted'].map((type) => (
                        <label key={type} className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            name="adType"
                            value={type}
                            checked={form.adType === type}
                            onChange={set('adType')}
                            className="w-4 h-4 accent-primary"
                          />
                          <span className="text-sm font-medium">{type === 'for_sale' ? 'For Sale' : 'Wanted'}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          </Section>

          {/* Section 2: Photos */}
          <Section id="photos-section" title="Photos and Video" icon={<Upload className="w-5 h-5" />} subtitle="Up to 15 photos and 1 video">
            {/* Photo grid */}
            {photos.length > 0 && (
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 mb-4">
                {photos.map((p, i) => (
                  <div key={i} className="relative rounded-lg overflow-hidden aspect-square border border-border">
                    <img src={p.preview} alt="" className="w-full h-full object-cover" />
                    <button
                      onClick={() => removePhoto(i)}
                      className="absolute top-1 right-1 bg-black/60 text-white rounded-full w-5 h-5 flex items-center justify-center hover:bg-black/80"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Drop zone */}
            {photos.length < 15 && (
              <div
                onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                onDragLeave={() => setDragOver(false)}
                onDrop={handleDrop}
                className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors ${dragOver ? 'border-primary bg-primary/5' : 'border-border'}`}
              >
                <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-3" />
                <label className="cursor-pointer">
                  <span className="text-primary font-semibold hover:underline">Add Photos</span>
                  <input type="file" multiple accept="image/*" className="hidden" onChange={(e) => handleFiles(e.target.files)} />
                </label>
                <span className="text-muted-foreground text-sm"> or drag and drop</span>
                <p className="text-xs text-muted-foreground mt-2">Up to {15 - photos.length} more images · .jpg, .png and .gif files</p>
              </div>
            )}

            {/* Video upload */}
            <div className="mt-4">
              <label className="block text-sm font-medium text-foreground mb-1.5">Upload Video <span className="text-muted-foreground font-normal">(1 video, max 100MB)</span></label>
              {video ? (
                <div className="flex items-center gap-3 border border-border rounded-lg px-4 py-3 bg-secondary/50">
                  <span className="text-sm text-foreground flex-1 truncate">{video.name}</span>
                  <button onClick={() => setVideo(null)} className="text-muted-foreground hover:text-destructive">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <label className="cursor-pointer flex items-center gap-3 border border-dashed border-border rounded-lg px-4 py-3 hover:bg-secondary/50 transition-colors">
                  <Upload className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm text-primary font-medium">Choose video file</span>
                  <span className="text-sm text-muted-foreground">· .mp4, .mov, .avi</span>
                  <input type="file" accept="video/*" className="hidden" onChange={(e) => e.target.files[0] && setVideo(e.target.files[0])} />
                </label>
              )}
            </div>

            {/* YouTube */}
            <div className="mt-4">
              <label className="block text-sm font-medium text-foreground mb-1.5">Optional YouTube Video</label>
              <div className="relative">
                <Youtube className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-red-500" />
                <input
                  type="text"
                  value={form.youtubeUrl}
                  onChange={set('youtubeUrl')}
                  placeholder="e.g. www.youtube.com/watch=0"
                  className="w-full border border-border rounded-lg px-4 py-3 text-sm pl-9 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                />
              </div>
            </div>
          </Section>

          {/* Section 3: Ad Details */}
          <Section title="Ad Details" icon={<FileText className="w-5 h-5" />}>
            <div className="flex flex-col gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Ad Title <span className="text-destructive">*</span></label>
                <input
                  type="text"
                  value={form.title}
                  onChange={set('title')}
                  placeholder="Insert your ad title"
                  className="w-full border border-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                />
                <p className="text-xs text-muted-foreground mt-1">Your ad title will be shown in search results</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Description <span className="text-destructive">*</span></label>
                <textarea
                  value={form.description}
                  onChange={set('description')}
                  maxLength={2000}
                  rows={5}
                  placeholder="Tell us about your ad. Make sure to give us as much information as possible."
                  className="w-full border border-border rounded-lg px-4 py-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                />
                <p className="text-xs text-muted-foreground text-right">{form.description.length} / 2000</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Price <span className="text-destructive">*</span></label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-medium text-sm">€</span>
                  <input
                    type="text"
                    value={form.price}
                    onChange={set('price')}
                    placeholder="e.g. 1,200"
                    className="w-full border border-border rounded-lg px-4 py-3 text-sm pl-7 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                  />
                </div>
              </div>
            </div>
          </Section>

          {/* Section 4: Contact Details */}
          <Section title="Contact Details" icon={<User className="w-5 h-5" />}>
            <div className="flex flex-col gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Full Name <span className="text-destructive">*</span></label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input type="text" value={form.fullName} onChange={set('fullName')} placeholder="Your full name"
                    className="w-full border border-border rounded-lg px-4 py-3 text-sm pl-9 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">E-mail <span className="text-destructive">*</span></label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input type="email" value={form.email} onChange={set('email')} placeholder="you@example.com"
                    className="w-full border border-border rounded-lg px-4 py-3 text-sm pl-9 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Phone <span className="text-destructive">*</span></label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input type="tel" value={form.phone} onChange={set('phone')} placeholder="e.g. 086 123 4567"
                    className="w-full border border-border rounded-lg px-4 py-3 text-sm pl-9 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">County <span className="text-destructive">*</span></label>
                  <div className="relative">
                    <select value={form.county} onChange={(e) => setForm((f) => ({ ...f, county: e.target.value, area: '' }))}
                      className="w-full appearance-none border border-border rounded-lg px-4 py-3 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary pr-9">
                      {counties.map((c) => <option key={c}>{c}</option>)}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Area <span className="text-destructive">*</span></label>
                  <div className="relative">
                    <select value={form.area} onChange={set('area')}
                      className="w-full appearance-none border border-border rounded-lg px-4 py-3 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary pr-9">
                      <option value="">Select area...</option>
                      {areas.map((a) => <option key={a}>{a}</option>)}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                  </div>
                </div>
              </div>

              {/* Allow contact by */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Allow contact by <span className="text-destructive">*</span></label>
                <div className="flex gap-3 flex-wrap">
                  <button
                    type="button"
                    onClick={toggle('contactByMessage')}
                    className={`flex items-center gap-2 border rounded-lg px-4 py-2.5 text-sm font-medium transition-colors ${form.contactByMessage ? 'border-primary bg-primary/5 text-primary' : 'border-border text-foreground hover:bg-secondary'}`}>
                    <Mail className="w-4 h-4" /> Message Center
                  </button>
                  <button
                    type="button"
                    onClick={toggle('contactByPhone')}
                    className={`flex items-center gap-2 border rounded-lg px-4 py-2.5 text-sm font-medium transition-colors ${form.contactByPhone ? 'border-primary bg-primary/5 text-primary' : 'border-border text-foreground hover:bg-secondary'}`}>
                    <Phone className="w-4 h-4" /> Phone/Text
                  </button>
                </div>
                <p className="text-xs text-muted-foreground mt-2">Beware of text or WhatsApp messages with links claiming to have transferred you money for your item.</p>
              </div>

              {/* Trader */}
              <div className="border border-border rounded-xl p-4 flex items-start gap-3">
                <input type="checkbox" id="trader" checked={form.isTrader} onChange={toggle('isTrader')}
                  className="w-4 h-4 mt-0.5 accent-primary cursor-pointer" />
                <div>
                  <label htmlFor="trader" className="text-sm font-medium cursor-pointer">Yes, I'm a trader</label>
                  <p className="text-xs text-muted-foreground mt-0.5">Generates a VAT receipt</p>
                </div>
              </div>
            </div>
          </Section>

          {/* Actions */}
          <div className="flex flex-col gap-3 pb-10">
            <button className="w-full bg-primary text-white font-bold py-4 rounded-xl text-base hover:bg-primary/90 transition-colors">
              Preview Ad
            </button>
            <button className="w-full bg-foreground text-white font-bold py-4 rounded-xl text-base hover:opacity-90 transition-opacity">
              Sell Now
            </button>
            <p className="text-xs text-muted-foreground text-center">
              By clicking "Sell Now", you agree to the AutoMarket{' '}
              <span className="text-primary hover:underline cursor-pointer">Terms & Conditions</span>.
            </p>
            <button onClick={handleReset} className="text-sm text-primary hover:underline text-center mt-1">
              Reset Form
            </button>
          </div>

        </div>
      </div>

      <Footer />
    </div>
  );
}

function Section({ id, title, icon, subtitle, children }) {
  return (
    <div id={id} className="bg-white border border-border rounded-2xl p-6 shadow-sm">
      <div className="flex items-center gap-2 mb-1">
        <span className="text-primary">{icon}</span>
        <h2 className="text-lg font-bold text-foreground">{title}</h2>
      </div>
      {subtitle && <p className="text-sm text-muted-foreground mb-4">{subtitle}</p>}
      {!subtitle && <div className="mb-4" />}
      {children}
    </div>
  );
}