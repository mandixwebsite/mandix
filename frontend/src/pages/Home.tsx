import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import {
  ArrowRight, TrendingUp, FileText, BarChart2, Briefcase,
  BookOpen, Building2, CheckCircle2, Star, ChevronRight,
  Shield, Award, Users, Phone, Mail, MapPin, Clock, Loader2
} from 'lucide-react'
import { fetchPosts } from '../lib/api'
import type { NormalizedPost } from '../lib/api'

const services = [
  {
    icon: <FileText size={22} />,
    title: 'Statutory Audit',
    desc: 'Rigorous financial statement and compliance audits to enhance transparency and stakeholder confidence.',
  },
  {
    icon: <BarChart2 size={22} />,
    title: 'Internal Audit',
    desc: 'Risk-based internal audits, operational audits, and IT audits tailored to streamline your processes.',
  },
  {
    icon: <TrendingUp size={22} />,
    title: 'Corporate Tax Services',
    desc: 'Expert tax compliance, reporting, and planning strategies designed to optimize your regulatory tax footprint.',
  },
  {
    icon: <Building2 size={22} />,
    title: 'Indirect Tax Services',
    desc: 'Comprehensive GST compliance, advisory, and transaction tax strategies tailored to your industry.',
  },
  {
    icon: <Briefcase size={22} />,
    title: 'Corporate Finance',
    desc: 'Specialized corporate finance solutions including detailed valuation services and robust transaction support.',
  },
  {
    icon: <BookOpen size={22} />,
    title: 'Outsourcing Services',
    desc: 'End-to-end outsourcing solutions for payroll processing, accounting, bookkeeping, and managed finance.',
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


function CalendarWidget() {
  const today = new Date()
  const [currentMonth, setCurrentMonth] = useState(today.getMonth())
  const [currentYear, setCurrentYear] = useState(today.getFullYear())
  const [selected, setSelected] = useState<number | null>(null)

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
            onClick={() => d && setSelected(d)}
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

export default function Home() {
  const [latestPosts, setLatestPosts] = useState<NormalizedPost[]>([])
  const [postsLoading, setPostsLoading] = useState(true)

  useEffect(() => {
    async function loadLatestPosts() {
      try {
        const data = await fetchPosts()
        setLatestPosts(data.slice(0, 3))
      } catch (err) {
        console.error('Failed to load posts', err)
      } finally {
        setPostsLoading(false)
      }
    }
    loadLatestPosts()
  }, [])

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
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#1a73e8]/20 border border-[#1a73e8]/30 text-[#7ab8ff] text-xs font-semibold tracking-wider uppercase mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-[#1a73e8] animate-pulse" />
              Trusted Financial Advisory
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-[1.1] mb-6">
              Expert Accountancy<br />
              <span className="text-[#1a73e8]">& Business Advisory</span><br />
              Services
            </h1>
            <p className="text-lg text-gray-300 mb-3 font-medium italic">Your Success Matters</p>
            <p className="text-base text-gray-400 mb-10 leading-relaxed max-w-lg">
              We are dedicated to helping you achieve your financial goals with our comprehensive, tailored professional services.
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

            {/* Trust stats */}
            <div className="mt-14 flex flex-wrap gap-8">
              {[['15+','Years Exp.'],['500+','Clients'],['95%','Retention'],['50+','Experts']].map(([n,l]) => (
                <div key={l} className="text-center">
                  <div className="text-2xl font-extrabold text-white">{n}</div>
                  <div className="text-xs text-gray-400 mt-0.5">{l}</div>
                </div>
              ))}
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
                Your Trusted Partner for Audit, Taxation & Advisory
              </h2>
              <p className="text-gray-500 leading-relaxed mb-6">
                We provide businesses with practical, actionable strategies that drive real results. Our team of certified professionals brings decades of combined experience to help you navigate financial complexities, ensure regulatory compliance, and achieve sustainable growth.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
                {[['15+','Years Experience'],['500+','Clients Served'],['95%','Client Retention'],['50+','Team Members']].map(([n,l]) => (
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
              <div className="absolute -bottom-5 -left-5 bg-white rounded-2xl shadow-xl p-4 flex items-center gap-3 border border-gray-100">
                <div className="w-10 h-10 rounded-xl bg-[#e8f0fe] flex items-center justify-center text-[#1a73e8]">
                  <Shield size={18} />
                </div>
                <div>
                  <p className="text-[11px] font-bold text-[#0d1b2e]">Certified Excellence</p>
                  <p className="text-[10px] text-gray-400">ISO 9001:2015 Certified</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section className="py-20 bg-[#f8f9fc]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <p className="text-xs font-bold uppercase tracking-widest text-[#1a73e8] mb-3">What We Offer</p>
            <h2 className="text-3xl lg:text-4xl font-extrabold text-[#0d1b2e] mb-4">Specialized Services for Your Financial Needs</h2>
            <p className="text-gray-500 text-base">
              We offer a comprehensive range of professional services tailored to meet the unique requirements of your business.
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
            <p className="text-xs font-bold uppercase tracking-widest text-[#1a73e8] mb-3">Book a Session</p>
            <h2 className="text-3xl lg:text-4xl font-extrabold text-[#0d1b2e] mb-4">Schedule a Consultation</h2>
            <p className="text-gray-500">Book an appointment with our experts to discuss your financial needs</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start max-w-4xl mx-auto">
            <div className="bg-[#1a73e8] rounded-2xl p-8 text-white">
              <h3 className="text-xl font-bold mb-4">Expert Consultation</h3>
              <p className="text-blue-100 text-sm leading-relaxed mb-6">
                Our team of certified professionals is ready to help you with personalized advice tailored to your business needs.
              </p>
              <ul className="space-y-4 mb-8">
                {['15-minute free consultation','Video or in-person options','Flexible scheduling','Immediate response guaranteed'].map(item => (
                  <li key={item} className="flex items-center gap-3 text-sm">
                    <CheckCircle2 size={16} className="text-blue-200 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                to="/appointment"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-[#1a73e8] font-bold rounded-xl hover:bg-blue-50 transition-colors"
              >
                Book Now <ArrowRight size={16} />
              </Link>
            </div>
            <CalendarWidget />
          </div>
        </div>
      </section>

      {/* ── INDUSTRIES ── */}
      <section className="py-20 bg-[#001a34]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <p className="text-xs font-bold uppercase tracking-widest text-[#1a73e8] mb-3">Sector Expertise</p>
            <h2 className="text-3xl lg:text-4xl font-extrabold text-white mb-4">Industries We Serve</h2>
            <p className="text-gray-400">
              Our expertise spans across various industries, providing specialized financial and advisory services tailored to sector-specific needs.
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
          {postsLoading ? (
            <div className="flex flex-col items-center justify-center py-12">
              <Loader2 className="animate-spin w-8 h-8 text-[#1a73e8] mb-4" />
              <p className="text-gray-500">Loading latest insights...</p>
            </div>
          ) : latestPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {latestPosts.map((post) => (
                <div key={post.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group flex flex-col">
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
            <p className="text-xs font-bold uppercase tracking-widest text-[#1a73e8] mb-3">Get in Touch</p>
            <h2 className="text-3xl lg:text-4xl font-extrabold text-[#0d1b2e] mb-4">Ready to Talk?</h2>
            <p className="text-gray-500">
              Have questions or need expert advice? Our team is here to help.{' '}
              <Link to="/contact" className="text-[#1a73e8] underline">Fill out the form</Link> or reach out directly.
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Blue panel */}
            <div className="bg-[#1a73e8] rounded-2xl p-8 text-white">
              <h3 className="text-xl font-bold mb-4">Why Reach Out?</h3>
              <ul className="space-y-4 mb-8">
                {[
                  'Expert team ready to assist you',
                  'Prompt responses to all inquiries',
                  'Customized solutions for your business',
                  'Continuous support throughout our partnership',
                ].map(item => (
                  <li key={item} className="flex items-start gap-3 text-sm text-blue-100">
                    <CheckCircle2 size={16} className="text-blue-200 flex-shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="pt-6 border-t border-white/20 space-y-3">
                {[
                  { icon: <Phone size={14} />, text: '+91 90005 42422' },
                  { icon: <Mail size={14} />, text: 'mandixconsultants@gmail.com' },
                  { icon: <MapPin size={14} />, text: 'Plot no 20, 3rd floor 3B, Green Park Avenue, Suchitra, Telangana - 500067' },
                  { icon: <Clock size={14} />, text: 'Mon-Fri: 9AM - 6PM' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 text-sm text-blue-100">
                    <span className="text-blue-200">{item.icon}</span>
                    {item.text}
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
              src="https://maps.google.com/maps?q=Plot%20no%2020%2C%203rd%20floor%203B%2C%20Green%20Park%20Avenue%2C%20Suchitra%2C%20Telangana%20500067&t=&z=13&ie=UTF8&iwloc=&output=embed" 
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