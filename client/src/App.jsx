import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import DashboardPage from './pages/DashboardPage'

function AnimatedRoutes() {
  const location = useLocation()

  const scrollToBuilder = () => {
    if (location.pathname !== '/') {
      window.location.href = '/#builder'
      return
    }
    document.getElementById('builder')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <Navbar onGenerateClick={scrollToBuilder} />
      <AnimatePresence mode="wait">
        <motion.main
          key={location.pathname}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.25 }}
        >
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<DashboardPage />} />
          </Routes>
        </motion.main>
      </AnimatePresence>
      <Footer />
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AnimatedRoutes />
    </BrowserRouter>
  )
}
