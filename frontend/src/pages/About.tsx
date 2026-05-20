import { Shield, Zap, Users, Lightbulb } from 'lucide-react'

const teamMembers = [
  { name: 'Sarah Johnson', role: 'CEO & Managing Partner', bio: 'Over 20 years of experience in financial advisory and business strategy.' },
  { name: 'Michael Chen', role: 'Director of Tax Services', bio: 'Specialist in corporate taxation with expertise across multiple jurisdictions.' },
  { name: 'Lisa Rodriguez', role: 'Head of Audit & Assurance', bio: 'Certified auditor with a track record of excellence in financial reporting.' },
  { name: 'David Patel', role: 'Senior Financial Advisor', bio: 'Expert in investment strategy and capital markets with 15+ years experience.' },
  { name: 'Emily Watson', role: 'Corporate Advisory Lead', bio: 'Specializes in mergers, acquisitions, and corporate restructuring.' },
  { name: 'James Okafor', role: 'Head of Business Formation', bio: 'Guides startups and SMEs through the complexities of business registration.' },
]

const values = [
  {
    icon: <Shield size={26} />,
    title: 'Integrity',
    desc: 'Our clients share what they share with no one else — their financials, their vulnerabilities, their ambitions. We treat that trust as our single most valuable asset, protecting it without compromise in every decision we make.',
  },
  {
    icon: <Zap size={26} />,
    title: 'Excellence',
    desc: "Good enough has never been our benchmark. We hold every analysis, every recommendation, and every client interaction to a standard we'd be proud to defend in any boardroom — because your business deserves nothing less.",
  },
  {
    icon: <Users size={26} />,
    title: 'Collaboration',
    desc: "We don't arrive with ready-made answers. We arrive with the right questions — and build every solution together with our clients, because the best financial strategies are always co-crafted, never imposed.",
  },
  {
    icon: <Lightbulb size={26} />,
    title: 'Innovation',
    desc: "The financial world doesn't stand still — and neither do we. We continuously evolve our thinking, our tools, and our approaches to ensure our clients are always ahead of regulatory change, market shifts, and emerging opportunities.",
  },
]

export default function About() {
  return (
    <main className="pt-[68px]">
      {/* ── HERO ── */}
      <section className="bg-gradient-to-br from-[#001a34] via-[#001a34] to-[#0d3362] py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-[#1a73e8] mb-4">Who We Are</p>
              <h1 className="text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-6">
                A New Kind of <span className="text-[#1a73e8]">Financial Consulting Firm.</span>
              </h1>
              <p className="text-gray-300 leading-relaxed mb-10 text-base">
                Mandix Consultants is a full-service tax, audit, and financial advisory firm built for businesses and individuals who demand more than just compliance. Rooted in India with global ambitions, we bring specialist expertise, personal attention, and a relentless commitment to crafting financial outcomes that truly move the needle.

              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[['100Cr+','Clients Revenue Managed'],['8+','Years of Combined Exp.'],['500+','Clients Served'],['50+','Businesses Transformed']].map(([n,l]) => (
                  <div key={l} className="text-center p-4 bg-white/5 border border-white/10 rounded-xl">
                    <span className="block text-2xl font-extrabold text-[#1a73e8]">{n}</span>
                    <span className="text-xs text-gray-400 mt-1 block">{l}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <img
                src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=700&q=80"
                alt="Our Team"
                className="rounded-2xl shadow-2xl w-full object-cover aspect-[4/3]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── MISSION & VISION ── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-stretch">
            <div className="bg-[#f8f9fc] rounded-2xl p-10 border border-gray-100 shadow-sm relative overflow-hidden h-full">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#1a73e8]/5 rounded-bl-full -mr-8 -mt-8" />
              <p className="text-xs font-bold uppercase tracking-widest text-[#1a73e8] mb-3">Our Mission</p>
              <h2 className="text-3xl font-extrabold text-[#0d1b2e] mb-6">Redefining What a Financial Consulting Firm Can Be.</h2>
              <p className="text-gray-500 text-base leading-relaxed relative z-10">
                At Mandix, our mission is simple — to deliver the calibre of financial expertise previously reserved for the largest corporations, to every client we serve. We exist to be the firm that growing businesses, ambitious individuals, and global investors turn to when financial decisions truly matter. Not just as advisors, but as long-term partners invested in your success.
              </p>
            </div>
            
            <div className="bg-[#f8f9fc] rounded-2xl p-10 border border-gray-100 shadow-sm relative overflow-hidden h-full">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#1a73e8]/5 rounded-bl-full -mr-8 -mt-8" />
              <p className="text-xs font-bold uppercase tracking-widest text-[#1a73e8] mb-3">Our Vision</p>
              <h2 className="text-3xl font-extrabold text-[#0d1b2e] mb-6">An Indian Firm. A Global Standard.</h2>
              <p className="text-gray-500 text-base leading-relaxed relative z-10">
                We envision Mandix as a globally recognised financial consulting firm — one that carries the precision of international standards while remaining deeply attuned to the regulatory and cultural nuances of every market we serve. Our goal is to build a firm that clients across borders trust unconditionally — because trust, once earned through consistent excellence, is the only credential that truly matters.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── CORE VALUES ── */}
      <section className="py-20 bg-[#f8f9fc]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-14">
            <p className="text-xs font-bold uppercase tracking-widest text-[#1a73e8] mb-3">Our Principles</p>
            <h2 className="text-3xl lg:text-4xl font-extrabold text-[#0d1b2e]">What We Stand For. Every Single Day.</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((v, i) => (
              <div key={i} className="bg-white rounded-2xl p-8 text-center border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className="w-14 h-14 rounded-2xl bg-[#e8f0fe] flex items-center justify-center text-[#1a73e8] mx-auto mb-6">
                  {v.icon}
                </div>
                <h3 className="text-lg font-bold text-[#0d1b2e] mb-3">{v.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── LEADERSHIP TEAM ── */}
      {/* <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-14">
            <p className="text-xs font-bold uppercase tracking-widest text-[#1a73e8] mb-3">Leadership</p>
            <h2 className="text-3xl lg:text-4xl font-extrabold text-[#0d1b2e] mb-4">Meet Our Leadership Team</h2>
            <p className="text-gray-500">Experienced professionals dedicated to your success</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((m, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 p-6 text-center">
                <img
                  src={`https://i.pravatar.cc/120?img=${i + 10}`}
                  alt={m.name}
                  className="w-20 h-20 rounded-full mx-auto mb-4 object-cover border-4 border-[#e8f0fe]"
                />
                <h3 className="text-base font-bold text-[#0d1b2e] mb-1">{m.name}</h3>
                <p className="text-xs font-semibold text-[#1a73e8] mb-3">{m.role}</p>
                <p className="text-sm text-gray-500 leading-relaxed">{m.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* ── AWARDS ── */}
      {/* <section className="py-20 bg-[#001a34]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-14">
            <p className="text-xs font-bold uppercase tracking-widest text-[#1a73e8] mb-3">Recognition</p>
            <h2 className="text-3xl lg:text-4xl font-extrabold text-white">Awards & Certifications</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: <Award size={28} />, title: 'Best CA Firm 2023', org: 'Financial Excellence Awards' },
              { icon: <Shield size={28} />, title: 'ISO 9001:2015 Certified', org: 'International Standards Organization' },
              { icon: <Award size={28} />, title: 'Top Advisory Firm', org: 'Business Today Rankings' },
              { icon: <Award size={28} />, title: 'Client Choice Award', org: 'Professional Services Review' },
            ].map((a, i) => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center hover:bg-white/10 hover:border-[#1a73e8]/40 transition-all duration-200">
                <div className="text-[#1a73e8] mb-4 flex justify-center">{a.icon}</div>
                <strong className="block text-white font-bold text-sm mb-1">{a.title}</strong>
                <span className="text-gray-400 text-xs">{a.org}</span>
              </div>
            ))}
          </div>
        </div>
      </section> */}
    </main>
  )
}