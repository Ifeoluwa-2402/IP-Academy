import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const Dashboard = ({ user }) => {
  const [stats, setStats] = useState({
    enrolledCourses: 0,
    completedCourses: 0,
    totalProgress: 0,
    recentActivity: [],
  })

  useEffect(() => {
    // Load user data
    const users = JSON.parse(localStorage.getItem('users') || '[]')
    const currentUser = users.find((u) => u.id === user.id) || user

    const enrolledCourses = currentUser.enrolledCourses || []
    const progress = currentUser.progress || {}

    let completedCount = 0
    let totalProgress = 0

    enrolledCourses.forEach((courseId) => {
      const courseProgress = progress[courseId] || 0
      totalProgress += courseProgress
      if (courseProgress >= 100) {
        completedCount++
      }
    })

    const avgProgress =
      enrolledCourses.length > 0
        ? Math.round(totalProgress / enrolledCourses.length)
        : 0

    setStats({
      enrolledCourses: enrolledCourses.length,
      completedCourses: completedCount,
      totalProgress: avgProgress,
      recentActivity: currentUser.recentActivity || [],
    })
  }, [user])

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
      <div className="mb-6 md:mb-8 animate-fade-in">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-primary">
          Welcome back, {user.name}!
        </h1>
        <p className="mt-2 text-gray-600 text-sm md:text-base">
          Continue your learning journey with IP Academy
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
        <div className="bg-white rounded-lg shadow-md p-4 md:p-6 border-l-4 border-primary hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 animate-fade-in-up" style={{ animationDelay: '0ms' }}>
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-primary-light rounded-full flex items-center justify-center transition-transform duration-300 hover:scale-110">
                <svg
                  className="w-5 h-5 md:w-6 md:h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
              </div>
            </div>
            <div className="ml-4">
              <p className="text-xs md:text-sm font-medium text-gray-500">
                Enrolled Courses
              </p>
              <p className="text-xl md:text-2xl font-semibold text-primary">
                {stats.enrolledCourses}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-4 md:p-6 border-l-4 border-secondary hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-secondary rounded-full flex items-center justify-center transition-transform duration-300 hover:scale-110">
                <svg
                  className="w-5 h-5 md:w-6 md:h-6 text-primary-dark"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </div>
            <div className="ml-4">
              <p className="text-xs md:text-sm font-medium text-gray-500">
                Completed Courses
              </p>
              <p className="text-xl md:text-2xl font-semibold text-secondary-dark">
                {stats.completedCourses}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-4 md:p-6 border-l-4 border-primary-light hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-primary-light rounded-full flex items-center justify-center transition-transform duration-300 hover:scale-110">
                <svg
                  className="w-5 h-5 md:w-6 md:h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                  />
                </svg>
              </div>
            </div>
            <div className="ml-4">
              <p className="text-xs md:text-sm font-medium text-gray-500">
                Average Progress
              </p>
              <p className="text-xl md:text-2xl font-semibold text-primary-light">
                {stats.totalProgress}%
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        <div className="bg-white rounded-lg shadow-md p-4 md:p-6 hover:shadow-xl transition-all duration-300 animate-fade-in-up" style={{ animationDelay: '300ms' }}>
          <h2 className="text-lg md:text-xl font-semibold text-primary mb-4">
            Quick Actions
          </h2>
          <div className="space-y-3">
            <Link
              to="/courses"
              className="block w-full bg-primary text-white px-4 py-3 rounded-md text-center font-medium hover:bg-primary-light transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg"
            >
              📚 Browse Courses
            </Link>
            <Link
              to="/progress"
              className="block w-full bg-secondary text-primary-dark px-4 py-3 rounded-md text-center font-medium hover:bg-secondary-light transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg"
            >
              📈 View Progress
            </Link>
            <Link
              to="/chat"
              className="block w-full border-2 border-primary text-primary px-4 py-3 rounded-md text-center font-medium hover:bg-primary-light hover:text-white transition-all duration-300 transform hover:scale-105"
            >
              💬 Join Chat Room
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-4 md:p-6 hover:shadow-xl transition-all duration-300 animate-fade-in-up" style={{ animationDelay: '400ms' }}>
          <h2 className="text-lg md:text-xl font-semibold text-primary mb-4">
            Recent Activity
          </h2>
          {stats.recentActivity.length > 0 ? (
            <ul className="space-y-2">
              {stats.recentActivity.slice(0, 5).map((activity, index) => (
                <li key={index} className="text-sm text-gray-600 flex items-start animate-slide-in" style={{ animationDelay: `${500 + index * 100}ms` }}>
                  <span className="mr-2">•</span>
                  <span>{activity}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 text-sm">No recent activity</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default Dashboard

