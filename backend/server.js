require('dotenv').config()
const express = require('express')
const cors = require('cors')
const { createClient } = require('@supabase/supabase-js')
const contactRoute = require('./routes/contact')
const appointmentRoute = require('./routes/appointment')

const app = express()
const PORT = process.env.PORT || 4000

const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:4173',
  process.env.FRONTEND_URL,
].filter(Boolean)

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.some(o => origin.startsWith(o))) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  methods: ['GET', 'POST', 'OPTIONS'],
  credentials: true,
}))

app.use(express.json())

// ── Health check ─────────────────────────────────────────────────────────────
app.get('/health', (_req, res) => res.json({ status: 'ok', ts: new Date().toISOString() }))

// ── Routes ───────────────────────────────────────────────────────────────────
app.use('/api/contact', contactRoute)
app.use('/api/appointment', appointmentRoute)

// ── Supabase keepalive ────────────────────────────────────────────────────────
// Supabase free-tier projects pause after 7 days of inactivity.
// We run a lightweight SELECT ping every 4 days so the project stays awake.
// This works as long as the backend process itself is kept alive by the host
// (Render, Railway, Fly.io, etc. — all keep Node processes running 24/7).

const PING_INTERVAL_MS = 4 * 24 * 60 * 60 * 1000 // 4 days

async function pingSupabase() {
  try {
    const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY)
    // A lightweight query: select 1 row from either table (limit 1 never loads data)
    const { error } = await supabase
      .from('appointment_submissions')
      .select('id')
      .limit(1)

    if (error) {
      console.warn('[keepalive] Supabase ping returned an error:', error.message)
    } else {
      console.log('[keepalive] Supabase ping OK —', new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }), 'IST')
    }
  } catch (err) {
    console.error('[keepalive] Supabase ping failed:', err?.message || err)
  }
}

// Run once shortly after boot, then every 4 days
setTimeout(pingSupabase, 10_000) // 10 s after startup
setInterval(pingSupabase, PING_INTERVAL_MS)

// ── Start ─────────────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`Mandix backend running on http://localhost:${PORT}`)
  console.log(`[keepalive] Supabase will be pinged every 4 days to prevent auto-pause`)
})
