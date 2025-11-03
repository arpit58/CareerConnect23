import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { HiOutlineSearch, HiX, HiMenuAlt2 } from 'react-icons/hi'
import { FiUser } from 'react-icons/fi'

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

function getSession() {
  try {
    return JSON.parse(localStorage.getItem('cc_session'))
  } catch {
    return null
  }
}

// Mock data for filters
const LOCATIONS = ['San Francisco', 'New York', 'Austin', 'Seattle', 'Boston']
const COMPANIES = ['TechCorp', 'DataTech', 'ProductX', 'InnovateCo', 'StartupXYZ']
const UNIVERSITIES = ['Stanford', 'MIT', 'UT Austin', 'Berkeley', 'Harvard']

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [selectedFilters, setSelectedFilters] = useState({
    locations: [],
    companies: [],
    universities: [],
  })
  const [searchTerm, setSearchTerm] = useState('')
  const [users, setUsers] = useState(getUsers())

  // Filter handling
  const toggleFilter = (type, value) => {
    setSelectedFilters(prev => {
      const current = prev[type]
      return {
        ...prev,
        [type]: current.includes(value)
          ? current.filter(item => item !== value)
          : [...current, value]
      }
    })
  }

  const removeFilter = (type, value) => {
    setSelectedFilters(prev => ({
      ...prev,
      [type]: prev[type].filter(item => item !== value)
    }))
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 bg-white shadow-sm z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="md:hidden p-2 rounded-md hover:bg-gray-100"
              >
                <HiMenuAlt2 className="h-6 w-6 text-gray-600" />
              </button>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-extrabold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent relative">
                  C
                  <motion.span
                    className="absolute w-1.5 h-1.5 bg-blue-400 rounded-full"
                    style={{ top: -2, right: -2 }}
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
                </h1>
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-500 to-green-400 bg-clip-text text-transparent">
                  areerConnect
                </h1>
              </div>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/dashboard" className="text-gray-900 hover:text-blue-500 transition-colors duration-200">
                Dashboard
              </Link>
              <Link to="/candidates" className="text-gray-600 hover:text-blue-500 transition-colors duration-200">
                Candidates
              </Link>
              <Link to="/jobs" className="text-gray-600 hover:text-blue-500 transition-colors duration-200">
                Jobs
              </Link>
              <div className="flex items-center space-x-3 ml-8">
                <div className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-500 to-green-400 flex items-center justify-center text-white">
                  <FiUser />
                </div>
                <button className="text-gray-600 hover:text-blue-500 transition-colors duration-200">
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-8">
            <div className="flex flex-col md:flex-row gap-8">
              {/* Sidebar Filters */}
              <div className={`md:w-80 ${sidebarOpen ? 'block' : 'hidden md:block'}`}>
                <div className="bg-white shadow-md rounded-xl p-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">Filters</h2>
                  
                  {/* Search */}
                  <div className="mb-6">
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Search job role..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                      <HiOutlineSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    </div>
                  </div>

                  {/* Filter Groups */}
                  {[
                    { title: 'Location', items: LOCATIONS, key: 'locations' },
                    { title: 'Company', items: COMPANIES, key: 'companies' },
                    { title: 'University', items: UNIVERSITIES, key: 'universities' },
                  ].map((group) => (
                    <div key={group.key} className="mb-6">
                      <h3 className="text-sm font-medium text-gray-900 mb-3">{group.title}</h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedFilters[group.key].map((item) => (
                          <span
                            key={item}
                            className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-700"
                          >
                            {item}
                            <button
                              onClick={() => removeFilter(group.key, item)}
                              className="ml-2 hover:text-blue-900"
                            >
                              <HiX className="h-4 w-4" />
                            </button>
                          </span>
                        ))}
                      </div>
                      <div className="mt-2">
                        <select
                          onChange={(e) => toggleFilter(group.key, e.target.value)}
                          value=""
                          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                          <option value="">Select {group.title}...</option>
                          {group.items.filter(item => !selectedFilters[group.key].includes(item)).map(item => (
                            <option key={item} value={item}>{item}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Main Content Table */}
              <div className="flex-1">
                <div className="bg-white shadow-md rounded-xl p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-lg font-semibold text-gray-900">Registered Users</h2>
                    <button className="px-4 py-2 bg-gradient-to-r from-blue-500 to-green-400 text-white rounded-lg hover:scale-105 transition-transform duration-200">
                      + Add User
                    </button>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="min-w-full">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Name</th>
                          <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Location</th>
                          <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Position</th>
                          <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">University</th>
                          <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {users.map((user) => (
                          <tr
                            key={user.email}
                            className="border-b border-gray-100 hover:bg-gray-50 transition-colors duration-200"
                          >
                            <td className="py-3 px-4">
                              <div className="flex items-center">
                                <div className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-500 to-green-400 flex items-center justify-center text-white mr-3">
                                  {user.name.charAt(0)}
                                </div>
                                <span className="font-medium text-gray-900">{user.name}</span>
                              </div>
                            </td>
                            <td className="py-3 px-4 text-gray-600">San Francisco, CA</td>
                            <td className="py-3 px-4">
                              <span className="px-3 py-1 rounded-full text-sm bg-purple-100 text-purple-700">
                                Frontend Developer
                              </span>
                            </td>
                            <td className="py-3 px-4 text-gray-600">Stanford University</td>
                            <td className="py-3 px-4">
                              <button className="text-blue-500 hover:text-blue-700 hover:underline hover:scale-105 transition-all duration-200">
                                View Details
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
