
# Opulage Sustainable Schools Manager

A full-stack, open-source web application for managing primary and secondary schools in developing countries, with integrated Sustainable Development Goals (SDGs) tracking.

## Features

- 🏫 **School Management**: Student records, teacher/staff profiles, class management
- 📊 **Attendance Tracking**: Record and monitor attendance for students and staff
- 📝 **Academic Performance**: Track and report on student academic progress
- 🌱 **SDG Tracking**: Set sustainability goals and monitor progress
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
   git clone https://github.com/yourusername/opulage-schools.git
   ```

2. Navigate to project directory
   ```
   cd opulage-schools
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

- **Admin**: admin@school.edu (password: password)
- **Teacher**: johnson@school.edu (password: password)
- **Student**: alex@school.edu (password: password)
- **Parent**: smith@email.com (password: password)

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
