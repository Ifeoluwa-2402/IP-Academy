import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import SignIn from './components/Auth/SignIn'
import SignUp from './components/Auth/SignUp'
import Dashboard from './components/Dashboard/Dashboard'
import Courses from './components/Courses/Courses'
import ChatRoom from './components/Chat/ChatRoom'
import Progress from './components/Progress/Progress'
import Navbar from './components/Layout/Navbar'

function App() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    // Check if user is logged in from localStorage
    const savedUser = localStorage.getItem('user')
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
  }, [])

  const handleLogin = (userData) => {
    setUser(userData)
    localStorage.setItem('user', JSON.stringify(userData))
  }

  const handleLogout = () => {
    setUser(null)
    localStorage.removeItem('user')
  }

  return (
    <Router>
      <div className="min-h-screen bg-white">
        {user && <Navbar user={user} onLogout={handleLogout} />}
        <Routes>
          <Route 
            path="/signin" 
            element={user ? <Navigate to="/dashboard" /> : <SignIn onLogin={handleLogin} />} 
          />
          <Route 
            path="/signup" 
            element={user ? <Navigate to="/dashboard" /> : <SignUp onLogin={handleLogin} />} 
          />
          <Route 
            path="/dashboard" 
            element={user ? <Dashboard user={user} /> : <Navigate to="/signin" />} 
          />
          <Route 
            path="/courses" 
            element={user ? <Courses user={user} /> : <Navigate to="/signin" />} 
          />
          <Route 
            path="/progress" 
            element={user ? <Progress user={user} /> : <Navigate to="/signin" />} 
          />
          <Route 
            path="/chat" 
            element={user ? <ChatRoom user={user} /> : <Navigate to="/signin" />} 
          />
          <Route 
            path="/" 
            element={user ? <Navigate to="/dashboard" /> : <Navigate to="/signin" />} 
          />
        </Routes>
      </div>
    </Router>
  )
}

export default App

