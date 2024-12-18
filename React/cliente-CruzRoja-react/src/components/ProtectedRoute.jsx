// src/components/ProtectedRoute.js
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children, requiredRole }) => {
    const { user } = useAuth();
    const location = useLocation();

    // Si no está autenticado, redirigir al login
    if (!user) {
        return <Navigate to="/login" state={{ from: location }} />;
    }

    // Si el rol no coincide, redirigir a una página de acceso denegado
    if (requiredRole && user.role !== requiredRole) {
        return <Navigate to="/access-denied" />;
    }

    return children;
};

export default ProtectedRoute;
