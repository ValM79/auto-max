import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';
import Stripe from 'npm:stripe@14';

Deno.serve(async (req) => {
  try {
    const { priceId, packageName, listingDays, maxPhotos, bumps, bumpIntervalWeeks, spotlightDays } = await req.json();

    if (!priceId) {
      return Response.json({ error: 'priceId is required' }, { status: 400 });
    }

    const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY'));

    const origin = req.headers.get('origin') || 'https://app.base44.com';

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{ price: priceId, quantity: 1 }],
      mode: 'payment',
      success_url: `${origin}/place-ad?payment=success&package=${encodeURIComponent(packageName || '')}&listingDays=${listingDays || 60}&maxPhotos=${maxPhotos || 12}`,
      cancel_url: `${origin}/place-ad?payment=cancelled`,
      metadata: {
        base44_app_id: Deno.env.get('BASE44_APP_ID'),
        package_name: packageName || '',
        listing_days: String(listingDays || 60),
        max_photos: String(maxPhotos || 12),
        bumps: String(bumps || 0),
        bump_interval_weeks: String(bumpIntervalWeeks || 0),
        spotlight_days: String(spotlightDays || 0),
      },
    });

    return Response.json({ url: session.url });
  } catch (error) {
    console.error('Stripe checkout error:', error.message);
    return Response.json({ error: error.message }, { status: 500 });
  }
});