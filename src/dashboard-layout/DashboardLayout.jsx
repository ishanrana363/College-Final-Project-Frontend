import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const DashboardLayout = () => {
  const { user } = useSelector((state) => state.auth);
  if(!user){
    return <Navigate to={"/login"} replace />
  }
  return (
    <div>
      <h1>Dashboard</h1>
      <Outlet />
    </div>
  )
}

export default DashboardLayout
