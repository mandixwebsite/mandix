import { useParams, Link } from 'react-router-dom'
import { Clock, ArrowLeft, Share2, Check, Loader2 } from 'lucide-react'
import { useState, useEffect } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { fetchPostBySlug } from '../lib/api'
import type { NormalizedPost } from '../lib/api'

export default function BlogPost() {
  const { id } = useParams() // this will be the slug
  const [post, setPost] = useState<NormalizedPost | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    async function loadPost() {
      if (!id) return
      try {
        setLoading(true)
        const data = await fetchPostBySlug(id)
        if (!data) {
          setError('Post not found.')
        } else {
          setPost(data)
        }
      } catch (err) {
        console.error(err)
        setError('Failed to load blog post. Please try again later.')
      } finally {
        setLoading(false)
      }
    }
    loadPost()
  }, [id])

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (loading) {
     return (
        <main className="pt-[140px] pb-24 text-center min-h-[50vh] flex flex-col items-center justify-center">
           <Loader2 className="animate-spin w-8 h-8 text-[#1a73e8] mx-auto mb-4" />
           <p className="text-gray-500">Loading article...</p>
        </main>
     )
  }

  if (error || !post) {
     return (
        <main className="pt-[140px] pb-24 text-center min-h-[50vh] flex flex-col items-center justify-center">
           <p className="text-red-500 font-medium mb-6">{error || 'Post not found'}</p>
           <Link to="/blog" className="inline-flex items-center gap-2 px-6 py-3 bg-[#1a73e8] text-white font-semibold rounded-xl hover:bg-[#1557b0] transition-colors">
              <ArrowLeft size={16}/> Return to Blog
           </Link>
        </main>
     )
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
          
          <div className="prose prose-lg prose-blue text-gray-600 max-w-none prose-headings:text-[#0d1b2e] prose-a:text-[#1a73e8] marker:text-[#1a73e8]">
             <p className="text-xl font-medium text-[#0d1b2e] leading-relaxed mb-8">
               {post.excerpt}
             </p>
             {/* Render Strapi markdown content safely */}
             <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {post.content}
             </ReactMarkdown>
          </div>
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mt-16 pt-8 border-t border-gray-100 gap-6">
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
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#1a73e8] hover:text-[#1557b0] transition-colors bg-[#f8f9fc] px-4 py-2 rounded-lg hover:bg-[#e8f0fe] w-full sm:w-32 justify-center"
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
