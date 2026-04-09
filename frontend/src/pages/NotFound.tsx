import { Link } from 'react-router-dom'
import { ArrowRight, AlertCircle } from 'lucide-react'

export default function NotFound() {
  return (
    <main className="pt-[68px] min-h-[80vh] flex flex-col items-center justify-center bg-[#f8f9fc]">
      <div className="text-center px-4">
        <div className="w-24 h-24 bg-[#e8f0fe] rounded-full flex items-center justify-center mx-auto mb-6">
          <AlertCircle size={48} className="text-[#1a73e8]" />
        </div>
        <h1 className="text-6xl sm:text-8xl font-extrabold text-[#0d1b2e] mb-4">404</h1>
        <h2 className="text-2xl sm:text-3xl font-bold text-[#1a73e8] mb-6">Page Not Found</h2>
        <p className="text-gray-500 max-w-md mx-auto mb-10 text-sm sm:text-base leading-relaxed">
          Oops! The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        <Link 
          to="/"
          className="inline-flex items-center gap-2 px-8 py-4 bg-[#1a73e8] text-white font-semibold rounded-xl hover:bg-[#1557b0] transition-all hover:-translate-y-0.5 shadow-md"
        >
          Return to Home <ArrowRight size={18} />
        </Link>
      </div>
    </main>
  )
}
