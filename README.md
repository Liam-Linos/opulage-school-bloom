
# Opulage Bridge

A full-stack, open-source web application for connecting education and careers with AI-powered tools for lesson planning, career guidance, and mentor matching.

## Features

- 🧠 **AI Lesson Planning**: Intelligent curriculum creation for teachers
- 🧭 **Career Guidance**: Student skill assessment and career path recommendation
- 👨‍🏫 **Mentor Matching**: Connect students with ideal mentors based on skills and interests
- 🌱 **SDG Tracking**: Set sustainability goals and monitor progress
- 📊 **Performance Analytics**: Track student progress and identify strengths
- 📱 **Responsive Design**: Works on desktop and mobile devices
- 🔒 **Role-Based Access**: Different views for administrators, teachers, students, and parents

## Tech Stack

- **Frontend**: React with TypeScript, Tailwind CSS, shadcn/ui components
- **State Management**: React Context API, React Query
- **Authentication**: JWT-based authentication (simulated in demo)

## Getting Started

### Prerequisites

- Node.js & npm

### Installation

1. Clone the repository
   ```
   git clone https://github.com/yourusername/opulage-bridge.git
   ```

2. Navigate to project directory
   ```
   cd opulage-bridge
   ```

3. Install dependencies
   ```
   npm install
   ```

4. Start the development server
   ```
   npm run dev
   ```

5. Open your browser to the displayed URL (usually http://localhost:8080)

## Demo Accounts

For testing purposes, you can use the following demo accounts:

- **Admin**: admin@school.edu (password: 123456)
- **Teacher**: teacher@school.edu (password: 123456)
- **Student**: student@school.edu (password: 123456)
- **Parent**: parent@school.edu (password: 123456)

## Project Structure

- `/src/components` - Reusable UI components
- `/src/contexts` - React contexts for state management
- `/src/pages` - Main application pages
- `/src/types` - TypeScript type definitions
- `/src/data` - Mock data for demonstration purposes

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the [MIT License](LICENSE).
