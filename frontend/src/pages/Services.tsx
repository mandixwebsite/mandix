import { Link } from 'react-router-dom'
import { TrendingUp, FileText, BarChart2, Briefcase, BookOpen, Building2, CheckCircle2, ArrowRight } from 'lucide-react'

const services = [
  {
    icon: <TrendingUp size={26} />,
    title: 'Strategic Business Consulting',
    desc: 'Transform your business with our strategic consulting services tailored to your industry challenges.',
    features: ['Comprehensive business assessment', 'Custom growth strategies', 'Operational efficiency review', 'Market positioning analysis'],
  },
  {
    icon: <BarChart2 size={26} />,
    title: 'Financial Advisory',
    desc: 'Expert financial guidance to maximize profitability and ensure sustainable growth.',
    features: ['Financial health assessment', 'Capital structure optimization', 'Investment advisory', 'Risk management'],
  },
  {
    icon: <Building2 size={26} />,
    title: 'Digital Transformation',
    desc: 'Harness the power of digital technologies to revolutionize your business operations.',
    features: ['Technology stack assessment', 'Digital roadmap development', 'Process automation', 'Change management'],
  },
  {
    icon: <Briefcase size={26} />,
    title: 'Corporate Advisory',
    desc: 'Strategic business consulting to optimize operations, improve performance, and achieve sustainable growth.',
    features: ['Mergers & acquisitions', 'Corporate restructuring', 'Board advisory', 'Governance frameworks'],
  },
  {
    icon: <FileText size={26} />,
    title: 'Auditing & Assurance',
    desc: 'Comprehensive auditing services to ensure compliance and provide stakeholders with confidence.',
    features: ['Statutory audits', 'Internal audit reviews', 'Compliance audits', 'Financial due diligence'],
  },
  {
    icon: <BookOpen size={26} />,
    title: 'Legal & Compliance',
    desc: 'Navigate complex regulatory environments with our comprehensive legal and compliance advisory services.',
    features: ['Regulatory compliance', 'Contract review', 'Legal risk assessment', 'Policy development'],
  },
]

export default function Services() {
  return (
    <main className="pt-[68px]">
      {/* ── HERO ── */}
      <section className="bg-gradient-to-br from-[#001a34] via-[#001a34] to-[#0d3362] py-20 lg:py-28 text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-bold uppercase tracking-widest text-[#1a73e8] mb-4">Our Expertise</p>
          <h1 className="text-4xl lg:text-5xl font-extrabold text-white mb-6 leading-tight">
            Expert Consulting <span className="text-[#1a73e8]">Services</span>
          </h1>
          <p className="text-gray-300 text-base leading-relaxed mb-10 max-w-xl mx-auto">
            Transformative solutions designed to elevate your business performance and drive sustainable growth.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/appointment"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#1a73e8] text-white font-semibold rounded-xl hover:bg-[#1557b0] transition-all hover:-translate-y-0.5 shadow-lg"
            >
              Schedule a Consultation <ArrowRight size={16} />
            </Link>
            <a
              href="#process"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-white/10 text-white font-semibold rounded-xl border border-white/20 hover:bg-white/20 transition-all hover:-translate-y-0.5 backdrop-blur-sm"
            >
              Explore Our Process
            </a>
          </div>
        </div>
      </section>

      {/* ── SERVICES GRID ── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <p className="text-xs font-bold uppercase tracking-widest text-[#1a73e8] mb-3">Comprehensive Solutions</p>
            <h2 className="text-3xl lg:text-4xl font-extrabold text-[#0d1b2e] mb-4">Our Service Offerings</h2>
            <p className="text-gray-500">Comprehensive consulting solutions designed to address your most critical business challenges</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((s, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-7 group"
              >
                <div className="w-13 h-13 w-14 h-14 rounded-2xl bg-[#e8f0fe] flex items-center justify-center text-[#1a73e8] mb-6 group-hover:bg-[#1a73e8] group-hover:text-white transition-colors duration-300">
                  {s.icon}
                </div>
                <h3 className="text-base font-bold text-[#0d1b2e] mb-3">{s.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed mb-5">{s.desc}</p>
                <ul className="space-y-2 mb-6">
                  {s.features.map((f, j) => (
                    <li key={j} className="flex items-center gap-2.5 text-xs text-gray-600">
                      <CheckCircle2 size={13} className="text-[#1a73e8] flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  to="/appointment"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#1a73e8] hover:gap-2.5 transition-all"
                >
                  Learn more <ArrowRight size={14} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROCESS ── */}
      <section id="process" className="py-20 bg-[#f8f9fc]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-14">
            <p className="text-xs font-bold uppercase tracking-widest text-[#1a73e8] mb-3">How We Work</p>
            <h2 className="text-3xl lg:text-4xl font-extrabold text-[#0d1b2e] mb-4">Our Proven Process</h2>
            <p className="text-gray-500">A structured approach that delivers consistent, measurable results for every client</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { num: '01', title: 'Discovery & Assessment', desc: 'We begin by thoroughly understanding your business, challenges, and goals through in-depth consultations and data analysis.' },
              { num: '02', title: 'Strategy Development', desc: 'Our experts craft a customized roadmap tailored to your specific needs, incorporating best practices and innovative solutions.' },
              { num: '03', title: 'Implementation', desc: 'We work alongside your team to execute the strategy, providing hands-on support and expert guidance throughout the process.' },
              { num: '04', title: 'Review & Optimization', desc: 'We continuously monitor progress, measure results, and refine our approach to ensure optimal outcomes and lasting impact.' },
            ].map((step, i) => (
              <div key={i} className="bg-white rounded-2xl p-7 border border-gray-100 shadow-sm hover:shadow-lg transition-shadow relative overflow-hidden">
                <span className="absolute top-4 right-5 text-5xl font-extrabold text-[#f0f4ff] select-none">{step.num}</span>
                <div className="w-10 h-10 rounded-xl bg-[#1a73e8] text-white flex items-center justify-center font-bold text-sm mb-5 relative z-10">
                  {step.num}
                </div>
                <h3 className="text-sm font-bold text-[#0d1b2e] mb-3 relative z-10">{step.title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed relative z-10">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 bg-[#1a73e8]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-extrabold text-white mb-6">Ready to Transform Your Business?</h2>
          <p className="text-blue-100 text-base mb-10 leading-relaxed">
            Schedule a free consultation with our experts and discover how we can help you achieve your goals.
          </p>
          <Link
            to="/appointment"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[#1a73e8] font-bold rounded-xl hover:bg-blue-50 transition-all hover:-translate-y-0.5 shadow-lg text-sm"
          >
            Schedule a Free Consultation <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </main>
  )
}