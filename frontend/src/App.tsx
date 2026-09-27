import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import WhatsAppFloat from './components/WhatsAppFloat'
import ScrollToTop from './components/ScrollToTop'
import SplashScreen from './components/SplashScreen'
import Home from './pages/Home'
import About from './pages/About'
import Services from './pages/Services'
import Blog from './pages/Blog'
import Careers from './pages/Careers'
import Contact from './pages/Contact'
import Appointment from './pages/Appointment'
import BlogPost from './pages/BlogPost'
import NotFound from './pages/NotFound'
import PrivacyPolicy from './pages/PrivacyPolicy'
import TermsOfService from './pages/TermsOfService'

export default function App() {
  const [showSplash, setShowSplash] = useState(true)
  const [mainVisible, setMainVisible] = useState(false)

  const handleSplashComplete = () => {
    setShowSplash(false)
    setMainVisible(true)
  }

  return (
    <BrowserRouter>
      {showSplash && <SplashScreen onComplete={handleSplashComplete} />}
      <AnimatePresence>
        {mainVisible && (
          <motion.div
            key="main-content"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            <ScrollToTop />
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:id" element={<BlogPost />} />
              <Route path="/careers" element={<Careers />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/appointment" element={<Appointment />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/terms-of-service" element={<TermsOfService />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <Footer />
            <WhatsAppFloat />
          </motion.div>
        )}
      </AnimatePresence>
    </BrowserRouter>
  )
}