import { useState, useEffect } from 'react'

const Progress = ({ user }) => {
  const [enrolledCourses, setEnrolledCourses] = useState([])
  const [courses, setCourses] = useState([])
  const [progress, setProgress] = useState({})

  useEffect(() => {
    // Load courses
    const savedCourses = localStorage.getItem('courses')
    if (savedCourses) {
      setCourses(JSON.parse(savedCourses))
    }

    // Load user data
    const users = JSON.parse(localStorage.getItem('users') || '[]')
    const currentUser = users.find((u) => u.id === user.id) || user

    setEnrolledCourses(currentUser.enrolledCourses || [])
    setProgress(currentUser.progress || {})
  }, [user])

  const updateProgress = (courseId, newProgress) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]')
    const userIndex = users.findIndex((u) => u.id === user.id)

    if (userIndex !== -1) {
      const currentUser = users[userIndex]
      if (!currentUser.progress) {
        currentUser.progress = {}
      }
      currentUser.progress[courseId] = Math.min(100, Math.max(0, newProgress))

      // Add to recent activity
      if (!currentUser.recentActivity) {
        currentUser.recentActivity = []
      }
      const course = courses.find((c) => c.id === courseId)
      if (newProgress === 100) {
        currentUser.recentActivity.unshift(
          `Completed "${course?.title}"`
        )
      } else {
        currentUser.recentActivity.unshift(
          `Progress updated in "${course?.title}": ${newProgress}%`
        )
      }
      if (currentUser.recentActivity.length > 10) {
        currentUser.recentActivity = currentUser.recentActivity.slice(0, 10)
      }

      users[userIndex] = currentUser
      localStorage.setItem('users', JSON.stringify(users))
      setProgress({ ...currentUser.progress })
    }
  }

  const getEnrolledCoursesWithProgress = () => {
    return enrolledCourses
      .map((courseId) => {
        const course = courses.find((c) => c.id === courseId)
        return course
          ? {
              ...course,
              progress: progress[courseId] || 0,
            }
          : null
      })
      .filter((course) => course !== null)
  }

  const enrolledCoursesWithProgress = getEnrolledCoursesWithProgress()

  const overallProgress =
    enrolledCoursesWithProgress.length > 0
      ? Math.round(
          enrolledCoursesWithProgress.reduce(
            (sum, course) => sum + course.progress,
            0
          ) / enrolledCoursesWithProgress.length
        )
      : 0

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
      <div className="mb-6 md:mb-8 animate-fade-in">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-primary">Your Progress</h1>
        <p className="mt-2 text-gray-600 text-sm md:text-base">
          Track your learning journey and improvements
        </p>
      </div>

      {/* Overall Progress Card */}
      <div className="bg-white rounded-lg shadow-md p-4 md:p-6 mb-6 md:mb-8 hover:shadow-xl transition-all duration-300 animate-fade-in-up">
        <h2 className="text-xl font-semibold text-primary mb-4">
          Overall Progress
        </h2>
        <div className="relative pt-1">
          <div className="flex mb-2 items-center justify-between">
            <div>
              <span className="text-xs font-semibold inline-block text-primary">
                {overallProgress}% Complete
              </span>
            </div>
          </div>
              <div className="overflow-hidden h-4 mb-4 text-xs flex rounded bg-gray-200">
            <div
              style={{ width: `${overallProgress}%` }}
              className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-primary transition-all duration-700 ease-out"
            ></div>
          </div>
        </div>
      </div>

      {/* Course Progress Cards */}
      <div className="space-y-4 md:space-y-6">
        {enrolledCoursesWithProgress.length > 0 ? (
          enrolledCoursesWithProgress.map((course, index) => (
            <div
              key={course.id}
              className="bg-white rounded-lg shadow-md p-4 md:p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4 gap-4">
                <div className="flex-1">
                  <h3 className="text-lg md:text-xl font-semibold text-primary mb-2">
                    {course.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-2">
                    {course.description}
                  </p>
                  <div className="flex flex-wrap items-center text-xs md:text-sm text-gray-500 gap-2 md:gap-4">
                    <span>👨‍🏫 {course.instructor}</span>
                    <span>⏱️ {course.duration}</span>
                  </div>
                </div>
                <div className="md:ml-4 text-left md:text-right">
                  <div className="text-2xl md:text-3xl font-bold text-primary">
                    {course.progress}%
                  </div>
                  <div className="text-xs md:text-sm text-gray-500">Complete</div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-4">
                <div className="flex mb-2 items-center justify-between">
                  <span className="text-xs font-semibold text-gray-600">
                    Progress
                  </span>
                </div>
                <div className="overflow-hidden h-3 md:h-4 text-xs flex rounded bg-gray-200">
                  <div
                    style={{ width: `${course.progress}%` }}
                    className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center transition-all duration-700 ease-out ${
                      course.progress === 100
                        ? 'bg-secondary'
                        : 'bg-primary'
                    }`}
                  ></div>
                </div>
              </div>

              {/* Progress Controls */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
                <span className="text-xs md:text-sm text-gray-600 whitespace-nowrap">Update Progress:</span>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => updateProgress(course.id, course.progress - 10)}
                    disabled={course.progress <= 0}
                    className="px-3 py-1.5 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 text-xs md:text-sm"
                  >
                    -10%
                  </button>
                  <button
                    onClick={() => updateProgress(course.id, course.progress + 10)}
                    disabled={course.progress >= 100}
                    className="px-3 py-1.5 bg-primary text-white rounded-md hover:bg-primary-light disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 text-xs md:text-sm"
                  >
                    +10%
                  </button>
                  <button
                    onClick={() => updateProgress(course.id, 100)}
                    disabled={course.progress >= 100}
                    className="px-3 py-1.5 bg-secondary text-primary-dark rounded-md hover:bg-secondary-light disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 text-xs md:text-sm"
                  >
                    Complete
                  </button>
                </div>
              </div>

              {course.progress === 100 && (
                <div className="mt-4 p-3 bg-secondary bg-opacity-20 rounded-md">
                  <p className="text-sm text-primary-dark font-medium">
                    🎉 Congratulations! You've completed this course!
                  </p>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">
              No enrolled courses
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Enroll in courses to track your progress here.
            </p>
          </div>
        )}
      </div>

      {/* Improvements Section */}
      {enrolledCoursesWithProgress.length > 0 && (
        <div className="mt-6 md:mt-8 bg-white rounded-lg shadow-md p-4 md:p-6 hover:shadow-xl transition-all duration-300 animate-fade-in-up">
          <h2 className="text-lg md:text-xl font-semibold text-primary mb-4">
            Your Improvements
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-primary-light bg-opacity-10 rounded-lg">
              <div className="text-3xl font-bold text-primary">
                {enrolledCoursesWithProgress.filter((c) => c.progress > 0).length}
              </div>
              <div className="text-sm text-gray-600 mt-1">Courses Started</div>
            </div>
            <div className="text-center p-4 bg-secondary bg-opacity-20 rounded-lg">
              <div className="text-3xl font-bold text-secondary-dark">
                {enrolledCoursesWithProgress.filter((c) => c.progress === 100).length}
              </div>
              <div className="text-sm text-gray-600 mt-1">Courses Completed</div>
            </div>
            <div className="text-center p-4 bg-primary bg-opacity-10 rounded-lg">
              <div className="text-3xl font-bold text-primary">
                {overallProgress}%
              </div>
              <div className="text-sm text-gray-600 mt-1">Average Progress</div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Progress

