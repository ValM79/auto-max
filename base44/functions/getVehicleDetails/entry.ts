import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();

    if (!user) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { registration } = await req.json();

    if (!registration) {
      return Response.json({ error: 'Registration is required' }, { status: 400 });
    }

    // Mock vehicle data - replace with actual API call
    const mockVehicles = {
      '201D0123': {
        make: 'Toyota',
        model: 'Corolla',
        year: '2020',
        fuelType: 'Petrol',
        transmission: 'Manual',
        engineSize: '1.6 L',
        bodyType: 'Sedan',
        colour: 'Silver',
        numberOfDoors: 4,
        numberOfSeats: 5,
        currentCountryOfReg: 'Ireland',
        nctExpiry: 'Dec 2025',
        mileage: '45000',
      },
      '171D2906': {
        make: 'Hyundai',
        model: 'Tucson',
        year: '2017',
        fuelType: 'Diesel',
        transmission: 'Manual',
        engineSize: '1.7 L',
        bodyType: 'SUV',
        colour: 'Blue',
        numberOfDoors: 5,
        numberOfSeats: 5,
        currentCountryOfReg: 'Ireland',
        nctExpiry: 'Jan 2027',
        mileage: '78000',
      },
      '211D5678': {
        make: 'BMW',
        model: '3 Series',
        year: '2021',
        fuelType: 'Diesel',
        transmission: 'Automatic',
        engineSize: '2.0 L',
        bodyType: 'Sedan',
        colour: 'Black',
        numberOfDoors: 4,
        numberOfSeats: 5,
        currentCountryOfReg: 'Ireland',
        nctExpiry: 'Mar 2026',
        mileage: '32000',
      },
      '19D9999': {
        make: 'Ford',
        model: 'Focus',
        year: '2019',
        fuelType: 'Petrol',
        transmission: 'Manual',
        engineSize: '1.5 L',
        bodyType: 'Hatchback',
        colour: 'White',
        numberOfDoors: 5,
        numberOfSeats: 5,
        currentCountryOfReg: 'Ireland',
        nctExpiry: 'Aug 2024',
        mileage: '62000',
      },
    };

    const vehicleData = mockVehicles[registration.toUpperCase()];

    if (!vehicleData) {
      return Response.json(
        { error: 'Vehicle not found. Please check the registration number.' },
        { status: 404 }
      );
    }

    return Response.json({ success: true, data: vehicleData });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});