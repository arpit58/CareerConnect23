import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FcGoogle } from 'react-icons/fc'
import { FaFacebookF } from 'react-icons/fa'

function getUsers() {
  try {
    return JSON.parse(localStorage.getItem('cc_users')) || []
  } catch {
    return []
  }
}

function saveUsers(users) {
  localStorage.setItem('cc_users', JSON.stringify(users))
}

function ensureDemo() {
  if (!localStorage.getItem('cc_users')) {
    const demo = [
      {
        name: 'Alice Johnson',
        email: 'alice@example.com',
        password: 'password123',
        jobs: [
          { id: 1, title: 'Frontend Dev', company: 'Acme Co', status: 'Applied' },
          { id: 2, title: 'UI Engineer', company: 'Beta Inc', status: 'Interview' }
        ]
      }
    ]
    saveUsers(demo)
  }
}

export default function Signup() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [showContent, setShowContent] = useState(false)
  const [animationPhase, setAnimationPhase] = useState(0)
  const nav = useNavigate()

  // Animation sequence controller
  React.useEffect(() => {
    const phases = [
      { delay: 0, phase: 1 },    // Initial Career Journey texts
      { delay: 2000, phase: 2 }, // Collision and logo appearance
      { delay: 3000, phase: 3 }, // Show final Career Journey text
      { delay: 4000, phase: 4 }  // Show form
    ]

    phases.forEach(({ delay, phase }) => {
      const timer = setTimeout(() => {
        setAnimationPhase(phase)
      }, delay)
      return () => clearTimeout(timer)
    })
  }, [])

  ensureDemo()

  function submit(e) {
    e.preventDefault()
    try {
      if (password !== confirmPassword) {
        throw new Error('Passwords do not match')
      }

      const users = getUsers()
      if (users.find(u => u.email === email.trim())) {
        throw new Error('Email already registered')
      }

      const newUser = { name, email: email.trim(), password, jobs: [] }
      users.push(newUser)
      saveUsers(users)
      localStorage.setItem('cc_session', JSON.stringify({ name: newUser.name, email: newUser.email }))
      nav('/dashboard')
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row items-stretch bg-gradient-to-br from-[#1e1b4b] via-[#3b0764] to-[#1e3a8a] relative overflow-hidden stars-bg font-['Inter']">
      {/* Animated background elements */}
      <motion.div 
        className="absolute w-[600px] h-[600px] rounded-full bg-gradient-to-br from-purple-500/20 to-blue-500/20 blur-3xl"
        initial={{ x: -200, y: -200, opacity: 0 }}
        animate={{ x: -160, y: -160, opacity: 0.6 }}
        transition={{ duration: 2, ease: "easeOut" }}
      />
      <motion.div 
        className="absolute w-[400px] h-[400px] rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 blur-3xl"
        initial={{ x: 200, y: 200, opacity: 0 }}
        animate={{ x: 160, y: 160, opacity: 0.6 }}
        transition={{ duration: 2, ease: "easeOut", delay: 0.5 }}
      />
      
      {/* Initial Animation Sequence */}
      <AnimatePresence>
        {animationPhase === 1 && (
          <motion.div 
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative w-[600px] flex items-center justify-center">
              <motion.span
                className="absolute text-4xl font-bold text-white"
                initial={{ x: -300, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 100, opacity: 0 }}
                transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
              >
                Career Journey
              </motion.span>
              <motion.span
                className="absolute text-4xl font-bold text-white"
                initial={{ x: 300, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -100, opacity: 0 }}
                transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
              >
                Career Journey
              </motion.span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Logo Animation */}
      <AnimatePresence>
        {animationPhase >= 2 && (
          <motion.div 
            className="absolute inset-0 flex flex-col items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative flex items-center justify-center gap-3">
              <motion.div
                className="relative"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ 
                  type: "spring",
                  stiffness: 200,
                  damping: 20,
                  duration: 0.8
                }}
              >
                <motion.span 
                  className="text-5xl font-extrabold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent"
                >
                  C
                </motion.span>
                {/* Spark Effect */}
                <motion.div
                  className="absolute -top-1 -right-1 w-2 h-2 bg-blue-400 rounded-full"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </motion.div>
              
              <motion.span
                className="text-3xl font-semibold text-white"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                areerConnect
              </motion.span>
            </div>

            {/* Removed static Career Journey text */}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Left Panel - Hero Area */}
      {animationPhase >= 4 && (
        <motion.div 
          className="w-full md:w-[65%] min-h-screen flex flex-col items-center justify-center p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="max-w-2xl text-center space-y-6">
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-extrabold bg-gradient-to-r from-purple-300 to-blue-200 bg-clip-text text-transparent leading-tight"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              JOIN YOUR JOURNEY!
            </motion.h1>
            <motion.p 
              className="text-purple-200 text-lg md:text-xl max-w-xl mx-auto"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              Discover new opportunities and connect with your dream career at CareerConnect
            </motion.p>
            <motion.div 
              className="flex flex-col items-center justify-center mt-12 space-y-8"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <div className="relative w-72 h-72 flex flex-col items-center">
                {/* Glowing background effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-full blur-xl animate-pulse-slow"></div>
                
                {/* Spacecraft container */}
                <motion.div 
                  className="relative z-10 w-full h-full flex flex-col items-center justify-center"
                  animate={{
                    y: [0, -10, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  {/* Spacecraft */}
                  <img 
                    src="https://illustrations.popsy.co/white/artificial-intelligence.svg" 
                    alt="Spacecraft"
                    className="w-48 h-48"
                  />
                  
                  {/* Glowing effect under spacecraft */}
                  <motion.div
                    className="absolute bottom-24 w-24 h-12 bg-gradient-to-t from-purple-500/30 to-transparent blur-lg"
                    animate={{
                      opacity: [0.5, 0.8, 0.5],
                      scale: [1, 1.2, 1],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}

      {/* Right Panel - Signup Form */}
      {animationPhase >= 4 && (
        <motion.div 
          className="w-full md:w-[35%] min-h-screen flex items-center justify-center p-6"
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ 
            duration: 0.8, 
            ease: [0.16, 1, 0.3, 1],
            delay: 0.2 
          }}
        >
          <motion.div 
            className="w-full max-w-md p-8 bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl shadow-2xl shadow-[0_0_25px_rgba(168,85,247,0.2)] relative z-10"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            {/* Logo and Title */}
            <motion.div 
              className="text-center mb-10"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.5,
                    delay: 0.8
                  }
                }
              }}
            >
              <div className="flex items-center justify-center gap-3 mb-4">
                <motion.h1 
                  className="text-4xl font-extrabold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent relative"
                  whileHover={{ scale: 1.05 }}
                >
                  C
                  <motion.span
                    className="absolute w-2 h-2 bg-blue-400 rounded-full"
                    style={{ top: -4, right: -4 }}
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.5, 1, 0.5],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                </motion.h1>
                <motion.span 
                  className="text-white text-2xl font-semibold tracking-wide"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 1 }}
                >
                  CareerConnect
                </motion.span>
              </div>
              <motion.h2 
                className="text-white text-xl font-bold"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 1.2 }}
              >
                Create Your Account
              </motion.h2>
            </motion.div>

            {error && (
              <motion.div 
                className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm p-3 rounded-lg mb-6 text-center"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                {error}
              </motion.div>
            )}

            <motion.form 
              onSubmit={submit} 
              className="space-y-5"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.1
                  }
                }
              }}
              initial="hidden"
              animate="visible"
            >
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 }
                }}
              >
                <label className="block text-gray-200 text-sm font-medium mb-2">Full Name</label>
                <input 
                  className="form-input-galaxy"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  type="text"
                  required
                  placeholder="Enter your name"
                />
              </motion.div>

              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 }
                }}
              >
                <label className="block text-gray-200 text-sm font-medium mb-2">Email</label>
                <input 
                  className="form-input-galaxy"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  type="email"
                  required
                  placeholder="Enter your email"
                />
              </motion.div>

              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 }
                }}
              >
                <label className="block text-gray-200 text-sm font-medium mb-2">Password</label>
                <input 
                  className="form-input-galaxy"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  type="password"
                  required
                  placeholder="Create a password"
                />
              </motion.div>

              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 }
                }}
              >
                <label className="block text-gray-200 text-sm font-medium mb-2">Confirm Password</label>
                <input 
                  className="form-input-galaxy"
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                  type="password"
                  required
                  placeholder="Confirm your password"
                />
              </motion.div>

              <motion.button 
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium py-3.5 rounded-lg hover:from-blue-600 hover:to-purple-700 active:scale-[0.98] transition-all duration-300 mt-4"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 }
                }}
              >
                Create Account
              </motion.button>

              <motion.div 
                className="relative flex items-center justify-center my-6"
                variants={{
                  hidden: { opacity: 0 },
                  visible: { opacity: 1 }
                }}
              >
                <hr className="w-full border-white/20" />
                <span className="absolute bg-[#3b0764] px-4 text-gray-300 text-sm font-medium">
                  or continue with
                </span>
              </motion.div>

              <motion.div 
                className="grid grid-cols-2 gap-4 mb-6"
                variants={{
                  hidden: { opacity: 0 },
                  visible: { opacity: 1 }
                }}
              >
                <motion.button 
                  type="button" 
                  className="flex items-center justify-center gap-3 bg-white/10 backdrop-blur-md text-white font-medium py-2.5 px-4 rounded-lg border border-white/20 hover:bg-white/20 active:scale-[0.98] transition-all duration-200"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <FcGoogle className="text-xl" />
                  Google
                </motion.button>
                <motion.button 
                  type="button" 
                  className="flex items-center justify-center gap-3 bg-[#1877f2]/90 backdrop-blur-md text-white font-medium py-2.5 px-4 rounded-lg border border-[#1877f2]/30 hover:bg-[#1877f2] active:scale-[0.98] transition-all duration-200"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <FaFacebookF className="text-xl" />
                  Facebook
                </motion.button>
              </motion.div>

              <motion.div 
                className="text-center"
                variants={{
                  hidden: { opacity: 0 },
                  visible: { opacity: 1 }
                }}
              >
                <Link 
                  to="/login" 
                  className="text-gray-300 hover:text-white transition-colors duration-200"
                >
                  Already have an account? <span className="font-semibold text-purple-400 hover:text-purple-300">Sign in</span>
                </Link>
              </motion.div>
            </motion.form>
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}
