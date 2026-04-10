import { useState } from 'react'
import { CheckCircle2, ArrowRight, Loader2 } from 'lucide-react'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000'

function CalendarPicker({ selected, onSelect }: { selected: number | null; onSelect: (d: number) => void }) {
  const today = new Date()
  const [currentMonth, setCurrentMonth] = useState(today.getMonth())
  const [currentYear, setCurrentYear] = useState(today.getFullYear())

  const months = ['January','February','March','April','May','June','July','August','September','October','November','December']
  const dayNames = ['S','M','T','W','T','F','S']

  const firstDay = new Date(currentYear, currentMonth, 1).getDay()
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate()

  const cells: (number | null)[] = []
  for (let i = 0; i < firstDay; i++) cells.push(null)
  for (let d = 1; d <= daysInMonth; d++) cells.push(d)

  const prevMonth = () => {
    if (currentMonth === 0) { setCurrentMonth(11); setCurrentYear(y => y - 1) }
    else setCurrentMonth(m => m - 1)
  }
  const nextMonth = () => {
    if (currentMonth === 11) { setCurrentMonth(0); setCurrentYear(y => y + 1) }
    else setCurrentMonth(m => m + 1)
  }

  const isPast = (d: number) => {
    const cell = new Date(currentYear, currentMonth, d)
    const now = new Date(); now.setHours(0, 0, 0, 0)
    return cell < now
  }

  return (
    <div className="bg-[#f8f9fc] rounded-2xl border border-gray-100 p-5">
      <div className="flex items-center justify-between mb-4">
        <button type="button" onClick={prevMonth} className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-500 hover:bg-gray-200 transition-colors text-lg font-bold">‹</button>
        <span className="text-sm font-semibold text-[#0d1b2e]">{months[currentMonth]} {currentYear}</span>
        <button type="button" onClick={nextMonth} className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-500 hover:bg-gray-200 transition-colors text-lg font-bold">›</button>
      </div>
      <div className="grid grid-cols-7 mb-1">
        {dayNames.map((d, i) => (
          <span key={i} className="text-center text-[10px] font-bold text-gray-400 py-1">{d}</span>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-0.5">
        {cells.map((d, i) => (
          <button
            key={i}
            type="button"
            disabled={!d || isPast(d!)}
            onClick={() => d && !isPast(d) && onSelect(d)}
            className={`h-8 w-full text-xs font-medium rounded-lg transition-all duration-150 ${
              !d ? 'invisible' :
              d === selected ? 'bg-[#1a73e8] text-white shadow-md' :
              isPast(d!) ? 'text-gray-300 cursor-not-allowed' :
              'text-[#4a4a6a] hover:bg-[#e8f0fe] hover:text-[#1a73e8]'
            }`}
          >
            {d || ''}
          </button>
        ))}
      </div>
    </div>
  )
}

export default function Appointment() {
  const [form, setForm] = useState({
    name: '', email: '', phone: '', company: '',
    service: '', preferred_time: '', notes: '',
  })
  const [selectedDate, setSelectedDate] = useState<number | null>(null)
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
      const today = new Date()
      const preferred_date = selectedDate
        ? `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(selectedDate).padStart(2, '0')}`
        : ''
      const res = await fetch(`${API_URL}/api/appointment`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, preferred_date }),
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

  if (submitted) {
    return (
      <main className="pt-[68px]">
        <section className="py-24">
          <div className="max-w-xl mx-auto px-4 text-center">
            <div className="w-20 h-20 rounded-full bg-[#e8f0fe] flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 size={40} className="text-[#1a73e8]" />
            </div>
            <h2 className="text-3xl font-extrabold text-[#0d1b2e] mb-4">Appointment Booked!</h2>
            <p className="text-gray-500 mb-8">We'll confirm your appointment shortly via email. Our team will reach out within 24 hours.</p>
            <button
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#1a73e8] text-white font-semibold rounded-xl hover:bg-[#1557b0] transition-all"
              onClick={() => { setSubmitted(false); setForm({ name: '', email: '', phone: '', company: '', service: '', preferred_time: '', notes: '' }); setSelectedDate(null) }}
            >
              Book Another Appointment
            </button>
          </div>
        </section>
      </main>
    )
  }

  return (
    <main className="pt-[68px]">
      {/* ── HERO ── */}
      <section className="bg-gradient-to-br from-[#001a34] via-[#001a34] to-[#0d3362] py-16 text-center">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-bold uppercase tracking-widest text-[#1a73e8] mb-4">Get in Touch</p>
          <h1 className="text-4xl lg:text-5xl font-extrabold text-white mb-4">Book an Appointment</h1>
          <p className="text-gray-300 text-base">Schedule a consultation with our expert team to discuss your business needs</p>
        </div>
      </section>

      {/* ── FORM ── */}
      <section className="py-20 bg-[#f8f9fc]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            {/* Why choose us */}
            <div className="bg-[#1a73e8] rounded-2xl p-8 text-white">
              <h3 className="text-xl font-bold mb-6">Why Choose Us?</h3>
              <ul className="space-y-4 mb-8">
                {[
                  'Expert consultants with industry experience',
                  'Tailored solutions for your unique challenges',
                  'Proven track record of successful projects',
                  'Flexible scheduling to meet your needs',
                  'Comprehensive follow-up and implementation support',
                ].map(item => (
                  <li key={item} className="flex items-start gap-3 text-sm text-blue-100">
                    <CheckCircle2 size={16} className="text-blue-200 flex-shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="pt-6 border-t border-white/20 space-y-3">
                <p className="text-sm font-semibold text-white mb-3">What to Expect:</p>
                {['Initial 15-min call','Needs assessment','Tailored proposal','Onboarding & kickoff'].map((step, i) => (
                  <div key={step} className="flex items-center gap-3 text-sm text-blue-100">
                    <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-[10px] font-bold flex-shrink-0">{i+1}</span>
                    {step}
                  </div>
                ))}
              </div>
            </div>

            {/* Form panel */}
            <div className="lg:col-span-2 bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <h3 className="text-xl font-bold text-[#1a73e8] mb-8">Request Your Consultation</h3>
              {error && (
                <div className="mb-5 px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm flex items-center gap-2">
                  <span>⚠️</span> {error}
                </div>
              )}
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  {[
                    { label: 'Full Name *', name: 'name', type: 'text', placeholder: 'John Doe', required: true },
                    { label: 'Email Address *', name: 'email', type: 'email', placeholder: 'john@example.com', required: true },
                    { label: 'Phone Number *', name: 'phone', type: 'tel', placeholder: '+1 (555) 000-0000', required: true },
                    { label: 'Company Name', name: 'company', type: 'text', placeholder: 'Acme Corp', required: false },
                  ].map(f => (
                    <div key={f.name} className="flex flex-col gap-1.5">
                      <label htmlFor={`appt-${f.name}`} className="text-xs font-semibold text-[#0d1b2e]">{f.label}</label>
                      <input
                        id={`appt-${f.name}`}
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

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="appt-service" className="text-xs font-semibold text-[#0d1b2e]">Service Required *</label>
                    <select
                      id="appt-service"
                      name="service"
                      required
                      value={form.service}
                      onChange={handleChange}
                      className="px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm text-[#0d1b2e] outline-none focus:border-[#1a73e8] focus:ring-2 focus:ring-[#1a73e8]/10 transition-all bg-gray-50 appearance-none"
                    >
                      <option value="">Select a service</option>
                      <option>Auditing &amp; Assurance</option>
                      <option>Taxation Planning</option>
                      <option>Financial Advisory</option>
                      <option>Corporate Advisory</option>
                      <option>Bookkeeping &amp; Accounting</option>
                      <option>Business Formation</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="appt-time" className="text-xs font-semibold text-[#0d1b2e]">Preferred Time *</label>
                    <select
                      id="appt-time"
                      name="preferred_time"
                      required
                      value={form.preferred_time}
                      onChange={handleChange}
                      className="px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm text-[#0d1b2e] outline-none focus:border-[#1a73e8] focus:ring-2 focus:ring-[#1a73e8]/10 transition-all bg-gray-50 appearance-none"
                    >
                      <option value="">Select a time</option>
                      {['9:00 AM','10:00 AM','11:00 AM','12:00 PM','2:00 PM','3:00 PM','4:00 PM','5:00 PM'].map(t => (
                        <option key={t}>{t}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="mb-5">
                  <label htmlFor="appt-notes" className="text-xs font-semibold text-[#0d1b2e] block mb-1.5">Tell us about your needs</label>
                  <textarea
                    id="appt-notes"
                    name="notes"
                    rows={3}
                    placeholder="Describe your requirements..."
                    value={form.notes}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm text-[#0d1b2e] outline-none focus:border-[#1a73e8] focus:ring-2 focus:ring-[#1a73e8]/10 transition-all bg-gray-50 placeholder:text-gray-300 resize-none"
                  />
                </div>

                <div className="mb-6">
                  <p className="text-xs text-gray-400 mb-3 font-medium">Or pick a preferred date:</p>
                  <CalendarPicker selected={selectedDate} onSelect={setSelectedDate} />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex justify-center items-center gap-2 px-6 py-3.5 bg-[#1a73e8] text-white font-semibold rounded-xl hover:bg-[#1557b0] transition-all hover:-translate-y-0.5 shadow-md disabled:opacity-70 disabled:cursor-not-allowed disabled:translate-y-0"
                >
                  {loading ? <><Loader2 size={16} className="animate-spin" /> Booking...</> : <>Book Your Appointment <ArrowRight size={16} /></>}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}