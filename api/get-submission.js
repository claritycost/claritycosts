import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
)

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { id } = req.query

  if (!id) {
    return res.status(400).json({ error: 'ID required' })
  }

  try {
    const { data, error } = await supabase
      .from('submissions')
      .select('id, rates, answers, created_at')
      .eq('id', id)
      .single()

    if (error || !data) {
      return res.status(404).json({ error: 'Rate card not found' })
    }

    // Return only public-safe fields — no email
    return res.status(200).json({
      id: data.id,
      rates: data.rates,
      createdAt: data.created_at,
      specialty: data.answers?.specialty || data.answers?.[0] || null,
    })
  } catch (err) {
    console.error('Get submission error:', err)
    return res.status(500).json({ error: err.message })
  }
}
