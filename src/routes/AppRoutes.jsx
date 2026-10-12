import { Route, Routes } from 'react-router-dom'
import ProtectedRoute from './ProtectedRoute'
import Home from '../pages/Home'
import Biography from '../pages/Biography'
import About from '../pages/About'
import News from '../pages/News'
import Announcements from '../pages/Announcements'
import NewsDetail from '../pages/NewsDetail'
import Mosques from '../pages/Mosques'
import Institutions from '../pages/Institutions'
import Places from '../pages/Places'
import Emergency from '../pages/Emergency'
import Community from '../pages/Community'
import Welfare from '../pages/Welfare'
import Bayan from '../pages/Bayan'
import MosqueBayan from '../pages/MosqueBayan'
import Login from '../pages/auth/Login'
import Register from '../pages/auth/Register'
import ForgotPassword from '../pages/auth/ForgotPassword'
import ResetPassword from '../pages/auth/ResetPassword'
import People from '../pages/People'
import Families from '../pages/Families'
import BloodDonors from '../pages/BloodDonors'
import Dashboard from '../pages/dashboard/Dashboard'
import Profile from '../pages/dashboard/Profile'
import ComingSoon from '../pages/ComingSoon'
import NotFound from '../pages/NotFound'
import AdminLayout from '../components/admin/AdminLayout'
import AdminDashboard from '../pages/admin/AdminDashboard'
import AdminUsers from '../pages/admin/AdminUsers'
import AdminPeople from '../pages/admin/AdminPeople'
import AdminFamilies from '../pages/admin/AdminFamilies'
import AdminBlood from '../pages/admin/AdminBlood'
import AdminZakat from '../pages/admin/AdminZakat'
import AdminHelp from '../pages/admin/AdminHelp'
import AdminEducation from '../pages/admin/AdminEducation'
import AdminMosques from '../pages/admin/AdminMosques'
import AdminInstitutions from '../pages/admin/AdminInstitutions'
import AdminPlaces from '../pages/admin/AdminPlaces'
import AdminNews from '../pages/admin/AdminNews'
import AdminAnnouncements from '../pages/admin/AdminAnnouncements'
import AdminEmergency from '../pages/admin/AdminEmergency'
import AdminBayan from '../pages/admin/AdminBayan'
import AdminKitab from '../pages/admin/AdminKitab'
import AdminKitabProgress from '../pages/admin/AdminKitabProgress'

// এখনো যে পেজগুলো বানানো হয়নি — একটা একটা করে আসল পেজ দিয়ে বদলে দেব
const PLACEHOLDER_PATHS = []

export default function AppRoutes() {
  return (
    <Routes>
      {/* সবার জন্য খোলা */}
      <Route path="/" element={<Home />} />
      <Route path="/biography" element={<Biography />} />
      <Route path="/about" element={<About />} />
      <Route path="/news" element={<News />} />
      <Route path="/news/:id" element={<NewsDetail />} />
      <Route path="/announcements" element={<Announcements />} />
      <Route path="/mosques" element={<Mosques />} />
      <Route path="/mosques/:id/bayan" element={<MosqueBayan />} />
      <Route path="/institutions" element={<Institutions />} />
      <Route path="/places" element={<Places />} />
      <Route path="/emergency" element={<Emergency />} />
      <Route path="/community" element={<Community />} />
      <Route path="/bayan" element={<Bayan />} />

      {/* লগইন সম্পর্কিত */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />

      {/* শুধু লগইন করা সদস্যদের জন্য */}
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/people" element={<People />} />
        <Route path="/families" element={<Families />} />
        <Route path="/blood-donors" element={<BloodDonors />} />
        <Route path="/welfare" element={<Welfare />} />
      </Route>

      {/* শুধু অ্যাডমিন ও মডারেটর (ব্যবস্থাপনা) */}
      <Route element={<ProtectedRoute roles={['admin', 'moderator']} />}>
        <Route element={<AdminLayout />}>
          <Route path="/admin" element={<AdminDashboard />} />
          {/* ইউজার ব্যবস্থাপনা শুধু অ্যাডমিনের (মডারেটর পাবে না) */}
          <Route element={<ProtectedRoute roles={['admin']} />}>
            <Route path="/admin/users" element={<AdminUsers />} />
          </Route>
          <Route path="/admin/people" element={<AdminPeople />} />
          <Route path="/admin/families" element={<AdminFamilies />} />
          <Route path="/admin/blood" element={<AdminBlood />} />
          <Route path="/admin/zakat" element={<AdminZakat />} />
          <Route path="/admin/help" element={<AdminHelp />} />
          <Route path="/admin/education" element={<AdminEducation />} />
          <Route path="/admin/mosques" element={<AdminMosques />} />
          <Route path="/admin/institutions" element={<AdminInstitutions />} />
          <Route path="/admin/places" element={<AdminPlaces />} />
          <Route path="/admin/news" element={<AdminNews />} />
          <Route path="/admin/announcements" element={<AdminAnnouncements />} />
          <Route path="/admin/emergency" element={<AdminEmergency />} />
          <Route path="/admin/bayan" element={<AdminBayan />} />
          <Route path="/admin/kitab" element={<AdminKitab />} />
          <Route path="/admin/kitab-progress" element={<AdminKitabProgress />} />
        </Route>
      </Route>

      {PLACEHOLDER_PATHS.map((path) => (
        <Route key={path} path={path} element={<ComingSoon />} />
      ))}

      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
