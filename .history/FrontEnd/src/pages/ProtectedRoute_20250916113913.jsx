import React from 'react'

function ProtectedRoute({children}) {
    const token=localStorage.getItem
  return (
    <div>ProtectedRoute</div>
  )
}

export default ProtectedRoute