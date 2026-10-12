import { useLocation } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import ScrollToTop from './components/common/ScrollToTop'
import AppRoutes from './routes/AppRoutes'

export default function App() {
  const { pathname } = useLocation()

  // অ্যাডমিন প্যানেলের নিজস্ব সাইডবার ও হেডার আছে, তাই সাইটের নেভবার/ফুটার লাগবে না
  if (pathname.startsWith('/admin')) {
    return (
      <>
        <ScrollToTop />
        <AppRoutes />
      </>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <ScrollToTop />
      <Navbar />
      <main className="flex-1">
        <AppRoutes />
      </main>
      <Footer />
    </div>
  )
}
