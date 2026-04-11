import { Link } from 'react-router-dom'
import { FileText, Calculator, Briefcase, CheckCircle2, ArrowRight } from 'lucide-react'

const serviceCategories = [
  {
    category: 'Audit and Assurance Services',
    description: 'Our audit and assurance services enhance transparency and stakeholder confidence through rigorous financial and compliance audits.',
    icon: <FileText size={22} className="text-[#1a73e8]" />,
    services: [
      {
        title: 'Statutory Audit',
        features: ['Financial statement audits', 'Compliance audits'],
      },
      {
        title: 'Internal Audit',
        features: ['Risk-based internal audits', 'Operational audits', 'IT audits'],
      },
      {
        title: 'Specialty Assurance Services',
        features: ['Forensic audits and investigations', 'Regulatory compliance audits'],
      },
      {
        title: 'Review and Compilation Services',
        features: ['Limited reviews of financial statements', 'Compilation of financial information'],
      },
    ]
  },
  {
    category: 'Tax Services',
    description: 'We provide expert tax compliance, planning, and advisory services to optimize your tax strategy and ensure regulatory compliance.',
    icon: <Calculator size={22} className="text-[#1a73e8]" />,
    services: [
      {
        title: 'Corporate Tax Services',
        features: ['Tax compliance and reporting', 'Tax planning and strategy', 'Tax risk management', 'Transfer pricing', 'International tax services'],
      },
      {
        title: 'Indirect Tax Services',
        features: ['GST compliance and advisory', 'Customs and excise duty consulting', 'Transaction tax advisory'],
      },
      {
        title: 'Personal Tax Services',
        features: ['Individual tax planning', 'Wealth management and estate planning', 'International assignee tax services'],
      },
      {
        title: 'Tax Dispute Resolution',
        features: ['Representation before tax authorities', 'Appeals and litigation support', 'Tax settlement strategies'],
      },
    ]
  },
  {
    category: 'Additional Services',
    description: 'We offer specialized services, including corporate finance, legal advisory, and outsourcing solutions for payroll and accounting, tailored to your business need.',
    icon: <Briefcase size={22} className="text-[#1a73e8]" />,
    services: [
      {
        title: 'Corporate Finance',
        features: ['Valuation services', 'Transaction support'],
      },
      {
        title: 'Outsourcing Services',
        features: ['Payroll processing', 'Accounting and bookkeeping', 'Managed services for finance and accounting', 'Credit Monitoring Analysis - CMA Reporting', 'Digital Signature - DSC'],
      },
      {
        title: 'Registrar of Companies (ROC)',
        features: ['Formation of companies', 'Filing Resolutions with ROC', 'Filing Forms with ROC'],
      },
      {
        title: 'Registrations and Licensing',
        features: ['GST Registration', 'Partnership Registration', 'MSME Registration', 'Shop and Establishment Registration'],
      },
    ]
  }
]

export default function Services() {
  return (
    <main className="pt-[68px]">
      {/* ── HERO ── */}
      <section className="bg-gradient-to-br from-[#001a34] via-[#001a34] to-[#0d3362] py-20 lg:py-28 text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-bold uppercase tracking-widest text-[#1a73e8] mb-4">Our Expertise</p>
          <h1 className="text-4xl lg:text-5xl font-extrabold text-white mb-6 leading-tight">
            Comprehensive <span className="text-[#1a73e8]">Services</span>
          </h1>
          <p className="text-gray-300 text-base leading-relaxed mb-10 max-w-xl mx-auto">
            Transformative financial, tax, and assurance solutions designed to elevate your business performance and drive sustainable growth.
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

      {/* ── SERVICES SECTION ── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {serviceCategories.map((category, idx) => (
            <div key={idx} className="mb-24 last:mb-0">
              <div className="max-w-3xl mb-12">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-[#e8f0fe] flex items-center justify-center">
                    {category.icon}
                  </div>
                  <h2 className="text-3xl font-extrabold text-[#0d1b2e]">{category.category}</h2>
                </div>
                <p className="text-gray-500 text-base leading-relaxed pl-16">
                  {category.description}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {category.services.map((s, i) => (
                  <div
                    key={i}
                    className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-6 flex flex-col group"
                  >
                    <h3 className="text-base font-bold text-[#0d1b2e] mb-4 pb-4 border-b border-gray-100 group-hover:border-[#1a73e8]/30 transition-colors uppercase gap-2 flex items-center">
                      <span className="text-[#1a73e8] opacity-50">{i + 1}.</span> {s.title}
                    </h3>
                    <ul className="space-y-3 mb-6 flex-1">
                      {s.features.map((f, j) => (
                        <li key={j} className="flex items-start gap-2.5 text-sm text-gray-600">
                          <CheckCircle2 size={16} className="text-[#1a73e8] mt-0.5 flex-shrink-0 opacity-80" />
                          <span className="leading-snug">{f}</span>
                        </li>
                      ))}
                    </ul>
                    <Link
                      to="/appointment"
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#1a73e8] hover:gap-2.5 transition-all mt-auto"
                    >
                      Enquire now <ArrowRight size={14} />
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          ))}

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
              { num: '01', title: 'Discovery & Assessment', desc: 'We begin by thoroughly understanding your business, financial challenges, and goals through in-depth consultations.' },
              { num: '02', title: 'Strategy & Framework', desc: 'Our experts craft a customized solution tailored to your compliance or advisory needs, incorporating best practices.' },
              { num: '03', title: 'Implementation', desc: 'We work alongside your team to execute the plan, providing hands-on support and expert guidance throughout.' },
              { num: '04', title: 'Review & Reporting', desc: 'We provide detailed reporting, continuous monitoring, and refine our approach to ensure optimal outcomes.' },
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