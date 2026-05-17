require('dotenv').config()
const { Resend } = require('resend')
const { createClient } = require('@supabase/supabase-js')

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY)
const resend = new Resend(process.env.RESEND_API_KEY)

/**
 * POST /api/contact
 * Body: { name, email, phone, company, service, subject, message }
 */
async function handleContact(req, res) {
  const { name, email, phone, company, service, subject, message } = req.body

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: 'Name, email, subject and message are required.' })
  }

  // 1. Save to Supabase
  const { error: dbError } = await supabase
    .from('contact_submissions')
    .insert([{ name, email, phone, company, service, subject, message }])

  if (dbError) {
    console.error('Supabase insert error:', dbError)
    return res.status(500).json({ error: 'Failed to save submission. Please try again.' })
  }

  // 2. Send email to CEO
  const html = `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#f8f9fc;padding:32px;border-radius:12px;">
      <div style="background:#001a34;padding:24px;border-radius:10px 10px 0 0;text-align:center;">
        <h1 style="color:#1a73e8;margin:0;font-size:22px;">📬 New Contact Form Submission</h1>
        <p style="color:#9ca3af;margin:6px 0 0;font-size:13px;">Mandix Consultants Website</p>
      </div>
      <div style="background:#ffffff;padding:28px;border-radius:0 0 10px 10px;border:1px solid #e5e7eb;">
        <table style="width:100%;border-collapse:collapse;">
          <tr><td style="padding:10px 0;font-size:13px;color:#6b7280;width:140px;font-weight:600;">Full Name</td><td style="padding:10px 0;font-size:14px;color:#0d1b2e;font-weight:700;">${name}</td></tr>
          <tr style="background:#f8f9fc;"><td style="padding:10px 8px;font-size:13px;color:#6b7280;font-weight:600;">Email</td><td style="padding:10px 8px;font-size:14px;color:#1a73e8;"><a href="mailto:${email}" style="color:#1a73e8;">${email}</a></td></tr>
          <tr><td style="padding:10px 0;font-size:13px;color:#6b7280;font-weight:600;">Phone</td><td style="padding:10px 0;font-size:14px;color:#0d1b2e;">${phone || '—'}</td></tr>
          <tr style="background:#f8f9fc;"><td style="padding:10px 8px;font-size:13px;color:#6b7280;font-weight:600;">Company</td><td style="padding:10px 8px;font-size:14px;color:#0d1b2e;">${company || '—'}</td></tr>
          <tr><td style="padding:10px 0;font-size:13px;color:#6b7280;font-weight:600;">Service</td><td style="padding:10px 0;font-size:14px;color:#0d1b2e;">${service || '—'}</td></tr>
          <tr style="background:#f8f9fc;"><td style="padding:10px 8px;font-size:13px;color:#6b7280;font-weight:600;">Subject</td><td style="padding:10px 8px;font-size:14px;color:#0d1b2e;font-weight:600;">${subject}</td></tr>
        </table>
        <div style="margin-top:20px;background:#f0f4ff;border-left:4px solid #1a73e8;padding:14px 18px;border-radius:6px;">
          <p style="font-size:12px;color:#6b7280;margin:0 0 6px;font-weight:600;text-transform:uppercase;">Message</p>
          <p style="font-size:14px;color:#0d1b2e;margin:0;line-height:1.6;">${message}</p>
        </div>
        <div style="margin-top:20px;text-align:center;">
          <a href="mailto:${email}" style="display:inline-block;background:#1a73e8;color:#fff;padding:12px 28px;border-radius:8px;font-weight:700;font-size:14px;text-decoration:none;">Reply to ${name}</a>
        </div>
        <p style="font-size:11px;color:#9ca3af;text-align:center;margin-top:20px;">Received at ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST</p>
      </div>
    </div>
  `

  // 2. Send email to CEO (Fire-and-forget: do not await so the frontend doesn't hang)
  // Because domain is not verified, we MUST send from onboarding@resend.dev
  resend.emails.send({
    from: `Mandix Website <onboarding@resend.dev>`,
    to: process.env.CEO_EMAIL,
    subject: `[Contact] ${subject} — from ${name}`,
    html,
  }).catch(mailErr => {
    console.error('Email send error:', mailErr)
  })

  return res.status(200).json({ success: true, message: 'Message received! We will get back to you within 24 hours.' })
}

const express = require('express')
const router = express.Router()
router.post('/', handleContact)
module.exports = router
