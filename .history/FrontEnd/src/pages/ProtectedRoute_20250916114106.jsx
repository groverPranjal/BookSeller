import React from 'react'
import { useLocation } from 'react-router-dom';

function ProtectedRoute({children}) {
    const token=localStorage.getItem('authToken');
    const location=useLocation();

    if(!token){
        return (
            
        )
    }
  return (
    <div>ProtectedRoute</div>
  )
}

export default ProtectedRoute