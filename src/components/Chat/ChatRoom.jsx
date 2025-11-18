import { useState, useEffect, useRef } from 'react'

const ChatRoom = ({ user }) => {
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState('')
  const [courseFilter, setCourseFilter] = useState('all')
  const [userCourses, setUserCourses] = useState([])
  const messagesEndRef = useRef(null)

  useEffect(() => {
    // Load user's enrolled courses
    const users = JSON.parse(localStorage.getItem('users') || '[]')
    const currentUser = users.find((u) => u.id === user.id) || user
    setUserCourses(currentUser.enrolledCourses || [])

    // Load messages from localStorage
    const savedMessages = localStorage.getItem('chatMessages')
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages))
    } else {
      // Initialize with welcome messages
      const welcomeMessages = [
        {
          id: '1',
          userId: 'system',
          userName: 'System',
          message: 'Welcome to IP Academy Chat Room! Connect with other students enrolled in the same courses.',
          courseId: 'all',
          timestamp: new Date().toISOString(),
        },
      ]
      localStorage.setItem('chatMessages', JSON.stringify(welcomeMessages))
      setMessages(welcomeMessages)
    }
  }, [user])

  useEffect(() => {
    // Auto-scroll to bottom when new messages arrive
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSendMessage = (e) => {
    e.preventDefault()
    if (!newMessage.trim()) return

    const courseId = courseFilter === 'all' ? 'all' : courseFilter

    const message = {
      id: Date.now().toString(),
      userId: user.id,
      userName: user.name,
      message: newMessage.trim(),
      courseId: courseId,
      timestamp: new Date().toISOString(),
    }

    const updatedMessages = [...messages, message]
    setMessages(updatedMessages)
    localStorage.setItem('chatMessages', JSON.stringify(updatedMessages))
    setNewMessage('')
  }

  const getFilteredMessages = () => {
    if (courseFilter === 'all') {
      return messages.filter(
        (msg) => msg.courseId === 'all' || userCourses.includes(msg.courseId)
      )
    }
    return messages.filter((msg) => msg.courseId === courseFilter)
  }

  const getCourseName = (courseId) => {
    if (courseId === 'all') return 'General'
    const courses = JSON.parse(localStorage.getItem('courses') || '[]')
    const course = courses.find((c) => c.id === courseId)
    return course ? course.title : 'Unknown Course'
  }

  const filteredMessages = getFilteredMessages()

  // Get courses for filter dropdown
  const courses = JSON.parse(localStorage.getItem('courses') || '[]')
  const availableCourses = courses.filter((course) =>
    userCourses.includes(course.id)
  )

  const formatTime = (timestamp) => {
    const date = new Date(timestamp)
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
      <div className="mb-6 md:mb-8 animate-fade-in">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-primary">Chat Room</h1>
        <p className="mt-2 text-gray-600 text-sm md:text-base">
          Connect with students enrolled in the same courses
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col animate-fade-in-up" style={{ height: 'calc(100vh - 200px)', minHeight: '500px' }}>
        {/* Chat Header with Filter */}
        <div className="bg-primary text-white p-3 md:p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
            <h2 className="text-base md:text-lg font-semibold">💬 Chat Room</h2>
            <select
              value={courseFilter}
              onChange={(e) => setCourseFilter(e.target.value)}
              className="bg-primary-light text-white border border-white rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-secondary w-full sm:w-auto transition-all duration-300"
            >
              <option value="all">All Courses</option>
              {availableCourses.map((course) => (
                <option key={course.id} value={course.id}>
                  {course.title}
                </option>
              ))}
            </select>
          </div>
          <div className="text-xs md:text-sm text-secondary font-medium">
            {filteredMessages.length} message{filteredMessages.length !== 1 ? 's' : ''}
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-3 md:p-4 bg-gray-50">
          {filteredMessages.length > 0 ? (
            <div className="space-y-3 md:space-y-4">
              {filteredMessages.map((msg, index) => (
                <div
                  key={msg.id}
                  className={`flex animate-fade-in-up ${
                    msg.userId === user.id ? 'justify-end' : 'justify-start'
                  }`}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div
                    className={`max-w-[85%] sm:max-w-xs lg:max-w-md px-3 md:px-4 py-2 rounded-lg transition-all duration-300 transform hover:scale-105 ${
                      msg.userId === user.id
                        ? 'bg-primary text-white'
                        : msg.userId === 'system'
                        ? 'bg-gray-300 text-gray-800'
                        : 'bg-white text-gray-800 border border-gray-200 shadow-sm'
                    }`}
                  >
                    {msg.userId !== 'system' && (
                      <div
                        className={`text-xs font-semibold mb-1 ${
                          msg.userId === user.id
                            ? 'text-secondary'
                            : 'text-primary'
                        }`}
                      >
                        {msg.userName}
                      </div>
                    )}
                    <div className="text-sm">{msg.message}</div>
                    <div
                      className={`text-xs mt-1 ${
                        msg.userId === user.id
                          ? 'text-secondary'
                          : 'text-gray-500'
                      }`}
                    >
                      {formatTime(msg.timestamp)}
                      {msg.courseId !== 'all' && (
                        <span className="ml-2">
                          • {getCourseName(msg.courseId)}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
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
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
                <h3 className="mt-2 text-sm font-medium text-gray-900">
                  No messages yet
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  Start a conversation by sending a message below.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Message Input */}
        <div className="border-t border-gray-200 p-3 md:p-4 bg-white">
          <form onSubmit={handleSendMessage} className="flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 border border-gray-300 rounded-md px-3 md:px-4 py-2 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
            />
            <button
              type="submit"
              className="bg-primary text-white px-4 md:px-6 py-2 rounded-md font-medium hover:bg-primary-light transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 shadow-md hover:shadow-lg whitespace-nowrap"
            >
              Send 📤
            </button>
          </form>
          <p className="text-xs text-gray-500 mt-2">
            Messages are visible to students enrolled in{' '}
            {courseFilter === 'all'
              ? 'any of your courses'
              : getCourseName(courseFilter)}
          </p>
        </div>
      </div>
    </div>
  )
}

export default ChatRoom

