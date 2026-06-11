import React from 'react';
import { X, MapPin, Phone, Mail, Tag, Car, Fuel, Settings, Calendar, Palette, DoorOpen } from 'lucide-react';

export default function AdPreview({ form, photos, selectedPackage, onClose, onBack }) {
  const coverPhoto = photos[0];

  return (
    <div className="fixed inset-0 bg-black/60 z-50 overflow-y-auto flex items-start justify-center py-8 px-4">
      <div className="bg-background w-full max-w-3xl rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-white border-b border-border px-6 py-4 flex items-center justify-between sticky top-0 z-10">
          <div>
            <h2 className="text-lg font-bold text-foreground">Ad Preview</h2>
            <p className="text-xs text-muted-foreground">This is how your ad will appear to buyers</p>
          </div>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 flex flex-col gap-6">
          {/* Photo Gallery */}
          {photos.length > 0 ? (
            <div className="flex flex-col gap-2">
              <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-secondary">
                <img src={coverPhoto.preview} alt="Cover" className="w-full h-full object-cover" style={{ transform: `rotate(${coverPhoto.rotation || 0}deg)` }} />
                <div className="absolute top-3 left-3 bg-yellow-500 text-white text-xs font-bold px-2 py-1 rounded flex items-center gap-1">
                  ★ COVER
                </div>
                <div className="absolute bottom-3 right-3 bg-black/60 text-white text-xs px-2 py-1 rounded">
                  {photos.length} photo{photos.length !== 1 ? 's' : ''}
                </div>
              </div>
              {photos.length > 1 && (
                <div className="grid grid-cols-5 gap-2">
                  {photos.slice(1, 6).map((p, i) => (
                    <div key={i} className="aspect-square rounded-lg overflow-hidden bg-secondary">
                      <img src={p.preview} alt="" className="w-full h-full object-cover" style={{ transform: `rotate(${p.rotation || 0}deg)` }} />
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="w-full aspect-video rounded-xl bg-secondary flex items-center justify-center">
              <p className="text-muted-foreground text-sm">No photos added</p>
            </div>
          )}

          {/* Title & Price */}
          <div className="bg-white border border-border rounded-xl p-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">{form.subsection || 'Vehicles'}</p>
                <h1 className="text-2xl font-bold text-foreground">{form.title || 'Your Ad Title'}</h1>
                <div className="flex items-center gap-2 mt-2">
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">{[form.area, form.county].filter(Boolean).join(', ') || 'Location'}</span>
                </div>
              </div>
              <div className="text-right flex-shrink-0">
                <p className="text-3xl font-bold text-primary">€{form.price || '0'}</p>
                <p className="text-xs text-muted-foreground mt-1">{form.adType === 'wanted' ? 'Wanted' : 'For Sale'}</p>
              </div>
            </div>
          </div>

          {/* Vehicle Specs */}
          {(form.vehicleMake || form.vehicleYear || form.vehicleFuel || form.vehicleTransmission || form.mileage || form.colour) && (
            <div className="bg-white border border-border rounded-xl p-5">
              <h3 className="font-semibold text-foreground mb-4">Vehicle Details</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {form.vehicleMake && <SpecItem icon={<Car className="w-4 h-4" />} label="Make" value={form.vehicleMake} />}
                {form.vehicleModel && <SpecItem icon={<Car className="w-4 h-4" />} label="Model" value={form.vehicleModel} />}
                {form.vehicleYear && <SpecItem icon={<Calendar className="w-4 h-4" />} label="Year" value={form.vehicleYear} />}
                {form.vehicleFuel && <SpecItem icon={<Fuel className="w-4 h-4" />} label="Fuel" value={form.vehicleFuel} />}
                {form.vehicleTransmission && <SpecItem icon={<Settings className="w-4 h-4" />} label="Transmission" value={form.vehicleTransmission} />}
                {form.mileage && <SpecItem icon={<Tag className="w-4 h-4" />} label="Mileage" value={`${form.mileage} ${form.mileageUnit}`} />}
                {form.colour && <SpecItem icon={<Palette className="w-4 h-4" />} label="Colour" value={form.colour} />}
                {form.engineSize && <SpecItem icon={<Settings className="w-4 h-4" />} label="Engine" value={form.engineSize} />}
                {form.numberOfDoors && <SpecItem icon={<DoorOpen className="w-4 h-4" />} label="Doors" value={form.numberOfDoors} />}
              </div>
            </div>
          )}

          {/* Description */}
          {form.description && (
            <div className="bg-white border border-border rounded-xl p-5">
              <h3 className="font-semibold text-foreground mb-3">Description</h3>
              <p className="text-sm text-foreground leading-relaxed whitespace-pre-wrap">{form.description}</p>
            </div>
          )}

          {/* Seller Info */}
          <div className="bg-white border border-border rounded-xl p-5">
            <h3 className="font-semibold text-foreground mb-4">Seller Information</h3>
            <div className="flex flex-col gap-2">
              {form.fullName && (
                <div className="flex items-center gap-2 text-sm text-foreground">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-primary font-bold text-xs">{form.fullName.charAt(0).toUpperCase()}</span>
                  </div>
                  <span className="font-medium">{form.fullName}</span>
                  {form.isTrader && <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full font-medium">Trader</span>}
                </div>
              )}
              {form.contactByMessage && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Mail className="w-4 h-4" /> Available via Message Center
                </div>
              )}
              {form.contactByPhone && form.phone && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Phone className="w-4 h-4" /> {form.phone}
                </div>
              )}
            </div>
          </div>

          {/* Package badge */}
          {selectedPackage && (
            <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-foreground">{selectedPackage.name} Package</p>
                <p className="text-xs text-muted-foreground">{selectedPackage.listingDays} day listing · up to {selectedPackage.maxPhotos} photos</p>
              </div>
              <span className="text-xl font-bold text-primary">{selectedPackage.price}</span>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="bg-white border-t border-border px-6 py-4 flex gap-3">
          <button onClick={onBack} className="flex-1 border border-border text-foreground font-semibold py-3 rounded-xl hover:bg-secondary transition-colors text-sm">
            ← Back to Edit
          </button>
          <button onClick={onClose} className="flex-1 bg-primary text-white font-semibold py-3 rounded-xl hover:bg-primary/90 transition-colors text-sm">
            Looks Good
          </button>
        </div>
      </div>
    </div>
  );
}

function SpecItem({ icon, label, value }) {
  return (
    <div className="flex items-start gap-2">
      <span className="text-muted-foreground mt-0.5">{icon}</span>
      <div>
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="text-sm font-semibold text-foreground">{value}</p>
      </div>
    </div>
  );
}