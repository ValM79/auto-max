import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';
import { AuthProvider, useAuth } from '@/lib/AuthContext';
import UserNotRegisteredError from '@/components/UserNotRegisteredError';
import Home from './pages/Home';
import CreateAccount from './pages/CreateAccount';
import CarRent from './pages/CarRent';
import CarInsurance from './pages/CarInsurance';
import Dealers from './pages/Dealers';
import PlaceAd from './pages/PlaceAd';
import CarsForSale from './pages/CarsForSale';
import Commercials from './pages/Commercials';
import NewCars from './pages/NewCars';
import DealershipCars from './pages/DealershipCars';
import VintageCars from './pages/VintageCars';
import ModifiedCars from './pages/ModifiedCars';
import CarParts from './pages/CarParts';
import CarExtras from './pages/CarExtras';
import RallyCars from './pages/RallyCars';
import BreakingRepairables from './pages/BreakingRepairables';
import Trucks from './pages/Trucks';
import Trailers from './pages/Trailers';
import Campers from './pages/Campers';
import CoachesBuses from './pages/CoachesBuses';
import PlantMachinery from './pages/PlantMachinery';
import MotorbikeExtras from './pages/MotorbikeExtras';
import Motorbikes from './pages/Motorbikes';
import VintageBikes from './pages/VintageBikes';
import Scooters from './pages/Scooters';
import Quads from './pages/Quads';
import Caravans from './pages/Caravans';
import Boats from './pages/Boats';
import BoatExtras from './pages/BoatExtras';
import OtherMotor from './pages/OtherMotor';
import SavedSearches from './pages/SavedSearches';
import Profile from './pages/Profile';
import MyAds from './pages/MyAds';
import Messages from './pages/Messages';
import BrowsingHistory from './pages/BrowsingHistory';
import HistoryChecks from './pages/HistoryChecks';
import PaymentHistory from './pages/PaymentHistory';
import Help from './pages/Help';
import UsedCars from './pages/UsedCars';
import TrustedDealerCars from './pages/TrustedDealerCars';
import ElectricHybridCars from './pages/ElectricHybridCars';
import AllMotors from './pages/AllMotors';
import BuyingTips from './pages/BuyingTips';
// Add page imports here

const AuthenticatedApp = () => {
  const { isLoadingAuth, isLoadingPublicSettings, authError, navigateToLogin } = useAuth();

  // Show loading spinner while checking app public settings or auth
  if (isLoadingPublicSettings || isLoadingAuth) {
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-slate-200 border-t-slate-800 rounded-full animate-spin"></div>
      </div>
    );
  }

  // Handle authentication errors
  if (authError) {
    if (authError.type === 'user_not_registered') {
      return <UserNotRegisteredError />;
    } else if (authError.type === 'auth_required') {
      // Redirect to login automatically
      navigateToLogin();
      return null;
    }
  }

  // Render the main app
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/create-account" element={<CreateAccount />} />
      <Route path="/car-rent" element={<CarRent />} />
      <Route path="/car-insurance" element={<CarInsurance />} />
      <Route path="/dealers" element={<Dealers />} />
      <Route path="/place-ad" element={<PlaceAd />} />
      <Route path="/cars-for-sale" element={<CarsForSale />} />
      <Route path="/commercials" element={<Commercials />} />
      <Route path="/new-cars" element={<NewCars />} />
      <Route path="/dealership-cars" element={<DealershipCars />} />
      <Route path="/vintage-cars" element={<VintageCars />} />
      <Route path="/modified-cars" element={<ModifiedCars />} />
      <Route path="/car-parts" element={<CarParts />} />
      <Route path="/car-extras" element={<CarExtras />} />
      <Route path="/rally-cars" element={<RallyCars />} />
      <Route path="/breaking-repairables" element={<BreakingRepairables />} />
      <Route path="/trucks" element={<Trucks />} />
      <Route path="/trailers" element={<Trailers />} />
      <Route path="/campers" element={<Campers />} />
      <Route path="/coaches-buses" element={<CoachesBuses />} />
      <Route path="/plant-machinery" element={<PlantMachinery />} />
      <Route path="/motorbike-extras" element={<MotorbikeExtras />} />
      <Route path="/motorbikes" element={<Motorbikes />} />
      <Route path="/vintage-bikes" element={<VintageBikes />} />
      <Route path="/scooters" element={<Scooters />} />
      <Route path="/quads" element={<Quads />} />
      <Route path="/caravans" element={<Caravans />} />
      <Route path="/boats" element={<Boats />} />
      <Route path="/boat-extras" element={<BoatExtras />} />
      <Route path="/other-motor" element={<OtherMotor />} />
      <Route path="/saved-searches" element={<SavedSearches />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/my-ads" element={<MyAds />} />
      <Route path="/messages" element={<Messages />} />
      <Route path="/browsing-history" element={<BrowsingHistory />} />
      <Route path="/history-checks" element={<HistoryChecks />} />
      <Route path="/payment-history" element={<PaymentHistory />} />
      <Route path="/help" element={<Help />} />
      <Route path="/used-cars" element={<UsedCars />} />
      <Route path="/trusted-dealer-cars" element={<TrustedDealerCars />} />
      <Route path="/electric-hybrid-cars" element={<ElectricHybridCars />} />
      <Route path="/all-motors" element={<AllMotors />} />
      <Route path="/buying-tips" element={<BuyingTips />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};


function App() {

  return (
    <AuthProvider>
      <QueryClientProvider client={queryClientInstance}>
        <Router>
          <AuthenticatedApp />
        </Router>
        <Toaster />
      </QueryClientProvider>
    </AuthProvider>
  )
}

export default App