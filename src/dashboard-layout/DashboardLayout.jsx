import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'
import UserMain from './../pages/client/user-main-page/UserMain';
import AdminMain from '../pages/admin/admin-main-page/AdminMain';

const DashboardLayout = () => {
  const { user } = useSelector((state) => state.auth);

  if (!user) {
    alert("You must be logged in");
    return <Navigate to="/login" replace />
  }
  const renderDashboard = () => {
    switch (user?.role) {
      case 'admin':
        return <AdminMain />
      case 'user':
        return <UserMain />

      default:
        return <Navigate to="/login" replace />
    }
  }
  return (
    <div className='container mx-auto flex flex-col md:flex-row gap-4 items-start justify-start'>
      <header className='lg:w-1/4  sm:w-2/5 w-full border mt-5'>
        {
          renderDashboard()
        }
      </header>
      <main className='p-8 bg-white w-full border mt-5'>
        <Outlet />
      </main>
    </div>
  )
}

export default DashboardLayout