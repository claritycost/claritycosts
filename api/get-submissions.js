import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
)

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'clarity-admin-2024'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { password } = req.body

  if (password !== ADMIN_PASSWORD) {
    return res.status(401).json({ error: 'Incorrect password' })
  }

  try {
    const { data, error } = await supabase
      .from('submissions')
      .select('id, email, rates, answers, created_at, paid, paid_at')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Supabase error:', error)
      return res.status(500).json({ error: 'Database error' })
    }

    return res.status(200).json({ submissions: data || [] })
  } catch (err) {
    console.error('Get submissions error:', err)
    return res.status(500).json({ error: err.message })
  }
}
