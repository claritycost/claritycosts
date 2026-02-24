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
      .select('id, rate_card, answers, created_at')
      .eq('id', id)
      .single()

    if (error || !data) {
      return res.status(404).json({ error: 'Rate card not found' })
    }

    return res.status(200).json({
      id: data.id,
      rates: data.rate_card,
      createdAt: data.created_at,
      specialty: data.answers?.discipline || data.answers?.specialty || null,
    })
  } catch (err) {
    console.error('Get submission error:', err)
    return res.status(500).json({ error: err.message })
  }
}
