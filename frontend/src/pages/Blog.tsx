import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronRight, Clock, ArrowRight } from 'lucide-react'
import { fetchPosts } from '../lib/api'
import type { NormalizedPost } from '../lib/api'

// Posts are loaded synchronously at module init from local .md files —
// no network request, no loading state, no error state needed.
const allPosts: NormalizedPost[] = fetchPosts()

const categories = ['All', 'Strategy', 'Technology', 'Finance', 'Tax']

export default function Blog() {
  const [active, setActive] = useState('All')

  const filtered = active === 'All' ? allPosts : allPosts.filter(p => p.category === active)

  // Featured post: first explicitly featured, else most recent
  const featured = allPosts.find(p => p.featured) || allPosts[0]

  // Everything other than the featured post (if on 'All'), else full filtered list
  const gridPosts =
    active === 'All'
      ? allPosts.filter(p => p.slug !== featured?.slug)
      : filtered

  return (
    <main className="pt-[68px]">
      {/* ── HERO ── */}
      <section className="bg-gradient-to-br from-[#001a34] via-[#001a34] to-[#0d3362] py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-[#1a73e8] mb-4">Insights &amp; Ideas</p>
          <h1 className="text-4xl lg:text-5xl font-extrabold text-white mb-6">Our <span className="text-[#1a73e8]">Blog</span></h1>
          <p className="text-gray-300 text-base leading-relaxed max-w-xl mx-auto">
            Expert perspectives on finance, strategy, taxation, and business advisory — straight from our team of certified professionals.
          </p>
        </div>
      </section>

      {allPosts.length === 0 && (
        <section className="py-24 text-center bg-white">
          <p className="text-gray-500">No blog posts found at the moment. Check back soon!</p>
        </section>
      )}

      {allPosts.length > 0 && (
        <>
          {/* ── FEATURED POST ── */}
          {active === 'All' && featured && (
            <section className="py-16 bg-white">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <p className="text-xs font-bold uppercase tracking-widest text-[#1a73e8] mb-6">Featured Article</p>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center bg-[#f8f9fc] rounded-3xl overflow-hidden border border-gray-100 shadow-sm">
                  <div className="overflow-hidden h-72 lg:h-full">
                    <img
                      src={featured.img}
                      alt={featured.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-8 lg:p-10">
                    <span className="inline-flex px-2.5 py-1 rounded-full text-[11px] font-bold bg-[#e8f0fe] text-[#1a73e8] uppercase tracking-wider mb-4">
                      {featured.category}
                    </span>
                    <h2 className="text-2xl lg:text-3xl font-extrabold text-[#0d1b2e] mb-4 leading-snug">{featured.title}</h2>
                    <p className="text-gray-500 text-sm leading-relaxed mb-6">{featured.excerpt}</p>
                    <div className="flex items-center gap-4 text-xs text-gray-400 mb-6">
                      <span className="font-medium text-[#0d1b2e]">{featured.author}</span>
                      <span>·</span>
                      <span>{featured.date}</span>
                      <span>·</span>
                      <span className="flex items-center gap-1"><Clock size={12} />{featured.readTime}</span>
                    </div>
                    <Link
                      to={`/blog/${featured.slug}`}
                      className="inline-flex items-center gap-2 px-6 py-3 bg-[#1a73e8] text-white font-semibold rounded-xl hover:bg-[#1557b0] transition-all hover:-translate-y-0.5 text-sm"
                    >
                      Read Full Article <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* ── FILTER + GRID ── */}
          <section className="py-16 bg-[#f8f9fc]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {/* Filter tabs */}
              <div className="flex flex-wrap gap-2 mb-10">
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setActive(cat)}
                    className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                      active === cat
                        ? 'bg-[#1a73e8] text-white shadow-md'
                        : 'bg-white text-[#4a4a6a] border border-gray-200 hover:border-[#1a73e8] hover:text-[#1a73e8]'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Grid */}
              {gridPosts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
                  {gridPosts.map((post) => (
                    <div key={post.slug} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group flex flex-col">
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
                          <p className="text-sm text-gray-500 leading-relaxed mb-4 line-clamp-2">{post.excerpt}</p>
                        </div>
                        <div className="flex items-center justify-between mt-4">
                          <div className="flex items-center gap-2 text-xs text-gray-400">
                            <Clock size={11} />
                            {post.readTime}
                          </div>
                          <Link
                            to={`/blog/${post.slug}`}
                            className="inline-flex items-center gap-1 text-xs font-semibold text-[#1a73e8] hover:gap-2 transition-all"
                          >
                            Read More <ChevronRight size={12} />
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-500">No matching posts found in this category.</p>
                </div>
              )}
            </div>
          </section>
        </>
      )}

      {/* ── NEWSLETTER ── */}
      <section className="py-20 bg-[#1a73e8]">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-extrabold text-white mb-4">Stay Informed</h2>
          <p className="text-blue-100 mb-8">
            Subscribe to our newsletter and receive expert insights, tax tips, and industry updates directly in your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 px-4 py-3 rounded-xl text-sm text-[#0d1b2e] outline-none bg-white placeholder:text-gray-400 focus:ring-2 focus:ring-white/30"
            />
            <button className="px-6 py-3 bg-[#001a34] text-white font-semibold rounded-xl hover:bg-[#0d3362] transition-colors text-sm">
              Subscribe
            </button>
          </div>
          <p className="text-blue-200 text-xs mt-4">No spam. Unsubscribe at any time.</p>
        </div>
      </section>
    </main>
  )
}