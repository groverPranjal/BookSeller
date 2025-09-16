import React from 'react'

function ProtectedRoute({children}) {
    const token=localStorage.getItem('authToken')
  return (
    <div>ProtectedRoute</div>
  )
}

export default ProtectedRoute