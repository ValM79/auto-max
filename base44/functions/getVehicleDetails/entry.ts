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
        year: 2020,
        fuel: 'Petrol',
        transmission: 'Manual',
        engine: '1.6L',
        mileage: '45000',
        color: 'Silver',
      },
      '211D5678': {
        make: 'BMW',
        model: '3 Series',
        year: 2021,
        fuel: 'Diesel',
        transmission: 'Automatic',
        engine: '2.0L',
        mileage: '32000',
        color: 'Black',
      },
      '19D9999': {
        make: 'Ford',
        model: 'Focus',
        year: 2019,
        fuel: 'Petrol',
        transmission: 'Manual',
        engine: '1.5L',
        mileage: '62000',
        color: 'White',
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