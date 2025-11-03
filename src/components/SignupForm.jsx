import React, { useState } from 'react'
import { HiMail } from 'react-icons/hi'
import { RiLockPasswordLine, RiUserLine } from 'react-icons/ri'

export default function SignupForm({ className = '' }) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle signup logic here
  }

  const InputField = ({ icon: Icon, label, type, name, placeholder }) => (
    <div className="mb-4">
      <label className="block text-gray-200 text-sm font-medium mb-2">{label}</label>
      <div className="relative">
        <Icon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
        <input
          type={type}
          name={name}
          placeholder={placeholder}
          value={formData[name]}
          onChange={handleChange}
          className="w-full bg-white/5 border border-white/30 text-white placeholder-gray-300 rounded-lg pl-10 pr-4 py-3 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/50 hover:border-cyan-400/50 transition-all duration-300 ease-in-out"
          required
        />
      </div>
    </div>
  )

  return (
    <form onSubmit={handleSubmit} className={className}>
      {/* Logo */}
      <div className="text-center mb-8">
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-4xl font-extrabold bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent mb-2 drop-shadow-[0_0_15px_rgba(0,255,255,0.5)]">C</h1>
          <p className="text-xl font-semibold text-[#f0f0f0]">CareerConnect</p>
        </div>
        <h2 className="text-2xl font-bold text-white mt-6">Sign Up</h2>
        <p className="text-gray-300 mt-2">Create your CareerConnect account</p>
      </div>

      {/* Form Fields */}
      <div className="space-y-4">
        <InputField
          icon={RiUserLine}
          label="Full Name"
          type="text"
          name="fullName"
          placeholder="Enter your full name"
        />
        
        <InputField
          icon={HiMail}
          label="Email Address"
          type="email"
          name="email"
          placeholder="Enter your email"
        />

        <InputField
          icon={RiLockPasswordLine}
          label="Password"
          type="password"
          name="password"
          placeholder="Create a password"
        />

        <InputField
          icon={RiLockPasswordLine}
          label="Confirm Password"
          type="password"
          name="confirmPassword"
          placeholder="Confirm your password"
        />

        <button 
          type="submit"
          className="w-full bg-gradient-to-r from-cyan-400 to-emerald-400 text-white font-bold py-3 rounded-lg hover:scale-[1.02] hover:from-cyan-300 hover:to-emerald-300 shadow-lg hover:shadow-cyan-400/50 ring-1 ring-cyan-400/50 hover:ring-2 hover:ring-cyan-400 transition-all duration-300 ease-in-out"
        >
          Create Account
        </button>

        {/* Social Login */}
        <div className="relative flex items-center justify-center mt-6">
          <hr className="w-full border-white/30" />
          <span className="absolute bg-transparent px-4 text-gray-200 text-sm">or continue with</span>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-6">
          <button type="button" className="flex items-center justify-center gap-2 bg-white/10 text-white font-medium py-2 px-4 rounded-lg hover:bg-white/20 border border-white/30 hover:border-cyan-400/50 hover:shadow-lg hover:shadow-cyan-400/20 transition-all duration-300">
            <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5" />
            Google
          </button>
          <button type="button" className="flex items-center justify-center gap-2 bg-white/10 text-white font-medium py-2 px-4 rounded-lg hover:bg-white/20 border border-white/30 hover:border-cyan-400/50 hover:shadow-lg hover:shadow-cyan-400/20 transition-all duration-300">
            <img src="https://www.svgrepo.com/show/475647/facebook-color.svg" alt="Facebook" className="w-5 h-5" />
            Facebook
          </button>
        </div>

        <p className="text-sm text-gray-300 text-center mt-6">
          By signing up, you agree to our{" "}
          <a href="#" className="text-cyan-400 hover:text-emerald-400 transition-colors">Terms</a>
          {" "}and{" "}
          <a href="#" className="text-cyan-400 hover:text-emerald-400 transition-colors">Privacy Policy</a>
        </p>
      </div>
    </form>
  )
}