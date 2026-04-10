require('dotenv').config()
const express = require('express')
const cors = require('cors')
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
  methods: ['POST', 'OPTIONS'],
  credentials: true,
}))

app.use(express.json())

app.get('/health', (_req, res) => res.json({ status: 'ok' }))
app.use('/api/contact', contactRoute)
app.use('/api/appointment', appointmentRoute)

app.listen(PORT, () => {
  console.log(`Mandix backend running on http://localhost:${PORT}`)
})
