import { Link } from 'react-router-dom'
import { useState } from 'react'
import {
  ArrowRight, TrendingUp, FileText, BarChart2, Briefcase,
  BookOpen, Building2, CheckCircle2, Star, ChevronRight,
  Shield, Award, Users, Phone, Mail, MapPin, Clock
} from 'lucide-react'
import { fetchPosts } from '../lib/api'
import type { NormalizedPost } from '../lib/api'

const services = [
  {
    icon: <Shield size={22} />,
    title: 'Audit & Assurance',
    desc: 'Rigorous, independent audits that go beyond compliance — building stakeholder confidence and driving smarter business decisions.',
  },
  {
    icon: <Building2 size={22} />,
    title: 'Corporate Tax Services',
    desc: "Taxes are inevitable — but overpaying isn't. Strategic tax planning and proactive advisory that keeps corporates compliant, efficient, and protected from unnecessary liability.",
  },
  {
    icon: <Users size={22} />,
    title: 'Personal Tax Services',
    desc: 'From ITR filing to tax planning — precision-driven personal tax solutions for salaried professionals, self-employed individuals, and investors.',
  },
  {
    icon: <BarChart2 size={22} />,
    title: 'Indirect Tax Services',
    desc: 'End-to-end GST management — from registration and return filing to assessments and litigation — so compliance never slows you down.',
  },
  {
    icon: <Briefcase size={22} />,
    title: 'Outsourcing services',
    desc: 'Hand over your accounting, payroll, and compliance operations to us — and focus entirely on growing your business.',
  },
  {
    icon: <Award size={22} />,
    title: 'Registration and Licensing',
    desc: 'Company registrations, licenses, and regulatory approvals — handled seamlessly so you start right, from day one.',
  },
]

const industries = [
  { icon: <Building2 size={24} />, label: 'Real Estate' },
  { icon: <TrendingUp size={24} />, label: 'FinTech' },
  { icon: <Users size={24} />, label: 'Hospitality & Tourism' },
  { icon: <Shield size={24} />, label: 'Agriculture' },
  { icon: <Award size={24} />, label: 'Healthcare' },
  { icon: <BookOpen size={24} />, label: 'Retail & E-commerce' },
  { icon: <Building2 size={24} />, label: 'Manufacturing' },
  { icon: <TrendingUp size={24} />, label: 'Startups & Tech' },
  { icon: <FileText size={24} />, label: 'Education' },
  { icon: <BarChart2 size={24} />, label: 'Energy & Utilities' },
  { icon: <Building2 size={24} />, label: 'Infrastructure' },
  { icon: <Shield size={24} />, label: 'Nonprofit & NGOs' },
]

const testimonials = [
  {
    name: 'Mohammed Sohail Ahmed',
    initials: 'MS',
    rating: 5,
    text: 'Best chartered accountants in the city. Professionalism at its best.',
    ago: '3 months ago',
  },
  {
    name: 'Agha Hyder Ali',
    initials: 'AH',
    rating: 5,
    text: 'It is my great pleasure to share my experience with this firm. They are truly dedicated and professional in every way.',
    ago: '3 months ago',
  },
  {
    name: 'Mohammed Irfan',
    initials: 'MI',
    rating: 5,
    text: 'Excellent service. Highly recommended. Fast, reliable, and thorough with every task.',
    ago: '4 months ago',
  },
  {
    name: 'Syed Hyder Ali Pasha',
    initials: 'SH',
    rating: 5,
    text: 'Efficient and Reliable. Gave required details in the morning and shared the certificates within few hours. Highly recommended.',
    ago: '4 months ago',
  },
]


function CalendarWidget({ selected, onSelect }: { selected: number | null, onSelect: (d: number) => void }) {
  const today = new Date()
  const [currentMonth, setCurrentMonth] = useState(today.getMonth())
  const [currentYear, setCurrentYear] = useState(today.getFullYear())

  const months = ['January','February','March','April','May','June','July','August','September','October','November','December']
  const days = ['S','M','T','W','T','F','S']

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

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-lg p-6">
      <div className="flex items-center justify-between mb-5">
        <button onClick={prevMonth} className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100 transition-colors text-lg font-bold">‹</button>
        <span className="text-sm font-semibold text-[#0d1b2e]">{months[currentMonth]} {currentYear}</span>
        <button onClick={nextMonth} className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100 transition-colors text-lg font-bold">›</button>
      </div>
      <div className="grid grid-cols-7 mb-2">
        {days.map((d, i) => (
          <span key={i} className="text-center text-[11px] font-semibold text-gray-400 py-1">{d}</span>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-0.5">
        {cells.map((d, i) => (
          <button
            key={i}
            disabled={!d}
            onClick={() => d && onSelect(d)}
            className={`h-8 w-full text-xs font-medium rounded-lg transition-all duration-150 ${
              !d ? 'invisible' :
              d === selected ? 'bg-[#1a73e8] text-white shadow-md' :
              d < today.getDate() && currentMonth === today.getMonth() && currentYear === today.getFullYear()
                ? 'text-gray-300 cursor-not-allowed' :
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

// Load latest 3 posts synchronously from local markdown files
const latestPosts: NormalizedPost[] = fetchPosts().slice(0, 3)

export default function Home() {
  const [selectedDay, setSelectedDay] = useState<number | null>(null)

  return (
    <main className="pt-[68px]">
      {/* ── HERO ── */}
      <section className="relative min-h-[92vh] flex items-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1600&q=80"
            alt="City skyline"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#001a34]/92 via-[#001a34]/75 to-[#001a34]/40" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="max-w-2xl">

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-[1.1] mb-6">
              Where Strategy Meets Compliance.<br />
              <span className="text-[#1a73e8]">That's Crafting Finance.</span>
            </h1>
            <p className="text-lg text-gray-300 mb-3 font-medium italic">We Measure Our Success by Yours</p>
            <p className="text-base text-gray-400 mb-10 leading-relaxed max-w-lg">
              We don't just manage your finances — we architect them. With expertise across tax, audit, and advisory, Mandix Consultants is your partner in every financial chapter.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/appointment"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#1a73e8] text-white font-semibold rounded-xl hover:bg-[#1557b0] transition-all duration-200 hover:-translate-y-0.5 shadow-lg hover:shadow-xl"
              >
                Get Started <ArrowRight size={16} />
              </Link>
              <Link
                to="/services"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-white/10 text-white font-semibold rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-200 hover:-translate-y-0.5 backdrop-blur-sm"
              >
                Our Services <ChevronRight size={16} />
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* ── ABOUT SNIPPET ── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-[#1a73e8] mb-3">About Our Company</p>
              <h2 className="text-3xl lg:text-4xl font-extrabold text-[#0d1b2e] leading-tight mb-6">
                India-rooted. Globally ambitious.
              </h2>
              <p className="text-gray-500 leading-relaxed mb-6">
                At Mandix Consultants, we craft personalised financial solutions built on integrity, innovation, and a relentless focus on your success. From navigating complex tax structures to delivering rigorous audits and strategic financial advisory — we bring clarity to every challenge your business faces. Our team of seasoned professionals works closely with Startups, Corporates, HNIs, and NRIs to deliver solutions that are not just compliant, but truly transformative.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
                {[['100Cr+','Clients Revenue Managed'],['8+','Years of Combined Exp.'],['500+','Clients Served'],['50+','Businesses Transformed']].map(([n,l]) => (
                  <div key={l} className="text-center p-4 bg-[#f8f9fc] rounded-xl">
                    <span className="block text-2xl font-extrabold text-[#1a73e8]">{n}</span>
                    <span className="text-xs text-gray-500 mt-1 leading-tight block">{l}</span>
                  </div>
                ))}
              </div>
              <Link
                to="/about"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#1a73e8] text-white font-semibold rounded-xl hover:bg-[#1557b0] transition-all hover:-translate-y-0.5 shadow-md"
              >
                Learn More About Us <ArrowRight size={16} />
              </Link>
            </div>

            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=700&q=80"
                alt="Team at work"
                className="rounded-2xl shadow-2xl w-full object-cover aspect-[4/3]"
              />

            </div>
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section className="py-20 bg-[#f8f9fc]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <p className="text-xs font-bold uppercase tracking-widest text-[#1a73e8] mb-3">Our Expertise</p>
            <h2 className="text-3xl lg:text-4xl font-extrabold text-[#0d1b2e] mb-4">Every Financial Challenge. One Trusted Firm.</h2>
            <p className="text-gray-500 text-base">
              "From corporate tax strategy to audit assurance, GST compliance to CFO advisory — Mandix brings specialist expertise across every dimension of your financial world."
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-7 border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-xl bg-[#e8f0fe] flex items-center justify-center text-[#1a73e8] mb-5 group-hover:bg-[#1a73e8] group-hover:text-white transition-colors duration-300">
                  {s.icon}
                </div>
                <h3 className="text-base font-bold text-[#0d1b2e] mb-3">{s.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed mb-5">{s.desc}</p>
                <Link
                  to="/services"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#1a73e8] hover:gap-2.5 transition-all"
                >
                  Learn More <ChevronRight size={14} />
                </Link>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link
              to="/services"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#1a73e8] text-white font-semibold rounded-xl hover:bg-[#1557b0] transition-all hover:-translate-y-0.5 shadow-md"
            >
              View All Services <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── CONSULTATION / CALENDAR ── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-14">
            <p className="text-xs font-bold uppercase tracking-widest text-[#1a73e8] mb-3">Book a Consultation</p>
            <h2 className="text-3xl lg:text-4xl font-extrabold text-[#0d1b2e] mb-4">Reserve Your Strategy Session</h2>
            <p className="text-gray-500">Book an appointment to start crafting your financial journey</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start max-w-4xl mx-auto">
            <div className="bg-[#1a73e8] rounded-2xl p-8 text-white">
              <h3 className="text-xl font-bold mb-4">Expert Consultation</h3>
              <p className="text-blue-100 text-sm leading-relaxed mb-6">
                We listen before we advise. Because understanding your world is how we craft the right solution for it.
              </p>
              <ul className="space-y-4 mb-8">
                {['15 minutes. Completely free.','Meet us your way — video or in person','Book a slot that fits your schedule','We respond within 24 hours'].map(item => (
                  <li key={item} className="flex items-center gap-3 text-sm">
                    <CheckCircle2 size={16} className="text-blue-200 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                to="/appointment"
                state={{ selectedDay }}
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-[#1a73e8] font-bold rounded-xl hover:bg-blue-50 transition-colors"
              >
                Reserve My Session <ArrowRight size={16} />
              </Link>
            </div>
            <CalendarWidget selected={selectedDay} onSelect={setSelectedDay} />
          </div>
        </div>
      </section>

      {/* ── INDUSTRIES ── */}
      <section className="py-20 bg-[#001a34]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <p className="text-xs font-bold uppercase tracking-widest text-[#1a73e8] mb-3">Sector Expertise</p>
            <h2 className="text-3xl lg:text-4xl font-extrabold text-white mb-4">Industries We Understand. Deeply.</h2>
            <p className="text-gray-400">
              Every industry carries its own financial complexities, regulatory demands, and growth challenges. At Mandix, we don't just serve industries — we speak their language.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {industries.map((ind, i) => (
              <div
                key={i}
                className="bg-white/5 border border-white/10 rounded-xl p-5 flex flex-col items-center gap-3 hover:bg-[#1a73e8]/20 hover:border-[#1a73e8]/40 transition-all duration-200 cursor-default group"
              >
                <div className="text-gray-400 group-hover:text-[#1a73e8] transition-colors">{ind.icon}</div>
                <span className="text-xs text-gray-400 font-medium text-center leading-tight group-hover:text-white transition-colors">{ind.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="py-20 bg-[#f8f9fc]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-14">
            <p className="text-xs font-bold uppercase tracking-widest text-[#1a73e8] mb-3">Client Reviews</p>
            <h2 className="text-3xl lg:text-4xl font-extrabold text-[#0d1b2e] mb-4">What Clients Say</h2>
            <p className="text-gray-500">Read testimonials from our satisfied clients across various industries</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-[#1a73e8] flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                    {t.initials}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#0d1b2e] leading-tight">{t.name}</p>
                    <div className="flex gap-0.5 mt-1">
                      {Array(t.rating).fill(0).map((_, j) => (
                        <Star key={j} size={11} fill="#f59e0b" color="#f59e0b" />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-sm text-gray-500 leading-relaxed mb-3 italic">"{t.text}"</p>
                <span className="text-xs text-gray-400">{t.ago}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BLOG PREVIEW ── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-14">
            <p className="text-xs font-bold uppercase tracking-widest text-[#1a73e8] mb-3">Latest Insights</p>
            <h2 className="text-3xl lg:text-4xl font-extrabold text-[#0d1b2e]">From Our Blog</h2>
          </div>
          {latestPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {latestPosts.map((post) => (
                <div key={post.slug} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group flex flex-col">
                  <div className="overflow-hidden h-48 flex-shrink-0">
                    <img
                      src={post.img}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <div className="mb-auto">
                      <span className="inline-flex px-2.5 py-1 rounded-full text-[11px] font-bold bg-[#e8f0fe] text-[#1a73e8] uppercase tracking-wider mb-3">
                        {post.category}
                      </span>
                      <h3 className="text-base font-bold text-[#0d1b2e] mb-2 leading-snug line-clamp-2">{post.title}</h3>
                      <p className="text-sm text-gray-500 leading-relaxed mb-4 line-clamp-3">{post.excerpt}</p>
                    </div>
                    <Link
                      to={`/blog/${post.slug}`}
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#1a73e8] hover:gap-2.5 transition-all mt-4"
                    >
                      Read More <ChevronRight size={14} />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">No blog posts available at the moment.</p>
            </div>
          )}
        </div>
      </section>

      {/* ── CONTACT HOME ── */}
      <section className="py-20 bg-[#f8f9fc]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-14">
            <p className="text-xs font-bold uppercase tracking-widest text-[#1a73e8] mb-3">Let's Connect</p>
            <h2 className="text-3xl lg:text-4xl font-extrabold text-[#0d1b2e] mb-4">Your Next Financial Move Starts With a Conversation.</h2>
            <p className="text-gray-500">
              Whether you have a specific challenge in mind or simply want to explore what Mandix can do for your business — we're ready to listen, advise, and act.{' '}
              <Link to="/contact" className="text-[#1a73e8] underline">Fill out the form</Link> or reach out directly.
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Blue panel */}
            <div className="bg-[#1a73e8] rounded-2xl p-8 text-white">
              
              <ul className="space-y-4 mb-8">
                {[
                  'Certified specialists across every practice area',
                  'Response within 24 business hours — always',
                  'Solutions built around your goals, never templates',
                  'A long-term partner, not a one-time advisor',
                ].map(item => (
                  <li key={item} className="flex items-start gap-3 text-sm text-blue-100">
                    <CheckCircle2 size={16} className="text-blue-200 flex-shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="pt-6 border-t border-white/20 space-y-3">
                {[
                  { icon: <Phone size={14} />, text: '+91 90005 42422', link: 'tel:+919000542422' },
                  { icon: <Mail size={14} />, text: 'info@mandixconsultants.com', link: 'mailto:info@mandixconsultants.com' },
                  { icon: <MapPin size={14} />, text: 'Plot no 20, 3rd floor 3B, Green Park Avenue, Suchitra - Kompally, Hyderabad, Telangana - 500067', link: 'https://share.google/73WSJyh2PZ8EmY3o8' },
                  { icon: <Clock size={14} />, text: 'Mon-Sat: 9:30 AM - 6:30 PM' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 text-sm text-blue-100">
                    <span className="text-blue-200">{item.icon}</span>
                    {item.link ? (
                      <a href={item.link} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                        {item.text}
                      </a>
                    ) : (
                      <span>{item.text}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-2 bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <h3 className="text-lg font-bold text-[#1a73e8] mb-6">Send Us a Message</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                {[
                  { label: 'Full Name *', placeholder: 'John Doe', type: 'text' },
                  { label: 'Email Address *', placeholder: 'john@example.com', type: 'email' },
                  { label: 'Phone Number *', placeholder: '+91 90005 42422', type: 'tel' },
                ].map(field => (
                  <div key={field.label} className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-[#0d1b2e]">{field.label}</label>
                    <input
                      type={field.type}
                      placeholder={field.placeholder}
                      className="px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm text-[#0d1b2e] outline-none focus:border-[#1a73e8] focus:ring-2 focus:ring-[#1a73e8]/10 transition-all bg-gray-50 placeholder:text-gray-300"
                    />
                  </div>
                ))}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-[#0d1b2e]">Subject *</label>
                  <select className="px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm text-[#0d1b2e] outline-none focus:border-[#1a73e8] focus:ring-2 focus:ring-[#1a73e8]/10 transition-all bg-gray-50 appearance-none">
                    <option>Select a subject</option>
                    <option>Audit and Assurance</option>
                    <option>Tax Services</option>
                    <option>Corporate Finance</option>
                    <option>Outsourcing Services</option>
                    <option>Other / General Enquiry</option>
                  </select>
                </div>
              </div>
              <div className="flex flex-col gap-1.5 mb-5">
                <label className="text-xs font-semibold text-[#0d1b2e]">Your Message *</label>
                <textarea
                  rows={4}
                  placeholder="Please describe how we can assist you..."
                  className="px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm text-[#0d1b2e] outline-none focus:border-[#1a73e8] focus:ring-2 focus:ring-[#1a73e8]/10 transition-all bg-gray-50 placeholder:text-gray-300 resize-none"
                />
              </div>
              <button className="w-full flex justify-center items-center gap-2 px-6 py-3.5 bg-[#1a73e8] text-white font-semibold rounded-xl hover:bg-[#1557b0] transition-all hover:-translate-y-0.5 shadow-md">
                Send Message <ArrowRight size={16} />
              </button>
            </div>
          </div>
          <div className="mt-12 rounded-2xl overflow-hidden shadow-sm border border-gray-100 h-[400px]">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4894.7910143409035!2d78.47380476667672!3d17.505314271239648!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89d5b110009bea61%3A0xb667230db605f695!2sMandix%20Consultants!5e0!3m2!1sen!2sin!4v1779079659720!5m2!1sen!2sin" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen={true} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full"
            ></iframe>
          </div>
        </div>
      </section>
    </main>
  )
}