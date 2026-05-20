import { useState } from 'react'
import { MapPin, Phone, Mail, Clock, CheckCircle2, ArrowRight, MessageSquare, Loader2 } from 'lucide-react'

const contactInfo = [
  {
    icon: <MapPin size={22} />,
    title: 'Visit Our Office',
    detail: 'Plot no 20, 3rd floor 3B, Green Park Avenue, Suchitra - Kompally, Hyderabad, Telangana - 500067',
    sub: 'We welcome walk-ins Mon–Sat',
    link: 'https://share.google/73WSJyh2PZ8EmY3o8',
  },
  {
    icon: <Phone size={22} />,
    title: 'Call Us',
    detail: '+91 90005 42422',
    sub: 'Mon–Sat, 9:30 AM – 6:30 PM',
    link: 'tel:+919000542422',
  },
  {
    icon: <Mail size={22} />,
    title: 'Email Us',
    detail: 'info@mandixconsultants.com',
    sub: 'We respond within 24 hours',
    link: 'mailto:info@mandixconsultants.com',
  },
  {
    icon: <Clock size={22} />,
    title: 'Business Hours',
    detail: 'Mon–Sat: 9:30 AM – 6:30 PM',
    sub: 'Closed on Sunday',
  },
]

const API_URL = import.meta.env.DEV ? 'http://localhost:4000' : ''

export default function Contact() {
  const [form, setForm] = useState({
    name: '', email: '', phone: '', company: '',
    service: '', subject: '', message: '',
  })
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await fetch(`${API_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Something went wrong.')
      setSubmitted(true)
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="pt-[68px]">
      {/* ── HERO ── */}
      <section className="bg-gradient-to-br from-[#001a34] via-[#001a34] to-[#0d3362] py-20 text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-bold uppercase tracking-widest text-[#1a73e8] mb-4">We're Here for You</p>
          <h1 className="text-4xl lg:text-5xl font-extrabold text-white mb-6">
            Get in <span className="text-[#1a73e8]">Touch</span>
          </h1>
          <p className="text-gray-300 text-base leading-relaxed max-w-xl mx-auto">
            Whether you have a question about our services, need expert advice, or want to discuss how we can help your business — we're here to listen.
          </p>
        </div>
      </section>

      {/* ── CONTACT INFO CARDS ── */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((item) => (
              <div key={item.title} className="bg-[#f8f9fc] rounded-2xl p-6 border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group">
                <div className="w-12 h-12 rounded-xl bg-[#e8f0fe] flex items-center justify-center text-[#1a73e8] mb-4 group-hover:bg-[#1a73e8] group-hover:text-white transition-colors duration-300">
                  {item.icon}
                </div>
                <h3 className="text-sm font-bold text-[#0d1b2e] mb-1">{item.title}</h3>
                {item.link ? (
                  <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-sm text-[#1a73e8] font-medium mb-1 hover:underline block">
                    {item.detail}
                  </a>
                ) : (
                  <p className="text-sm text-[#1a73e8] font-medium mb-1">{item.detail}</p>
                )}
                <p className="text-xs text-gray-400">{item.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FORM + WHY ── */}
      <section className="py-16 bg-[#f8f9fc]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
            {/* Why reach out */}
            <div className="bg-[#001a34] rounded-2xl p-8 text-white">
              <h2 className="text-xl font-bold mb-4">Why Reach Out?</h2>
              <p className="text-gray-300 text-sm leading-relaxed mb-6">
                Our team is committed to providing timely, expert guidance tailored to your unique business needs.
              </p>
              <ul className="space-y-4 mb-8">
                {[
                  'Expert team ready to assist immediately',
                  'Prompt responses within 24 hours',
                  'Customized solutions for your business',
                  'Continuous support throughout our partnership',
                  'Confidential and professional service always',
                ].map(item => (
                  <li key={item} className="flex items-start gap-3 text-sm text-gray-300">
                    <CheckCircle2 size={15} className="text-[#1a73e8] flex-shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="pt-6 border-t border-white/10">
                <div className="flex items-center gap-3 mb-4">
                  <MessageSquare size={18} className="text-[#1a73e8]" />
                  <span className="text-sm font-semibold text-white">Quick Connect</span>
                </div>
                <p className="text-xs text-gray-400 mb-4">Prefer to chat? Reach us directly on WhatsApp for faster responses.</p>
                <a
                  href="https://wa.me/+919000542422 "
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#25d366] text-white font-semibold rounded-xl text-sm hover:bg-[#1fba59] transition-colors"
                >
                  <svg viewBox="0 0 32 32" width="16" height="16" fill="white"><path d="M16 2C8.268 2 2 8.268 2 16c0 2.432.65 4.71 1.784 6.686L2 30l7.49-1.764A13.94 13.94 0 0 0 16 30c7.732 0 14-6.268 14-14S23.732 2 16 2zm6.14 19.8c-.337-.169-1.99-.982-2.298-1.094-.308-.112-.533-.169-.758.168-.224.337-.869 1.094-1.065 1.318-.196.224-.392.252-.729.084-.337-.168-1.422-.524-2.708-1.672-.999-.892-1.675-1.993-1.87-2.33-.196-.337-.02-.52.147-.688.152-.152.337-.392.506-.588.168-.196.224-.337.336-.561.112-.224.056-.421-.028-.589-.084-.168-.758-1.826-1.038-2.5-.274-.657-.552-.568-.758-.578l-.645-.011c-.224 0-.589.084-.897.42-.308.337-1.177 1.15-1.177 2.804 0 1.653 1.205 3.25 1.374 3.474.168.224 2.37 3.617 5.74 5.073.803.347 1.428.554 1.916.709.804.257 1.536.22 2.114.134.645-.095 1.99-.814 2.27-1.6.28-.785.28-1.46.196-1.6-.084-.141-.308-.225-.645-.393z"/></svg>
                  WhatsApp Us
                </a>
              </div>
            </div>

            {/* Contact form */}
            <div className="lg:col-span-2 bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              {submitted ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-[#e8f0fe] rounded-full flex items-center justify-center mx-auto mb-5">
                    <CheckCircle2 size={32} className="text-[#1a73e8]" />
                  </div>
                  <h3 className="text-xl font-bold text-[#0d1b2e] mb-2">Message Sent!</h3>
                  <p className="text-gray-500 text-sm mb-6">Thank you for reaching out. Our team will get back to you within 24 hours.</p>
                  <button
                    onClick={() => { setSubmitted(false); setForm({ name: '', email: '', phone: '', company: '', service: '', subject: '', message: '' }) }}
                    className="inline-flex items-center gap-2 px-6 py-2.5 border-2 border-[#1a73e8] text-[#1a73e8] font-semibold rounded-xl hover:bg-[#1a73e8] hover:text-white transition-all text-sm"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <>
                  <h2 className="text-xl font-bold text-[#1a73e8] mb-6">Send Us a Message</h2>
                  {error && (
                    <div className="mb-4 px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm flex items-center gap-2">
                      <span>⚠️</span> {error}
                    </div>
                  )}
                  <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                      {[
                        { label: 'Full Name *', name: 'name', type: 'text', placeholder: 'John Doe', required: true },
                        { label: 'Email Address *', name: 'email', type: 'email', placeholder: 'john@company.com', required: true },
                        { label: 'Phone Number', name: 'phone', type: 'tel', placeholder: '+91 90005 42422', required: false },
                        { label: 'Company Name', name: 'company', type: 'text', placeholder: 'Your Company', required: false },
                      ].map(f => (
                        <div key={f.name} className="flex flex-col gap-1.5">
                          <label htmlFor={`contact-${f.name}`} className="text-xs font-semibold text-[#0d1b2e]">{f.label}</label>
                          <input
                            id={`contact-${f.name}`}
                            name={f.name}
                            type={f.type}
                            placeholder={f.placeholder}
                            required={f.required}
                            value={form[f.name as keyof typeof form]}
                            onChange={handleChange}
                            className="px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm text-[#0d1b2e] outline-none focus:border-[#1a73e8] focus:ring-2 focus:ring-[#1a73e8]/10 transition-all bg-gray-50 placeholder:text-gray-300"
                          />
                        </div>
                      ))}
                    </div>
                    <div className="mb-4">
                      <label htmlFor="contact-service" className="text-xs font-semibold text-[#0d1b2e] block mb-1.5">Service of Interest</label>
                      <select
                        id="contact-service"
                        name="service"
                        value={form.service}
                        onChange={handleChange}
                        className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm text-[#0d1b2e] outline-none focus:border-[#1a73e8] focus:ring-2 focus:ring-[#1a73e8]/10 transition-all bg-gray-50 appearance-none"
                      >
                        <option value="">Select a service (optional)</option>
                        <option>Auditing &amp; Assurance</option>
                        <option>Taxation Planning</option>
                        <option>Financial Advisory</option>
                        <option>Corporate Advisory</option>
                        <option>Bookkeeping &amp; Accounting</option>
                        <option>Business Formation</option>
                        <option>Other / General Enquiry</option>
                      </select>
                    </div>
                    <div className="mb-4">
                      <label htmlFor="contact-subject" className="text-xs font-semibold text-[#0d1b2e] block mb-1.5">Subject *</label>
                      <input
                        id="contact-subject"
                        name="subject"
                        type="text"
                        placeholder="What is your message about?"
                        required
                        value={form.subject}
                        onChange={handleChange}
                        className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm text-[#0d1b2e] outline-none focus:border-[#1a73e8] focus:ring-2 focus:ring-[#1a73e8]/10 transition-all bg-gray-50 placeholder:text-gray-300"
                      />
                    </div>
                    <div className="mb-6">
                      <label htmlFor="contact-message" className="text-xs font-semibold text-[#0d1b2e] block mb-1.5">Your Message *</label>
                      <textarea
                        id="contact-message"
                        name="message"
                        rows={5}
                        required
                        placeholder="Please describe how we can assist you..."
                        value={form.message}
                        onChange={handleChange}
                        className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm text-[#0d1b2e] outline-none focus:border-[#1a73e8] focus:ring-2 focus:ring-[#1a73e8]/10 transition-all bg-gray-50 placeholder:text-gray-300 resize-none"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full flex justify-center items-center gap-2 px-6 py-3.5 bg-[#1a73e8] text-white font-semibold rounded-xl hover:bg-[#1557b0] transition-all hover:-translate-y-0.5 shadow-md disabled:opacity-70 disabled:cursor-not-allowed disabled:translate-y-0"
                    >
                      {loading ? <><Loader2 size={16} className="animate-spin" /> Sending...</> : <>Send Message <ArrowRight size={16} /></>}
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── MAP ── */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          <div className="rounded-2xl overflow-hidden shadow-sm border border-gray-100 h-[400px]">
            <iframe
              title="Mandix Office Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4894.7910143409035!2d78.47380476667672!3d17.505314271239648!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89d5b110009bea61%3A0xb667230db605f695!2sMandix%20Consultants!5e0!3m2!1sen!2sin!4v1779079659720!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full"
            />
          </div>
        </div>
      </section>
    </main>
  )
}