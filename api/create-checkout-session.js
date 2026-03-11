import Stripe from 'stripe'

export default async function handler(req, res) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: '2023-10-16' })

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { email, resultId } = req.body

  if (!email) {
    return res.status(400).json({ error: 'Email is required' })
  }

  try {
    const baseUrl    = process.env.VITE_APP_URL || `https://${req.headers.host}`
    const successUrl = `${baseUrl}/success?session_id={CHECKOUT_SESSION_ID}`
    const cancelUrl  = `${baseUrl}/upgrade`

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode:                 'payment',
      customer_email:       email,
      line_items:           [{ price: process.env.STRIPE_PRICE_ID, quantity: 1 }],
      metadata:             { email, resultId: resultId || '' },
      success_url:          successUrl,
      cancel_url:           cancelUrl,
    })

    return res.status(200).json({ url: session.url })
  } catch (err) {
    console.error('Stripe checkout error:', err)
    return res.status(500).json({ error: err.message })
  }
}
