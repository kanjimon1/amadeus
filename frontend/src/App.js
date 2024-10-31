import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import './assets/styles/main.css';
import Navbar from './components/common/Navbar';
//import background from './assets/images/mainBackground.png';
import LoginForm from './components/auth/LoginForm';
import RegisterForm from './components/auth/RegisterForm';
import Footer from './components/common/Footer';
import MainPage from './components/inside/Main';
//import UserService from './components/service/UserService';
import UsersExtraHours from './components/inside/UsersExtraHours';
//import '../src/assets/styles/layouts/_layouts.scss';

function App() {
  return (
    <BrowserRouter>
      <div>
        <header>
          <Navbar />
        </header>
        <main>
          <Routes>
            <Route exact path="/" element={<LoginForm />} />
            <Route exact path="/login" element={<LoginForm />} />
            <Route path="/register" element={<RegisterForm />} />
            <Route path="/main" element={<MainPage />} />
            <Route path="/users-extra-hours" element={<UsersExtraHours />} />
            {/* Check if user is authenticated and admin before rendering admin-only routes */}
            {/*{UserService.adminOnly() && (
              <>
                <Route path="/main" element={<MainPage />} />
              </>
            )}*/}
            <Route path="*" element={<Navigate to="/login" />} />‰
          </ Routes>
        </main>
        <footer>
          <Footer />
        </footer>
      </div>
    </BrowserRouter>
  );
};

export default App;
