require('dotenv').config()
const nodemailer = require('nodemailer')
const { createClient } = require('@supabase/supabase-js')

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY)

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
})

/**
 * POST /api/appointment
 * Body: { name, email, phone, company, service, preferred_time, preferred_date, notes }
 */
async function handleAppointment(req, res) {
  const { name, email, phone, company, service, preferred_time, preferred_date, notes } = req.body

  if (!name || !email || !service || !preferred_time) {
    return res.status(400).json({ error: 'Name, email, service and preferred time are required.' })
  }

  // 1. Save to Supabase
  const { error: dbError } = await supabase
    .from('appointment_submissions')
    .insert([{ name, email, phone, company, service, preferred_time, preferred_date, notes }])

  if (dbError) {
    console.error('Supabase insert error:', dbError)
    return res.status(500).json({ error: 'Failed to save appointment. Please try again.' })
  }

  // 2. Send email to CEO
  const html = `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#f8f9fc;padding:32px;border-radius:12px;">
      <div style="background:#001a34;padding:24px;border-radius:10px 10px 0 0;text-align:center;">
        <h1 style="color:#1a73e8;margin:0;font-size:22px;">📅 New Appointment Request</h1>
        <p style="color:#9ca3af;margin:6px 0 0;font-size:13px;">Mandix Consultants Website</p>
      </div>
      <div style="background:#ffffff;padding:28px;border-radius:0 0 10px 10px;border:1px solid #e5e7eb;">
        <table style="width:100%;border-collapse:collapse;">
          <tr><td style="padding:10px 0;font-size:13px;color:#6b7280;width:160px;font-weight:600;">Full Name</td><td style="padding:10px 0;font-size:14px;color:#0d1b2e;font-weight:700;">${name}</td></tr>
          <tr style="background:#f8f9fc;"><td style="padding:10px 8px;font-size:13px;color:#6b7280;font-weight:600;">Email</td><td style="padding:10px 8px;font-size:14px;"><a href="mailto:${email}" style="color:#1a73e8;">${email}</a></td></tr>
          <tr><td style="padding:10px 0;font-size:13px;color:#6b7280;font-weight:600;">Phone</td><td style="padding:10px 0;font-size:14px;color:#0d1b2e;">${phone || '—'}</td></tr>
          <tr style="background:#f8f9fc;"><td style="padding:10px 8px;font-size:13px;color:#6b7280;font-weight:600;">Company</td><td style="padding:10px 8px;font-size:14px;color:#0d1b2e;">${company || '—'}</td></tr>
          <tr><td style="padding:10px 0;font-size:13px;color:#6b7280;font-weight:600;">Service Requested</td><td style="padding:10px 0;font-size:14px;color:#1a73e8;font-weight:700;">${service}</td></tr>
          <tr style="background:#f8f9fc;"><td style="padding:10px 8px;font-size:13px;color:#6b7280;font-weight:600;">Preferred Time</td><td style="padding:10px 8px;font-size:14px;color:#0d1b2e;font-weight:600;">${preferred_time}</td></tr>
          <tr><td style="padding:10px 0;font-size:13px;color:#6b7280;font-weight:600;">Preferred Date</td><td style="padding:10px 0;font-size:14px;color:#0d1b2e;">${preferred_date || 'Not specified'}</td></tr>
        </table>
        ${notes ? `
        <div style="margin-top:20px;background:#f0f4ff;border-left:4px solid #1a73e8;padding:14px 18px;border-radius:6px;">
          <p style="font-size:12px;color:#6b7280;margin:0 0 6px;font-weight:600;text-transform:uppercase;">Additional Notes</p>
          <p style="font-size:14px;color:#0d1b2e;margin:0;line-height:1.6;">${notes}</p>
        </div>` : ''}
        <div style="margin-top:20px;text-align:center;">
          <a href="mailto:${email}" style="display:inline-block;background:#1a73e8;color:#fff;padding:12px 28px;border-radius:8px;font-weight:700;font-size:14px;text-decoration:none;">Confirm Appointment with ${name}</a>
        </div>
        <p style="font-size:11px;color:#9ca3af;text-align:center;margin-top:20px;">Received at ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST</p>
      </div>
    </div>
  `

  try {
    await transporter.sendMail({
      from: `"Mandix Website" <${process.env.GMAIL_USER}>`,
      to: process.env.CEO_EMAIL,
      subject: `[Appointment] ${service} — ${name} at ${preferred_time}${preferred_date ? ` on ${preferred_date}` : ''}`,
      html,
    })
  } catch (mailErr) {
    console.error('Email send error:', mailErr)
  }

  return res.status(200).json({ success: true, message: 'Appointment booked! We will confirm with you within 24 hours.' })
}

const express = require('express')
const router = express.Router()
router.post('/', handleAppointment)
module.exports = router
