import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { FcGoogle } from 'react-icons/fc'
import { FaFacebookF } from 'react-icons/fa'

function getUsers() {
  try {
    return JSON.parse(localStorage.getItem('cc_users')) || []
  } catch {
    return []
  }
}

function ensureDemo() {
  if (!localStorage.getItem('cc_users')) {
    const demo = [
      {
        name: 'Alice Johnson',
        email: 'alice@example.com',
        password: 'password123',
        jobs: [
          { id: 1, title: 'Frontend Dev', company: 'Acme Co', status: 'Applied' }
        ]
      }
    ]
    localStorage.setItem('cc_users', JSON.stringify(demo))
  }
}

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [rememberMe, setRememberMe] = useState(false)
  const nav = useNavigate()

  ensureDemo()

  function submit(e) {
    e.preventDefault()
    try {
      const users = getUsers()
      const found = users.find(u => u.email === email.trim() && u.password === password)
      if (!found) throw new Error('Invalid credentials')
      localStorage.setItem('cc_session', JSON.stringify({ name: found.name, email: found.email }))
      nav('/dashboard')
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0b132b] to-[#1b263b] relative overflow-hidden stars-bg">
      {/* Animated globe/particle effects */}
      <div className="absolute w-[600px] h-[600px] rounded-full bg-gradient-to-br from-cyan-500/20 to-emerald-400/20 blur-3xl top-[-200px] right-[-100px] animate-pulse-slow"></div>
      <div className="absolute w-[400px] h-[400px] rounded-full bg-gradient-to-br from-emerald-400/20 to-cyan-500/20 blur-3xl bottom-[-100px] left-[-100px] animate-float"></div>
      
      <div className="w-[380px] p-8 backdrop-blur-lg bg-white/15 shadow-[0_0_25px_rgba(0,255,255,0.3)] border border-white/30 rounded-xl relative z-10">
        {/* Logo and Title */}
        <div className="text-center mb-8">
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-4xl font-extrabold bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent mb-2 drop-shadow-[0_0_15px_rgba(0,255,255,0.5)]">C</h1>
            <p className="text-xl font-semibold text-[#f0f0f0]">CareerConnect</p>
          </div>
        </div>

        {error && <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm p-3 rounded-lg mb-6 text-center">{error}</div>}

        <form onSubmit={submit} className="space-y-6">
          <div>
            <label className="block text-gray-200 text-sm font-medium mb-2">Email</label>
            <input 
              className="w-full bg-white/5 border border-white/30 text-white placeholder-gray-300 rounded-lg px-4 py-3 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/50 hover:border-cyan-400/50 transition-all duration-300 ease-in-out"
              value={email}
              onChange={e => setEmail(e.target.value)}
              type="email"
              required
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label className="block text-gray-200 text-sm font-medium mb-2">Password</label>
            <input 
              className="w-full bg-white/5 border border-white/30 text-white placeholder-gray-300 rounded-lg px-4 py-3 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/50 hover:border-cyan-400/50 transition-all duration-300 ease-in-out"
              value={password}
              onChange={e => setPassword(e.target.value)}
              type="password"
              required
              placeholder="Enter your password"
            />
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center text-gray-300">
              <input
                type="checkbox"
                className="mr-2 rounded border-white/20 text-purple-500 focus:ring-purple-400 bg-white/10"
                checked={rememberMe}
                onChange={e => setRememberMe(e.target.checked)}
              />
              Remember me
            </label>
            <a href="#" className="text-purple-300 hover:text-purple-400 transition">Forgot Password?</a>
          </div>

          <button 
            className="w-full bg-gradient-to-r from-cyan-400 to-emerald-400 text-white font-bold py-3 rounded-lg hover:scale-[1.02] hover:from-cyan-300 hover:to-emerald-300 shadow-lg hover:shadow-cyan-400/50 ring-1 ring-cyan-400/50 hover:ring-2 hover:ring-cyan-400 transition-all duration-300 ease-in-out"
          >
            Sign In
          </button>

          <div className="relative flex items-center justify-center">
            <hr className="w-full border-white/30" />
            <span className="absolute bg-[#0b132b] px-4 text-gray-200 text-sm">or continue with</span>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button type="button" className="flex items-center justify-center gap-2 bg-white/10 text-white font-medium py-2 px-4 rounded-lg hover:bg-white/20 border border-white/30 hover:border-cyan-400/50 hover:shadow-lg hover:shadow-cyan-400/20 transition-all duration-300">
              <FcGoogle className="text-xl" />
              Google
            </button>
            <button type="button" className="flex items-center justify-center gap-2 bg-white/10 text-white font-medium py-2 px-4 rounded-lg hover:bg-white/20 border border-white/30 hover:border-cyan-400/50 hover:shadow-lg hover:shadow-cyan-400/20 transition-all duration-300">
              <FaFacebookF className="text-xl" />
              Facebook
            </button>
          </div>

          <div className="text-center">
            <Link to="/signup" className="text-gray-200 hover:text-white transition-colors duration-300">
              Don't have an account? <span className="font-semibold text-cyan-400 hover:text-emerald-400 transition-colors duration-300">Sign up</span>
            </Link>
          </div>
        </form>

        <p className="mt-8 text-sm text-gray-300 text-center">
          Try demo: <span className="font-mono text-gray-200 bg-white/10 px-2 py-1 rounded border border-white/20">alice@example.com</span> / <span className="font-mono text-gray-200 bg-white/10 px-2 py-1 rounded border border-white/20">password123</span>
        </p>
      </div>
    </div>
  )
}
