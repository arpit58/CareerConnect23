import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

function getSession() {
  try {
    return JSON.parse(localStorage.getItem('cc_session'))
  } catch {
    return null
  }
}

export default function Navbar() {
  const nav = useNavigate()
  const user = getSession()

  function handleLogout() {
    localStorage.removeItem('cc_session')
    nav('/login')
  }

  return (
    <nav className="bg-indigo-600 text-white">
      <div className="container-max px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link to="/dashboard" className="font-semibold text-lg">
            CareerConnect
          </Link>
          <span className="text-indigo-200 hidden sm:inline">• Job tracker</span>
        </div>

        <div className="flex items-center gap-3">
          <Link to="/" className="hidden sm:inline px-2">Home</Link>
          {!user && <Link to="/login" className="px-2">Login</Link>}
          {!user && (
            <Link to="/signup" className="bg-white text-indigo-600 px-3 py-1 rounded">
              Sign Up
            </Link>
          )}
          {user && (
            <>
              <span className="hidden sm:inline">Hi, {user.name}</span>
              <button onClick={handleLogout} className="bg-indigo-500 hover:bg-indigo-400 px-3 py-1 rounded">
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}
