import React from 'react';

const ALL_MAKES = [
  '-Kita-', 'A1 PRO', 'Abarth', 'AC', 'Acura', 'Aito', 'Aiways', 'Aixam', 'Alfa Romeo', 'Alpina',
  'Aston Martin', 'Audi', 'BAW', 'BELLIER', 'Bentley', 'BMW', 'Bontu', 'Buick', 'BYD', 'Cadillac',
  'Casalini', 'Cenntro', 'Chatenet', 'Chevrolet', 'Chrysler', 'Citroen', 'Cupra', 'Dacia', 'Daihatsu',
  'DFSK', 'Dodge', 'Dongfeng', 'DS Automobiles', 'e.GO', 'Ferrari', 'Fiat', 'Fisker', 'Ford',
  'Forthing', 'GAZ', 'Genesis', 'GMC', 'GWM', 'Honda', 'Hongqi', 'Hummer', 'Hyundai', 'IFA',
  'Infiniti', 'Isuzu', 'Iveco', 'Jaguar', 'Jeep', 'KGM', 'Kia', 'Lada', 'Lamborghini', 'Lancia',
  'Land Rover', 'Lexus', 'Ligier', 'Lincoln', 'Lotus', 'LuAZ', 'Lynk & Co', 'MAN', 'Maserati',
  'Maxus', 'Maybach', 'Mazda', 'Mclaren', 'Mercedes-Benz', 'Mercury', 'MG', 'Microcar', 'Mini',
  'Mitsubishi', 'Moskvich', 'Nissan', 'Opel', 'Peugeot', 'Piaggio', 'Plymouth', 'Polestar',
  'Pontiac', 'Porsche', 'RAM', 'Renault', 'Rolls-Royce', 'Rover', 'Saab', 'Seat', 'Seres',
  'Shuanghuan', 'Skoda', 'Skut', 'Smart', 'SsangYong', 'Subaru', 'Suzuki', 'Tesla', 'Toyota',
  'Trabant', 'UAZ', 'Vauxhall', 'Volkswagen', 'Volvo', 'Voyah', 'Wartburg', 'XEV', 'Xpeng',
  'ZAZ', 'Zeekr', 'Zhidou',
];

function getInitials(name) {
  const words = name.trim().split(/[\s\-&]/);
  if (words.length >= 2) return (words[0][0] + words[1][0]).toUpperCase();
  return name.slice(0, 2).toUpperCase();
}

const BADGE_COLORS = [
  'bg-blue-100 text-blue-700',
  'bg-emerald-100 text-emerald-700',
  'bg-purple-100 text-purple-700',
  'bg-orange-100 text-orange-700',
  'bg-rose-100 text-rose-700',
  'bg-sky-100 text-sky-700',
  'bg-amber-100 text-amber-700',
  'bg-teal-100 text-teal-700',
];

function colorFor(name) {
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
  return BADGE_COLORS[Math.abs(hash) % BADGE_COLORS.length];
}

export default function CarListings() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-12 md:py-16">
      <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">Browse by Make</h2>
      <p className="text-muted-foreground mb-8">Find cars from all manufacturers available on AutoMarket.</p>

      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3">
        {ALL_MAKES.map((make) => (
          <button
            key={make}
            className="flex flex-col items-center justify-center bg-card rounded-xl border border-border p-3 hover:border-primary/50 hover:shadow-md transition-all duration-200 group"
          >
            <div className={`w-11 h-11 rounded-full flex items-center justify-center mb-2 font-bold text-sm group-hover:scale-110 transition-transform ${colorFor(make)}`}>
              {getInitials(make)}
            </div>
            <span className="text-xs font-medium text-foreground text-center leading-tight line-clamp-2">{make}</span>
          </button>
        ))}
      </div>
    </section>
  );
}