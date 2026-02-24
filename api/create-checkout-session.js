import Stripe from 'stripe'
import { createClient } from '@supabase/supabase-js'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

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

    // If no existing submission, save one now so we can retrieve it on success
    if (!finalSubmissionId && rateCardData) {
      const { data, error } = await supabase
        .from('submissions')
        .insert([
          {
            email,
            answers: answers || {},
            rates: rateCardData,
            created_at: new Date().toISOString(),
          },
        ])
        .select('id')
        .single()

      if (error) {
        console.error('Supabase insert error:', error)
        // Non-fatal — proceed without ID
      } else {
        finalSubmissionId = data.id
      }
    }

    const successUrl = `${process.env.NEXT_PUBLIC_BASE_URL || `https://${req.headers.host}`}/success?session_id={CHECKOUT_SESSION_ID}`
    const cancelUrl = `${process.env.NEXT_PUBLIC_BASE_URL || `https://${req.headers.host}`}/upgrade`

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      customer_email: email,
      line_items: [
        {
          price: process.env.STRIPE_PRICE_ID,
          quantity: 1,
        },
      ],
      metadata: {
        email,
        submissionId: finalSubmissionId || '',
      },
      success_url: successUrl,
      cancel_url: cancelUrl,
    })

    return res.status(200).json({ url: session.url })
  } catch (err) {
    console.error('Stripe checkout error:', err)
    return res.status(500).json({ error: err.message || 'Failed to create checkout session' })
  }
}
