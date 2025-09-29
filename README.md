# 📚 Library Management System - Frontend

A comprehensive library management system built with React and Vite. A complete application for managing books, users, and reservations in a library.

## 🌐 Live Demo

Access the production application: **[https://library-management-flame-phi.vercel.app](https://library-management-flame-phi.vercel.app)**

At the end of this Readme you will find several screenshots of the project.

## 🔗 Related Projects

This frontend application works in conjunction with the backend API:

- **Backend Repository**: [https://github.com/tarv7/library_management](https://github.com/tarv7/library_management)
- **API Documentation (Swagger)**: [https://library-management-back-e6f3cf925e79.herokuapp.com/api-docs](https://library-management-back-e6f3cf925e79.herokuapp.com/api-docs)

## 🔑 Demo Credentials

You can test the application using these pre-defined user accounts:

### Librarians
- **Email**: `thales.lib@gmail.com` | **Password**: `password`
- **Email**: `sarah.johnson@library.com` | **Password**: `password`

### Members
- **Email**: `thales.mem@gmail.com` | **Password**: `password`
- **Email**: `john.smith@email.com` | **Password**: `password`
- **Email**: `emily.davis@email.com` | **Password**: `password`
- **Email**: `michael.brown@email.com` | **Password**: `password`
- **Email**: `jessica.wilson@email.com` | **Password**: `password`

## ✨ Features

- 🔐 **Authentication System**: User login and registration
- 👥 **User Management**: Role differentiation between members and librarians
- 📖 **Book Catalog**: Library collection viewing and management
- 🔍 **Search & Filters**: Advanced book search system
- 📋 **Reservations**: Complete reservation and loan management system
- 📊 **Dashboard**: Specific dashboards for members and librarians
- 🎨 **Responsive Interface**: Adaptive design for different devices

## 🛠️ Technologies Used

- **React 19** - JavaScript library for building user interfaces
- **Vite** - Modern and fast build tool
- **JWT Decode** - JWT token decoding for authentication
- **CSS3** - Pure and modular CSS styling

## 🚀 Running Locally

### Prerequisites

Make sure you have installed:
- [Node.js](https://nodejs.org/) (version 16 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation and Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/tarv7/library_management_front.git
   cd library_management_front
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the project in development mode**
   ```bash
   npm run dev
   ```

4. **Access the application**

   Open your browser and go to: `http://localhost:5173`

### Available Scripts

- `npm run dev` - Runs the project in development mode
- `npm run build` - Builds the production version
- `npm run preview` - Previews the production build locally
- `npm run lint` - Runs the linter to check code quality

## 📁 Project Structure

```
src/
├── components/          # Reusable components
│   ├── AuthForm.jsx    # Authentication forms
│   ├── BookCover.jsx   # Book cover component
│   ├── BookDetail.jsx  # Book details
│   ├── BookForm.jsx    # Book form
│   ├── Books.jsx       # Books listing
│   ├── Dashboard.jsx   # Main dashboard
│   ├── Navbar.jsx      # Navigation bar
│   └── Reservations.jsx # Reservation management
├── contexts/           # Context API for global state
│   └── AuthContext.jsx # Authentication context
├── pages/              # Application pages
│   └── AuthPage.jsx    # Authentication page
├── services/           # API services
│   ├── authService.js  # Authentication services
│   ├── bookService.js  # Book services
│   └── ...            # Other services
└── utils/              # Utility functions
    └── bookUtils.js    # Book utilities
```

## 🤝 Contributing

1. Fork the project
2. Create a feature branch (`git checkout -b feature/new-feature`)
3. Commit your changes (`git commit -m 'Add new feature'`)
4. Push to the branch (`git push origin feature/new-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License. See the LICENSE file for more details.

## 📚 Screenshots

<img width="1920" height="1080" alt="Screenshot 2025-09-29 111603" src="https://github.com/user-attachments/assets/6ea2c8cf-20a1-495f-8b59-98f3f2e30feb" />
<img width="1920" height="1080" alt="Screenshot 2025-09-29 111630" src="https://github.com/user-attachments/assets/df710225-b3d6-4c3d-abb5-83608b13c73c" />
<img width="1920" height="1080" alt="Screenshot 2025-09-29 111657" src="https://github.com/user-attachments/assets/43c6bf49-5b3f-4c4a-ae7f-a11c9444c1c3" />
<img width="1920" height="1080" alt="Screenshot 2025-09-29 111705" src="https://github.com/user-attachments/assets/ed0fa55f-15b9-4aba-abab-4af3db5fb4fa" />
<img width="1920" height="1080" alt="Screenshot 2025-09-29 111713" src="https://github.com/user-attachments/assets/ceb61847-e2ff-4db5-a647-4a4da16aeec1" />
<img width="1920" height="1080" alt="Screenshot 2025-09-29 111733" src="https://github.com/user-attachments/assets/4e97bb3b-c7d4-4820-affa-9e86917fb2d2" />
<img width="1920" height="1080" alt="Screenshot 2025-09-29 111741" src="https://github.com/user-attachments/assets/6dedb1c2-7692-4b26-9c87-1329daee8533" />
<img width="1920" height="1080" alt="Screenshot 2025-09-29 111858" src="https://github.com/user-attachments/assets/5a7744bd-47f2-4e3d-a499-b4d7d5fa9bd3" />
<img width="1920" height="1080" alt="Screenshot 2025-09-29 111942" src="https://github.com/user-attachments/assets/df36b88f-2e0e-43af-a115-aa7e0353b35f" />
<img width="1920" height="1080" alt="Screenshot 2025-09-29 111953" src="https://github.com/user-attachments/assets/4f656ae7-4874-4a58-8141-6156a69c94ba" />
<img width="1920" height="1080" alt="Screenshot 2025-09-29 112001" src="https://github.com/user-attachments/assets/f8f3a6d7-7051-4803-b823-abf8e9a7759f" />

