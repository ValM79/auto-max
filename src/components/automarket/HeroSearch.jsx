import React, { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';

const HERO_IMAGE = 'https://media.base44.com/images/public/69ceb6b4f41f5a2cee0c7016/caf9b03bd_generated_577d304f.png';

const makes = ['-Kita-', 'A1 PRO', 'Abarth', 'AC', 'Acura', 'Aito', 'Aiways', 'Aixam', 'Alfa Romeo', 'Alpina', 'Aston Martin', 'Audi', 'BAW', 'BELLIER', 'Bentley', 'BMW', 'Bontu', 'Buick', 'BYD', 'Cadillac', 'Casalini', 'Cenntro', 'Chatenet', 'Chevrolet', 'Chrysler', 'Citroen', 'Cupra', 'Dacia', 'Daihatsu', 'DFSK', 'Dodge', 'Dongfeng', 'DS Automobiles', 'e.GO', 'Ferrari', 'Fiat', 'Fisker', 'Ford', 'Forthing', 'GAZ', 'Genesis', 'GMC', 'GWM', 'Honda', 'Hongqi', 'Hummer', 'Hyundai', 'IFA', 'Infiniti', 'Isuzu', 'Iveco', 'Jaguar', 'Jeep', 'KGM', 'Kia', 'Lada', 'Lamborghini', 'Lancia', 'Land Rover', 'Lexus', 'Ligier', 'Lincoln', 'Lotus', 'LuAZ', 'Lynk & Co', 'MAN', 'Maserati', 'Maxus', 'Maybach', 'Mazda', 'Mclaren', 'Mercedes-Benz', 'Mercury', 'MG', 'Microcar', 'Mini', 'Mitsubishi', 'Moskvich', 'Nissan', 'Opel', 'Peugeot', 'Piaggio', 'Plymouth', 'Polestar', 'Pontiac', 'Porsche', 'RAM', 'Renault', 'Rolls-Royce', 'Rover', 'Saab', 'Seat', 'Seres', 'Shuanghuan', 'Skoda', 'Skut', 'Smart', 'SsangYong', 'Subaru', 'Suzuki', 'Tesla', 'Toyota', 'Trabant', 'UAZ', 'Vauxhall', 'Volkswagen', 'Volvo', 'Voyah', 'Wartburg', 'XEV', 'Xpeng', 'ZAZ', 'Zeekr', 'Zhidou'];

const modelsByMake = {
  'Abarth': ['124 Spider', '500', '595', '695'],
  'AC': ['Cobra'],
  'Acura': ['ILX', 'MDX', 'RDX', 'RLX', 'TL', 'TLX', 'TSX'],
  'Aito': ['M7', 'M9'],
  'Aiways': ['U5', 'U6'],
  'Aixam': ['City', 'Coupe', 'Crossline', 'D-Truck', 'GTO', 'Mega', 'Minauto', 'Scouty'],
  'Alfa Romeo': ['147', '156', '159', '166', 'Brera', 'Crosswagon', 'Giulia', 'Giulietta', 'GT', 'GTV', 'Mito', 'Spider', 'Stelvio', 'Tonale'],
  'Alpina': ['B3', 'B4', 'B5', 'B7', 'B8', 'D3', 'D5', 'XB7'],
  'Aston Martin': ['DB11', 'DB9', 'DBS', 'DBX', 'Rapide', 'Vantage'],
  'Audi': ['A1', 'A2', 'A3', 'A4', 'A5', 'A6', 'A7', 'A8', 'e-tron', 'e-tron GT', 'e-tron S', 'Q2', 'Q3', 'Q4 e-tron', 'Q5', 'Q6', 'Q7', 'Q8', 'R8', 'RS3', 'RS4', 'RS5', 'RS6', 'RS7', 'RS Q3', 'RS Q8', 'S1', 'S3', 'S4', 'S5', 'S6', 'S7', 'S8', 'SQ2', 'SQ5', 'SQ7', 'SQ8', 'TT', 'TTS'],
  'BAW': ['BJ40'],
  'Bentley': ['Bentayga', 'Continental', 'Flying Spur', 'Mulsanne'],
  'BMW': ['1 Series', '2 Series', '3 Series', '4 Series', '5 Series', '6 Series', '7 Series', '8 Series', 'i3', 'i4', 'i5', 'i7', 'i8', 'iX', 'iX1', 'iX3', 'M2', 'M3', 'M4', 'M5', 'M6', 'M8', 'X1', 'X2', 'X3', 'X4', 'X5', 'X6', 'X7', 'XM', 'Z3', 'Z4'],
  'Buick': ['Enclave', 'Encore', 'Envision', 'LaCrosse', 'Regal', 'Verano'],
  'BYD': ['Atto 3', 'Dolphin', 'Han', 'Seal', 'Song', 'Tang'],
  'Cadillac': ['ATS', 'CT4', 'CT5', 'CT6', 'CTS', 'Escalade', 'SRX', 'XT4', 'XT5', 'XT6'],
  'Chatenet': ['Barooder', 'CH26', 'CH28', 'CH30', 'CH32', 'CH46', 'Stella'],
  'Chevrolet': ['Aveo', 'Blazer', 'Camaro', 'Captiva', 'Colorado', 'Corvette', 'Cruze', 'Equinox', 'Express', 'Impala', 'Malibu', 'Orlando', 'Silverado', 'Spark', 'Suburban', 'Tahoe', 'Trailblazer', 'Traverse', 'Trax'],
  'Chrysler': ['200', '300', '300C', 'Grand Voyager', 'Pacifica', 'PT Cruiser', 'Sebring', 'Town & Country', 'Voyager'],
  'Citroen': ['Berlingo', 'C1', 'C2', 'C3', 'C3 Aircross', 'C4', 'C4 Cactus', 'C4 Picasso', 'C5', 'C5 Aircross', 'C5 X', 'C6', 'C8', 'Dispatch', 'DS3', 'DS4', 'DS5', 'Jumper', 'Jumpy', 'Nemo', 'Picasso', 'Relay', 'SpaceTourer', 'Xsara'],
  'Cupra': ['Ateca', 'Born', 'Formentor', 'Leon', 'Terramar'],
  'Dacia': ['Dokker', 'Duster', 'Jogger', 'Lodgy', 'Logan', 'Sandero', 'Spring'],
  'Daihatsu': ['Cuore', 'Sirion', 'Terios', 'YRV'],
  'Dodge': ['Caliber', 'Challenger', 'Charger', 'Dart', 'Durango', 'Journey', 'Nitro', 'RAM', 'Viper'],
  'DS Automobiles': ['DS 3', 'DS 3 Crossback', 'DS 4', 'DS 4 Crossback', 'DS 5', 'DS 7 Crossback', 'DS 9'],
  'Ferrari': ['296', '488', '812', 'California', 'F8', 'GTC4Lusso', 'Portofino', 'Roma', 'SF90'],
  'Fiat': ['124 Spider', '500', '500L', '500X', 'Bravo', 'Doblo', 'Freemont', 'Grande Punto', 'Idea', 'Linea', 'Multipla', 'Panda', 'Punto', 'Qubo', 'Scudo', 'Sedici', 'Stilo', 'Tipo', 'Ulysse'],
  'Ford': ['B-Max', 'C-Max', 'Cougar', 'EcoSport', 'Edge', 'Explorer', 'F-150', 'Fiesta', 'Focus', 'Fusion', 'Galaxy', 'Grand C-Max', 'Ka', 'Ka+', 'Kuga', 'Maverick', 'Mondeo', 'Mustang', 'Puma', 'Ranger', 'S-Max', 'Tourneo', 'Transit', 'Transit Connect'],
  'GAZ': ['Gazelle', 'Volga'],
  'GMC': ['Acadia', 'Canyon', 'Sierra', 'Terrain', 'Yukon'],
  'GWM': ['Ora', 'Poer', 'Tank', 'Wey'],
  'Honda': ['Accord', 'Civic', 'CR-V', 'CR-Z', 'e', 'Element', 'FR-V', 'HR-V', 'Insight', 'Jazz', 'Legend', 'NSX', 'Pilot', 'Ridgeline', 'S2000', 'Stream'],
  'Hummer': ['H1', 'H2', 'H3'],
  'Hyundai': ['Bayon', 'Elantra', 'Getz', 'i10', 'i20', 'i30', 'i40', 'i800', 'Ioniq', 'Ioniq 5', 'Ioniq 6', 'ix20', 'ix35', 'ix55', 'Kona', 'Matrix', 'Nexo', 'Santa Fe', 'Sonata', 'Terracan', 'Tucson', 'Veloster'],
  'Infiniti': ['EX', 'FX', 'G', 'JX', 'M', 'Q30', 'Q50', 'Q60', 'Q70', 'QX30', 'QX50', 'QX60', 'QX70', 'QX80'],
  'Isuzu': ['D-Max', 'MU-X', 'Trooper'],
  'Iveco': ['Daily'],
  'Jaguar': ['E-Pace', 'E-Type', 'F-Pace', 'F-Type', 'I-Pace', 'S-Type', 'XE', 'XF', 'XJ', 'XK'],
  'Jeep': ['Cherokee', 'Commander', 'Compass', 'Grand Cherokee', 'Patriot', 'Renegade', 'Wrangler'],
  'KGM': ['Korando', 'Musso', 'Rexton', 'Tivoli', 'Torres'],
  'Kia': ['Carens', 'Carnival', 'Ceed', 'EV6', 'EV9', 'Niro', 'Optima', 'Picanto', 'ProCeed', 'Rio', 'Sorento', 'Soul', 'Sportage', 'Stinger', 'Stonic', 'Telluride', 'Venga', 'XCeed'],
  'Lada': ['2107', 'Granta', 'Kalina', 'Largus', 'Niva', 'Priora', 'Vesta'],
  'Lamborghini': ['Aventador', 'Huracan', 'Urus'],
  'Lancia': ['Delta', 'Musa', 'Thema', 'Ypsilon'],
  'Land Rover': ['Defender', 'Discovery', 'Discovery Sport', 'Freelander', 'Range Rover', 'Range Rover Evoque', 'Range Rover Sport', 'Range Rover Velar'],
  'Lexus': ['CT', 'ES', 'GS', 'GX', 'IS', 'LC', 'LS', 'LX', 'NX', 'RC', 'RX', 'UX'],
  'Ligier': ['JS50', 'JS60'],
  'Lincoln': ['Aviator', 'Corsair', 'MKC', 'MKT', 'MKX', 'MKZ', 'Navigator'],
  'Lotus': ['Eletre', 'Emira', 'Evora', 'Exige'],
  'Lynk & Co': ['01', '02', '03', '05'],
  'MAN': ['TGE', 'TGL', 'TGM', 'TGS', 'TGX'],
  'Maserati': ['Ghibli', 'GranTurismo', 'Grecale', 'Levante', 'MC20', 'Quattroporte'],
  'Mazda': ['2', '3', '5', '6', 'CX-3', 'CX-30', 'CX-5', 'CX-60', 'CX-7', 'CX-9', 'MX-5', 'RX-8'],
  'Mclaren': ['540C', '570S', '600LT', '650S', '720S', '765LT', 'Artura', 'GT', 'P1'],
  'Mercedes-Benz': ['A-Class', 'AMG GT', 'B-Class', 'C-Class', 'CLA', 'CLK', 'CLS', 'E-Class', 'EQA', 'EQB', 'EQC', 'EQE', 'EQS', 'G-Class', 'GL', 'GLA', 'GLB', 'GLC', 'GLE', 'GLK', 'GLS', 'M-Class', 'R-Class', 'S-Class', 'SL', 'SLC', 'SLK', 'SLS', 'Sprinter', 'V-Class', 'Vito'],
  'MG': ['3', '4', '5', '6', 'GS', 'HS', 'Marvel R', 'MG3', 'MG4', 'MG5', 'ZS'],
  'Microcar': ['Due', 'M.Go', 'M8'],
  'Mini': ['Clubman', 'Convertible', 'Cooper', 'Countryman', 'Coupe', 'Electric', 'Hatch', 'Paceman', 'Roadster'],
  'Mitsubishi': ['ASX', 'Colt', 'Eclipse Cross', 'Galant', 'L200', 'Lancer', 'Outlander', 'Pajero', 'Space Star'],
  'Nissan': ['370Z', 'Ariya', 'Armada', 'e-NV200', 'GT-R', 'Juke', 'Leaf', 'Micra', 'Murano', 'Navara', 'Note', 'NV200', 'NV400', 'Pathfinder', 'Patrol', 'Pixo', 'Primastar', 'Pulsar', 'Qashqai', 'Sentra', 'Terrano', 'Tiida', 'Titan', 'X-Trail', 'Xterra'],
  'Opel': ['Adam', 'Agila', 'Ampera', 'Antara', 'Astra', 'Cascada', 'Corsa', 'Crossland', 'Crossland X', 'Frontera', 'Grandland', 'Grandland X', 'Insignia', 'Karl', 'Meriva', 'Mokka', 'Movano', 'Omega', 'Signum', 'Tigra', 'Vectra', 'Vivaro', 'Zafira'],
  'Peugeot': ['1007', '107', '108', '2008', '206', '207', '208', '3008', '301', '306', '307', '308', '4007', '4008', '407', '408', '5008', '508', 'Bipper', 'Expert', 'Landtrek', 'Partner', 'RCZ', 'Rifter', 'Traveller'],
  'Plymouth': ['Barracuda', 'Voyager'],
  'Polestar': ['1', '2', '3', '4'],
  'Porsche': ['718', '911', '918', 'Boxster', 'Cayenne', 'Cayman', 'Macan', 'Panamera', 'Taycan'],
  'RAM': ['1500', '2500', '3500', 'ProMaster'],
  'Renault': ['Arkana', 'Austral', 'Captur', 'Clio', 'Duster', 'Espace', 'Fluence', 'Grand Espace', 'Grand Scenic', 'Kadjar', 'Kangoo', 'Koleos', 'Laguna', 'Latitude', 'Lodgy', 'Master', 'Megane', 'Modus', 'Sandero', 'Scenic', 'Talisman', 'Trafic', 'Twingo', 'Vel Satis', 'Wind', 'Zoe'],
  'Rolls-Royce': ['Cullinan', 'Dawn', 'Ghost', 'Phantom', 'Silver Shadow', 'Silver Spur', 'Spectre', 'Wraith'],
  'Rover': ['75', '200', '400', '600', '800'],
  'Saab': ['9-3', '9-5'],
  'Seat': ['Alhambra', 'Altea', 'Arona', 'Ateca', 'Cordoba', 'Exeo', 'Ibiza', 'Leon', 'Mii', 'Tarraco', 'Toledo'],
  'Skoda': ['Citigo', 'Elroq', 'Enyaq', 'Fabia', 'Kamiq', 'Karoq', 'Kodiaq', 'Octavia', 'Rapid', 'Roomster', 'Scala', 'Superb', 'Yeti'],
  'Smart': ['EQ forfour', 'EQ fortwo', 'forfour', 'fortwo'],
  'SsangYong': ['Actyon', 'Korando', 'Musso', 'Rexton', 'Tivoli', 'Turismo', 'XLV'],
  'Subaru': ['BRZ', 'Crosstrek', 'Forester', 'Impreza', 'Legacy', 'Levorg', 'Outback', 'Solterra', 'WRX', 'XV'],
  'Suzuki': ['Alto', 'Baleno', 'Celerio', 'Grand Vitara', 'Ignis', 'Jimny', 'Kizashi', 'Splash', 'Swift', 'SX4', 'Vitara', 'Wagon R+'],
  'Tesla': ['Model 3', 'Model S', 'Model X', 'Model Y', 'Roadster'],
  'Toyota': ['Auris', 'Avensis', 'Aygo', 'Camry', 'C-HR', 'Corolla', 'FJ Cruiser', 'GR86', 'GR Yaris', 'Highlander', 'Hilux', 'Land Cruiser', 'Prius', 'ProAce', 'Proace City', 'RAV4', 'Sequoia', 'Supra', 'Tundra', 'Urban Cruiser', 'Venza', 'Verso', 'Vitz', 'Yaris', 'Yaris Cross'],
  'UAZ': ['Hunter', 'Patriot'],
  'Volkswagen': ['Amarok', 'Arteon', 'Beetle', 'Bora', 'Caddy', 'California', 'Caravelle', 'CC', 'Crafter', 'CrossPolo', 'e-Golf', 'e-up!', 'Eos', 'Golf', 'Golf Plus', 'Golf Sportsvan', 'ID.3', 'ID.4', 'ID.5', 'ID.6', 'ID.7', 'Jetta', 'Multivan', 'Passat', 'Phaeton', 'Polo', 'Scirocco', 'Sharan', 'T-Cross', 'T-Roc', 'Tiguan', 'Touareg', 'Touran', 'Transporter', 'up!'],
  'Volvo': ['C30', 'C40', 'C70', 'S40', 'S60', 'S80', 'S90', 'V40', 'V50', 'V60', 'V70', 'V90', 'XC40', 'XC60', 'XC70', 'XC90'],
  'Xpeng': ['G3', 'G6', 'G9', 'P5', 'P7'],
  'Zeekr': ['001', '007', '009', 'X']
};

const bodyTypes = ['Convertible', 'Coupe', 'Estate', 'Hatchback', 'MPV', 'Pickup', 'Saloon', 'SUV', 'Van'];
const years = Array.from({ length: 2026 - 1900 + 1 }, (_, i) => String(2026 - i));
const prices = [100,300,500,1000,1500,2000,2500,3000,3500,4000,4500,5000,6000,7000,8000,9000,10000,11000,12000,13000,14000,15000,17500,20000,22500,25000,27500,30000,35000,40000,45000,50000,60000,70000,80000,90000,100000,110000,120000].map(p => p === 0 ? '€0' : `€${p.toLocaleString()}`);

export default function HeroSearch() {
  const [selectedMake, setSelectedMake] = useState('');

  const models = selectedMake ? modelsByMake[selectedMake] || [] : [];

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0">
        <img src={HERO_IMAGE} alt="Family with blue car" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 py-10 md:py-16 lg:py-20">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8">
          <div className="bg-white rounded-xl shadow-2xl p-6 md:p-8 w-full max-w-md">
            <h1 className="text-foreground mb-5 text-xs font-normal underline normal-case md:text-2xl">Cars & Motor</h1>
            <div className="grid grid-cols-2 gap-3">
              <Select onValueChange={(v) => {setSelectedMake(v);}}>
                <SelectTrigger className="col-span-1 h-11 bg-secondary border-0 text-sm">
                  <SelectValue placeholder="Make" />
                </SelectTrigger>
                <SelectContent>
                  {makes.map((m) => <SelectItem key={m} value={m}>{m}</SelectItem>)}
                </SelectContent>
              </Select>

              <Select disabled={!selectedMake || models.length === 0}>
                <SelectTrigger className={`col-span-1 h-11 bg-secondary border-0 text-sm ${!selectedMake || models.length === 0 ? 'opacity-50' : ''}`}>
                  <SelectValue placeholder="Model" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">Any</SelectItem>
                  {models.map((m) => <SelectItem key={m} value={m}>{m}</SelectItem>)}
                </SelectContent>
              </Select>

              <Select>
                <SelectTrigger className="h-11 bg-secondary border-0 text-sm">
                  <SelectValue placeholder="Min Year" />
                </SelectTrigger>
                <SelectContent>
                  {years.map((y) => <SelectItem key={y} value={y}>{y}</SelectItem>)}
                </SelectContent>
              </Select>

              <Select>
                <SelectTrigger className="h-11 bg-secondary border-0 text-sm">
                  <SelectValue placeholder="Max Year" />
                </SelectTrigger>
                <SelectContent>
                  {years.map((y) => <SelectItem key={y} value={y}>{y}</SelectItem>)}
                </SelectContent>
              </Select>

              <Select>
                <SelectTrigger className="h-11 bg-secondary border-0 text-sm">
                  <SelectValue placeholder="Min Price" />
                </SelectTrigger>
                <SelectContent>
                  {prices.map((p) => <SelectItem key={p} value={p}>{p}</SelectItem>)}
                </SelectContent>
              </Select>

              <Select>
                <SelectTrigger className="h-11 bg-secondary border-0 text-sm">
                  <SelectValue placeholder="Max Price" />
                </SelectTrigger>
                <SelectContent>
                  {prices.map((p) => <SelectItem key={p} value={p}>{p}</SelectItem>)}
                </SelectContent>
              </Select>

              <Select>
                <SelectTrigger className="h-11 bg-secondary border-0 text-sm">
                  <SelectValue placeholder="Body Type" />
                </SelectTrigger>
                <SelectContent>
                  {bodyTypes.map((b) => <SelectItem key={b} value={b}>{b}</SelectItem>)}
                </SelectContent>
              </Select>

              <Button className="bg-primary text-[hsl(var(--foreground))] px-4 py-2 text-sm font-semibold rounded-lg inline-flex items-center justify-center gap-2 whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 shadow h-11 hover:bg-primary/90">
                <Search className="w-4 h-4 mr-2" />
                Search
              </Button>
            </div>
          </div>

          <div className="hidden lg:flex flex-col items-end gap-6 text-white pt-8">
            <div className="text-right">
              <h2 className="text-3xl xl:text-4xl font-bold leading-tight drop-shadow-lg">
                Know what your car<br />is really worth.
              </h2>
            </div>
            <Button className="bg-accent hover:bg-accent/90 text-white font-semibold rounded-lg px-8 h-12 text-base shadow-lg">
              Value My Car
            </Button>
          </div>
        </div>
      </div>
    </section>);
}