// eslint-disable-next-line no-unused-vars
import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
const PrivateRoute = ({ children, role }) => {
    const { user } = useSelector((state) => state.auth);
    const location = useLocation()
    if (!user) {
        return <Navigate to="/login" state={{ from: location }} replace />
    }
    if (role && user?.role !== role) {
        alert("Access denied! You must be an admin");
        return <Navigate to="/login" state={{ from: location }} replace />
    }
    return children;
}

export default PrivateRoute