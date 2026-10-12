import { Outlet } from 'react-router-dom'
import AdminHeader from './AdminHeader'
import AdminSidebar from './AdminSidebar'

// সব অ্যাডমিন পেজের কাঠামো: সাইডবার + উপরের হেডার + পেজের অংশ
export default function AdminLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50 lg:flex-row">
      <AdminSidebar />

      <div className="flex min-w-0 flex-1 flex-col">
        <AdminHeader />
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
