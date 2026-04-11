import { Shield, Zap, Users, Award } from 'lucide-react'

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
    desc: 'We adhere to the highest ethical standards in all our dealings. Our clients trust us with their most sensitive business information, and we honor that trust with unwavering integrity.',
  },
  {
    icon: <Zap size={26} />,
    title: 'Excellence',
    desc: 'We strive for excellence in everything we do. From detailed analysis to strategic recommendations, we hold ourselves to the highest standards of quality and professionalism.',
  },
  {
    icon: <Users size={26} />,
    title: 'Collaboration',
    desc: 'We believe in the power of collaboration. We work closely with our clients, integrating their insights with our expertise to create solutions that truly address their needs.',
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
                About <span className="text-[#1a73e8]">Us</span>
              </h1>
              <p className="text-gray-300 leading-relaxed mb-10 text-base">
                Mandix Consultants specialises in delivering top-tier management consulting services with a focus on integrity, innovation, and client satisfaction. Based in India with global ambitions, we simplify financial complexities and ensure compliance through personalised, reliable solutions.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[['15+','Years Exp.'],['500+','Clients'],['95%','Retention'],['50+','Experts']].map(([n,l]) => (
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div className="bg-[#f8f9fc] rounded-2xl p-10 border border-gray-100 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#1a73e8]/5 rounded-bl-full -mr-8 -mt-8" />
              <p className="text-xs font-bold uppercase tracking-widest text-[#1a73e8] mb-3">Our Mission</p>
              <h2 className="text-3xl font-extrabold text-[#0d1b2e] mb-6">A Robust Alternative</h2>
              <p className="text-gray-500 text-base leading-relaxed relative z-10">
                Mandix Consultants is dedicated to delivering exceptional management consulting services to a diverse clientele. By establishing a robust presence in India, we aim to provide a compelling alternative to international firms. Our mission is to cultivate a sense of trust and ease among our clients, ensuring their financial affairs are expertly managed and secure under our guidance.
              </p>
            </div>
            
            <div className="bg-[#f8f9fc] rounded-2xl p-10 border border-gray-100 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#1a73e8]/5 rounded-bl-full -mr-8 -mt-8" />
              <p className="text-xs font-bold uppercase tracking-widest text-[#1a73e8] mb-3">Our Vision</p>
              <h2 className="text-3xl font-extrabold text-[#0d1b2e] mb-6">Global Compliance</h2>
              <p className="text-gray-500 text-base leading-relaxed relative z-10">
                Mandix Consultants aims to establish a global presence, delivering tailored management services aligned with local regulations across multiple countries. We aspire to earn widespread trust by embodying a familial commitment to our clients, assuming full responsibility for their financial well-being. Our overarching goal is to streamline financial processes, offering education and guidance that aligns seamlessly with governmental frameworks.
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
            <h2 className="text-3xl lg:text-4xl font-extrabold text-[#0d1b2e]">Our Core Values</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
      <section className="py-20 bg-white">
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
      </section>

      {/* ── AWARDS ── */}
      <section className="py-20 bg-[#001a34]">
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
      </section>
    </main>
  )
}