import { Link } from 'react-router-dom'
import { MapPin, Phone, Mail, Clock } from 'lucide-react'
import simplifiedLogo from '../assets/4-svgs/Simplified logo.svg'

export default function Footer() {
  return (
    <footer className="bg-[#001a34] text-white">
      {/* Main footer grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center mb-5">
              <img src={simplifiedLogo} alt="Mandix Consultants" className="h-14 w-auto" />
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Expert accountancy and business advisory services dedicated to helping you achieve your financial goals with comprehensive, tailored solutions.
            </p>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-3">
              {/* Social icons will go here */}
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-5">Quick Links</h4>
            <ul className="space-y-3">
              {[
                { to: '/', label: 'Home' },
                { to: '/about', label: 'About Us' },
                { to: '/services', label: 'Services' },
                { to: '/blog', label: 'Blog' },
                { to: '/careers', label: 'Careers' },
                { to: '/contact', label: 'Contact Us' },
              ].map(({ to, label }) => (
                <li key={to}>
                  <Link
                    to={to}
                    className="text-gray-400 text-sm hover:text-white transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-[#1a73e8] opacity-0 group-hover:opacity-100 transition-opacity" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-5">Services</h4>
            <ul className="space-y-3">
              {[
                'Auditing & Assurance',
                'Taxation Planning',
                'Financial Advisory',
                'Corporate Advisory',
                'Bookkeeping & Accounting',
                'Business Formation',
              ].map(service => (
                <li key={service}>
                  <Link
                    to="/services"
                    className="text-gray-400 text-sm hover:text-white transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-[#1a73e8] opacity-0 group-hover:opacity-100 transition-opacity" />
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-5">Contact Info</h4>
            <ul className="space-y-4">
              {[
                { Icon: MapPin, text: '123 Business Avenue, Financial District, City, Country' },
                { Icon: Phone, text: '+1 (555) 123-4567' },
                { Icon: Mail, text: 'info@mandixconsultants.com' },
                { Icon: Clock, text: 'Mon–Fri: 9:00 AM – 6:00 PM' },
              ].map(({ Icon, text }, i) => (
                <li key={i} className="flex items-start gap-3">
                  <Icon size={15} className="text-[#1a73e8] mt-0.5 flex-shrink-0" />
                  <span className="text-gray-400 text-sm leading-snug">{text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Mandix Consultants. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {['Privacy Policy', 'Terms of Service'].map(link => (
              <a key={link} href="#" className="text-gray-500 text-sm hover:text-gray-300 transition-colors">
                {link}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}