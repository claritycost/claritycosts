import { createClient } from '@supabase/supabase-js'

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { password } = req.body

  if (!password || password !== ADMIN_PASSWORD) {
    return res.status(401).json({ error: 'Incorrect password' })
  }

  const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL
  const supabaseKey = process.env.SUPABASE_SERVICE_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !supabaseKey) {
    return res.status(500).json({ error: 'Database not configured' })
  }

  const supabase = createClient(supabaseUrl, supabaseKey)

  try {
    const { data, error } = await supabase
      .from('results')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Supabase error:', error)
      return res.status(500).json({ error: 'Database error' })
    }

    const submissions = (data || []).map(row => ({
      id:         row.id,
      email:      row.email || '—',
      answers:    row.answers,
      rates: {
        dayRate:      row.rate?.dayRate  || '—',
        projectRate:  row.rate?.project  || '—',
        retainerRate: row.rate?.retainer || '—',
      },
      created_at: row.created_at,
      paid:       row.paid || false,
    }))

    return res.status(200).json({ submissions })
  } catch (err) {
    console.error('Get submissions error:', err)
    return res.status(500).json({ error: err.message })
  }
}
