import { useState, useEffect } from 'react'

const Courses = ({ user }) => {
  const [courses, setCourses] = useState([])
  const [filter, setFilter] = useState('all') // 'all', 'free', 'paid'
  const [enrolledCourses, setEnrolledCourses] = useState([])

  useEffect(() => {
    // Initialize courses if not exists
    const savedCourses = localStorage.getItem('courses')
    if (!savedCourses) {
      const defaultCourses = [
        {
          id: '1',
          title: 'Introduction to Intellectual Property',
          description: 'Learn the fundamentals of IP law and protection',
          instructor: 'Dr. Sarah Johnson',
          price: 0,
          type: 'free',
          duration: '4 weeks',
          level: 'Beginner',
          enrolled: 1250,
          image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=400&fit=crop',
        },
        {
          id: '2',
          title: 'Advanced Patent Law',
          description: 'Deep dive into patent filing and prosecution',
          instructor: 'Prof. Michael Chen',
          price: 299,
          type: 'paid',
          duration: '8 weeks',
          level: 'Advanced',
          enrolled: 456,
          image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&h=400&fit=crop',
        },
        {
          id: '3',
          title: 'Trademark Fundamentals',
          description: 'Understanding trademark registration and enforcement',
          instructor: 'Attorney Lisa Williams',
          price: 0,
          type: 'free',
          duration: '3 weeks',
          level: 'Beginner',
          enrolled: 890,
          image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=400&fit=crop',
        },
        {
          id: '4',
          title: 'Copyright Law Essentials',
          description: 'Master copyright protection and fair use',
          instructor: 'Dr. Robert Martinez',
          price: 199,
          type: 'paid',
          duration: '6 weeks',
          level: 'Intermediate',
          enrolled: 623,
          image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=400&fit=crop',
        },
        {
          id: '5',
          title: 'IP Portfolio Management',
          description: 'Strategic management of intellectual property assets',
          instructor: 'Consultant David Lee',
          price: 399,
          type: 'paid',
          duration: '10 weeks',
          level: 'Advanced',
          enrolled: 234,
          image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop',
        },
        {
          id: '6',
          title: 'Open Source and IP',
          description: 'Navigating IP in open source projects',
          instructor: 'Engineer Emily Brown',
          price: 0,
          type: 'free',
          duration: '5 weeks',
          level: 'Intermediate',
          enrolled: 567,
          image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=400&fit=crop',
        },
      ]
      localStorage.setItem('courses', JSON.stringify(defaultCourses))
      setCourses(defaultCourses)
    } else {
      setCourses(JSON.parse(savedCourses))
    }

    // Load user's enrolled courses
    const users = JSON.parse(localStorage.getItem('users') || '[]')
    const currentUser = users.find((u) => u.id === user.id) || user
    setEnrolledCourses(currentUser.enrolledCourses || [])
  }, [user])

  const handleEnroll = (courseId) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]')
    const userIndex = users.findIndex((u) => u.id === user.id)
    
    if (userIndex !== -1) {
      const currentUser = users[userIndex]
      if (!currentUser.enrolledCourses) {
        currentUser.enrolledCourses = []
      }
      if (!currentUser.enrolledCourses.includes(courseId)) {
        currentUser.enrolledCourses.push(courseId)
        if (!currentUser.progress) {
          currentUser.progress = {}
        }
        currentUser.progress[courseId] = 0
        
        // Add to recent activity
        if (!currentUser.recentActivity) {
          currentUser.recentActivity = []
        }
        const course = courses.find((c) => c.id === courseId)
        currentUser.recentActivity.unshift(
          `Enrolled in "${course?.title}"`
        )
        if (currentUser.recentActivity.length > 10) {
          currentUser.recentActivity = currentUser.recentActivity.slice(0, 10)
        }
        
        users[userIndex] = currentUser
        localStorage.setItem('users', JSON.stringify(users))
        setEnrolledCourses([...currentUser.enrolledCourses])
      }
    }
  }

  const filteredCourses =
    filter === 'all'
      ? courses
      : courses.filter((course) => course.type === filter)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
      <div className="mb-6 md:mb-8">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <div className="animate-fade-in">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-primary">Courses</h1>
            <p className="mt-2 text-gray-600 text-sm md:text-base">
              Explore our comprehensive IP education programs
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-3 md:px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 transform hover:scale-105 ${
                filter === 'all'
                  ? 'bg-primary text-white shadow-md'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              All Courses
            </button>
            <button
              onClick={() => setFilter('free')}
              className={`px-3 md:px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 transform hover:scale-105 ${
                filter === 'free'
                  ? 'bg-primary text-white shadow-md'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Free Courses
            </button>
            <button
              onClick={() => setFilter('paid')}
              className={`px-3 md:px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 transform hover:scale-105 ${
                filter === 'paid'
                  ? 'bg-primary text-white shadow-md'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Paid Courses
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {filteredCourses.map((course, index) => (
          <div
            key={course.id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 animate-fade-in-up"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            {/* Course Image */}
            <div className="relative h-48 overflow-hidden">
              <img
                src={course.image || 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=400&fit=crop'}
                alt={course.title}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                onError={(e) => {
                  e.target.src = 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=400&fit=crop'
                }}
              />
              <div className="absolute top-3 right-3 flex flex-col gap-2">
                <span
                  className={`px-2 py-1 text-xs font-semibold rounded shadow-md ${
                    course.type === 'free'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-secondary text-primary-dark'
                  }`}
                >
                  {course.type === 'free' ? 'FREE' : `$${course.price}`}
                </span>
                <span className="px-2 py-1 text-xs font-semibold rounded bg-white text-primary shadow-md">
                  {course.level}
                </span>
              </div>
            </div>
            
            <div className="p-4 md:p-6">
              <h3 className="text-lg md:text-xl font-semibold text-primary mb-2 line-clamp-2">
                {course.title}
              </h3>
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">{course.description}</p>
              
              <div className="flex flex-wrap items-center text-xs md:text-sm text-gray-500 mb-3 gap-3">
                <div className="flex items-center">
                  <svg
                    className="w-4 h-4 mr-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span>{course.duration}</span>
                </div>
                <div className="flex items-center">
                  <svg
                    className="w-4 h-4 mr-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  <span>{course.enrolled} enrolled</span>
                </div>
              </div>
              
              <div className="text-xs md:text-sm text-gray-500 mb-4">
                👨‍🏫 {course.instructor}
              </div>
              
              <button
                onClick={() => handleEnroll(course.id)}
                disabled={enrolledCourses.includes(course.id)}
                className={`w-full py-2.5 px-4 rounded-md font-medium transition-all duration-300 transform hover:scale-105 ${
                  enrolledCourses.includes(course.id)
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-primary text-white hover:bg-primary-light shadow-md hover:shadow-lg'
                }`}
              >
                {enrolledCourses.includes(course.id)
                  ? '✓ Enrolled'
                  : course.type === 'free'
                  ? 'Enroll Free'
                  : `Enroll for $${course.price}`}
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredCourses.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">
            No courses found for the selected filter.
          </p>
        </div>
      )}
    </div>
  )
}

export default Courses

