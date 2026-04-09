import { useParams, Link } from 'react-router-dom'
import { allPosts } from './Blog'
import { Clock, ArrowLeft, Share2, Check } from 'lucide-react'
import { useState } from 'react'

export default function BlogPost() {
  const { id } = useParams()
  const post = allPosts.find(p => p.id === id) || allPosts[0]
  const [copied, setCopied] = useState(false)

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const shareUrl = encodeURIComponent(window.location.href)
  const shareTitle = encodeURIComponent(post.title)

  return (
    <main className="pt-[68px]">
      {/* ── HERO ── */}
      <section className="bg-gradient-to-br from-[#001a34] via-[#001a34] to-[#0d3362] py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <Link to="/blog" className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors mb-8">
            <ArrowLeft size={16} /> Back to Blog
          </Link>
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="inline-flex px-3 py-1 rounded-full text-xs font-bold bg-white/10 text-white uppercase tracking-wider backdrop-blur-sm border border-white/20">
              {post.category}
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-6 leading-tight">
            {post.title}
          </h1>
          <div className="flex items-center justify-center gap-4 text-xs sm:text-sm text-gray-300">
            <span className="font-semibold text-white">{post.author}</span>
            <span>·</span>
            <span>{post.date}</span>
            <span>·</span>
            <span className="flex items-center gap-1"><Clock size={14} />{post.readTime}</span>
          </div>
        </div>
      </section>

      {/* ── CONTENT ── */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <img
            src={post.img}
            alt={post.title}
            className="w-full aspect-[21/9] object-cover rounded-3xl shadow-xl border border-gray-100 mb-12"
          />
          <div className="prose prose-lg text-gray-600 max-w-none">
            <p className="text-xl font-medium text-[#0d1b2e] leading-relaxed mb-8">
              {post.excerpt}
            </p>
            <p className="mb-6">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
            <h2 className="text-2xl font-bold text-[#0d1b2e] mt-10 mb-4">Navigating the Modern Landscape</h2>
            <p className="mb-6">
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
            <blockquote className="border-l-4 border-[#1a73e8] pl-6 py-3 my-8 bg-[#f8f9fc] rounded-r-xl italic text-lg text-[#0d1b2e]">
              "The ability to adapt quickly and effectively is no longer a competitive advantage; it's a fundamental requirement for survival in today's market."
            </blockquote>
            <p className="mb-6">
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
            </p>
            <h3 className="text-xl font-bold text-[#0d1b2e] mt-10 mb-4">Key Takeaways</h3>
            <ul className="list-disc pl-6 space-y-2 mb-8 text-gray-600 marker:text-[#1a73e8]">
              <li>Understand the shifting demands of modern strategic frameworks.</li>
              <li>Implement agile operational models for immediate market response.</li>
              <li>Secure long-term capital through robust corporate governance.</li>
            </ul>
          </div>
          
          <div className="flex items-center justify-between mt-16 pt-8 border-t border-gray-100">
            <div className="flex items-center gap-4">
              <span className="text-sm font-semibold text-[#0d1b2e]">Share:</span>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => window.open(`https://www.linkedin.com/shareArticle?mini=true&url=${shareUrl}&title=${shareTitle}`, '_blank', 'noreferrer')}
                  className="px-4 py-2 rounded-lg bg-[#f8f9fc] text-xs font-bold text-gray-500 hover:text-white hover:bg-[#0077b5] transition-colors shadow-sm"
                >
                  IN
                </button>
                <button 
                  onClick={() => window.open(`https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareTitle}`, '_blank', 'noreferrer')}
                  className="px-4 py-2 rounded-lg bg-[#f8f9fc] text-xs font-bold text-gray-500 hover:text-white hover:bg-[#1DA1F2] transition-colors shadow-sm"
                >
                  TW
                </button>
                <button 
                  onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`, '_blank', 'noreferrer')}
                  className="px-4 py-2 rounded-lg bg-[#f8f9fc] text-xs font-bold text-gray-500 hover:text-white hover:bg-[#4267B2] transition-colors shadow-sm"
                >
                  FB
                </button>
              </div>
            </div>
            <button 
              onClick={handleCopyLink}
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#1a73e8] hover:text-[#1557b0] transition-colors bg-[#f8f9fc] px-4 py-2 rounded-lg hover:bg-[#e8f0fe] w-32 justify-center"
            >
              {copied ? (
                <>
                  <Check size={16} /> Copied!
                </>
              ) : (
                <>
                  <Share2 size={16} /> Copy Link
                </>
              )}
            </button>
          </div>
        </div>
      </section>
    </main>
  )
}
