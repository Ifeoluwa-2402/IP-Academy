import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

const Navbar = ({ user, onLogout }) => {
  const location = useLocation()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const isActive = (path) => location.pathname === path

  const navLinks = [
    { path: '/dashboard', label: 'Dashboard', icon: '📊' },
    { path: '/courses', label: 'Courses', icon: '📚' },
    { path: '/progress', label: 'Progress', icon: '📈' },
    { path: '/chat', label: 'Chat Room', icon: '💬' },
  ]

  return (
    <nav className="bg-primary text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link 
            to="/dashboard" 
            className="text-xl md:text-2xl font-bold text-secondary hover:text-secondary-light transition-colors duration-300 flex items-center space-x-2"
          >
            <span>🎓</span>
            <span>IP Academy</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 transform hover:scale-105 ${
                  isActive(link.path)
                    ? 'bg-primary-light text-white shadow-md'
                    : 'text-white hover:bg-primary-light'
                }`}
              >
                <span className="hidden lg:inline mr-1">{link.icon}</span>
                {link.label}
              </Link>
            ))}
          </div>

          {/* User Section - Desktop */}
          <div className="hidden md:flex items-center space-x-3 lg:space-x-4">
            <div className="hidden lg:flex items-center space-x-2 bg-primary-light bg-opacity-30 px-3 py-1.5 rounded-full">
              <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center text-primary-dark font-bold text-sm">
                {user?.name?.charAt(0).toUpperCase() || user?.email?.charAt(0).toUpperCase() || 'U'}
              </div>
              <span className="text-sm max-w-[120px] truncate">
                {user?.name || user?.email}
              </span>
            </div>
            <button
              onClick={onLogout}
              className="bg-secondary text-primary-dark px-4 py-2 rounded-md text-sm font-medium hover:bg-secondary-light transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg"
            >
              Logout
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-md text-white hover:bg-primary-light transition-colors duration-300"
            aria-label="Toggle menu"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {mobileMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${
            mobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="px-2 pt-2 pb-4 space-y-1 border-t border-primary-light">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-3 py-2 rounded-md text-base font-medium transition-all duration-300 ${
                  isActive(link.path)
                    ? 'bg-primary-light text-white'
                    : 'text-white hover:bg-primary-light'
                }`}
              >
                <span className="mr-2">{link.icon}</span>
                {link.label}
              </Link>
            ))}
            <div className="pt-2 border-t border-primary-light">
              <div className="px-3 py-2 text-sm text-secondary">
                👤 {user?.name || user?.email}
              </div>
              <button
                onClick={onLogout}
                className="w-full mt-2 bg-secondary text-primary-dark px-4 py-2 rounded-md text-sm font-medium hover:bg-secondary-light transition-colors duration-300"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar

