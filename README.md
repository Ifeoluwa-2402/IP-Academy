# IP Academy - Learning Management System

A comprehensive Learning Management System built with React, JavaScript, and Tailwind CSS for IP Academy.

## Features

- **User Authentication**: Sign up and sign in functionality
- **Course Management**: Browse and enroll in courses (free and paid)
- **Progress Tracking**: Monitor your learning progress and improvements
- **Chat Room**: Communicate with other students enrolled in the same courses
- **Course Filtering**: Filter courses by type (All, Free, Paid)
- **Responsive Design**: Modern UI with Dark Green, Gold, and White color scheme

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Navigate to the project directory:
```bash
cd ip-academy-lms
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and visit `http://localhost:5173`

## Project Structure

```
ip-academy-lms/
├── src/
│   ├── components/
│   │   ├── Auth/
│   │   │   ├── SignIn.jsx
│   │   │   └── SignUp.jsx
│   │   ├── Chat/
│   │   │   └── ChatRoom.jsx
│   │   ├── Courses/
│   │   │   └── Courses.jsx
│   │   ├── Dashboard/
│   │   │   └── Dashboard.jsx
│   │   ├── Layout/
│   │   │   └── Navbar.jsx
│   │   └── Progress/
│   │       └── Progress.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
├── tailwind.config.js
└── vite.config.js
```

## Color Scheme

- **Primary Color**: Dark Green (#1B5E20)
- **Secondary Color**: Gold (#FFD700)
- **Other Color**: White (#FFFFFF)

## Technologies Used

- React 18
- React Router DOM
- Tailwind CSS
- Vite

## Features in Detail

### Authentication
- Secure sign up and sign in
- User data stored in localStorage
- Session persistence

### Courses
- Browse all available courses
- Filter by free or paid courses
- Enroll in courses
- View course details (instructor, duration, level, enrollment count)

### Progress Tracking
- Track progress for each enrolled course
- Update progress manually
- View overall progress statistics
- See improvements and achievements

### Chat Room
- Real-time messaging (stored in localStorage)
- Filter messages by course
- Connect with students in the same courses
- System messages and notifications

## Build for Production

```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.

## License

This project is created for IP Academy.

