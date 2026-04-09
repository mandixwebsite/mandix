import { useState } from 'react'
import { Link } from 'react-router-dom'
import { MapPin, Heart, TrendingUp, Users, Award, Zap, Coffee, ChevronDown, ChevronUp, ArrowRight } from 'lucide-react'

const benefits = [
  { icon: <TrendingUp size={22} />, title: 'Career Growth', desc: 'Structured development programs, mentorship, and clear advancement paths for all team members.' },
  { icon: <Heart size={22} />, title: 'Health & Wellness', desc: 'Comprehensive health insurance, wellness stipends, and mental health support programs.' },
  { icon: <Coffee size={22} />, title: 'Work-Life Balance', desc: 'Flexible hours, hybrid work options, and generous time-off policies to keep you at your best.' },
  { icon: <Users size={22} />, title: 'Inclusive Culture', desc: 'A diverse and inclusive workplace where every voice matters and perspectives are celebrated.' },
  { icon: <Award size={22} />, title: 'Performance Rewards', desc: 'Competitive salaries, performance bonuses, and recognition programs that value your contributions.' },
  { icon: <Zap size={22} />, title: 'Continuous Learning', desc: 'Training budgets, conference attendance, certifications, and access to premium learning resources.' },
]

const openings = [
  {
    title: 'Senior Tax Consultant',
    department: 'Taxation',
    location: 'Hyderabad, India',
    type: 'Full-time',
    desc: 'We are looking for an experienced tax consultant to join our growing taxation team. You will provide expert advice to clients on complex tax matters, develop tax strategies, and ensure compliance.',
    requirements: [
      '5+ years of experience in corporate taxation',
      'CA/CPA qualification preferred',
      'Strong knowledge of GST and income tax regulations',
      'Excellent communication and client management skills',
    ],
  },
  {
    title: 'Audit Manager',
    department: 'Audit & Assurance',
    location: 'Hyderabad, India',
    type: 'Full-time',
    desc: 'Lead audit engagements for a diverse portfolio of clients across various industries. Manage audit teams, ensure quality standards, and build lasting client relationships.',
    requirements: [
      '7+ years of audit experience',
      'CPA or equivalent certification required',
      'Experience in leading audit teams',
      'Strong understanding of IFRS and local accounting standards',
    ],
  },
  {
    title: 'Financial Advisory Analyst',
    department: 'Financial Advisory',
    location: 'Hyderabad, India',
    type: 'Full-time',
    desc: 'Join our financial advisory team to help clients with investment decisions, financial modeling, and strategic planning. Work on exciting M&A and restructuring projects.',
    requirements: [
      '2-4 years of experience in financial modeling or investment banking',
      'Advanced Excel and financial modeling skills',
      'MBA or Finance degree preferred',
      'Strong analytical and presentation skills',
    ],
  },
  {
    title: 'Junior Accountant',
    department: 'Accounting',
    location: 'Hyderabad, India',
    type: 'Full-time',
    desc: 'An excellent entry-level opportunity for fresh graduates to join our accounting team and build a solid foundation in professional accountancy services.',
    requirements: [
      'B.Com or equivalent degree',
      'CA Inter or pursuing CA final',
      'Proficiency in Tally/QuickBooks',
      'Strong attention to detail',
    ],
  },
]

export default function Careers() {
  const [expandedJob, setExpandedJob] = useState<number | null>(null)

  return (
    <main className="pt-[68px]">
      {/* ── HERO ── */}
      <section className="relative bg-gradient-to-br from-[#001a34] via-[#001a34] to-[#0d3362] py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 right-20 w-64 h-64 rounded-full bg-[#1a73e8]" />
          <div className="absolute bottom-10 left-10 w-40 h-40 rounded-full bg-[#1a73e8]" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-[#1a73e8] mb-4">Join Our Team</p>
          <h1 className="text-4xl lg:text-5xl font-extrabold text-white mb-6 leading-tight">
            Build Your Career at<br /><span className="text-[#1a73e8]">Mandix Consultants</span>
          </h1>
          <p className="text-gray-300 text-base leading-relaxed max-w-2xl mx-auto mb-10">
            Join a team of passionate professionals dedicated to delivering excellence. We offer a dynamic work environment with tremendous opportunities for growth and impact.
          </p>
          <a
            href="#openings"
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#1a73e8] text-white font-semibold rounded-xl hover:bg-[#1557b0] transition-all hover:-translate-y-0.5 shadow-lg"
          >
            View Open Positions <ArrowRight size={16} />
          </a>
        </div>
      </section>

      {/* ── WHY JOIN US ── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-14">
            <p className="text-xs font-bold uppercase tracking-widest text-[#1a73e8] mb-3">Our Culture</p>
            <h2 className="text-3xl lg:text-4xl font-extrabold text-[#0d1b2e] mb-4">Why Join Mandix?</h2>
            <p className="text-gray-500">We invest in our people because we believe great outcomes start with a great team.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
            {benefits.map((b, i) => (
              <div key={i} className="bg-[#f8f9fc] rounded-2xl p-7 border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group">
                <div className="w-12 h-12 rounded-xl bg-[#e8f0fe] flex items-center justify-center text-[#1a73e8] mb-5 group-hover:bg-[#1a73e8] group-hover:text-white transition-colors duration-300">
                  {b.icon}
                </div>
                <h3 className="text-base font-bold text-[#0d1b2e] mb-2">{b.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TEAM CULTURE IMAGE ── */}
      <section className="py-16 bg-[#f8f9fc]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-[#1a73e8] mb-3">Life at Mandix</p>
              <h2 className="text-3xl font-extrabold text-[#0d1b2e] mb-4">A Place Where You Thrive</h2>
              <p className="text-gray-500 text-sm leading-relaxed mb-4">
                We foster a culture of collaboration, innovation, and continuous learning. Our team members are our greatest asset, and we invest heavily in their personal and professional development.
              </p>
              <p className="text-gray-500 text-sm leading-relaxed mb-6">
                From structured mentorship programs to team-building activities, we create an environment where everyone can do their best work and grow their careers.
              </p>
              <div className="flex flex-wrap gap-3">
                {['Collaborative','Innovative','Inclusive','Growth-oriented','Client-focused'].map(tag => (
                  <span key={tag} className="px-3 py-1.5 bg-[#e8f0fe] text-[#1a73e8] text-xs font-semibold rounded-full">{tag}</span>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <img
                src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=350&h=250&fit=crop&q=80"
                alt="Team collaboration"
                className="rounded-2xl shadow-md w-full object-cover"
              />
              <img
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=350&h=250&fit=crop&q=80"
                alt="Office environment"
                className="rounded-2xl shadow-md w-full object-cover mt-6"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── JOB OPENINGS ── */}
      <section id="openings" className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-xs font-bold uppercase tracking-widest text-[#1a73e8] mb-3">Current Openings</p>
            <h2 className="text-3xl lg:text-4xl font-extrabold text-[#0d1b2e] mb-4">Open Positions</h2>
            <p className="text-gray-500">Explore opportunities to grow your career with Mandix</p>
          </div>
          <div className="space-y-4">
            {openings.map((job, i) => (
              <div key={i} className="bg-[#f8f9fc] rounded-2xl border border-gray-100 overflow-hidden">
                <button
                  onClick={() => setExpandedJob(expandedJob === i ? null : i)}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors"
                >
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-3 mb-2">
                      <h3 className="text-base font-bold text-[#0d1b2e]">{job.title}</h3>
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#e8f0fe] text-[#1a73e8]">{job.department}</span>
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-green-50 text-green-700">{job.type}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-400">
                      <MapPin size={12} />
                      {job.location}
                    </div>
                  </div>
                  <div className="ml-4 text-gray-400">
                    {expandedJob === i ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </div>
                </button>
                {expandedJob === i && (
                  <div className="px-6 pb-6 border-t border-gray-100 pt-5">
                    <p className="text-sm text-gray-500 mb-5 leading-relaxed">{job.desc}</p>
                    <p className="text-xs font-bold text-[#0d1b2e] uppercase tracking-wider mb-3">Requirements:</p>
                    <ul className="space-y-2 mb-6">
                      {job.requirements.map((req, j) => (
                        <li key={j} className="flex items-start gap-2.5 text-sm text-gray-600">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#1a73e8] mt-1.5 flex-shrink-0" />
                          {req}
                        </li>
                      ))}
                    </ul>
                    <Link
                      to="/contact"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-[#1a73e8] text-white font-semibold rounded-xl hover:bg-[#1557b0] transition-all text-sm"
                    >
                      Apply Now <ArrowRight size={14} />
                    </Link>
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="mt-10 text-center p-8 bg-[#f8f9fc] rounded-2xl border border-gray-100">
            <p className="text-gray-500 mb-2">Don't see a role that fits?</p>
            <p className="text-sm text-gray-400 mb-5">We're always looking for talented people. Send us your resume and we'll keep it on file.</p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 border-2 border-[#1a73e8] text-[#1a73e8] font-semibold rounded-xl hover:bg-[#1a73e8] hover:text-white transition-all text-sm"
            >
              Send Your Resume <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}