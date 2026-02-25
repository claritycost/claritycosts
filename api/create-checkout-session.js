import Stripe from 'stripe'
import { createClient } from '@supabase/supabase-js'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16',
})

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
)

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { email, submissionId, rateCardData, answers } = req.body

  if (!email) {
    return res.status(400).json({ error: 'Email is required' })
  }

  try {
    let finalSubmissionId = submissionId

    if (!finalSubmissionId && rateCardData) {
      const { data, error } = await supabase
        .from('submissions')
        .insert([{
          answers: answers || { email },
          rate_card: rateCardData,
          created_at: new Date().toISOString(),
        }])
        .select('id')
        .single()

      if (error) {
        console.error('Supabase insert error:', error)
      } else {
        finalSubmissionId = data.id
      }
    }

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || `https://${req.headers.host}`
    const successUrl = `${baseUrl}/success?session_id={CHECKOUT_SESSION_ID}`
    const cancelUrl = `${baseUrl}/upgrade`

    console.log('Creating Stripe session with price:', process.env.STRIPE_PRICE_ID)

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      customer_email: email,
      line_items: [{
        price: process.env.STRIPE_PRICE_ID,
        quantity: 1,
      }],
      metadata: {
        email,
        submissionId: finalSubmissionId || '',
      },
      success_url: successUrl,
      cancel_url: cancelUrl,
    })

    return res.status(200).json({ url: session.url })
  } catch (err) {
    console.error('Stripe checkout error:', err.message, err.type, err.code)
    return res.status(500).json({ error: err.message || 'Failed to create checkout session' })
  }
}
